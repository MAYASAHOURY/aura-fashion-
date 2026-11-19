/* ============================================================
   AURA — Secure Like System   (js/likes.js  v1)

   Load order: Firebase compat scripts → firebase.js → likes.js

   Flow
   ────
   1. handleLike(postId, onResult?) — attach to every like button
   2. Not authed  → save intent → redirect to login.html
   3. login.html  → authenticates → _postLoginRedirect() sends
                    user back to origin page
   4. Origin page → onAuthStateChanged fires → _resumePending()
   5. Like executes once → dispatches 'aura:like-resumed' for UI
   ============================================================ */

(function () {
  'use strict';

  const PENDING_KEY = 'aura_pending_like';  // { postId }
  const ORIGIN_KEY  = 'aura_like_origin';   // href to return to
  let   _inFlight   = false;                // dedup guard

  /* ── Firestore ref helper ─────────────────────────────────── */
  function _likeRef(postId, uid) {
    return firebase.firestore()
      .collection('posts').doc(postId)
      .collection('likes').doc(uid);
  }

  /* ── Core Firestore toggle (backend-validated) ────────────── */
  async function _doToggle(postId) {
    const user = firebase.auth().currentUser;
    if (!user) throw new Error('unauthenticated'); // should never reach here

    const ref  = _likeRef(postId, user.uid);
    const snap = await ref.get();

    if (snap.exists) {
      await ref.delete();
      return false; // unliked
    }

    await ref.set({
      userId:    user.uid,
      postId:    postId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
      // Firestore rules enforce: only these 3 fields, createdAt is timestamp
    });
    return true; // liked
  }

  /* ── 1. Public entry point ────────────────────────────────────
     Wire to every like button:
       <button onclick="handleLike('post_abc', updateBtn)">♥</button>

     onResult({ postId, liked }) — optional UI callback
  ─────────────────────────────────────────────────────────────── */
  window.handleLike = async function (postId, onResult) {
    if (!postId) return;

    const user = firebase.auth().currentUser;

    /* ── Not logged in: save intent, redirect to login ── */
    if (!user) {
      try {
        localStorage.setItem(PENDING_KEY, JSON.stringify({ postId }));
        localStorage.setItem(ORIGIN_KEY,  window.location.href);
      } catch (e) { /* storage blocked in iOS private mode — silent */ }

      window.location.href = 'login.html';
      return; // stops here — page is navigating away
    }

    /* ── Logged in: execute immediately ── */
    try {
      const liked = await _doToggle(postId);
      if (typeof onResult === 'function') onResult({ postId, liked });
      return liked;
    } catch (err) {
      console.error('[Aura likes] toggle failed:', err.code, err.message);
    }
  };

  /* ── 2. Resume pending like after login ───────────────────────
     Called automatically by onAuthStateChanged below.
     ORDER IS CRITICAL:
       removeItem first → _inFlight second
       prevents double-like if Firebase re-triggers auth event
       (bfcache restore, token refresh, etc.)
  ─────────────────────────────────────────────────────────────── */
  async function _resumePending(user) {
    if (_inFlight || !user) return;

    /* Read & validate stored intent */
    let pending;
    try {
      const raw = localStorage.getItem(PENDING_KEY);
      if (!raw) return;
      pending = JSON.parse(raw);
    } catch (e) {
      localStorage.removeItem(PENDING_KEY);
      return;
    }

    if (!pending || typeof pending.postId !== 'string' || !pending.postId) {
      localStorage.removeItem(PENDING_KEY);
      return;
    }

    /* ✅ Clear BEFORE setting _inFlight — prevents double-execute
       if onAuthStateChanged fires twice (bfcache, network re-init) */
    localStorage.removeItem(PENDING_KEY);
    _inFlight = true;

    try {
      const liked = await _doToggle(pending.postId);

      /* Notify UI on this page so the like button updates */
      window.dispatchEvent(new CustomEvent('aura:like-resumed', {
        detail: { postId: pending.postId, liked }
      }));
    } catch (err) {
      console.warn('[Aura likes] resume failed:', err.code, err.message);
      /* Do NOT restore pending — avoids infinite retry loops */
    } finally {
      _inFlight = false;
    }
  }

  /* ── 3. UI helpers ────────────────────────────────────────────

     await isPostLiked('post_abc')   → true | false
     await getLikeCount('post_abc')  → number

     ⚠ getLikeCount reads every document in the subcollection.
       Fine for low-traffic posts. For high-traffic, switch to a
       denormalized `likesCount` field on the post document,
       updated by a Cloud Function on like create/delete.
  ─────────────────────────────────────────────────────────────── */
  window.isPostLiked = async function (postId) {
    const user = firebase.auth().currentUser;
    if (!user) return false;
    const snap = await _likeRef(postId, user.uid).get();
    return snap.exists;
  };

  window.getLikeCount = async function (postId) {
    const snap = await firebase.firestore()
      .collection('posts').doc(postId)
      .collection('likes')
      .get();
    return snap.size;
  };

  /* ── 4. Auth listener — auto-resume on every page load ────── */
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) _resumePending(user);
  });

})();
