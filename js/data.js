/* ========================================
   AURA — Platform data
   Styles, quiz, AI, real shopping graph
   ======================================== */

// ----------------------------------------
// IMAGE SOURCE TOGGLE
// ----------------------------------------
const USE_LOCAL_IMAGES = true; // local images on
const LOCAL_IMG_BASE = 'images';

// Which aesthetics have a complete local image pack installed.
// If a style is in here, the platform uses its local files instead of Unsplash.
const LOCAL_PACKED = ['classic', 'casual', 'streetwear', 'elegant', 'minimalist', 'korean', 'y2k', 'softgirl', 'vintage'];

// Slot → relative filename inside images/{aesthetic}/
const SLOT_FILES = {
  hero: 'hero.jpg',
  accent: 'accent.jpg',
  outfit1: 'outfit-1.jpg', outfit2: 'outfit-2.jpg', outfit3: 'outfit-3.jpg',
  outfit4: 'outfit-4.jpg', outfit5: 'outfit-5.jpg', outfit6: 'outfit-6.jpg',
  outfit7: 'outfit-7.jpg', outfit8: 'outfit-8.jpg',
  completeLook: 'complete-look.jpg',
  detailFabric: 'detail-fabric.jpg', detailAccessory: 'detail-accessory.jpg',
  detailShoes: 'detail-shoes.jpg', detailJewelry: 'detail-jewelry.jpg',
  detailMakeup: 'detail-makeup.jpg', detailBag: 'detail-bag.jpg',
  beauty: 'beauty.jpg', lookbook: 'lookbook.jpg',
  productClothingAff: 'product-clothing-aff.jpg',
  productClothingMid: 'product-clothing-mid.jpg',
  productClothingLux: 'product-clothing-lux.jpg',
  productShoesAff: 'product-shoes-aff.jpg',
  productShoesMid: 'product-shoes-mid.jpg',
  productShoesLux: 'product-shoes-lux.jpg',
  productBagsAff: 'product-bags-aff.jpg',
  productBagsMid: 'product-bags-mid.jpg',
  productBagsLux: 'product-bags-lux.jpg',
  productAccessoriesAff: 'product-accessories-aff.jpg',
  productAccessoriesMid: 'product-accessories-mid.jpg',
  productAccessoriesLux: 'product-accessories-lux.jpg',
  productBeautyAff: 'product-beauty-aff.jpg',
  productBeautyMid: 'product-beauty-mid.jpg',
  productBeautyLux: 'product-beauty-lux.jpg',
  productJewelryAff: 'product-jewelry-aff.jpg',
  productJewelryMid: 'product-jewelry-mid.jpg',
  productJewelryLux: 'product-jewelry-lux.jpg'
};

// Build an image URL for a (aesthetic, slot). Falls back to Unsplash if the
// aesthetic isn't in LOCAL_PACKED yet.
function slotImg(aesthetic, slot, fallbackQuery) {
  if (USE_LOCAL_IMAGES && LOCAL_PACKED.indexOf(aesthetic) !== -1 && SLOT_FILES[slot]) {
    // Use encoded path to handle spaces / special chars safely
    return `${LOCAL_IMG_BASE}/${aesthetic}/${SLOT_FILES[slot]}`;
  }
  // Fallback to the slug system
  return localImgPath(fallbackQuery || (aesthetic + ' ' + slot));
}

// Slug-based fallback used by data fields that haven't been migrated yet
function localImgPath(q) {
  if (!USE_LOCAL_IMAGES) return null;
  const aesthetic = detectAesthetic(q) || 'misc';
  const slug = String(q).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${LOCAL_IMG_BASE}/${aesthetic}/${slug}.jpg`;
}

// ----------------------------------------
// CURATED EDITORIAL IMAGE POOLS (Unsplash fallback when USE_LOCAL_IMAGES = false)
// Real images.unsplash.com CDN URLs, hand-picked per aesthetic.
// ----------------------------------------
const IMG_POOLS = {
  // Cream blazers, beige neutrals, polished tailoring
  classic: [
    '1490481651871-ab68de25d43d', '1496747611176-843222e1e57c',
    '1492707892479-7bc8d5a4ee93', '1487412947147-5cebf100ffc2',
    '1503944168849-8bf86fa6e2a8', '1551803091-e20673f15770',
    '1581044777550-4cfa60707c03', '1469334031218-e382a71b716b',
    '1539109136881-3be0616acf4b', '1517841905240-472988babdf9',
    '1494790108377-be9c29b29330', '1530418877033-7b67e35bf03b'
  ],
  oldmoney: [
    '1487412947147-5cebf100ffc2', '1490481651871-ab68de25d43d',
    '1483985988355-763728e1935b', '1494790108377-be9c29b29330',
    '1469334031218-e382a71b716b', '1503944168849-8bf86fa6e2a8',
    '1551803091-e20673f15770', '1530418877033-7b67e35bf03b',
    '1539109136881-3be0616acf4b'
  ],
  streetwear: [
    '1556906781-9a412961c28c', '1542291026-7eec264c27ff',
    '1525966222134-fcfa99b8ae77', '1597840900616-31b15cea3a25',
    '1571945153237-4929e783af4a', '1542038784456-1ea8e935640e',
    '1521577352947-9bb58764b69a', '1483985988355-763728e1935b',
    '1505740420928-5e560c06d30e'
  ],
  minimalist: [
    '1487412947147-5cebf100ffc2', '1490481651871-ab68de25d43d',
    '1483985988355-763728e1935b', '1469334031218-e382a71b716b',
    '1496747611176-843222e1e57c', '1530418877033-7b67e35bf03b',
    '1551803091-e20673f15770', '1539109136881-3be0616acf4b',
    '1492707892479-7bc8d5a4ee93'
  ],
  elegant: [
    '1518049362265-d5b2a6b00b37', '1496217590455-aa63a8350eea',
    '1515886657613-9f3515b0c78f', '1525507119028-ed4c629a60a3',
    '1494790108377-be9c29b29330', '1488161628813-04466f872be2',
    '1517841905240-472988babdf9', '1503944168849-8bf86fa6e2a8',
    '1581044777550-4cfa60707c03'
  ],
  korean: [
    '1488161628813-04466f872be2', '1535713875002-d1d0cf377fde',
    '1496747611176-843222e1e57c', '1518049362265-d5b2a6b00b37',
    '1496217590455-aa63a8350eea', '1494790108377-be9c29b29330',
    '1530418877033-7b67e35bf03b', '1515886657613-9f3515b0c78f'
  ],
  y2k: [
    '1525507119028-ed4c629a60a3', '1496217590455-aa63a8350eea',
    '1515886657613-9f3515b0c78f', '1518049362265-d5b2a6b00b37',
    '1494790108377-be9c29b29330', '1556906781-9a412961c28c',
    '1488161628813-04466f872be2'
  ],
  vintage: [
    '1465495976277-4387d4b0b4c6', '1492707892479-7bc8d5a4ee93',
    '1481833761820-0509d3217039', '1452780212940-6f5c0d14d848',
    '1469334031218-e382a71b716b', '1503944168849-8bf86fa6e2a8',
    '1517841905240-472988babdf9', '1454165804606-c3d57bc86b40'
  ],
  softgirl: [
    '1525507119028-ed4c629a60a3', '1496217590455-aa63a8350eea',
    '1515886657613-9f3515b0c78f', '1518049362265-d5b2a6b00b37',
    '1494790108377-be9c29b29330', '1488161628813-04466f872be2',
    '1581044777550-4cfa60707c03'
  ],
  darkacademia: [
    '1481833761820-0509d3217039', '1452780212940-6f5c0d14d848',
    '1454165804606-c3d57bc86b40', '1487412947147-5cebf100ffc2',
    '1492707892479-7bc8d5a4ee93', '1465495976277-4387d4b0b4c6',
    '1503944168849-8bf86fa6e2a8', '1539109136881-3be0616acf4b'
  ],
  casual: [
    '1483985988355-763728e1935b', '1469334031218-e382a71b716b',
    '1496747611176-843222e1e57c', '1530418877033-7b67e35bf03b',
    '1495121605193-b116b5b9c5fe', '1517841905240-472988babdf9',
    '1539109136881-3be0616acf4b', '1551803091-e20673f15770'
  ]
};

// Generic editorial fallback for any non-matching query
const IMG_FALLBACK = [
  '1490481651871-ab68de25d43d', '1496747611176-843222e1e57c',
  '1492707892479-7bc8d5a4ee93', '1487412947147-5cebf100ffc2',
  '1483985988355-763728e1935b', '1469334031218-e382a71b716b',
  '1494790108377-be9c29b29330', '1525507119028-ed4c629a60a3',
  '1518049362265-d5b2a6b00b37', '1481833761820-0509d3217039',
  '1503944168849-8bf86fa6e2a8', '1551803091-e20673f15770'
];

// Identify which aesthetic a query belongs to by scanning for keywords
function detectAesthetic(q) {
  q = q.toLowerCase();
  const map = [
    ['oldmoney',     ['old money', 'quiet luxury', 'cashmere', 'tonal']],
    ['darkacademia', ['dark academia', 'darkacademia', 'tweed', 'oxford', 'library', 'plaid skirt', 'knit vest', 'satchel', 'wine', 'brick']],
    ['streetwear',   ['streetwear', 'sneaker', 'hoodie', 'cargo', 'bucket hat', 'air force', 'dunk', 'jordan', 'chunky', 'tracksuit']],
    ['softgirl',     ['soft girl', 'softgirl', 'coquette', 'bow', 'pearl', 'heart', 'pink', 'pastel', 'floral', 'ribbon', 'mary jane', 'ballet flat']],
    ['korean',       ['korean', 'k-pop', 'kpop', 'cardigan', 'pleated', 'seoul']],
    ['y2k',          ['y2k', 'low rise', 'low-rise', 'baby tee', 'butterfly', 'rhinestone', 'platform']],
    ['vintage',      ['vintage', '70s', '60s', '90s', 'retro', 'thrift', 'flare jeans', 'levi']],
    ['elegant',      ['elegant', 'silk', 'satin', 'slip dress', 'kitten heel', 'pearl', 'lace', 'blush']],
    ['minimalist',   ['minimal', 'linen', 'wool', 'cashmere', 'beige', 'oat', 'taupe', 'cream', 'monochrome']],
    ['classic',      ['classic', 'blazer', 'tailored', 'trench', 'loafers', 'white shirt', 'button down', 'pumps']],
    ['casual',       ['casual', 'denim', 'jeans', 'sweater', 'sweatshirt', 'tee', 'hoodie', 'weekend']]
  ];
  for (const [aesthetic, keywords] of map) {
    for (const k of keywords) if (q.includes(k)) return aesthetic;
  }
  return null;
}

// Image helper.
// Styles in LOCAL_PACKED use local images. Others fall back to Unsplash.
const img = (q, w = 600, h = 800) => {
  const aesthetic = detectAesthetic(q);
  const pool = (aesthetic && IMG_POOLS[aesthetic]) || IMG_FALLBACK;
  let seed = 0;
  for (let i = 0; i < q.length; i++) seed = (seed * 31 + q.charCodeAt(i)) >>> 0;
  const photoId = pool[seed % pool.length];
  return `https://images.unsplash.com/photo-${photoId}?w=${w}&h=${h}&fit=crop&crop=faces,edges&auto=format&q=80`;
};

