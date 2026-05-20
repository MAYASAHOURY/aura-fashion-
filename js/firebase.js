/* ============================================================
   AURA — Firebase Firestore integration
   Overrides main.js moodboard functions with cloud storage
   ============================================================ */

const AURA_FB_CONFIG = {
  apiKey:            "AIzaSyAO0RDi_9YaSm-kpTpB7MHVyDkcaveUqlk",
  authDomain:        "aura-fashion-fc2d4.firebaseapp.com",
  projectId:         "aura-fashion-fc2d4",
  storageBucket:     "aura-fashion-fc2d4.firebasestorage.app",
  messagingSenderId: "246808677665",
  appId:             "1:246808677665:web:4ef423fef9e63b9989c260"
};

if (!firebase.apps.length) firebase.initializeApp(AURA_FB_CONFIG);
const _db   = firebase.firestore();
const _auth = firebase.auth();

/* ── User ID: real account OR anonymous fallback ───────────── */
function _getUid() {
  const user = _auth.currentUser;
  if (user) return user.uid;
  // fallback: random ID in localStorage
  let uid = localStorage.getItem('aura_uid');
  if (!uid) {
    uid = 'u_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('aura_uid', uid);
  }
  return uid;
}

function _ref() {
  return _db.collection('moodboards').doc(_getUid()).collection('items');
}

/* ── Expose current user for nav ───────────────────────────── */
function getCurrentUser() { return _auth.currentUser; }
function onAuthChange(cb)  { return _auth.onAuthStateChanged(cb); }

/* ── Local cache (instant UI response) ─────────────────────── */
function _getCache() {
  try { return JSON.parse(localStorage.getItem('aura_mb') || '[]'); } catch { return []; }
}
function _setCache(items) {
  localStorage.setItem('aura_mb', JSON.stringify(items));
}

/* ── Firestore helpers ─────────────────────────────────────── */
async function fbSave(item) {
  const cache = _getCache().filter(x => x.id !== item.id);
  cache.push(item);
  _setCache(cache);
  try { await _ref().doc(item.id).set(item); } catch(e) { console.warn('FB save:', e); }
}

async function fbRemove(id) {
  _setCache(_getCache().filter(x => x.id !== id));
  try { await _ref().doc(id).delete(); } catch(e) { console.warn('FB remove:', e); }
}

async function fbLoadAll() {
  const localItems = _getCache();
  try {
    const snap  = await _ref().get();
    const cloud = snap.docs.map(d => d.data());

    if (cloud.length > 0) {
      // Cloud has items — trust cloud, refresh cache
      _setCache(cloud);
      return cloud;
    }

    // Cloud is empty but we have local items — push them up to Firestore
    // (handles UID-mismatch / timing issue where saves went to cache only)
    if (localItems.length > 0) {
      localItems.forEach(item => {
        _ref().doc(item.id).set(item).catch(() => {});
      });
      return localItems;
    }

    // Both empty — genuinely empty moodboard
    _setCache([]);
    return [];
  } catch(e) {
    console.warn('FB load — using cache:', e);
    return localItems;
  }
}

/* ── Override main.js functions ────────────────────────────── */
function loadMoodboard()  { return _getCache(); }
function saveMoodboard()  { /* handled by fbSave/fbRemove */ }
function isSaved(id)      { return _getCache().some(x => x.id === id); }

function toggleMoodboard(item) {
  const exists = _getCache().some(x => x.id === item.id);
  if (exists) { fbRemove(item.id); return false; }
  fbSave(item); return true;
}

/* ── Sync cache from Firestore on pages that use moodboard ── */
if (document.getElementById('moodboard-container') || document.getElementById('r-moodboard')) {
  fbLoadAll().catch(() => {});
}