// Real store search URLs — every product becomes a working link
const STORE_URLS = {
  'Zara':            q => `https://www.zara.com/us/en/search?searchTerm=${encodeURIComponent(q)}`,
  'H&M':             q => `https://www2.hm.com/en_us/search-results.html?q=${encodeURIComponent(q)}`,
  'Mango':           q => `https://shop.mango.com/us/search?kw=${encodeURIComponent(q)}`,
  'ASOS':            q => `https://www.asos.com/search/?q=${encodeURIComponent(q)}`,
  'Bershka':         q => `https://www.bershka.com/us/search?searchTerm=${encodeURIComponent(q)}`,
  'Pull&Bear':       q => `https://www.pullandbear.com/us/search?term=${encodeURIComponent(q)}`,
  'SHEIN':           q => `https://us.shein.com/pdsearch/${encodeURIComponent(q)}/`,
  'Uniqlo':          q => `https://www.uniqlo.com/us/en/search?q=${encodeURIComponent(q)}`,
  'Nike':            q => `https://www.nike.com/w?q=${encodeURIComponent(q)}`,
  'Adidas':          q => `https://www.adidas.com/us/search?q=${encodeURIComponent(q)}`,
  'Sephora':         q => `https://www.sephora.com/search?keyword=${encodeURIComponent(q)}`,
  'COS':             q => `https://www.cos.com/en_usd/search.html?q=${encodeURIComponent(q)}`,
  'Massimo Dutti':   q => `https://www.massimodutti.com/us/search?term=${encodeURIComponent(q)}`,
  'Stradivarius':    q => `https://www.stradivarius.com/us/search?term=${encodeURIComponent(q)}`,
  'Urban Outfitters':q => `https://www.urbanoutfitters.com/search?q=${encodeURIComponent(q)}`,
  'Etsy':            q => `https://www.etsy.com/search?q=${encodeURIComponent(q)}`,
  'Depop':           q => `https://www.depop.com/search/?q=${encodeURIComponent(q)}`,
  'Reformation':     q => `https://www.thereformation.com/search?q=${encodeURIComponent(q)}`,
  'Levis':           q => `https://www.levi.com/US/en_US/search/?q=${encodeURIComponent(q)}`,
  'Brandy Melville': q => `https://www.brandymelville.com/search?q=${encodeURIComponent(q)}`,
  'Princess Polly':  q => `https://us.princesspolly.com/search?q=${encodeURIComponent(q)}`,
  'Mejuri':          q => `https://mejuri.com/search?q=${encodeURIComponent(q)}`,
  'Dr. Martens':     q => `https://www.drmartens.com/us/en_us/search?q=${encodeURIComponent(q)}`,
  'Glossier':        q => `https://www.glossier.com/search?query=${encodeURIComponent(q)}`,
  'Beyond Retro':    q => `https://www.beyondretro.com/search?type=product&q=${encodeURIComponent(q)}`,
  'Everlane':        q => `https://www.everlane.com/search?q=${encodeURIComponent(q)}`,
  // Extended store network
  '& Other Stories': q => `https://www.stories.com/en_usd/search.html?q=${encodeURIComponent(q)}`,
  'A.P.C.':          q => `https://www.apc-us.com/search?q=${encodeURIComponent(q)}`,
  'Acne Studios':    q => `https://www.acnestudios.com/us/en/search/?q=${encodeURIComponent(q)}`,
  'AliExpress':      q => `https://www.aliexpress.com/wholesale?SearchText=${encodeURIComponent(q)}`,
  'Aritzia':         q => `https://www.aritzia.com/us/en/search?q=${encodeURIComponent(q)}`,
  'Charles & Keith': q => `https://www.charleskeith.com/us/search?q=${encodeURIComponent(q)}`,
  'Cider':           q => `https://www.shopcider.com/search?keyword=${encodeURIComponent(q)}`,
  'Converse':        q => `https://www.converse.com/c/search?q=${encodeURIComponent(q)}`,
  'Free People':     q => `https://www.freepeople.com/search/?q=${encodeURIComponent(q)}`,
  'Jacquemus':       q => `https://www.jacquemus.com/search?q=${encodeURIComponent(q)}`,
  'JW PEI':          q => `https://www.jwpei.com/search?q=${encodeURIComponent(q)}`,
  'Le Specs':        q => `https://www.lespecs.com/search?q=${encodeURIComponent(q)}`,
  'Pandora':         q => `https://us.pandora.net/en/search?q=${encodeURIComponent(q)}`,
  'Polène':          q => `https://polene-paris.com/en/search?q=${encodeURIComponent(q)}`,
  'Sézane':          q => `https://www.sezane.com/us/search?q=${encodeURIComponent(q)}`,
  'Tiffany & Co.':   q => `https://www.tiffany.com/en-us/search/?q=${encodeURIComponent(q)}`,
  'Toteme':          q => `https://toteme-studio.com/search?q=${encodeURIComponent(q)}`,
  'Veja':            q => `https://www.veja-store.com/en/catalogsearch/result/?q=${encodeURIComponent(q)}`,
  'YesStyle':        q => `https://www.yesstyle.com/en/search.html?qsearch=${encodeURIComponent(q)}`
};

const shopUrl = (store, q) => {
  const fn = STORE_URLS[store];
  return fn ? fn(q) : `https://www.google.com/search?q=${encodeURIComponent(store + ' ' + q)}`;
};

const P = (tier, store, name, price, q, imgQ) => ({
  tier, store, name, price, q,
  img: img(imgQ),
  url: shopUrl(store, q)
});

const TIER_LABELS = { aff: 'Affordable', mid: 'Mid-range', lux: 'Luxury' };
const CATEGORIES = [
  { id: 'clothing',    label: 'Clothing'    },
  { id: 'shoes',       label: 'Shoes'       },
  { id: 'bags',        label: 'Bags'        },
  { id: 'accessories', label: 'Accessories' },
  { id: 'beauty',      label: 'Beauty'      },
  { id: 'jewelry',     label: 'Jewelry'     }
];

const STYLES = {

classic: {
  id: 'classic', name: 'Classic', tagline: 'timeless. refined. forever.', letter: 'C', mood: 'Refined',
  short: 'Polished pieces, neutral tones, and quiet confidence.',
  intro: 'Classic style is the language of timelessness — a wardrobe built on intention, structure, and quiet luxury. It rejects fleeting trends in favor of pieces that endure: a tailored blazer, a crisp white button-down, the perfect trench. The personality behind it is composed, deliberate, and self-assured.',
  metaMood: 'Refined', metaSeason: 'All year', metaPersonality: 'Composed',
  heroImg: img('classic fashion woman tailored blazer'),
  accentImg: img('white shirt elegant'),
  outfits: [
    { label: 'Daily wear', img: slotImg('classic', 'outfit1', 'tailored blazer trousers woman') },
    { label: 'University', img: slotImg('classic', 'outfit2', 'cardigan loafers preppy') },
    { label: 'Winter',     img: slotImg('classic', 'outfit3', 'camel coat winter outfit') },
    { label: 'Summer',     img: slotImg('classic', 'outfit4', 'white shirt linen pants summer') },
    { label: 'Elegant',    img: slotImg('classic', 'outfit5', 'little black dress classic') },
    { label: 'Casual',     img: slotImg('classic', 'outfit6', 'button down jeans woman') },
    { label: 'Workwear',   img: slotImg('classic', 'outfit7', 'blazer pencil skirt office') },
    { label: 'Evening',    img: slotImg('classic', 'outfit8', 'silk blouse pearls') }
  ],
  notes: {
    makeup: ['Rosy nude lipstick', 'Soft taupe eyeshadow', 'Defined brow', 'Subtle peach blush', 'Glowy skin finish'],
    hair:   ['Low chignon', 'Soft blowout', 'Side-parted lob', 'Polished low ponytail'],
    scent:  ['Chanel No.5', 'Chloe Eau de Parfum', 'Le Labo Rose 31']
  },
  palette: [
    { hex: '#f5efe6', name: 'Cream' },    { hex: '#d4b896', name: 'Camel' },
    { hex: '#8b6f47', name: 'Chestnut' }, { hex: '#2c2620', name: 'Espresso' },
    { hex: '#ffffff', name: 'Optic' },    { hex: '#3a4a52', name: 'Slate' }
  ],
  completeLook: {
    title: 'The Effortless Workday',
    desc: 'A tailored blazer over a crisp shirt, leather loafers, and a single gold detail.',
    img: img('tailored blazer outfit camel woman')
  },
  shop: {
    clothing: [
      P('aff', 'SHEIN', 'Tailored Blazer', '$26', 'tailored blazer beige', 'beige blazer woman product'),
      P('mid', 'Zara', 'Wool-Blend Blazer', '$129', 'wool blazer woman', 'wool blazer beige product'),
      P('lux', 'Massimo Dutti', '100% Wool Blazer', '$295', 'wool blazer', 'camel wool blazer product')
    ],
    shoes: [
      P('aff', 'H&M', 'Loafers', '$39', 'loafers women', 'loafers brown product'),
      P('mid', 'Mango', 'Leather Loafers', '$99', 'leather loafers women', 'leather loafers product'),
      P('lux', 'COS', 'Square-Toe Loafers', '$235', 'leather loafers', 'classic loafers brown product')
    ],
    bags: [
      P('aff', 'H&M', 'Faux-Leather Tote', '$29', 'leather tote bag', 'tan tote bag product'),
      P('mid', 'Mango', 'Leather Shopper', '$129', 'leather shopper bag', 'leather tote bag product'),
      P('lux', 'COS', 'Soft Leather Tote', '$245', 'leather tote', 'tan leather tote product')
    ],
    accessories: [
      P('aff', 'SHEIN', 'Silk-Feel Scarf', '$12', 'silk scarf', 'silk scarf neutral product'),
      P('mid', 'Mango', 'Printed Silk Scarf', '$45', 'silk scarf', 'silk scarf product'),
      P('lux', 'COS', 'Pure Silk Scarf', '$85', 'silk scarf', 'silk scarf elegant product')
    ],
    beauty: [
      P('aff', 'Sephora', 'NYX Soft Matte Lip', '$7', 'NYX soft matte lip cream', 'nude lipstick product'),
      P('mid', 'Sephora', 'NARS Lipstick', '$32', 'NARS lipstick rosy nude', 'lipstick product nude'),
      P('lux', 'Sephora', 'Chanel Rouge Coco', '$48', 'chanel rouge coco', 'luxury lipstick product')
    ],
    jewelry: [
      P('aff', 'H&M', 'Pearl Stud Earrings', '$15', 'pearl earrings', 'pearl earrings product'),
      P('mid', 'Mango', 'Gold Watch', '$79', 'gold watch women', 'gold watch product'),
      P('lux', 'Mejuri', 'Pearl Studs', '$98', 'pearl studs', 'pearl earrings gold product')
    ]
  }
},

casual: {
  id: 'casual', name: 'Casual', tagline: 'easy. comfortable. effortless.', letter: 'C', mood: 'Easy',
  short: 'Relaxed essentials with a soft, lived-in feel.',
  intro: 'Casual style is the art of looking put-together without trying. It is the language of weekends, coffee runs, and long walks home. Built on denim, soft knits, and breathable cotton, it prioritizes ease — but ease, done well, is its own kind of polish.',
  metaMood: 'Easy', metaSeason: 'Year-round', metaPersonality: 'Warm',
  heroImg: img('casual fashion woman jeans sweater'),
  accentImg: img('denim jacket girl'),
  outfits: [
    { label: 'Daily wear', img: slotImg('casual', 'outfit1', 'jeans sweater casual outfit') },
    { label: 'University', img: slotImg('casual', 'outfit2', 'sweatshirt jeans backpack') },
    { label: 'Winter',     img: slotImg('casual', 'outfit3', 'puffer jacket beanie casual') },
    { label: 'Summer',     img: slotImg('casual', 'outfit4', 'white tee shorts casual') },
    { label: 'Weekend',    img: slotImg('casual', 'outfit5', 'hoodie sneakers comfy') },
    { label: 'Travel',     img: slotImg('casual', 'outfit6', 'comfy travel outfit airport') },
    { label: 'Coffee run', img: slotImg('casual', 'outfit7', 'oversized sweater jeans') },
    { label: 'Everyday',   img: slotImg('casual', 'outfit8', 'basic tee jeans woman') }
  ],
  notes: {
    makeup: ['Tinted lip balm', 'Cream blush', 'Brow gel only', 'Mascara', 'Skin tint, no foundation'],
    hair:   ['Messy bun', 'Loose waves', 'Half-up half-down', 'Low ponytail'],
    scent:  ['Glossier You', 'Maison Margiela By the Fireplace']
  },
  palette: [
    { hex: '#dde4dc', name: 'Sage' },   { hex: '#94a8b8', name: 'Denim' },
    { hex: '#e8d8c4', name: 'Sand' },   { hex: '#f4f4f4', name: 'White' },
    { hex: '#7a8a6b', name: 'Olive' },  { hex: '#3d3530', name: 'Bark' }
  ],
  completeLook: {
    title: 'The Saturday Coffee Run',
    desc: 'Worn-in jeans, an oversized knit, and white sneakers. Comfortable enough to walk in for hours.',
    img: img('casual jeans sweater sneakers outfit')
  },
  shop: {
    clothing: [
      P('aff', 'Uniqlo', 'Crew Sweatshirt', '$29', 'crew sweatshirt', 'grey sweatshirt product'),
      P('mid', 'Levis', '501 Original Jean', '$98', '501 original jeans', 'blue jeans product'),
      P('lux', 'Everlane', 'Cashmere Crew', '$148', 'cashmere crew sweater', 'cashmere sweater beige product')
    ],
    shoes: [
      P('aff', 'H&M', 'Canvas Sneakers', '$35', 'white sneakers', 'white sneakers product'),
      P('mid', 'Adidas', 'Stan Smith', '$100', 'stan smith', 'stan smith sneakers product'),
      P('lux', 'Nike', 'Cortez Leather', '$110', 'cortez leather', 'cortez sneakers product')
    ],
    bags: [
      P('aff', 'SHEIN', 'Cotton Tote', '$12', 'cotton tote bag', 'canvas tote bag product'),
      P('mid', 'Mango', 'Crossbody Bag', '$59', 'crossbody bag', 'crossbody bag tan product'),
      P('lux', 'COS', 'Mini Leather Bag', '$185', 'mini leather bag', 'mini leather bag product')
    ],
    accessories: [
      P('aff', 'ASOS', 'Baseball Cap', '$15', 'baseball cap', 'baseball cap product'),
      P('mid', 'Nike', 'Heritage Cap', '$30', 'heritage cap', 'baseball cap white product'),
      P('lux', 'Mango', 'Wool Beanie', '$39', 'wool beanie', 'wool beanie cream product')
    ],
    beauty: [
      P('aff', 'Sephora', 'e.l.f. Lip Balm', '$5', 'elf lip balm', 'lip balm product'),
      P('mid', 'Glossier', 'Balm Dotcom', '$14', 'balm dotcom', 'lip balm pink product'),
      P('lux', 'Sephora', 'Augustinus Bader Lip', '$48', 'augustinus bader lip balm', 'luxury lip balm product')
    ],
    jewelry: [
      P('aff', 'H&M', 'Gold Hoops', '$9', 'gold hoops', 'gold hoop earrings product'),
      P('mid', 'Mango', 'Gold-Plated Hoops', '$29', 'gold hoop earrings', 'gold hoops product'),
      P('lux', 'Mejuri', 'Small Hoops', '$98', 'small gold hoops', 'gold hoops jewelry product')
    ]
  }
},

streetwear: {
  id: 'streetwear', name: 'Streetwear', tagline: 'bold. unapologetic. yours.', letter: 'S', mood: 'Bold',
  short: 'Sneakers, oversized layers, and graphic confidence.',
  intro: 'Streetwear is fashion as identity, as music, as movement. Born from skate parks, hip-hop, and youth subculture, it took the language of the street and turned it into the loudest voice in fashion. Oversized hoodies, statement sneakers, cargo pants, graphic tees — every piece carries weight.',
  metaMood: 'Bold', metaSeason: 'All year', metaPersonality: 'Confident',
  heroImg: img('streetwear fashion woman hoodie sneakers'),
  accentImg: img('sneakers urban'),
  outfits: [
    { label: 'Daily wear', img: slotImg('streetwear', 'outfit1', 'oversized hoodie cargo pants') },
    { label: 'University', img: slotImg('streetwear', 'outfit2', 'streetwear backpack sneakers') },
    { label: 'Winter',     img: slotImg('streetwear', 'outfit3', 'puffer jacket streetwear') },
    { label: 'Summer',     img: slotImg('streetwear', 'outfit4', 'graphic tee shorts sneakers') },
    { label: 'Statement',  img: slotImg('streetwear', 'outfit5', 'streetwear bold outfit') },
    { label: 'Sneakers',   img: slotImg('streetwear', 'outfit6', 'jordan sneakers outfit') },
    { label: 'Layered',    img: slotImg('streetwear', 'outfit7', 'oversized layered streetwear') },
    { label: 'Y2K street', img: slotImg('streetwear', 'outfit8', 'cargo pants y2k') }
  ],
  notes: {
    makeup: ['Glossy lip', 'Smoked-out liner', 'Brushed brows', 'Bronzy skin', 'Faux freckles'],
    hair:   ['Slick-back bun', 'Two braids', 'Space buns', 'Half-up claw clip'],
    scent:  ['Le Labo Santal 33', 'Tom Ford Lost Cherry']
  },
  palette: [
    { hex: '#1a1a1a', name: 'Onyx' },   { hex: '#e63946', name: 'Power' },
    { hex: '#f5f5f5', name: 'Bone' },   { hex: '#5a4a3a', name: 'Earth' },
    { hex: '#ff7a00', name: 'Flame' },  { hex: '#3d4a8a', name: 'Indigo' }
  ],
  completeLook: {
    title: 'The Statement Sneaker Day',
    desc: 'Oversized hoodie, baggy cargos, and the loudest sneakers you own.',
    img: img('streetwear oversized hoodie cargos sneakers')
  },
  shop: {
    clothing: [
      P('aff', 'SHEIN', 'Oversized Hoodie', '$19', 'oversized hoodie', 'oversized hoodie black product'),
      P('mid', 'Pull&Bear', 'Cargo Pants', '$45', 'cargo pants', 'cargo pants product'),
      P('lux', 'Adidas', 'Track Jacket', '$130', 'track jacket', 'track jacket product')
    ],
    shoes: [
      P('aff', 'H&M', 'Chunky Sneakers', '$45', 'chunky sneakers', 'chunky sneakers product'),
      P('mid', 'Nike', 'Air Force 1', '$115', 'air force 1', 'air force 1 sneakers product'),
      P('lux', 'Nike', 'Dunk High', '$130', 'dunk high', 'dunk high sneakers product')
    ],
    bags: [
      P('aff', 'SHEIN', 'Sling Bag', '$15', 'sling bag', 'sling bag black product'),
      P('mid', 'Adidas', 'Originals Sling', '$45', 'originals sling bag', 'sling crossbody product'),
      P('lux', 'Nike', 'Heritage Backpack', '$95', 'heritage backpack', 'backpack streetwear product')
    ],
    accessories: [
      P('aff', 'SHEIN', 'Bucket Hat', '$12', 'bucket hat', 'bucket hat product'),
      P('mid', 'H&M', 'Wool Bucket Hat', '$25', 'wool bucket hat', 'bucket hat black product'),
      P('lux', 'Adidas', 'Originals Cap', '$35', 'originals cap', 'baseball cap black product')
    ],
    beauty: [
      P('aff', 'Sephora', 'NYX Butter Gloss', '$5', 'nyx butter gloss', 'lip gloss product'),
      P('mid', 'Sephora', 'Fenty Gloss Bomb', '$22', 'fenty gloss bomb', 'lip gloss product nude'),
      P('lux', 'Sephora', 'Pat McGrath Gloss', '$32', 'pat mcgrath lip gloss', 'luxury lip gloss product')
    ],
    jewelry: [
      P('aff', 'SHEIN', 'Layered Chain Set', '$8', 'layered chain necklace', 'silver chain necklace product'),
      P('mid', 'Mango', 'Chunky Chain', '$35', 'chunky chain necklace', 'chunky chain product'),
      P('lux', 'Mejuri', 'Bold Chain', '$148', 'bold chain necklace', 'gold chain necklace product')
    ]
  }
},

minimalist: {
  id: 'minimalist', name: 'Minimalist', tagline: 'less, but better.', letter: 'M', mood: 'Calm',
  short: 'Clean lines, neutral palette, intentional pieces.',
  intro: 'Minimalist style is a philosophy stitched into clothing. It is the deliberate rejection of excess — no logos, no clutter, no noise. Every piece has a purpose. Every silhouette is considered. Minimalism is not boring; it is editing as a form of expression.',
  metaMood: 'Calm', metaSeason: 'All year', metaPersonality: 'Discerning',
  heroImg: img('minimalist fashion woman beige neutral'),
  accentImg: img('minimal outfit white'),
  outfits: [
    { label: 'Daily wear', img: slotImg('minimalist', 'outfit1', 'beige outfit minimal') },
    { label: 'University', img: slotImg('minimalist', 'outfit2', 'minimal sweater jeans clean') },
    { label: 'Winter',     img: slotImg('minimalist', 'outfit3', 'long coat minimal beige') },
    { label: 'Summer',     img: slotImg('minimalist', 'outfit4', 'linen dress minimal') },
    { label: 'Workwear',   img: slotImg('minimalist', 'outfit5', 'minimal blazer trousers') },
    { label: 'Evening',    img: slotImg('minimalist', 'outfit6', 'black slip dress minimal') },
    { label: 'Weekend',    img: slotImg('minimalist', 'outfit7', 'white tee jeans minimal') },
    { label: 'Layered',    img: slotImg('minimalist', 'outfit8', 'minimal layered neutral') }
  ],
  notes: {
    makeup: ['Berry-stained lip', 'Bare lid, lashes only', 'Brushed brows', 'Skin tint'],
    hair:   ['Sleek low bun', 'Middle-part lob', 'Slick straight'],
    scent:  ['Le Labo Rose 31', 'Aesop Hwyl']
  },
  palette: [
    { hex: '#f4f0ea', name: 'Bone' },     { hex: '#d4c4a8', name: 'Oat' },
    { hex: '#a89684', name: 'Stone' },    { hex: '#736356', name: 'Taupe' },
    { hex: '#2d2820', name: 'Charcoal' }, { hex: '#ffffff', name: 'White' }
  ],
  completeLook: {
    title: 'The Considered Wardrobe',
    desc: 'A long wool coat, soft cashmere, tonal trousers, and one piece of fine jewelry.',
    img: img('minimal beige outfit cashmere coat')
  },
  shop: {
    clothing: [
      P('aff', 'Uniqlo', 'Linen Shirt', '$40', 'linen shirt women', 'linen shirt cream product'),
      P('mid', 'Mango', 'Linen Trousers', '$69', 'linen trousers', 'linen trousers product'),
      P('lux', 'COS', 'Wool Coat', '$295', 'wool coat', 'beige wool coat product')
    ],
    shoes: [
      P('aff', 'H&M', 'Square-Toe Loafers', '$39', 'square toe loafers', 'minimalist loafers product'),
      P('mid', 'Mango', 'Leather Mules', '$99', 'leather mules', 'leather mules product'),
      P('lux', 'COS', 'Leather Loafers', '$235', 'leather loafers minimalist','leather loafers black product')
    ],
    bags: [
      P('aff', 'H&M', 'Structured Tote', '$29', 'structured tote', 'minimal tote bag product'),
      P('mid', 'Mango', 'Leather Sling', '$89', 'leather sling bag', 'leather sling bag product'),
      P('lux', 'COS', 'Leather Tote', '$245', 'leather tote', 'minimalist leather tote product')
    ],
    accessories: [
      P('aff', 'SHEIN', 'Linen Scarf', '$10', 'linen scarf', 'neutral scarf product'),
      P('mid', 'COS', 'Wool-Blend Scarf', '$69', 'wool scarf', 'wool scarf beige product'),
      P('lux', 'Mango', 'Leather Belt', '$59', 'leather belt women', 'leather belt product')
    ],
    beauty: [
      P('aff', 'Sephora', 'e.l.f. Lip Stain', '$7', 'elf lip stain', 'berry lip stain product'),
      P('mid', 'Glossier', 'Generation G', '$20', 'generation g', 'lipstick berry product'),
      P('lux', 'Sephora', 'Le Labo Rose 31', '$190', 'le labo rose 31', 'le labo perfume product')
    ],
    jewelry: [
      P('aff', 'H&M', 'Thin Gold Chain', '$15', 'thin gold chain necklace', 'gold chain necklace product'),
      P('mid', 'Mango', 'Geometric Earrings', '$29', 'geometric earrings gold', 'gold earrings product'),
      P('lux', 'Mejuri', 'Croissant Chain', '$148', 'croissant chain', 'gold chain necklace minimal product')
    ]
  }
},

elegant: {
  id: 'elegant', name: 'Elegant', tagline: 'grace in motion.', letter: 'E', mood: 'Romantic',
  short: 'Soft drapery, rich fabrics, and feminine silhouettes.',
  intro: 'Elegant style is the embodiment of femininity refined. It moves with intention — silk that catches light, satin that drapes, lace that suggests rather than reveals. Pearls, kitten heels, ballet pinks. The personality behind it is gentle, romantic, and self-possessed.',
  metaMood: 'Romantic', metaSeason: 'All year', metaPersonality: 'Gentle',
  heroImg: img('elegant fashion woman silk dress'),
  accentImg: img('pearl necklace silk'),
  outfits: [
    { label: 'Daily wear',    img: slotImg('elegant', 'outfit1', 'silk blouse skirt elegant') },
    { label: 'Brunch',        img: slotImg('elegant', 'outfit2', 'floral midi dress elegant') },
    { label: 'Winter',        img: slotImg('elegant', 'outfit3', 'long wool coat elegant') },
    { label: 'Summer',        img: slotImg('elegant', 'outfit4', 'linen dress elegant cream') },
    { label: 'Cocktail',      img: slotImg('elegant', 'outfit5', 'satin slip dress elegant') },
    { label: 'Evening',       img: slotImg('elegant', 'outfit6', 'black gown elegant') },
    { label: 'Wedding guest', img: slotImg('elegant', 'outfit7', 'midi dress wedding guest') },
    { label: 'Romantic',      img: slotImg('elegant', 'outfit8', 'lace blouse romantic') }
  ],
  notes: {
    makeup: ['Rosy pink lip', 'Soft pink eyeshadow', 'Defined lashes', 'Pink blush', 'Glowy base'],
    hair:   ['Soft chignon', 'Loose romantic curls', 'Ribbon ponytail'],
    scent:  ['Chloe Rose Tangerine', 'Miss Dior Blooming']
  },
  palette: [
    { hex: '#fbe8e1', name: 'Blush' },     { hex: '#e8c5b8', name: 'Peach' },
    { hex: '#f8f1e4', name: 'Champagne' }, { hex: '#c8a594', name: 'Rose Gold' },
    { hex: '#7a4a3d', name: 'Bordeaux' },  { hex: '#fffdf9', name: 'Pearl' }
  ],
  completeLook: {
    title: 'The Soft Cocktail Hour',
    desc: 'A satin slip dress, kitten heels, pearl earrings, and a top-handle bag.',
    img: img('elegant silk slip dress pearls outfit')
  },
  shop: {
    clothing: [
      P('aff', 'H&M', 'Satin Blouse', '$35', 'satin blouse', 'satin blouse blush product'),
      P('mid', 'Mango', 'Lace-Trim Slip', '$89', 'lace slip dress', 'slip dress satin product'),
      P('lux', 'Reformation', 'Silk Slip Dress', '$248', 'silk slip dress', 'silk slip dress product')
    ],
    shoes: [
      P('aff', 'SHEIN', 'Kitten Heel Slingbacks', '$25', 'kitten heels', 'kitten heels product'),
      P('mid', 'Zara', 'Slingback Pumps', '$79', 'slingback pumps', 'slingback heels product'),
      P('lux', 'Mango', 'Leather Kitten Heels', '$139', 'leather kitten heels', 'leather kitten heels product')
    ],
    bags: [
      P('aff', 'ASOS', 'Top-Handle Bag', '$35', 'top handle bag', 'top handle bag pink product'),
      P('mid', 'Mango', 'Mini Top-Handle', '$89', 'mini top handle bag', 'mini top handle bag product'),
      P('lux', 'COS', 'Leather Top-Handle', '$245', 'top handle leather bag', 'top handle leather bag product')
    ],
    accessories: [
      P('aff', 'SHEIN', 'Pearl Hair Clip', '$5', 'pearl hair clip', 'pearl hair clip product'),
      P('mid', 'Mango', 'Silk Hair Scarf', '$25', 'silk hair scarf', 'silk scarf hair product'),
      P('lux', 'COS', 'Silk Twill Scarf', '$85', 'silk twill scarf', 'silk twill scarf product')
    ],
    beauty: [
      P('aff', 'Sephora', 'NYX Matte Lipstick', '$7', 'nyx matte lipstick rose', 'pink lipstick product'),
      P('mid', 'Sephora', 'Charlotte Tilbury Pillow Talk', '$38', 'charlotte tilbury pillow talk', 'pink lipstick product nude'),
      P('lux', 'Sephora', 'Chanel Rouge Allure', '$50', 'chanel rouge allure', 'chanel lipstick product')
    ],
    jewelry: [
      P('aff', 'H&M', 'Pearl Studs', '$9', 'pearl studs', 'pearl studs product'),
      P('mid', 'Mango', 'Pearl Drop Earrings', '$29', 'pearl drop earrings', 'pearl drop earrings product'),
      P('lux', 'Mejuri', 'Pearl Pendant', '$128', 'pearl pendant', 'pearl pendant necklace product')
    ]
  }
}

};

// More styles get added by data-extra.js

// ----- Remaining 5 styles -----
Object.assign(STYLES, {

korean: {
  id: 'korean', name: 'Korean Fashion', tagline: 'soft. sweet. quietly cool.', letter: 'K', mood: 'Sweet',
  short: 'Oversized layers, pastel cardigans, and dewy charm.',
  intro: 'Korean fashion is built on contrast. Oversized blazers paired with mini skirts. Dewy, luminous skin under chunky knits. Soft pastels next to schoolgirl pleats. It is feminine without being delicate, trendy without being aggressive.',
  metaMood: 'Sweet', metaSeason: 'Spring & Fall', metaPersonality: 'Dreamy',
  heroImg: img('korean fashion woman cute outfit'),
  accentImg: img('korean street style girl'),
  outfits: [
    { label: 'Daily wear', img: slotImg('korean', 'outfit1', 'korean fashion cardigan skirt') },
    { label: 'University', img: slotImg('korean', 'outfit2', 'korean uni outfit cute') },
    { label: 'Winter',     img: slotImg('korean', 'outfit3', 'korean winter long coat scarf') },
    { label: 'Summer',     img: slotImg('korean', 'outfit4', 'korean summer dress') },
    { label: 'Date',       img: slotImg('korean', 'outfit5', 'korean date outfit cute') },
    { label: 'Cafe',       img: slotImg('korean', 'outfit6', 'korean cafe outfit aesthetic') },
    { label: 'School',     img: slotImg('korean', 'outfit7', 'korean school uniform style') },
    { label: 'Cozy',       img: slotImg('korean', 'outfit8', 'korean cozy oversized') }
  ],
  notes: {
    makeup: ['Gradient lip tint', 'Straight brushed brows', 'Aegyo-sal under eye', 'Dewy glass skin'],
    hair:   ['Curtain bangs', 'Half-up bow', 'Loose claw-clip bun'],
    scent:  ['Chance Eau Tendre', 'Jo Malone Peony & Blush Suede']
  },
  palette: [
    { hex: '#fbe5e8', name: 'Cherry' },  { hex: '#f5e6c8', name: 'Cream' },
    { hex: '#d8c4e0', name: 'Lilac' },   { hex: '#a4c8e0', name: 'Sky' },
    { hex: '#fff4e8', name: 'Vanilla' }, { hex: '#594a3d', name: 'Mocha' }
  ],
  completeLook: {
    title: 'The Cafe Study Day',
    desc: 'Oversized cardigan, pleated mini, knee-high socks, and a tiny shoulder bag.',
    img: img('korean cafe outfit cardigan pleated skirt')
  },
  shop: {
    clothing: [
      P('aff', 'SHEIN', 'Oversized Cardigan', '$18', 'oversized cardigan pastel', 'pastel cardigan product'),
      P('mid', 'Stradivarius', 'Pleated Mini Skirt', '$39', 'pleated mini skirt', 'pleated skirt product'),
      P('lux', 'Mango', 'Knit Polo Sweater', '$99', 'knit polo sweater', 'knit polo product korean')
    ],
    shoes: [
      P('aff', 'H&M', 'Mary Jane Flats', '$35', 'mary jane flats', 'mary janes product'),
      P('mid', 'Bershka', 'Platform Loafers', '$50', 'platform loafers', 'platform loafers product'),
      P('lux', 'Mango', 'Leather Mary Janes', '$99', 'leather mary janes', 'leather mary janes product')
    ],
    bags: [
      P('aff', 'SHEIN', 'Mini Shoulder Bag', '$14', 'mini shoulder bag korean', 'mini shoulder bag product'),
      P('mid', 'Stradivarius', 'Quilted Mini Bag', '$39', 'quilted mini bag', 'quilted mini bag product'),
      P('lux', 'Mango', 'Leather Mini', '$99', 'leather mini bag', 'mini leather bag pink product')
    ],
    accessories: [
      P('aff', 'SHEIN', 'Pearl Hair Clips Set', '$5', 'pearl hair clips', 'pearl hair clips product'),
      P('mid', 'H&M', 'Knee-High Socks', '$12', 'knee high socks', 'knee high socks product'),
      P('lux', 'Urban Outfitters', 'Bow Hair Clip', '$35', 'bow hair clip', 'bow hair clip product')
    ],
    beauty: [
      P('aff', 'Sephora', 'Etude House Lip Tint', '$8', 'etude house lip tint', 'lip tint product'),
      P('mid', 'Sephora', 'Laneige Lip Mask', '$24', 'laneige lip sleeping mask', 'lip mask product'),
      P('lux', 'Sephora', 'Sulwhasoo Serum', '$80', 'sulwhasoo first care serum', 'korean serum product')
    ],
    jewelry: [
      P('aff', 'SHEIN', 'Pearl Pin Set', '$5', 'pearl pin hair', 'pearl jewelry product'),
      P('mid', 'H&M', 'Heart Pendant', '$15', 'heart pendant necklace', 'heart necklace product'),
      P('lux', 'Mejuri', 'Pearl Pendant', '$98', 'pearl pendant', 'pearl pendant gold product')
    ]
  }
},

y2k: {
  id: 'y2k', name: 'Y2K', tagline: 'rhinestones. low-rise. nostalgia.', letter: 'Y', mood: 'Playful',
  short: 'Glitter, baby tees, and unapologetic 2000s revival.',
  intro: 'Y2K style is fashion through a millennium-bug lens — a glittering revival of late 1990s and early 2000s pop culture. Low-rise jeans, baby tees, rhinestones, fur trim, denim-on-denim, ironic graphics. The personality is playful, nostalgic, and loud.',
  metaMood: 'Playful', metaSeason: 'Year-round', metaPersonality: 'Bold',
  heroImg: img('y2k fashion woman 2000s style'),
  accentImg: img('y2k baby tee outfit'),
  outfits: [
    { label: 'Daily wear', img: slotImg('y2k', 'outfit1', 'low rise jeans baby tee') },
    { label: 'University', img: slotImg('y2k', 'outfit2', 'y2k school outfit') },
    { label: 'Winter',     img: slotImg('y2k', 'outfit3', 'y2k fur jacket') },
    { label: 'Summer',     img: slotImg('y2k', 'outfit4', 'y2k mini skirt halter top') },
    { label: 'Going out',  img: slotImg('y2k', 'outfit5', 'y2k going out rhinestone') },
    { label: 'Tracksuit',  img: slotImg('y2k', 'outfit6', 'juicy couture tracksuit') },
    { label: 'Denim',      img: slotImg('y2k', 'outfit7', 'denim on denim y2k') },
    { label: 'Mall day',   img: slotImg('y2k', 'outfit8', 'y2k mall outfit early 2000s') }
  ],
  notes: {
    makeup: ['Frosted lip gloss', 'Shimmery silver eyeshadow', 'Thin pencil-line brow', 'Body glitter'],
    hair:   ['Crimped waves', 'Two-tone chunky highlights', 'Half-up double bubble pony'],
    scent:  ['Britney Spears Curious', 'Vanilla Fields']
  },
  palette: [
    { hex: '#ff6bb5', name: 'Bubblegum' }, { hex: '#e0e0e0', name: 'Chrome' },
    { hex: '#ff5e3a', name: 'Mandarin' },  { hex: '#9be3d4', name: 'Aqua' },
    { hex: '#a78ed8', name: 'Lavender' },  { hex: '#ffd700', name: 'Gold' }
  ],
  completeLook: {
    title: 'The Mall Day Throwback',
    desc: 'Low-rise jeans, baby tee, butterfly clips, and a tiny rhinestone shoulder bag.',
    img: img('y2k low rise jeans baby tee outfit')
  },
  shop: {
    clothing: [
      P('aff', 'SHEIN', 'Low-Rise Jeans', '$22', 'low rise jeans', 'low rise jeans product'),
      P('mid', 'Bershka', 'Cropped Baby Tee', '$15', 'baby tee crop', 'baby tee product pink'),
      P('lux', 'Pull&Bear', 'Low-Rise Cargo', '$50', 'low rise cargo', 'cargo pants y2k product')
    ],
    shoes: [
      P('aff', 'SHEIN', 'Chunky Platforms', '$32', 'chunky platform sneakers', 'platform sneakers product'),
      P('mid', 'Pull&Bear', 'Platform Mary Janes', '$50', 'platform mary janes', 'platform mary janes product'),
      P('lux', 'Adidas', 'Samba', '$100', 'samba', 'samba sneakers product')
    ],
    bags: [
      P('aff', 'SHEIN', 'Baguette Bag', '$12', 'baguette bag', 'mini baguette bag pink product'),
      P('mid', 'Urban Outfitters', 'Mini Shoulder Bag', '$45', 'mini shoulder bag y2k', 'mini shoulder bag rhinestone product'),
      P('lux', 'ASOS', 'Embellished Baguette', '$95', 'embellished baguette bag', 'rhinestone bag product')
    ],
    accessories: [
      P('aff', 'SHEIN', 'Butterfly Clips Set', '$4', 'butterfly hair clips', 'butterfly clips product'),
      P('mid', 'Urban Outfitters', 'Tinted Shades', '$25', 'tinted oval sunglasses', 'tinted sunglasses pink product'),
      P('lux', 'ASOS', 'Trucker Cap', '$22', 'trucker cap', 'trucker cap product')
    ],
    beauty: [
      P('aff', 'Sephora', 'NYX Lip Gloss', '$5', 'nyx lip gloss frosted', 'lip gloss frosted product'),
      P('mid', 'Sephora', 'Rare Beauty Gloss', '$22', 'rare beauty gloss', 'lip gloss y2k product'),
      P('lux', 'Sephora', 'Pat McGrath Gloss', '$32', 'pat mcgrath lust gloss', 'pat mcgrath gloss product')
    ],
    jewelry: [
      P('aff', 'SHEIN', 'Layered Chokers', '$8', 'choker layered set', 'choker necklace product'),
      P('mid', 'Pull&Bear', 'Charm Necklace', '$25', 'charm necklace', 'charm necklace product'),
      P('lux', 'Mejuri', 'Heart Locket', '$148', 'heart locket', 'heart locket gold product')
    ]
  }
},

vintage: {
  id: 'vintage', name: 'Vintage', tagline: 'every piece, a story.', letter: 'V', mood: 'Nostalgic',
  short: 'Curated thrift finds, retro silhouettes, lived-in charm.',
  intro: 'Vintage style is a love letter to the past, written in fabric. It draws from the 1940s shoulder, the 1950s waist, the 1960s shift, the 1970s flare. Each piece carries history. The personality behind it is curious, romantic, and a little contrarian.',
  metaMood: 'Nostalgic', metaSeason: 'All year', metaPersonality: 'Curious',
  heroImg: img('vintage fashion woman retro outfit'),
  accentImg: img('vintage thrifted outfit'),
  outfits: [
    { label: 'Daily wear', img: slotImg('vintage', 'outfit1', 'vintage 70s outfit jeans') },
    { label: 'University', img: slotImg('vintage', 'outfit2', 'vintage cardigan blouse') },
    { label: 'Winter',     img: slotImg('vintage', 'outfit3', 'vintage wool coat retro') },
    { label: 'Summer',     img: slotImg('vintage', 'outfit4', 'vintage 60s dress summer') },
    { label: '70s',        img: slotImg('vintage', 'outfit5', '70s flared jeans') },
    { label: '90s',        img: slotImg('vintage', 'outfit6', '90s grunge outfit') },
    { label: 'Romantic',   img: slotImg('vintage', 'outfit7', 'vintage tea dress') },
    { label: 'Edgy',       img: slotImg('vintage', 'outfit8', 'vintage leather jacket') }
  ],
  notes: {
    makeup: ['Red matte lip', 'Winged liquid liner', 'Defined arched brow', 'Pinched-cheek blush'],
    hair:   ['Pin curls', 'Headscarf wrap', 'Soft Hollywood waves'],
    scent:  ['Guerlain Shalimar', 'Estee Lauder Youth Dew']
  },
  palette: [
    { hex: '#a85c3a', name: 'Rust' },    { hex: '#d4a868', name: 'Mustard' },
    { hex: '#5c6a4a', name: 'Olive' },   { hex: '#7a3838', name: 'Cherry' },
    { hex: '#c4a48a', name: 'Caramel' }, { hex: '#3d2a20', name: 'Cocoa' }
  ],
  completeLook: {
    title: 'The Thrifted Sunday',
    desc: 'Vintage Levis, a 70s blouse, leather Mary Janes, and a story-worn shoulder bag.',
    img: img('vintage 70s outfit retro fashion')
  },
  shop: {
    clothing: [
      P('aff', 'SHEIN', 'Retro Print Blouse', '$25', 'retro print blouse', 'vintage style blouse product'),
      P('mid', 'Depop', 'Vintage Levis 501', '$85', 'vintage levis 501', 'vintage jeans product'),
      P('lux', 'Beyond Retro', 'Vintage Wool Cardigan', '$95', 'vintage wool cardigan', 'vintage cardigan product')
    ],
    shoes: [
      P('aff', 'H&M', 'Mary Jane Flats', '$40', 'mary jane flats', 'mary janes product'),
      P('mid', 'Mango', 'Leather Mary Janes', '$99', 'leather mary janes vintage', 'leather mary janes product'),
      P('lux', 'Dr. Martens', '1461 Oxford', '$160', '1461 oxford', 'dr martens oxford product')
    ],
    bags: [
      P('aff', 'Depop', 'Vintage Shoulder Bag', '$35', 'vintage shoulder bag', 'vintage handbag product'),
      P('mid', 'Etsy', 'Curated Leather Bag', '$85', 'vintage leather bag', 'vintage leather handbag product'),
      P('lux', 'Beyond Retro', 'Vintage Coach', '$195', 'vintage coach bag', 'vintage coach bag product')
    ],
    accessories: [
      P('aff', 'SHEIN', 'Cat-Eye Sunglasses', '$8', 'cat eye sunglasses', 'cat eye sunglasses product'),
      P('mid', 'ASOS', 'ASOS Design Cat-Eye', '$25', 'cat eye sunglasses tortoise', 'tortoise sunglasses product'),
      P('lux', 'Etsy', 'Vintage Brooch', '$45', 'vintage brooch', 'vintage brooch product')
    ],
    beauty: [
      P('aff', 'Sephora', 'NYX Liquid Suede', '$7', 'nyx liquid suede', 'red lipstick product'),
      P('mid', 'Sephora', 'MAC Ruby Woo', '$22', 'mac ruby woo', 'red matte lipstick product'),
      P('lux', 'Sephora', 'Chanel Rouge Coco', '$50', 'chanel rouge coco red', 'red lipstick chanel product')
    ],
    jewelry: [
      P('aff', 'SHEIN', 'Beaded Necklace', '$7', 'beaded necklace vintage', 'beaded necklace product'),
      P('mid', 'Etsy', 'Vintage Gold Locket', '$45', 'vintage gold locket', 'gold locket vintage product'),
      P('lux', 'Mejuri', 'Antique-Style Hoops', '$148', 'antique gold hoops', 'gold hoop earrings product')
    ]
  }
},

softgirl: {
  id: 'softgirl', name: 'Soft Girl', tagline: 'pastel. pretty. pure.', letter: 'S', mood: 'Tender',
  short: 'Pinks, hearts, ruffles, and Tumblr-era romance.',
  intro: 'Soft girl style is the aesthetic of unapologetic sweetness. Born on TikTok, raised on Tumblr, it celebrates everything pink, glittery, and tender. Heart-shaped sunglasses, ruffled blouses, pastel cardigans, butterfly motifs.',
  metaMood: 'Tender', metaSeason: 'Spring', metaPersonality: 'Gentle',
  heroImg: img('soft girl pink fashion aesthetic'),
  accentImg: img('pastel pink outfit girl'),
  outfits: [
    { label: 'Daily wear',  img: slotImg('softgirl', 'outfit1', 'pastel pink outfit cardigan') },
    { label: 'University',  img: slotImg('softgirl', 'outfit2', 'soft girl school outfit') },
    { label: 'Winter',      img: slotImg('softgirl', 'outfit3', 'pink puffer winter cute') },
    { label: 'Summer',      img: slotImg('softgirl', 'outfit4', 'floral dress soft girl') },
    { label: 'Cottagecore', img: slotImg('softgirl', 'outfit5', 'cottagecore dress prairie') },
    { label: 'Picnic',      img: slotImg('softgirl', 'outfit6', 'picnic floral dress') },
    { label: 'Cozy',        img: slotImg('softgirl', 'outfit7', 'pink knit sweater cozy') },
    { label: 'Romantic',    img: slotImg('softgirl', 'outfit8', 'lace blouse pink soft') }
  ],
  notes: {
    makeup: ['Pink glossy lip', 'Pink eyeshadow', 'Faux freckles', 'Heavy pink blush'],
    hair:   ['Two low pigtails', 'Half-up bow', 'Pink butterfly clips'],
    scent:  ['Marc Jacobs Daisy', 'Ariana Grande Cloud']
  },
  palette: [
    { hex: '#ffd1dc', name: 'Petal' },        { hex: '#ffc8a8', name: 'Peach' },
    { hex: '#fff0f5', name: 'Cotton Candy' }, { hex: '#e6c8e0', name: 'Lilac' },
    { hex: '#fff8e7', name: 'Cream' },        { hex: '#c4a8b8', name: 'Mauve' }
  ],
  completeLook: {
    title: 'The Picnic Romance',
    desc: 'A floral midi, ballet flats, a heart-shaped bag, and a delicate pearl pendant.',
    img: img('soft girl pink floral dress outfit')
  },
  shop: {
    clothing: [
      P('aff', 'SHEIN', 'Floral Mini Dress', '$22', 'floral mini dress', 'floral dress pink product'),
      P('mid', 'Brandy Melville', 'Pastel Cardigan', '$48', 'pastel cardigan', 'pink cardigan product'),
      P('lux', 'Reformation', 'Lace-Trim Dress', '$248', 'lace trim midi dress', 'lace dress product')
    ],
    shoes: [
      P('aff', 'H&M', 'Ballet Flats', '$30', 'ballet flats', 'pink ballet flats product'),
      P('mid', 'Stradivarius', 'Mary Janes', '$45', 'mary janes pink', 'pink mary janes product'),
      P('lux', 'Mango', 'Satin Ballet Flats', '$99', 'satin ballet flats', 'satin ballet flats product')
    ],
    bags: [
      P('aff', 'SHEIN', 'Heart-Shaped Bag', '$14', 'heart shaped bag', 'heart bag pink product'),
      P('mid', 'Princess Polly', 'Mini Heart Bag', '$45', 'mini heart bag', 'mini bag pink product'),
      P('lux', 'ASOS', 'Pearl-Bead Bag', '$95', 'pearl bead bag', 'pearl bag product')
    ],
    accessories: [
      P('aff', 'SHEIN', 'Heart Sunglasses', '$6', 'heart sunglasses', 'heart sunglasses pink product'),
      P('mid', 'Brandy Melville', 'Bow Hair Clips', '$18', 'bow hair clips', 'bow hair clips product'),
      P('lux', 'Urban Outfitters', 'Pearl Headband', '$35', 'pearl headband', 'pearl headband product')
    ],
    beauty: [
      P('aff', 'Sephora', 'e.l.f. Cream Blush', '$5', 'elf cream blush pink', 'cream blush product'),
      P('mid', 'Sephora', 'Rare Beauty Blush', '$23', 'rare beauty blush', 'rare beauty blush product'),
      P('lux', 'Sephora', 'Chanel Joues Blush', '$52', 'chanel joues contraste', 'chanel blush product')
    ],
    jewelry: [
      P('aff', 'SHEIN', 'Pearl Pendant', '$7', 'pearl pendant cute', 'pearl pendant product'),
      P('mid', 'H&M', 'Bow Earrings', '$19', 'bow earrings', 'bow earrings product'),
      P('lux', 'Mejuri', 'Bold Pearl Pendant', '$128', 'bold pearl pendant', 'pearl pendant gold product')
    ]
  }
}

});

// ----------------------------------------
// QUIZ
// ----------------------------------------
const QUIZ = [
  {
    q: 'How would you describe your style?',
    options: [
      { icon: '🧥', text: 'Polished and put together',   tag: 'classic' },
      { icon: '☁️', text: 'Easy and comfortable',         tag: 'casual' },
      { icon: '🔥', text: 'Bold and unapologetic',       tag: 'streetwear' },
      { icon: '🤍', text: 'Quiet and minimal',           tag: 'minimalist' }
    ]
  },
  {
    q: 'Pick a color palette.',
    options: [
      { icon: '🪞', text: 'Cream, oat, ivory',           tag: 'minimalist' },
      { icon: '🌸', text: 'Blush, pearl, soft rose',     tag: 'elegant' },
      { icon: '🎀', text: 'Pastel pink and lace',        tag: 'softgirl' },
      { icon: '✨', text: 'Pink chrome and bubblegum',   tag: 'y2k' }
    ]
  },
  {
    q: 'A perfect weekend looks like…',
    options: [
      { icon: '🥐', text: 'A pastel café with a book',         tag: 'korean' },
      { icon: '🍷', text: 'A quiet wine bar at dinner',         tag: 'elegant' },
      { icon: '🎧', text: 'City streets with friends',         tag: 'streetwear' },
      { icon: '🍂', text: 'Hunting through a vintage market',  tag: 'vintage' }
    ]
  },
  {
    q: 'Pick a shoe.',
    options: [
      { icon: '👟', text: 'White sneakers',           tag: 'casual' },
      { icon: '🥿', text: 'Leather loafers',          tag: 'classic' },
      { icon: '👠', text: 'Heels or satin mules',     tag: 'elegant' },
      { icon: '🎀', text: 'Mary Janes or ballet flats', tag: 'softgirl' }
    ]
  },
  {
    q: 'Your fashion icon is closest to…',
    options: [
      { icon: '🎬', text: 'Audrey Hepburn — timeless',          tag: 'classic' },
      { icon: '🎤', text: 'A K-pop idol with iced americano',   tag: 'korean' },
      { icon: '⭐', text: 'Paris Hilton circa 2003',             tag: 'y2k' },
      { icon: '🌻', text: 'A 70s flower child',                 tag: 'vintage' }
    ]
  }
];

// ----------------------------------------
// AI STYLIST RESPONSES
// ----------------------------------------
const AI_RESPONSES = [
  {
    keywords: ['beige', 'tan', 'camel', 'pants', 'trousers'],
    response: "Beige pants are a workhorse — they go with almost everything. Try:\n\n• A crisp white shirt + tan loafers for polished classic.\n• An oversized cream knit + white sneakers for soft minimalism.\n• A black turtleneck + ankle boots for autumn drama.",
    productRefs: [
      ['aff', 'SHEIN', 'White Button-Down', '$15', 'white button down shirt', 'white shirt product'],
      ['mid', 'Uniqlo', 'Cashmere Crew', '$99', 'cashmere crew', 'cashmere sweater beige product'],
      ['lux', 'Mango', 'Leather Loafers', '$99', 'leather loafers', 'leather loafers tan product']
    ]
  },
  {
    keywords: ['black', 'jeans', 'denim'],
    response: "Black jeans anchor any wardrobe:\n\n• Camel coat + white tee + leather loafers — quiet luxury.\n• Graphic tee + chunky sneakers + bomber — easy streetwear.\n• Silk blouse + heeled mules — minimalist date night.",
    productRefs: [
      ['aff', 'H&M', 'Black Skinny Jeans', '$30', 'black skinny jeans', 'black jeans product'],
      ['mid', 'Levis', 'Mile High Black', '$98', 'mile high black jeans', 'black jeans levis product'],
      ['lux', 'COS', 'Tapered Black Jean', '$135', 'tapered black jeans', 'black jeans woman product']
    ]
  },
  {
    keywords: ['white', 'shirt', 'blouse', 'button'],
    response: "A white shirt is the most quietly powerful piece you can own. Style it:\n\n• Tucked into tailored trousers with loafers — classic.\n• Half-tucked into Levis with sneakers — casual cool.\n• Under a knit vest with pleated skirt — dark academia.",
    productRefs: [
      ['aff', 'SHEIN', 'Cotton Button-Down', '$15', 'white button down shirt', 'white shirt product'],
      ['mid', 'Uniqlo', 'Premium Linen', '$50', 'linen shirt women white', 'white linen shirt product'],
      ['lux', 'COS', 'Oversized Poplin', '$125', 'oversized poplin shirt', 'white poplin shirt product']
    ]
  },
  {
    keywords: ['date', 'date night', 'dinner'],
    response: "Pick something you feel like *yourself* in — but elevated:\n\n• Satin slip dress + delicate gold + kitten heels.\n• High-waisted black trousers + soft knit + statement earrings.\n• Midi dress in your favorite color + tailored blazer + ankle boots.",
    productRefs: [
      ['aff', 'SHEIN', 'Satin Slip Dress', '$25', 'satin slip dress', 'satin slip dress product'],
      ['mid', 'Mango', 'Lace Slip', '$89', 'lace slip dress', 'slip dress black product'],
      ['lux', 'Reformation', 'Silk Slip Dress', '$248', 'silk slip dress', 'silk slip dress product']
    ]
  },
  {
    keywords: ['interview', 'work', 'office', 'professional'],
    response: "Lean into structure and neutrals:\n\n• Tailored trousers + silk blouse + low pumps.\n• Wrap dress in a solid color + simple gold studs + a leather tote.\n• Blazer over a tucked turtleneck + straight-leg pants.",
    productRefs: [
      ['aff', 'H&M', 'Tailored Trousers', '$39', 'tailored trousers women', 'tailored trousers product'],
      ['mid', 'Mango', 'Wool-Blend Blazer', '$129', 'wool blazer woman', 'wool blazer black product'],
      ['lux', 'Massimo Dutti', 'Pure Wool Blazer', '$295', 'wool blazer', 'wool blazer woman product']
    ]
  },
  {
    keywords: ['winter', 'cold', 'snow', 'coat'],
    response: "Layers that look intentional, not bulky:\n\n• Long wool coat + chunky knit + straight-leg jeans + leather boots.\n• Puffer over hoodie + cargos + chunky sneakers — streetwear.\n• Teddy coat + turtleneck + midi skirt + tights — soft academia.",
    productRefs: [
      ['aff', 'H&M', 'Teddy Coat', '$70', 'teddy coat women', 'teddy coat product'],
      ['mid', 'Mango', 'Wool Coat', '$179', 'wool coat', 'wool coat camel product'],
      ['lux', 'COS', 'Long Wool Coat', '$295', 'long wool coat', 'long coat wool product']
    ]
  },
  {
    keywords: ['summer', 'hot', 'beach', 'warm'],
    response: "Breathable fabrics — linen, cotton, silk:\n\n• Linen midi + leather sandals + straw bag.\n• High-waisted shorts + fitted tee + white sneakers.\n• Slip dress + denim jacket for cooler nights.",
    productRefs: [
      ['aff', 'SHEIN', 'Linen-Blend Dress', '$22', 'linen midi dress', 'linen dress white product'],
      ['mid', 'Mango', 'Linen Midi', '$79', 'linen midi dress', 'linen midi product'],
      ['lux', 'Reformation', 'Linen Sundress', '$198', 'linen sundress', 'linen sundress product']
    ]
  },
  {
    keywords: ['color', 'colors', 'match', 'matching'],
    response: "A few rules:\n\n• Stick to one palette family per outfit (warm or cool).\n• Pair one statement color with two neutrals.\n• Tonal dressing always looks expensive.\n• Add one unexpected accent — a red lip with all-beige."
  },
  {
    keywords: ['minimalist', 'minimal'],
    response: "Build your wardrobe around:\n\n• 5-6 colors max — bone, taupe, oat, charcoal, white.\n• Quality basics: wool coat, cashmere knit, leather loafers, well-cut trousers.\n• Texture replaces print — linen, silk, wool.\n• One piece of fine jewelry worn daily.",
    productRefs: [
      ['aff', 'Uniqlo', 'Cashmere Crew', '$99', 'cashmere crew sweater', 'cashmere sweater product'],
      ['mid', 'Mango', 'Linen Trousers', '$69', 'linen trousers women', 'linen trousers product'],
      ['lux', 'COS', 'Wool Coat', '$295', 'wool coat', 'wool coat beige product']
    ]
  },
  {
    keywords: ['streetwear', 'street'],
    response: "Commit to one bold piece and let everything else support it:\n\n• Statement sneakers + relaxed cargos + fitted tee.\n• Oversized hoodie + bike shorts + chunky sneakers + sling bag.\n• Graphic tee under a button-down + wide-leg jeans + Air Force 1s.",
    productRefs: [
      ['aff', 'SHEIN', 'Oversized Hoodie', '$19', 'oversized hoodie', 'oversized hoodie product'],
      ['mid', 'Pull&Bear', 'Cargo Pants', '$45', 'cargo pants', 'cargo pants product'],
      ['lux', 'Nike', 'Air Force 1', '$115', 'air force 1', 'air force 1 product']
    ]
  },
  {
    keywords: ['accessories', 'jewelry', 'bag'],
    response: "Accessories are where personality lives:\n\n• Pick one focal point — bold earrings or a statement bag, not both.\n• Mix metals only if you do it consistently.\n• Invest in a good leather bag in a neutral.\n• Pearls, gold hoops, and a watch outlive every trend.",
    productRefs: [
      ['aff', 'H&M', 'Gold Hoops', '$9', 'gold hoops', 'gold hoops product'],
      ['mid', 'Mango', 'Leather Crossbody', '$89', 'leather crossbody', 'leather crossbody product'],
      ['lux', 'Mejuri', 'Pearl Pendant', '$128', 'pearl pendant', 'pearl pendant product']
    ]
  },
  {
    keywords: ['budget', 'cheap', 'affordable'],
    response: "You don't need a big budget for great style:\n\n• Thrift staples: vintage Levis, wool coats, silk blouses.\n• Spend on shoes and bags — they wear hardest.\n• Three perfect basics > ten almost-right pieces.",
    productRefs: [
      ['aff', 'SHEIN', 'Tailored Blazer', '$26', 'tailored blazer', 'tailored blazer product'],
      ['aff', 'H&M', 'Pleated Skirt', '$29', 'pleated skirt', 'pleated skirt product'],
      ['aff', 'Uniqlo', 'Linen Shirt', '$40', 'linen shirt', 'linen shirt product']
    ]
  },
  {
    keywords: ['hair', 'hairstyle'],
    response: "A few easy, elevated hairstyles:\n\n• Sleek low bun with middle part — minimalist polish.\n• Soft claw-clip half-up — Korean coffee-shop chic.\n• Loose Hollywood waves — vintage romance.\n• Two pulled-back braids under a slick pony — streetwear edge."
  },
  {
    keywords: ['perfume', 'scent', 'fragrance'],
    response: "Fragrance is invisible style:\n\n• Classic and polished: Chanel No.5, Chloe Eau de Parfum.\n• Soft and romantic: Glossier You, Marc Jacobs Daisy.\n• Warm and smoky: Tom Ford Tobacco Vanille, Le Labo Santal 33.\n• Fresh and modern: Aesop Hwyl.",
    productRefs: [
      ['aff', 'Sephora', 'Glossier You', '$70', 'glossier you', 'glossier you perfume product'],
      ['mid', 'Sephora', 'Marc Jacobs Daisy', '$82', 'marc jacobs daisy', 'marc jacobs daisy product'],
      ['lux', 'Sephora', 'Le Labo Santal 33', '$220', 'le labo santal 33', 'le labo santal 33 product']
    ]
  }
];

const AI_FALLBACKS = [
  "Tell me a bit more — what's the occasion, weather, or vibe? I can build a full look around almost any starting piece.",
  "Are you leaning more polished and structured, or soft and easy? That changes everything.",
  "Walk me through what's already in your closet that you love — that's where great outfits start."
];

AI_RESPONSES.forEach(r => {
  if (r.productRefs) {
    r.products = r.productRefs.map(arr => P(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]));
    delete r.productRefs;
  }
});

// ============================================================
// BEAUTY NOTES — editorial caption for the beauty accent image
// ============================================================
const BEAUTY_NOTES = {
  classic:    'A clean canvas: SPF, a wash of mascara, and nude lips. Less is always more.',
  casual:     'Effortless skin, tinted balm, and a ponytail done right. Comfort before glam.',
  streetwear: 'Bold liner, glossy lips, or a clean fade — the face is part of the look.',
  minimalist: 'Skinimalism. Glass skin, clear brow gel, and one deliberate detail.',
  elegant:    'Dewy skin, a swipe of rose, and a perfume that lingers long after you leave the room.',
  korean:     'Glass skin, gradient lip, and a blush blended so softly it looks like a flush.',
  y2k:        'Frosted gloss, metallic shadow, and a tiny rhinestone — somewhere, anywhere.',
  vintage:    'A winged liner, a red lip, and a spritz of something powdery and warm.',
  softgirl:   'Rosy cheeks, glossy lips, and lashes that curl just enough to look like you weren\'t trying.'
};

// Inject beautyNote into each STYLES entry
Object.keys(BEAUTY_NOTES).forEach(id => {
  if (STYLES[id]) STYLES[id].beautyNote = BEAUTY_NOTES[id];
});

// ============================================================
// LOCAL IMAGE OVERRIDES — patch the 3 user-packed styles
// ============================================================
(function applyLocalPacks() {
  if (typeof USE_LOCAL_IMAGES === 'undefined' || !USE_LOCAL_IMAGES) return;
  if (typeof LOCAL_PACKED === 'undefined' || !LOCAL_PACKED) return;
  const base = LOCAL_IMG_BASE;
  const productSlotMap = {
    clothing: ['product-clothing-aff.jpg','product-clothing-mid.jpg','product-clothing-lux.jpg'],
    shoes:    ['product-shoes-aff.jpg','product-shoes-mid.jpg','product-shoes-lux.jpg'],
    bags:     ['product-bags-aff.jpg','product-bags-mid.jpg','product-bags-lux.jpg'],
    accessories: ['product-accessories-aff.jpg','product-accessories-mid.jpg','product-accessories-lux.jpg'],
    beauty:   ['product-beauty-aff.jpg','product-beauty-mid.jpg','product-beauty-lux.jpg'],
    jewelry:  ['product-jewelry-aff.jpg','product-jewelry-mid.jpg','product-jewelry-lux.jpg']
  };
  LOCAL_PACKED.forEach(id => {
    const s = STYLES[id];
    if (!s) return;
    const folder = base + '/' + id;
    s.heroImg     = folder + '/hero.jpg';
    s.accentImg   = folder + '/accent.jpg';
    s.lookbookImg = folder + '/lookbook.jpg';
    s.beautyImg   = folder + '/beauty.jpg';
    s.details = {
      fabric:    folder + '/detail-fabric.jpg',
      accessory: folder + '/detail-accessory.jpg',
      shoes:     folder + '/detail-shoes.jpg',
      jewelry:   folder + '/detail-jewelry.jpg',
      makeup:    folder + '/detail-makeup.jpg',
      bag:       folder + '/detail-bag.jpg'
    };
    s.outfits.forEach((o, i) => { o.img = folder + '/outfit-' + (i + 1) + '.jpg'; });
    if (s.completeLook) s.completeLook.img = folder + '/complete-look.jpg';
    Object.keys(productSlotMap).forEach(cat => {
      if (s.shop && s.shop[cat]) {
        s.shop[cat].forEach((p, i) => {
          if (productSlotMap[cat][i]) p.img = folder + '/' + productSlotMap[cat][i];
        });
      }
    });
  });

  // ── Pass 2: Fix duplicate outfit slots by borrowing from the closest relative aesthetic
  // Each entry: [styleId, relativeId] — relative is visually closest / aesthetically adjacent
  const OUTFIT_RELATIVES = [
    ['korean', 'softgirl'],   // Korean had 7 unique outfits; slot 8 was a copy of slot 1
    ['y2k',    'softgirl'],   // Y2K had 5–6 unique outfits; slots 7–8 copied from 1–2
  ];

  // Hard overrides for cross-style file-content duplicates (same bytes, different URLs — can't dedup by URL)
  // minimalist/outfit-8 is an identical copy of casual/outfit-6 — replace with classic slot 8 (adjacent aesthetic)
  if (STYLES.minimalist && STYLES.classic) {
    STYLES.minimalist.outfits[7].img = base + '/classic/outfit-8.jpg';
  }

  OUTFIT_RELATIVES.forEach(([id, relId]) => {
    const s   = STYLES[id];
    const rel = STYLES[relId];
    if (!s || !rel) return;

    const seen = new Set();
    let   relIdx = 0;

    s.outfits.forEach(o => {
      if (!seen.has(o.img)) {
        seen.add(o.img);
      } else {
        // Duplicate found — advance through relative's outfits to find a fresh image
        while (relIdx < rel.outfits.length && seen.has(rel.outfits[relIdx].img)) relIdx++;
        if (relIdx < rel.outfits.length) {
          o.img = rel.outfits[relIdx].img;
          seen.add(o.img);
          relIdx++;
        }
      }
    });
  });
})();
