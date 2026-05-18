/* ============================================================
   AURA — Style page renderer (sections 1–4)
   ============================================================ */
(function () {
  // Disable browser scroll restoration so page always starts at top
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  const params = new URLSearchParams(window.location.search);
  const id = (window.location.hash ? window.location.hash.replace(/^#/, '') : (params.get('id') || 'classic'));
  const s = STYLES[id];
  const root = document.getElementById('style-content');

  if (!s) {
    root.innerHTML = '<div style="padding:200px 48px;text-align:center;"><h1>Style not found</h1><a href="index.html#styles" class="btn">Back to all styles</a></div>';
    return;
  }
  document.title = s.name + ' — AURA';

  const DESCRIPTIONS = {
    classic:    'Timeless tailoring rooted in quiet sophistication. Tweed blazers, ivory shirting, leather loafers. Wear it to work, to dinner, or anywhere you want to look polished without trying.',
    casual:     'Easy, lived-in pieces that feel like a Sunday morning. Worn jeans, soft knits, white sneakers. Perfect for everyday errands, brunch, and long walks.',
    streetwear: 'Bold, urban, and unapologetically loud. Oversized hoodies, cargo pants, statement sneakers. Made for the city, weekends out, and concerts.',
    minimalist: 'Less, but better. Neutral tones, clean lines, and quality fabrics. The uniform of people who let the cut do the talking — work, travel, and everywhere in between.',
    elegant:    'Refined and feminine, with a soft evening quality. Silk slips, satin heels, a single pearl. Wear it to galleries, dinners, and slow evenings.',
    korean:     'Soft, modern, and effortlessly cool. Pleated skirts, cropped knits, white sneakers. Made for cafés, photo dates, and study sessions.',
    y2k:        'Glossy, playful, and unapologetically nostalgic. Low-rise jeans, baby tees, butterfly clips. Made for parties, weekend nights, and feeling young.',
    vintage:    'Borrowed from another decade — 70s flares, prairie blouses, suede boots. Wear it to flea markets, brunches, and slow city wanderings.',
    softgirl:   'Sweet, romantic, and pastel-soft. Lace tops, mini skirts, ribbon hair clips. Perfect for picnics, first dates, and spring afternoons.'
  };

  const BREAKDOWNS = {
    classic: {
      top: 'A crisp button-up or fitted knit in a neutral tone — the foundation of every polished look.',
      bottom: 'High-waisted tailored trousers cut straight through the leg. The cleanest silhouette there is.',
      shoes: 'Leather loafers or pointed flats. Quiet, well-made, and they get better with age.',
      accessories: 'A leather tote, gold studs, and a structured belt. One detail at a time, never more.'
    },
    casual: {
      top: 'An oversized cotton tee or soft knit sweater. Comfort first, but cut well so it still looks intentional.',
      bottom: 'Worn-in straight-leg jeans in a mid-blue wash. The pair you reach for without thinking.',
      shoes: 'Clean white sneakers — the most versatile shoe in any wardrobe.',
      accessories: 'A canvas tote, a baseball cap, and a simple silver chain.'
    },
    streetwear: {
      top: 'An oversized graphic hoodie or boxy tee. Bold, branded, and built for layering.',
      bottom: 'Loose cargo pants or baggy jeans with utility detailing.',
      shoes: 'Chunky sneakers in a statement colorway — the centerpiece of every fit.',
      accessories: 'A crossbody bag, a beanie, and silver chunky jewelry.'
    },
    minimalist: {
      top: 'A fine merino crewneck or silk shell in cream, ash, or black. Nothing extra.',
      bottom: 'Wide-leg trousers in heavy wool or clean denim. Architectural, not fussy.',
      shoes: 'Leather mules or sleek loafers. Monochrome, low contrast, refined.',
      accessories: 'A single structured bag and minimal gold jewelry — one statement, never more.'
    },
    elegant: {
      top: 'A silk camisole or fluid satin blouse. Soft on the body, catches the light.',
      bottom: 'A midi slip skirt or tailored cigarette pant in a deep tone.',
      shoes: 'Slingback heels or satin mules. Feminine and just elevated enough.',
      accessories: 'A pearl drop, a small leather clutch, and a soft floral perfume.'
    },
    korean: {
      top: 'A cropped cardigan over a fitted white tee. Layered, soft, and a little playful.',
      bottom: 'A pleated mini skirt or wide tailored trousers in a neutral tone.',
      shoes: 'White sneakers or chunky Mary Janes — clean, modern, and very K-fashion.',
      accessories: 'A small shoulder bag, a hair clip, and dewy minimal makeup.'
    },
    y2k: {
      top: 'A baby tee, mesh top, or fitted cami with low-rise everything.',
      bottom: 'Low-rise flared jeans or a denim mini — the lower the rise the better.',
      shoes: 'Pointed kitten heels or chunky platform sneakers.',
      accessories: 'Butterfly clips, tinted sunglasses, and a tiny shoulder bag.'
    },
    vintage: {
      top: 'A prairie blouse, ribbed turtleneck, or 70s knit in cream or rust.',
      bottom: 'High-waisted flared jeans or a corduroy midi skirt.',
      shoes: 'Suede boots, square-toe loafers, or knee-high leather boots.',
      accessories: 'A leather satchel, large gold hoops, and a wide-brim hat.'
    },
    softgirl: {
      top: 'A lace cami, ribbon-trimmed blouse, or cropped cardigan in pastel pink.',
      bottom: 'A pleated mini skirt or floral midi — soft fabrics, gentle silhouettes.',
      shoes: 'Ballet flats with ribbon ties or low-heel mary janes.',
      accessories: 'Pearl hair clips, a heart pendant, and a small quilted bag.'
    }
  };

  const desc = DESCRIPTIONS[s.id] || s.short;
  const breakdown = BREAKDOWNS[s.id] || BREAKDOWNS.classic;

  // ---------- Curated outfits (accurate links) ----------
  const CURATED_COMBOS = {
    classic: [
      { name: 'The Everyday', tier: 'aff', tag: 'Effortless · daily wear', heroIdx: 0, pieces: [
        { category: 'Top',       name: 'White Cotton Button-Down',  store: 'H&M',         price: '$25', q: 'white cotton button down shirt women' },
        { category: 'Bottom',    name: 'High-Waist Beige Trousers', store: 'Bershka',     price: '$35', q: 'high waist beige tailored trousers women' },
        { category: 'Shoes',     name: 'Pointed Leather Flats',     store: 'SHEIN',       price: '$22', q: 'pointed leather ballet flats women' },
        { category: 'Bag',       name: 'Beige Faux-Leather Tote',   store: 'H&M',         price: '$30', q: 'beige faux leather tote bag' },
        { category: 'Accessory', name: 'Pearl Stud Earrings',       store: 'H&M',         price: '$8',  q: 'pearl stud earrings small' }
      ]},
      { name: 'The Elevated', tier: 'mid', tag: 'Polished · weekend evenings', heroIdx: 3, pieces: [
        { category: 'Top',       name: 'Silk Camisole Ivory',       store: 'Mango',           price: '$59',  q: 'silk camisole ivory women' },
        { category: 'Bottom',    name: 'Tailored Wool Trousers',    store: 'COS',             price: '$135', q: 'tailored wool trousers women' },
        { category: 'Shoes',     name: 'Leather Loafers',           store: 'Mango',           price: '$99',  q: 'leather loafers women' },
        { category: 'Bag',       name: 'Structured Top-Handle',     store: 'Charles & Keith', price: '$89',  q: 'structured top handle bag' },
        { category: 'Accessory', name: 'Silk Twill Scarf',          store: 'ASOS',            price: '$35',  q: 'silk twill scarf' }
      ]},
      { name: 'The Statement', tier: 'lux', tag: 'Investment · special moments', heroIdx: 6, pieces: [
        { category: 'Top',       name: 'Cashmere Crewneck',         store: 'Massimo Dutti', price: '$245', q: 'cashmere crewneck cream women' },
        { category: 'Bottom',    name: 'Pleated Midi Skirt',        store: 'Reformation',   price: '$248', q: 'pleated midi skirt wool' },
        { category: 'Shoes',     name: 'Pointed Slingback Heels',   store: 'A.P.C.',        price: '$395', q: 'pointed slingback heels black' },
        { category: 'Bag',       name: 'Top-Handle Leather Bag',    store: 'Polène',   price: '$495', q: 'top handle leather bag' },
        { category: 'Accessory', name: 'Pearl Drop Earrings',       store: 'Mejuri',        price: '$148', q: 'pearl drop earrings gold' }
      ]}
    ],
    casual: [
      { name: 'The Everyday', tier: 'aff', tag: 'Easy · weekend errands', heroIdx: 0, pieces: [
        { category: 'Top',       name: 'Oversized White Tee',       store: 'H&M',   price: '$15', q: 'oversized white t-shirt women' },
        { category: 'Bottom',    name: 'Straight-Leg Blue Jeans',   store: 'SHEIN', price: '$28', q: 'straight leg blue jeans women' },
        { category: 'Shoes',     name: 'White Canvas Sneakers',     store: 'SHEIN', price: '$25', q: 'white canvas sneakers women' },
        { category: 'Bag',       name: 'Canvas Tote',               store: 'H&M',   price: '$18', q: 'canvas tote bag beige' },
        { category: 'Accessory', name: 'Baseball Cap',              store: 'H&M',   price: '$12', q: 'beige baseball cap' }
      ]},
      { name: 'The Elevated', tier: 'mid', tag: 'Casually polished · brunch', heroIdx: 3, pieces: [
        { category: 'Top',       name: 'Soft Beige Knit Sweater',   store: 'Uniqlo',          price: '$45', q: 'soft knit beige sweater women' },
        { category: 'Bottom',    name: 'Wide-Leg Light Wash Jeans', store: 'Mango',           price: '$69', q: 'wide leg light wash jeans women' },
        { category: 'Shoes',     name: 'White Leather Sneakers',    store: 'Converse',        price: '$85', q: 'white leather sneakers' },
        { category: 'Bag',       name: 'Small Crossbody Leather',   store: 'Charles & Keith', price: '$79', q: 'small crossbody leather bag' },
        { category: 'Accessory', name: 'Silver Hoop Earrings',      store: 'Pandora',         price: '$55', q: 'silver hoop earrings small' }
      ]},
      { name: 'The Statement', tier: 'lux', tag: 'Quiet luxury · weekend', heroIdx: 6, pieces: [
        { category: 'Top',       name: 'Cashmere Crew Sweater',     store: 'COS',    price: '$175', q: 'cashmere crew sweater women' },
        { category: 'Bottom',    name: 'High-Rise Straight Jeans',  store: 'Levis',  price: '$98',  q: 'high rise straight leg jeans women' },
        { category: 'Shoes',     name: 'Premium White Sneakers',    store: 'A.P.C.', price: '$295', q: 'white leather sneakers premium' },
        { category: 'Bag',       name: 'Structured Leather Tote',   store: 'Toteme', price: '$590', q: 'structured leather tote bag' },
        { category: 'Accessory', name: 'Gold Layered Chain',        store: 'Mejuri', price: '$148', q: 'gold layered chain necklace' }
      ]}
    ],
    streetwear: [
      { name: 'The Everyday', tier: 'aff', tag: 'Urban · everyday city', heroIdx: 0, pieces: [
        { category: 'Top',       name: 'Oversized Graphic Hoodie',  store: 'SHEIN', price: '$25', q: 'oversized graphic hoodie unisex' },
        { category: 'Bottom',    name: 'Baggy Cargo Pants',         store: 'SHEIN', price: '$32', q: 'baggy cargo pants women' },
        { category: 'Shoes',     name: 'Chunky Black Sneakers',     store: 'SHEIN', price: '$45', q: 'chunky black sneakers women' },
        { category: 'Bag',       name: 'Nylon Crossbody Sling',     store: 'H&M',   price: '$25', q: 'nylon crossbody sling bag' },
        { category: 'Accessory', name: 'Knit Beanie Black',         store: 'H&M',   price: '$12', q: 'knit beanie black' }
      ]},
      { name: 'The Elevated', tier: 'mid', tag: 'Streetwear sharp · day out', heroIdx: 3, pieces: [
        { category: 'Top',       name: 'Oversized Crewneck Sweatshirt', store: 'Urban Outfitters', price: '$69',  q: 'oversized crewneck sweatshirt' },
        { category: 'Bottom',    name: 'Wide-Leg Cargo Pants',          store: 'ASOS',             price: '$65',  q: 'wide leg cargo pants women' },
        { category: 'Shoes',     name: 'Nike Air Force 1',              store: 'Nike',             price: '$115', q: 'air force 1' },
        { category: 'Bag',       name: 'Nike Belt Bag',                 store: 'Nike',             price: '$45',  q: 'belt bag waist pack' },
        { category: 'Accessory', name: 'Chunky Silver Chain',           store: 'Urban Outfitters', price: '$35',  q: 'chunky silver chain necklace' }
      ]},
      { name: 'The Statement', tier: 'lux', tag: 'Designer · investment', heroIdx: 6, pieces: [
        { category: 'Top',       name: 'Heavyweight Cotton Tee',    store: 'Acne Studios', price: '$240', q: 'heavyweight cotton t-shirt' },
        { category: 'Bottom',    name: 'Wide-Leg Trousers',         store: 'Jacquemus',    price: '$395', q: 'wide leg trousers' },
        { category: 'Shoes',     name: 'Designer Leather Sneakers', store: 'Acne Studios', price: '$395', q: 'leather sneakers' },
        { category: 'Bag',       name: 'Le Bambino Bag',            store: 'Jacquemus',    price: '$795', q: 'le bambino' },
        { category: 'Accessory', name: 'Chunky Sterling Chain',     store: 'Mejuri',       price: '$198', q: 'chunky sterling silver chain necklace' }
      ]}
    ],
    minimalist: [
      { name: 'The Everyday', tier: 'aff', tag: 'Quiet · daily wear', heroIdx: 0, pieces: [
        { category: 'Top',       name: 'Fitted White Tee',          store: 'H&M',     price: '$12', q: 'fitted white t-shirt women' },
        { category: 'Bottom',    name: 'High-Rise Black Trousers',  store: 'SHEIN',   price: '$28', q: 'high rise black tailored trousers women' },
        { category: 'Shoes',     name: 'Black Leather Loafers',     store: 'H&M',     price: '$45', q: 'black leather loafers women' },
        { category: 'Bag',       name: 'Black Shoulder Bag',        store: 'H&M',     price: '$25', q: 'black shoulder bag minimal' },
        { category: 'Accessory', name: 'Thin Gold Hoops',           store: 'Pandora', price: '$45', q: 'thin gold hoop earrings' }
      ]},
      { name: 'The Elevated', tier: 'mid', tag: 'Refined · capsule wardrobe', heroIdx: 3, pieces: [
        { category: 'Top',       name: 'Merino Crew Sweater',       store: 'COS',              price: '$125', q: 'merino wool crew sweater women' },
        { category: 'Bottom',    name: 'Tailored Wide-Leg Trousers',store: 'COS',              price: '$165', q: 'tailored wide leg trousers women' },
        { category: 'Shoes',     name: 'Black Leather Mules',       store: '& Other Stories',  price: '$179', q: 'black leather mules women' },
        { category: 'Bag',       name: 'Structured Black Bag',      store: 'COS',              price: '$175', q: 'structured black leather bag' },
        { category: 'Accessory', name: 'Gold Bar Pendant',          store: 'Mejuri',           price: '$65',  q: 'gold bar pendant necklace' }
      ]},
      { name: 'The Statement', tier: 'lux', tag: 'Architectural · investment', heroIdx: 6, pieces: [
        { category: 'Top',       name: 'Cashmere Turtleneck',       store: 'Toteme',      price: '$580', q: 'cashmere turtleneck black' },
        { category: 'Bottom',    name: 'Wool Pleated Trousers',     store: 'Toteme',      price: '$495', q: 'wool pleated trousers' },
        { category: 'Shoes',     name: 'Pointed Slingback Heels',   store: 'A.P.C.',      price: '$425', q: 'pointed slingback heels black' },
        { category: 'Bag',       name: 'Numero Un Bag',             store: 'Polène', price: '$595', q: 'numero un' },
        { category: 'Accessory', name: 'Gold Signet Ring',          store: 'Mejuri',      price: '$248', q: 'gold signet ring' }
      ]}
    ],
    elegant: [
      { name: 'The Everyday', tier: 'aff', tag: 'Romantic · day to evening', heroIdx: 0, pieces: [
        { category: 'Top',       name: 'Satin Camisole',            store: 'SHEIN', price: '$18', q: 'satin camisole top women' },
        { category: 'Bottom',    name: 'Pleated Midi Skirt',        store: 'H&M',   price: '$35', q: 'pleated midi skirt women' },
        { category: 'Shoes',     name: 'Pointed Block Heels',       store: 'SHEIN', price: '$30', q: 'pointed block heel pumps women' },
        { category: 'Bag',       name: 'Mini Pearl Clutch',         store: 'SHEIN', price: '$25', q: 'pearl beaded clutch bag' },
        { category: 'Accessory', name: 'Pearl Drop Earrings',       store: 'H&M',   price: '$12', q: 'pearl drop earrings' }
      ]},
      { name: 'The Elevated', tier: 'mid', tag: 'Silk · slow evening', heroIdx: 3, pieces: [
        { category: 'Top',       name: 'Silk Slip Blouse',          store: 'Mango',           price: '$89',  q: 'silk slip blouse women' },
        { category: 'Bottom',    name: 'Satin Midi Slip Skirt',     store: '& Other Stories', price: '$129', q: 'satin midi slip skirt' },
        { category: 'Shoes',     name: 'Satin Mules',               store: 'Charles & Keith', price: '$89',  q: 'satin mules women' },
        { category: 'Bag',       name: 'Mini Evening Bag',          store: 'Charles & Keith', price: '$79',  q: 'mini evening bag pearl' },
        { category: 'Accessory', name: 'Crystal Drop Earrings',     store: '& Other Stories', price: '$45',  q: 'crystal drop earrings' }
      ]},
      { name: 'The Statement', tier: 'lux', tag: 'Silk slip · gala', heroIdx: 6, pieces: [
        { category: 'Top',       name: 'Silk Camisole',             store: 'Reformation',     price: '$148', q: 'silk camisole top' },
        { category: 'Bottom',    name: 'Silk Slip Midi Skirt',      store: 'Reformation',     price: '$248', q: 'silk slip midi skirt' },
        { category: 'Shoes',     name: 'Crystal Strap Heels',       store: 'Jacquemus',       price: '$595', q: 'crystal embellished heels' },
        { category: 'Bag',       name: 'Mini Top Handle',           store: 'Polène',     price: '$395', q: 'mini top handle bag' },
        { category: 'Accessory', name: 'Pearl Drop Earrings',       store: 'Tiffany & Co.',   price: '$395', q: 'pearl drop earrings' }
      ]}
    ],
    korean: [
      { name: 'The Everyday', tier: 'aff', tag: 'Soft · café date', heroIdx: 0, pieces: [
        { category: 'Top',       name: 'Cropped Pastel Cardigan',   store: 'YesStyle', price: '$28', q: 'cropped pastel cardigan' },
        { category: 'Bottom',    name: 'Pleated Mini Skirt',        store: 'SHEIN',    price: '$22', q: 'pleated mini skirt school girl' },
        { category: 'Shoes',     name: 'White Sneakers',            store: 'SHEIN',    price: '$35', q: 'white sneakers women korean' },
        { category: 'Bag',       name: 'Mini Pearl Shoulder Bag',   store: 'YesStyle', price: '$32', q: 'mini pearl shoulder bag' },
        { category: 'Accessory', name: 'Pearl Hair Clips Set',      store: 'SHEIN',    price: '$8',  q: 'pearl hair clips set' }
      ]},
      { name: 'The Elevated', tier: 'mid', tag: 'Studied · day to dinner', heroIdx: 3, pieces: [
        { category: 'Top',       name: 'Knit Cardigan Beige',       store: 'Uniqlo',          price: '$59', q: 'knit cardigan beige women' },
        { category: 'Bottom',    name: 'Pleated Mini Skirt',        store: 'Mango',           price: '$45', q: 'pleated mini skirt women' },
        { category: 'Shoes',     name: 'Chunky Mary Janes',         store: 'Charles & Keith', price: '$75', q: 'chunky mary jane shoes' },
        { category: 'Bag',       name: 'Mini Shoulder Bag',         store: 'Charles & Keith', price: '$89', q: 'mini shoulder bag pearl' },
        { category: 'Accessory', name: 'Satin Ribbon Hair Clip',    store: '& Other Stories', price: '$25', q: 'satin ribbon hair clip' }
      ]},
      { name: 'The Statement', tier: 'lux', tag: 'Modern · investment', heroIdx: 6, pieces: [
        { category: 'Top',       name: 'Cashmere Cropped Cardigan', store: '& Other Stories', price: '$165', q: 'cashmere cropped cardigan' },
        { category: 'Bottom',    name: 'Tailored Mini Skirt',       store: 'Aritzia',         price: '$138', q: 'tailored mini skirt' },
        { category: 'Shoes',     name: 'Leather Mary Janes',        store: 'Reformation',     price: '$248', q: 'leather mary jane shoes' },
        { category: 'Bag',       name: 'Mini Top Handle Bag',       store: 'Polène',     price: '$395', q: 'mini top handle bag' },
        { category: 'Accessory', name: 'Pearl Hair Pin Gold',       store: 'Mejuri',          price: '$98',  q: 'pearl hair pin gold' }
      ]}
    ],
    y2k: [
      { name: 'The Everyday', tier: 'aff', tag: 'Playful · everyday', heroIdx: 0, pieces: [
        { category: 'Top',       name: 'Baby Tee Crop',             store: 'SHEIN', price: '$12', q: 'baby tee y2k crop top' },
        { category: 'Bottom',    name: 'Low-Rise Flare Jeans',      store: 'SHEIN', price: '$28', q: 'low rise flare jeans women' },
        { category: 'Shoes',     name: 'Platform Sneakers',         store: 'Cider', price: '$45', q: 'platform sneakers chunky' },
        { category: 'Bag',       name: 'Mini Pink Shoulder Bag',    store: 'SHEIN', price: '$18', q: 'mini shoulder bag y2k pink' },
        { category: 'Accessory', name: 'Butterfly Hair Clips',      store: 'SHEIN', price: '$6',  q: 'butterfly hair clips y2k' }
      ]},
      { name: 'The Elevated', tier: 'mid', tag: 'Party · night out', heroIdx: 3, pieces: [
        { category: 'Top',       name: 'Mesh Long-Sleeve Top',      store: 'Princess Polly',    price: '$45', q: 'mesh long sleeve top' },
        { category: 'Bottom',    name: 'Low-Rise Flare Jeans',      store: 'ASOS',              price: '$65', q: 'low rise flare jeans' },
        { category: 'Shoes',     name: 'Pointy Kitten Heels',       store: 'ASOS',              price: '$65', q: 'pointy kitten heels' },
        { category: 'Bag',       name: 'Mini Baguette Bag',         store: 'ASOS',              price: '$45', q: 'mini baguette bag y2k' },
        { category: 'Accessory', name: 'Tinted Oval Sunglasses',    store: 'Urban Outfitters',  price: '$25', q: 'tinted oval sunglasses y2k' }
      ]},
      { name: 'The Statement', tier: 'lux', tag: 'Designer · main character', heroIdx: 6, pieces: [
        { category: 'Top',       name: 'Logo Crop Top',             store: 'Jacquemus',    price: '$295', q: 'logo crop top' },
        { category: 'Bottom',    name: 'Designer Low-Rise Jeans',   store: 'Acne Studios', price: '$395', q: 'low rise jeans' },
        { category: 'Shoes',     name: 'Pointed Stiletto Heels',    store: 'Jacquemus',    price: '$595', q: 'pointed stiletto heels' },
        { category: 'Bag',       name: 'Designer Mini Baguette',    store: 'Jacquemus',    price: '$495', q: 'mini baguette bag' },
        { category: 'Accessory', name: 'Tinted Designer Sunglasses',store: 'Acne Studios', price: '$295', q: 'tinted oval sunglasses' }
      ]}
    ],
    vintage: [
      { name: 'The Everyday', tier: 'aff', tag: '70s · everyday throwback', heroIdx: 0, pieces: [
        { category: 'Top',       name: 'Prairie Blouse Cream',      store: 'SHEIN', price: '$22', q: 'prairie blouse vintage cream women' },
        { category: 'Bottom',    name: 'High-Waist Flare Jeans',    store: 'SHEIN', price: '$32', q: 'high waist flare jeans 70s' },
        { category: 'Shoes',     name: 'Suede Ankle Boots',         store: 'SHEIN', price: '$45', q: 'suede ankle boots vintage' },
        { category: 'Bag',       name: 'Leather Satchel Tan',       store: 'SHEIN', price: '$35', q: 'leather satchel bag vintage tan' },
        { category: 'Accessory', name: 'Wide Leather Belt',         store: 'H&M',   price: '$18', q: 'wide leather belt vintage' }
      ]},
      { name: 'The Elevated', tier: 'mid', tag: 'Bohemian · weekends', heroIdx: 3, pieces: [
        { category: 'Top',       name: '70s Style Blouse',          store: 'Free People', price: '$98',  q: '70s style blouse women' },
        { category: 'Bottom',    name: 'High-Waist Flare Trousers', store: 'Mango',       price: '$85',  q: 'high waist flare trousers' },
        { category: 'Shoes',     name: 'Tan Suede Knee Boots',      store: 'Mango',       price: '$129', q: 'suede knee high boots tan' },
        { category: 'Bag',       name: 'Vintage Leather Crossbody', store: 'Etsy',        price: '$95',  q: 'vintage leather crossbody bag' },
        { category: 'Accessory', name: 'Large Gold Hoops',          store: 'Mejuri',      price: '$85',  q: 'gold hoop earrings large' }
      ]},
      { name: 'The Statement', tier: 'lux', tag: 'Heritage · investment', heroIdx: 6, pieces: [
        { category: 'Top',       name: 'Silk Romantic Blouse',      store: 'Reformation',  price: '$178', q: 'silk romantic blouse' },
        { category: 'Bottom',    name: 'Wide-Leg Wool Trousers',    store: 'Reformation',  price: '$228', q: 'wide leg wool trousers' },
        { category: 'Shoes',     name: 'Tall Suede Boots Tan',      store: 'Acne Studios', price: '$595', q: 'tall suede boots tan' },
        { category: 'Bag',       name: 'Vintage Leather Shoulder',  store: 'A.P.C.',       price: '$425', q: 'leather shoulder bag' },
        { category: 'Accessory', name: 'Statement Gold Earrings',   store: 'Mejuri',       price: '$248', q: 'gold statement earrings' }
      ]}
    ],
    softgirl: [
      { name: 'The Everyday', tier: 'aff', tag: 'Sweet · everyday', heroIdx: 0, pieces: [
        { category: 'Top',       name: 'Lace-Trim Camisole Pink',   store: 'SHEIN', price: '$14', q: 'lace trim camisole pink' },
        { category: 'Bottom',    name: 'Pleated Mini Skirt Pastel', store: 'SHEIN', price: '$22', q: 'pleated mini skirt pastel pink' },
        { category: 'Shoes',     name: 'Ballet Flats with Ribbon',  store: 'SHEIN', price: '$28', q: 'ballet flats with ribbon ties' },
        { category: 'Bag',       name: 'Quilted Mini Bag Pink',     store: 'SHEIN', price: '$25', q: 'quilted mini shoulder bag pink' },
        { category: 'Accessory', name: 'Pearl Hair Bow',            store: 'SHEIN', price: '$8',  q: 'pearl hair bow clip pastel' }
      ]},
      { name: 'The Elevated', tier: 'mid', tag: 'Romantic · picnic', heroIdx: 3, pieces: [
        { category: 'Top',       name: 'Lace-Trim Cami Top',        store: 'Reformation',     price: '$98', q: 'lace trim cami top' },
        { category: 'Bottom',    name: 'Pleated Midi Skirt Pastel', store: '& Other Stories', price: '$95', q: 'pleated midi skirt pastel' },
        { category: 'Shoes',     name: 'Ribbon Ballet Flats',       store: 'Mango',           price: '$69', q: 'ballet flats with ribbon ties' },
        { category: 'Bag',       name: 'Quilted Pink Shoulder Bag', store: 'Charles & Keith', price: '$89', q: 'pink quilted shoulder bag' },
        { category: 'Accessory', name: 'Pearl Heart Necklace',      store: 'Pandora',         price: '$85', q: 'pearl heart pendant necklace' }
      ]},
      { name: 'The Statement', tier: 'lux', tag: 'Coquette · special', heroIdx: 6, pieces: [
        { category: 'Top',       name: 'Silk Romantic Blouse',      store: 'Reformation',   price: '$178', q: 'silk romantic blouse cream' },
        { category: 'Bottom',    name: 'Tulle Midi Skirt',          store: 'Reformation',   price: '$228', q: 'tulle midi skirt' },
        { category: 'Shoes',     name: 'Crystal Ballet Flats',      store: 'Jacquemus',     price: '$395', q: 'crystal embellished ballet flats' },
        { category: 'Bag',       name: 'Mini Quilted Bag',          store: 'Polène',   price: '$395', q: 'mini quilted shoulder bag' },
        { category: 'Accessory', name: 'Pearl Drop Earrings',       store: 'Tiffany & Co.', price: '$395', q: 'pearl drop earrings' }
      ]}
    ]
  };

  // Two additional outfit combos per aesthetic (brings total to 5)
  const EXTRA_COMBOS = {
    classic: [
      { name: 'The Office Hour', tier: 'mid', tag: 'Polished · 9-to-5 essentials', heroIdx: 2, pieces: [
        { category: 'Top',       name: 'Silk Shell Top',          store: 'Massimo Dutti',   price: '$89',  q: 'silk shell top ivory women' },
        { category: 'Bottom',    name: 'Tailored Midi Skirt',     store: 'COS',             price: '$145', q: 'tailored midi skirt women' },
        { category: 'Shoes',     name: 'Square-Toe Slingbacks',   store: 'Mango',           price: '$79',  q: 'square toe slingback heels' },
        { category: 'Bag',       name: 'Structured Work Tote',    store: 'Charles & Keith', price: '$99',  q: 'structured work tote bag women' },
        { category: 'Accessory', name: 'Gold Drop Earrings',      store: 'Mejuri',          price: '$85',  q: 'gold drop earrings minimal' }
      ]},
      { name: 'The Timeless Evening', tier: 'lux', tag: 'Dinner · investment dressing', heroIdx: 5, pieces: [
        { category: 'Top',       name: 'Pure Silk Camisole',      store: 'Reformation',  price: '$128', q: 'silk camisole ivory women' },
        { category: 'Bottom',    name: 'Wide-Leg Silk Trousers',  store: 'Toteme',       price: '$395', q: 'wide leg silk trousers' },
        { category: 'Shoes',     name: 'Leather Pointed Mules',   store: 'A.P.C.',       price: '$345', q: 'leather pointed mule heels' },
        { category: 'Bag',       name: 'Mini Leather Clutch',     store: 'Polène',       price: '$295', q: 'mini leather clutch' },
        { category: 'Accessory', name: 'Fine Gold Chain',         store: 'Mejuri',       price: '$178', q: 'fine gold chain necklace' }
      ]}
    ],
    casual: [
      { name: 'The Cozy Sunday', tier: 'aff', tag: 'Loungewear done right', heroIdx: 2, pieces: [
        { category: 'Top',       name: 'Oversized Fleece Hoodie', store: 'H&M',       price: '$35', q: 'oversized fleece hoodie women' },
        { category: 'Bottom',    name: 'Relaxed Sweatpants',      store: 'Pull&Bear', price: '$28', q: 'relaxed sweatpants women' },
        { category: 'Shoes',     name: 'Sporty Slides',           store: 'H&M',       price: '$25', q: 'sporty slides women' },
        { category: 'Bag',       name: 'Mini Canvas Tote',        store: 'SHEIN',     price: '$12', q: 'mini canvas tote bag' },
        { category: 'Accessory', name: 'Chunky Knit Beanie',      store: 'H&M',       price: '$14', q: 'chunky knit beanie' }
      ]},
      { name: 'The Effortless Brunch', tier: 'mid', tag: 'Casually polished · weekend', heroIdx: 5, pieces: [
        { category: 'Top',       name: 'Fine Rib Turtleneck',     store: 'Uniqlo',          price: '$45',  q: 'fine rib turtleneck women' },
        { category: 'Bottom',    name: 'Wide-Leg Jeans',          store: 'Aritzia',         price: '$128', q: 'wide leg jeans women' },
        { category: 'Shoes',     name: 'Leather Chelsea Boots',   store: 'Mango',           price: '$119', q: 'leather chelsea boots women' },
        { category: 'Bag',       name: 'Small Leather Tote',      store: 'Charles & Keith', price: '$89',  q: 'small leather tote bag women' },
        { category: 'Accessory', name: 'Gold Layered Chains',     store: 'Mejuri',          price: '$95',  q: 'gold layered chain necklace' }
      ]}
    ],
    streetwear: [
      { name: 'The Sneaker Focus', tier: 'aff', tag: 'Fit built around the shoes', heroIdx: 2, pieces: [
        { category: 'Top',       name: 'Oversized Graphic Tee',   store: 'SHEIN',     price: '$15', q: 'oversized graphic t-shirt streetwear' },
        { category: 'Bottom',    name: 'Baggy Track Pants',       store: 'Pull&Bear', price: '$38', q: 'baggy track pants women' },
        { category: 'Shoes',     name: 'Chunky Bubble Sneakers',  store: 'Cider',     price: '$45', q: 'chunky bubble sole sneakers' },
        { category: 'Bag',       name: 'Nylon Belt Bag',          store: 'H&M',       price: '$25', q: 'nylon belt bag waist pack' },
        { category: 'Accessory', name: 'Layered Silver Chains',   store: 'SHEIN',     price: '$10', q: 'layered silver chain necklace set' }
      ]},
      { name: 'The Night Out Fit', tier: 'mid', tag: 'Urban evening · elevated edge', heroIdx: 5, pieces: [
        { category: 'Top',       name: 'Fitted Ribbed Top',           store: 'Urban Outfitters', price: '$45',  q: 'fitted ribbed long sleeve top' },
        { category: 'Bottom',    name: 'Wide-Leg Cargo Trousers',     store: 'Zara',             price: '$79',  q: 'wide leg cargo trousers women' },
        { category: 'Shoes',     name: 'Platform Cortez Sneakers',    store: 'Nike',             price: '$130', q: 'cortez platform sneakers' },
        { category: 'Bag',       name: 'Mini Crossbody Bag',          store: 'ASOS',             price: '$55',  q: 'mini crossbody bag streetwear' },
        { category: 'Accessory', name: 'Chunky Hoop Earrings',        store: 'Urban Outfitters', price: '$28',  q: 'chunky silver hoop earrings' }
      ]}
    ],
    minimalist: [
      { name: 'The Quiet Work Day', tier: 'mid', tag: 'Office · capsule uniform', heroIdx: 2, pieces: [
        { category: 'Top',       name: 'Merino Turtleneck',        store: 'COS',             price: '$125', q: 'merino turtleneck sweater women' },
        { category: 'Bottom',    name: 'Tailored Wide-Leg Trousers', store: 'COS',           price: '$165', q: 'tailored wide leg trousers women' },
        { category: 'Shoes',     name: 'Leather Slingback Mules',  store: '& Other Stories', price: '$175', q: 'leather slingback mules women' },
        { category: 'Bag',       name: 'Clean Leather Shoulder',   store: 'COS',             price: '$185', q: 'clean leather shoulder bag' },
        { category: 'Accessory', name: 'Thin Gold Ring',           store: 'Mejuri',          price: '$48',  q: 'thin gold ring women' }
      ]},
      { name: 'The Weekend Market', tier: 'aff', tag: 'Off-duty · intentional ease', heroIdx: 5, pieces: [
        { category: 'Top',       name: 'Fitted Linen Tee',         store: 'Uniqlo', price: '$25', q: 'fitted linen t-shirt women' },
        { category: 'Bottom',    name: 'High-Rise Linen Trousers', store: 'H&M',    price: '$35', q: 'high rise linen trousers women' },
        { category: 'Shoes',     name: 'Clean White Sneakers',     store: 'H&M',    price: '$39', q: 'clean white sneakers minimal' },
        { category: 'Bag',       name: 'Structured Canvas Tote',   store: 'Uniqlo', price: '$29', q: 'structured canvas tote bag' },
        { category: 'Accessory', name: 'Thin Gold Studs',          store: 'H&M',    price: '$12', q: 'thin gold stud earrings minimal' }
      ]}
    ],
    elegant: [
      { name: 'The Day Date', tier: 'mid', tag: 'Soft afternoon · gallery or lunch', heroIdx: 2, pieces: [
        { category: 'Top',       name: 'Silk Bow-Neck Blouse',      store: 'Mango',           price: '$79',  q: 'silk bow neck blouse women' },
        { category: 'Bottom',    name: 'Pleated Wide-Leg Trousers', store: '& Other Stories', price: '$129', q: 'pleated wide leg trousers women' },
        { category: 'Shoes',     name: 'Block Heel Sandals',        store: 'Charles & Keith', price: '$89',  q: 'block heel sandals women elegant' },
        { category: 'Bag',       name: 'Mini Flap Bag',             store: 'Charles & Keith', price: '$95',  q: 'mini flap bag women' },
        { category: 'Accessory', name: 'Crystal Stud Earrings',     store: '& Other Stories', price: '$49',  q: 'crystal stud earrings elegant' }
      ]},
      { name: 'The Gallery Opening', tier: 'lux', tag: 'Investment · the finest evening', heroIdx: 5, pieces: [
        { category: 'Top',       name: 'Silk Asymmetric Top',       store: 'Reformation',  price: '$188', q: 'silk asymmetric top women' },
        { category: 'Bottom',    name: 'Tailored Silk Midi Skirt',  store: 'Toteme',       price: '$395', q: 'tailored silk midi skirt women' },
        { category: 'Shoes',     name: 'Pointed Crystal Mules',     store: 'Jacquemus',    price: '$595', q: 'pointed crystal embellished mules' },
        { category: 'Bag',       name: 'Micro Top-Handle',          store: 'Polène',       price: '$395', q: 'micro top handle leather bag' },
        { category: 'Accessory', name: 'Diamond-Cut Gold Hoops',    store: 'Tiffany & Co.', price: '$295', q: 'diamond cut gold hoop earrings' }
      ]}
    ],
    korean: [
      { name: 'The Study Date', tier: 'aff', tag: 'Campus cute · everyday soft', heroIdx: 2, pieces: [
        { category: 'Top',       name: 'Cropped Logo Hoodie',       store: 'YesStyle', price: '$28', q: 'cropped logo hoodie korean fashion' },
        { category: 'Bottom',    name: 'Plaid Mini Skirt',          store: 'SHEIN',    price: '$18', q: 'plaid mini skirt school girl' },
        { category: 'Shoes',     name: 'Platform Canvas Sneakers',  store: 'Cider',    price: '$40', q: 'platform canvas sneakers white' },
        { category: 'Bag',       name: 'Mini Zipper Bag',           store: 'SHEIN',    price: '$14', q: 'mini zipper shoulder bag cute' },
        { category: 'Accessory', name: 'Bow Hair Clip Set',         store: 'YesStyle', price: '$8',  q: 'bow hair clip set korean' }
      ]},
      { name: 'The Night Market', tier: 'mid', tag: 'Evening out · Seoul weekend', heroIdx: 5, pieces: [
        { category: 'Top',       name: 'Cashmere Polo Sweater',     store: 'Uniqlo',          price: '$79', q: 'cashmere polo sweater women' },
        { category: 'Bottom',    name: 'High-Waist Wide Trousers',  store: 'Mango',           price: '$65', q: 'high waist wide trousers women' },
        { category: 'Shoes',     name: 'Chunky Leather Loafers',    store: 'Charles & Keith', price: '$89', q: 'chunky leather loafers women' },
        { category: 'Bag',       name: 'Quilted Leather Mini',      store: 'Mango',           price: '$89', q: 'quilted leather mini bag' },
        { category: 'Accessory', name: 'Dainty Gold Chain',         store: 'Mejuri',          price: '$55', q: 'dainty gold chain necklace' }
      ]}
    ],
    y2k: [
      { name: 'The Festival Look', tier: 'aff', tag: 'Main character · bold and fun', heroIdx: 2, pieces: [
        { category: 'Top',       name: 'Sequin Crop Top',           store: 'SHEIN',      price: '$18', q: 'sequin crop top y2k' },
        { category: 'Bottom',    name: 'Micro Denim Mini Skirt',    store: 'Cider',      price: '$25', q: 'micro mini denim skirt' },
        { category: 'Shoes',     name: 'Platform Jelly Shoes',      store: 'SHEIN',      price: '$28', q: 'platform jelly shoes chunky' },
        { category: 'Bag',       name: 'Rhinestone Mini Bag',       store: 'SHEIN',      price: '$12', q: 'rhinestone mini bag y2k' },
        { category: 'Accessory', name: 'Y2K Tinted Visor',          store: 'AliExpress', price: '$10', q: 'y2k tinted visor cap' }
      ]},
      { name: 'The Going Out Fit', tier: 'mid', tag: 'Night out · party ready', heroIdx: 4, pieces: [
        { category: 'Top',       name: 'Corset-Style Bustier',      store: 'Princess Polly',  price: '$59', q: 'corset style bustier top y2k' },
        { category: 'Bottom',    name: 'Low-Rise Flare Trousers',   store: 'ASOS',            price: '$75', q: 'low rise flare trousers y2k' },
        { category: 'Shoes',     name: 'Strappy Stiletto Heels',    store: 'ASOS',            price: '$79', q: 'strappy stiletto heels y2k' },
        { category: 'Bag',       name: 'Mini Faux-Fur Bag',         store: 'Urban Outfitters', price: '$58', q: 'mini faux fur bag y2k' },
        { category: 'Accessory', name: 'Crystal Choker',            store: 'Urban Outfitters', price: '$28', q: 'crystal choker necklace y2k' }
      ]}
    ],
    vintage: [
      { name: 'The Flea Market Find', tier: 'aff', tag: 'Thrifted · curated vintage', heroIdx: 2, pieces: [
        { category: 'Top',       name: 'Patchwork Cotton Shirt',    store: 'Depop', price: '$35', q: 'patchwork cotton shirt vintage' },
        { category: 'Bottom',    name: 'Corduroy A-Line Skirt',     store: 'SHEIN', price: '$28', q: 'corduroy a-line skirt vintage' },
        { category: 'Shoes',     name: 'Brown Suede Loafers',       store: 'H&M',   price: '$45', q: 'brown suede loafers vintage' },
        { category: 'Bag',       name: 'Woven Bucket Bag',          store: 'Etsy',  price: '$38', q: 'woven bucket bag vintage' },
        { category: 'Accessory', name: 'Round Vintage Sunglasses',  store: 'SHEIN', price: '$8',  q: 'round retro sunglasses vintage' }
      ]},
      { name: 'The 70s Fantasy', tier: 'mid', tag: 'Bohemian · slow city weekend', heroIdx: 5, pieces: [
        { category: 'Top',       name: 'Paisley Print Blouse',         store: 'Free People',     price: '$88',  q: '70s paisley print blouse women' },
        { category: 'Bottom',    name: 'High-Waist Flare Jeans',       store: 'Mango',           price: '$89',  q: 'high waist flare jeans 70s vintage' },
        { category: 'Shoes',     name: 'Tan Suede Platform Boots',     store: 'Mango',           price: '$129', q: 'tan suede platform boots vintage' },
        { category: 'Bag',       name: 'Vintage Leather Satchel',      store: 'Etsy',            price: '$95',  q: 'vintage leather satchel bag' },
        { category: 'Accessory', name: 'Retro Hoop Earrings',          store: 'Urban Outfitters', price: '$32', q: 'retro gold hoop earrings vintage' }
      ]}
    ],
    softgirl: [
      { name: 'The Garden Party', tier: 'mid', tag: 'Romantic · outdoor afternoon', heroIdx: 2, pieces: [
        { category: 'Top',       name: 'Floral Lace-Trim Blouse',   store: '& Other Stories', price: '$79', q: 'floral lace trim blouse women' },
        { category: 'Bottom',    name: 'Tulle Mini Skirt',          store: 'Mango',           price: '$69', q: 'tulle mini skirt pink' },
        { category: 'Shoes',     name: 'Ribbon Ballet Flats',       store: 'Mango',           price: '$75', q: 'ribbon ballet flats women' },
        { category: 'Bag',       name: 'Pearl-Strap Mini Bag',      store: 'Charles & Keith', price: '$89', q: 'pearl strap mini shoulder bag' },
        { category: 'Accessory', name: 'Pearl Drop Earrings',       store: 'Pandora',         price: '$75', q: 'pearl drop earrings women' }
      ]},
      { name: 'The First Date', tier: 'lux', tag: 'Coquette · most romantic look', heroIdx: 5, pieces: [
        { category: 'Top',       name: 'Silk Bow-Back Cami',        store: 'Reformation',  price: '$148', q: 'silk bow back camisole' },
        { category: 'Bottom',    name: 'Floral Midi Dress',         store: 'Reformation',  price: '$248', q: 'floral midi dress romantic' },
        { category: 'Shoes',     name: 'Crystal Ballet Flats',      store: 'Jacquemus',    price: '$495', q: 'crystal embellished ballet flats' },
        { category: 'Bag',       name: 'Mini Quilted Chain Bag',    store: 'Polène',       price: '$395', q: 'mini quilted chain bag' },
        { category: 'Accessory', name: 'Pearl Choker',              store: 'Tiffany & Co.', price: '$325', q: 'pearl choker necklace women' }
      ]}
    ]
  };

  const STYLING_TIPS = {
    classic: [
      { tip: 'Build around three neutrals.', detail: 'Cream, navy, and camel. Every other piece is an accent against this foundation — one that never competes.' },
      { tip: 'Invest in one perfect blazer.', detail: 'A well-fitting blazer in a quality neutral tone elevates every outfit in your wardrobe. Start here before anything else.' },
      { tip: 'Let fabric do the talking.', detail: 'Opt for wool, silk, and cashmere over synthetic blends. The weight and drape of real fabric is visible from across the room.' },
      { tip: 'One accessory at a time.', detail: 'A watch, or earrings, or a scarf — not all three. Restraint is the signature of classic dressing. Edit relentlessly.' }
    ],
    casual: [
      { tip: 'Fit matters more than price.', detail: 'A $20 tee that fits you perfectly beats a $200 one that doesn\'t. Know your preferred silhouette and seek it in every piece.' },
      { tip: 'Anchor with good denim.', detail: 'One well-fitting pair of straight-leg jeans in a clean wash can be dressed up or down for almost any situation.' },
      { tip: 'Let one thing be elevated.', detail: 'Pair casual pieces with one elevated item — quality leather sneakers, a cashmere knit, or a structured bag changes everything.' },
      { tip: 'Build around white.', detail: 'A crisp white tee is the most versatile piece you own. Keep two or three in rotation and replace them regularly.' }
    ],
    streetwear: [
      { tip: 'Commit to one statement piece.', detail: 'A loud sneaker, a bold graphic, or a statement bag. Let everything else support it — not compete with it.' },
      { tip: 'Proportion is the real flex.', detail: 'Oversized top with fitted bottom — or vice versa. The contrast makes streetwear look intentional rather than accidental.' },
      { tip: 'Layer textures, not just colors.', detail: 'Mix jersey with nylon, cotton with leather. Texture creates depth without needing loud prints.' },
      { tip: 'Keep the silhouette consistent.', detail: 'Baggy-baggy works if it\'s all baggy. Fitted-fitted works. The mix between needs purpose — proportion creates the look.' }
    ],
    minimalist: [
      { tip: 'Five colors, maximum.', detail: 'Bone, taupe, oat, charcoal, and one accent. A minimal wardrobe is defined by what you leave out — edit to the essential.' },
      { tip: 'Quality over quantity, always.', detail: 'Three perfect basics outperform twenty almost-right pieces. Invest in fewer things, chosen more carefully.' },
      { tip: 'Texture is your pattern.', detail: 'In a monochrome palette, texture creates visual interest — linen, silk, ribbed knit, and smooth wool do the work color cannot.' },
      { tip: 'Wear one piece of fine jewelry daily.', detail: 'A thin gold chain or simple stud worn every day becomes a personal signature. Consistency becomes style.' }
    ],
    elegant: [
      { tip: 'Fabric first, always.', detail: 'Silk, satin, and chiffon move differently than synthetic blends. The fluid weight of real fabric is immediately visible — and worth the price.' },
      { tip: 'Monochromatic looks feel most elevated.', detail: 'Blush-on-blush or ivory-on-cream creates a visual richness that mixed colors can rarely match.' },
      { tip: 'The kitten heel over the stiletto.', detail: 'A kitten heel implies confidence that doesn\'t need height. It is quietly more elegant than the obvious stiletto.' },
      { tip: 'Keep accessories soft and very few.', detail: 'Pearl drops or a single bracelet. Elegance is gentle and restrained — never loud, never too much.' }
    ],
    korean: [
      { tip: 'Contrast defines the look.', detail: 'Oversized blazer with a mini skirt. Chunky sweater with a delicate collar. Korean style lives in that exact tension between the two.' },
      { tip: 'Skin first, then makeup.', detail: 'The dewy glass-skin look is the foundation of every Korean beauty look. Invest in skincare before cosmetics — it shows.' },
      { tip: 'Layer with visible intention.', detail: 'A fitted tee under an oversized cardigan under a blazer — every layer should be visible and purposeful, not just warm.' },
      { tip: 'Small bags, maximum impact.', detail: 'The tinier the bag, the more intentional it looks. A mini quilted chain bag elevates even the simplest casual outfit.' }
    ],
    y2k: [
      { tip: 'Go low, go bold.', detail: 'Low-rise is the defining silhouette. Pair with a cropped top and show just a hint of midriff — it\'s entirely about the attitude.' },
      { tip: 'More is more.', detail: 'Layered necklaces, butterfly clips, tinted sunglasses simultaneously — Y2K is the one aesthetic where maximalism is the rule.' },
      { tip: 'Rhinestones are an instant upgrade.', detail: 'A rhinestone detail on any basic piece instantly reads as Y2K. A $10 rhinestone belt transforms an entire outfit.' },
      { tip: 'Denim on denim, done with intent.', detail: 'Match washes closely for a polished double-denim moment. The further apart the washes, the bolder the statement.' }
    ],
    vintage: [
      { tip: 'Learn to read labels.', detail: 'Union labels, fabric composition, and country of origin accurately date a garment. This knowledge helps you find the real pieces.' },
      { tip: 'Thrift with a clear strategy.', detail: 'Know what you\'re looking for before you go. Coats, denim, and wool hold up best over time. Synthetics rarely do.' },
      { tip: 'Mix one vintage piece with modern basics.', detail: 'One thrifted blazer or blouse worn with clean modern basics creates a more wearable look than head-to-toe costume dressing.' },
      { tip: 'Tailoring changes everything.', detail: 'A $15 thrifted blazer taken in at the waist can look like a $300 designer piece. A good tailor is a real investment.' }
    ],
    softgirl: [
      { tip: 'Pink is a neutral.', detail: 'Blush, petal, rose, and mauve all layer beautifully together. Build tonal pink outfits the same way you would work with neutrals.' },
      { tip: 'Accessorize with your hair.', detail: 'Bow clips, pearl pins, and ribbon headbands are part of the outfit. Your hair styling is a deliberate choice, not an afterthought.' },
      { tip: 'Shape matters as much as color.', detail: 'Puff sleeves, flared skirts, ruffle hems — the silhouette is as important as the color palette. Feminine shapes define this aesthetic.' },
      { tip: 'Apply blush like you mean it.', detail: 'On cheeks, on the nose bridge, blended lightly onto the lids — the soft girl look is rooted in a generous, flushed glow.' }
    ]
  };

  const BRAND_GUIDE = {
    classic: {
      aff: { stores: 'H&M · Bershka · Pull&Bear · ASOS · SHEIN', note: 'H&M Divided and Bershka carry structured blazers and tailored trousers that rival mid-range options at a fraction of the price.' },
      mid: { stores: 'Zara · Mango · COS · Massimo Dutti · Uniqlo', note: 'Massimo Dutti is the definitive mid-range classic wardrobe. COS for clean tailoring, Uniqlo for the best quality basics.' },
      lux: { stores: 'Toteme · A.P.C. · Jacquemus · Reformation · Acne Studios', note: 'Toteme defines the modern classic wardrobe. A.P.C. for the perfect trench, the right leather bag, and the ideal slim jean.' }
    },
    casual: {
      aff: { stores: 'H&M · Uniqlo · SHEIN · Pull&Bear · Bershka', note: 'Uniqlo offers genuinely well-made basics at low prices — their denim, linen, and knitwear consistently exceed expectations.' },
      mid: { stores: 'Levis · Zara · Mango · Aritzia · Free People', note: 'Levis for the best mid-range denim — it outlasts everything else. Aritzia for elevated casuals that never feel try-hard.' },
      lux: { stores: 'Everlane · COS · A.P.C. · Toteme', note: 'A.P.C. Denim is a genuine investment piece that ages beautifully. Everlane for transparent pricing and consistently clean basics.' }
    },
    streetwear: {
      aff: { stores: 'SHEIN · Cider · H&M · AliExpress · Pull&Bear', note: 'Cider and SHEIN lead for affordable streetwear — oversized hoodies, cargo pants, and chunky sneakers without the premium.' },
      mid: { stores: 'Nike · Adidas · Urban Outfitters · ASOS · Zara', note: 'Nike and Adidas Originals are the backbone of any streetwear wardrobe. Urban Outfitters for the pieces that tie a look together.' },
      lux: { stores: 'Acne Studios · Jacquemus · A.P.C.', note: 'Acne Studios for the heavyweight tee and perfect-fit jeans. Jacquemus for sculptural bags that become the focal point of a look.' }
    },
    minimalist: {
      aff: { stores: 'Uniqlo · H&M · SHEIN', note: 'Uniqlo is the minimalist\'s most useful resource — well-cut basics in neutral tones, consistently good quality, low prices.' },
      mid: { stores: 'COS · Mango · & Other Stories · Aritzia', note: 'COS was designed for minimalist dressing — clean architectural silhouettes, quality fabrics, and a quietly strong identity.' },
      lux: { stores: 'Toteme · A.P.C. · Acne Studios · Jacquemus', note: 'Toteme defines modern minimalism. Beautiful cuts, a neutral color story, and a quiet luxury that improves every season.' }
    },
    elegant: {
      aff: { stores: 'SHEIN · H&M · ASOS · Stradivarius', note: 'ASOS and H&M carry silk-look blouses and satin midi skirts that photograph beautifully and look far more expensive than they are.' },
      mid: { stores: 'Mango · Zara · & Other Stories · Reformation', note: 'Mango does elegant consistently well — silk-adjacent blouses, fluid midi dresses, and well-made kitten heels across every season.' },
      lux: { stores: 'Reformation · Jacquemus · Toteme · Polène', note: 'Reformation for sustainable silk dresses that move beautifully. Polène for the most elegant everyday investment bag available.' }
    },
    korean: {
      aff: { stores: 'YesStyle · SHEIN · Cider · AliExpress', note: 'YesStyle carries the widest range of Korean fashion brands shipping internationally — the single best source for authentic pieces.' },
      mid: { stores: 'Uniqlo · Mango · ASOS · & Other Stories', note: 'Uniqlo\'s Japanese sensibility translates perfectly into Korean dressing — clean knits, soft fabrics, refined silhouettes.' },
      lux: { stores: 'Acne Studios · A.P.C. · Toteme · Jacquemus', note: 'Acne Studios for the oversized blazer that elevates everything. Korean luxury aligns naturally with Scandinavian and French minimalism.' }
    },
    y2k: {
      aff: { stores: 'SHEIN · Cider · AliExpress · Bershka · Princess Polly', note: 'SHEIN and Cider are the strongest affordable sources for Y2K — low-rise jeans, baby tees, platform shoes, rhinestone everything.' },
      mid: { stores: 'ASOS · Urban Outfitters · Zara · Princess Polly', note: 'Urban Outfitters and Princess Polly curate the best mid-range Y2K references — the most accurate 2000s revival pieces available.' },
      lux: { stores: 'Jacquemus · Acne Studios', note: 'Jacquemus and Acne Studios do high-fashion Y2K — sculptural micro bags, precise denim, and statement shoes built to last.' }
    },
    vintage: {
      aff: { stores: 'Depop · Etsy · SHEIN · H&M · ASOS', note: 'Depop is the number-one destination for genuine vintage finds. Etsy sellers often specialize in curated pieces from specific decades.' },
      mid: { stores: 'Beyond Retro · Urban Outfitters · Free People · Etsy', note: 'Beyond Retro is one of the most trusted curated vintage retailers — pre-loved, well-priced, and genuinely selected.' },
      lux: { stores: 'Reformation · A.P.C. · Dr. Martens', note: 'Dr. Martens are the most enduring investment shoe for this aesthetic — built to improve with age and outlast every trend.' }
    },
    softgirl: {
      aff: { stores: 'SHEIN · Cider · Princess Polly · AliExpress · H&M', note: 'SHEIN and Cider carry the complete soft girl range — floral dresses, lace tops, bow accessories, and pastel knits at every price.' },
      mid: { stores: 'Brandy Melville · Mango · ASOS · Urban Outfitters', note: 'Brandy Melville built its brand almost entirely on the soft girl aesthetic — their pieces are the most authentic single-brand reference.' },
      lux: { stores: 'Reformation · Jacquemus · Polène', note: 'Reformation\'s lace-trim dresses and floral midis are the elevated version of this aesthetic. Polène for the bag that completes every look.' }
    }
  };

  const RICH_CATEGORIES = [
    { id: 'clothing',    label: 'Clothing'    },
    { id: 'shoes',       label: 'Shoes'       },
    { id: 'bags',        label: 'Bags'        },
    { id: 'accessories', label: 'Accessories' },
    { id: 'beauty',      label: 'Beauty'      },
    { id: 'jewelry',     label: 'Jewelry'     }
  ];
  const TIER_BADGE = { aff: 'Budget', mid: 'Mid-range', lux: 'Luxury' };

  const RICH = {};
  RICH_CATEGORIES.forEach(c => {
    RICH[c.id] = (typeof getExpandedShop === 'function') ? getExpandedShop(s, c.id) : (s.shop[c.id] || []);
  });
  const ALL_PRODUCTS = [];
  RICH_CATEGORIES.forEach(c => {
    (RICH[c.id] || []).forEach(p => ALL_PRODUCTS.push(Object.assign({}, p, { _cat: c.id, _catLabel: c.label })));
  });

  function buildUrl(store, q) {
    if (typeof expandedShopUrl === 'function') return expandedShopUrl(store, q);
    if (typeof shopUrl === 'function') return shopUrl(store, q);
    return 'https://www.google.com/search?q=' + encodeURIComponent(store + ' ' + q);
  }

  const styleCombos = (CURATED_COMBOS[s.id] || CURATED_COMBOS.classic);
  const COMBOS = styleCombos.map(combo => {
    const heroOutfit = s.outfits[combo.heroIdx] || s.outfits[0];
    return {
      name: combo.name, tier: combo.tier, tag: combo.tag,
      hero: heroOutfit ? heroOutfit.img : s.heroImg,
      pieces: combo.pieces.map(p => ({
        category: p.category, name: p.name, store: p.store, price: p.price,
        url: buildUrl(p.store, p.q)
      }))
    };
  });

  // ===== Build markup =====
  let html = '';

  // 01 Style Overview
  html += '<section class="ssec ssec-overview"><div class="ssec-inner">';
  html += '<span class="ssec-num">01 — Style Overview</span>';
  html += '<div class="ssec-overview-grid">';
  html += '<div class="ssec-overview-img"><img src="' + s.heroImg + '" alt="' + s.name + '"></div>';
  html += '<div class="ssec-overview-text">';
  html += '<h1 class="ssec-overview-title">' + s.name + '</h1>';
  html += '<p class="ssec-overview-desc">' + desc + '</p>';
  html += '</div></div></div></section>';

  // 02 Inspiration — deduplicate so no image appears twice in the grid
  const _seenInspo = new Set();
  const _uniqueOutfits = s.outfits.filter(o => {
    if (_seenInspo.has(o.img)) return false;
    _seenInspo.add(o.img);
    return true;
  });
  html += '<section class="ssec ssec-inspo"><div class="ssec-inner">';
  html += '<span class="ssec-num">02 — Inspiration</span>';
  html += '<div class="ssec-inspo-grid">';
  _uniqueOutfits.forEach((o, i) => {
    const saveId = s.id + '-outfit-' + i;
    html += '<div class="ssec-inspo-cell">';
    html += '<img src="' + o.img + '" alt="" loading="lazy">';
    html += '<button class="inspo-save-btn" data-save-id="' + saveId + '" data-save-img="' + o.img + '" data-save-label="' + (o.name || s.name + ' outfit') + '" data-save-style="' + s.name + '" aria-label="Save to moodboard">';
    html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    html += '</button>';
    html += '</div>';
  });
  html += '</div></div></section>';


  // 03 Full Outfit Breakdown
  html += '<section class="ssec ssec-breakdown"><div class="ssec-inner">';
  html += '<span class="ssec-num">03 — Full Outfit Breakdown</span>';
  html += '<div class="ssec-breakdown-grid">';
  html += '<div class="ssec-breakdown-img"><img src="' + s.completeLook.img + '" alt="Full outfit"></div>';
  html += '<div class="ssec-breakdown-text">';
  html += '<h2>Why this <em>outfit.</em></h2>';
  html += '<div class="ssec-breakdown-item"><h4>Top</h4><p>' + breakdown.top + '</p></div>';
  html += '<div class="ssec-breakdown-item"><h4>Pants / Skirt</h4><p>' + breakdown.bottom + '</p></div>';
  html += '<div class="ssec-breakdown-item"><h4>Shoes</h4><p>' + breakdown.shoes + '</p></div>';
  html += '<div class="ssec-breakdown-item"><h4>Accessories</h4><p>' + breakdown.accessories + '</p></div>';
  html += '</div></div></div></section>';

  // 04 Shop the Aesthetic
  html += '<section class="ssec ssec-shop-rich"><div class="ssec-inner">';
  html += '<span class="ssec-num">04 — Shop the Aesthetic</span>';
  html += '<h2 class="ssec-shop-title">A full wardrobe in <em>' + s.name + '.</em></h2>';
  html += '<p class="ssec-shop-intro">Curated picks across every budget. Every link opens the live store with the exact search.</p>';

  // 4a Complete the Look
  html += '<div class="rich-block">';
  html += '<div class="rich-block-head"><span class="rich-block-eyebrow">Complete the look</span>';
  html += '<h3>Three outfit edits, fully shoppable.</h3></div>';
  html += '<div class="combo-grid">';
  COMBOS.forEach((combo, ci) => {
    html += '<article class="combo-card">';
    html += '<div class="combo-card-img"><img src="' + combo.hero + '" alt="' + combo.name + '" loading="lazy">';
    html += '<span class="combo-card-badge">' + TIER_BADGE[combo.tier] + '</span></div>';
    html += '<div class="combo-card-body">';
    html += '<span class="combo-card-num">Outfit ' + String(ci + 1).padStart(2, '0') + '</span>';
    html += '<h4>' + combo.name + '</h4>';
    html += '<p class="combo-card-tag">' + combo.tag + '</p>';
    html += '<ul class="combo-pieces combo-pieces-typo">';
    combo.pieces.forEach(p => {
      html += '<li><a href="' + p.url + '" target="_blank" rel="noopener noreferrer">';
      html += '<span class="piece-cat">' + p.category + '</span>';
      html += '<span class="piece-name">' + p.name + '</span>';
      html += '<span class="piece-meta"><span>' + p.store + '</span><span>' + p.price + '</span></span>';
      html += '</a></li>';
    });
    html += '</ul></div></article>';
  });
  html += '</div></div>';

  // 4b Styling Tips — moved to end of page (rendered after shop section)

  // 4c Brand Guide — removed

  // 4d Fashion Directory — 12 categories × 3 budget tiers
  const FDIR_CATS = [
    { id: 'tops',        label: 'Tops'        },
    { id: 'pants',       label: 'Pants'       },
    { id: 'skirts',      label: 'Skirts'      },
    { id: 'dresses',     label: 'Dresses'     },
    { id: 'jackets',     label: 'Jackets'     },
    { id: 'shoes',       label: 'Shoes'       },
    { id: 'boots',       label: 'Boots'       },
    { id: 'bags',        label: 'Bags'        },
    { id: 'jewelry',     label: 'Jewelry'     },
    { id: 'accessories', label: 'Accessories' },
    { id: 'makeup',      label: 'Makeup'      },
    { id: 'fragrances',  label: 'Fragrances'  }
  ];

  // item shorthand: [name, store, price, searchQuery]
  const D = (name, store, price, q) => ({ name, store, price, q });

  const FASHION_DIR = {
    classic: {
      tops: {
        aff: [D('White Cotton Button-Down','H&M','$25','white cotton button down shirt women'), D('Fitted Ivory Shell Top','SHEIN','$16','fitted ivory shell top women'), D('Ribbed Crewneck Knit','Bershka','$22','ribbed crewneck knit top women')],
        mid: [D('Silk Camisole Ivory','Mango','$59','silk camisole top women ivory'), D('Merino Crew Sweater','COS','$125','merino wool crew sweater women'), D('Premium Linen Shirt','Uniqlo','$45','premium linen shirt women')],
        lux: [D('Silk Shell Top','Reformation','$128','silk shell top women'), D('Cashmere Crewneck','Toteme','$580','cashmere crewneck sweater women'), D('Fine Silk Blouse','Massimo Dutti','$185','fine silk blouse women')]
      },
      pants: {
        aff: [D('High-Waist Tailored Trousers','H&M','$35','high waist tailored trousers women'), D('Straight-Leg Beige Trousers','SHEIN','$28','straight leg beige trousers women'), D('Wide-Leg Black Trousers','Bershka','$32','wide leg black trousers women')],
        mid: [D('Tailored Wide-Leg Trousers','COS','$165','tailored wide leg trousers women'), D('High-Rise Straight Trousers','Mango','$79','high rise straight trousers women'), D('Wool Blend Trousers','Zara','$89','wool blend tailored trousers women')],
        lux: [D('Wool Pleated Trousers','Toteme','$495','wool pleated trousers women'), D('Straight-Cut Trousers','A.P.C.','$295','straight cut tailored trousers women'), D('Silk Wide-Leg Trousers','Reformation','$198','silk wide leg trousers women')]
      },
      skirts: {
        aff: [D('Pleated Midi Skirt','H&M','$35','pleated midi skirt women'), D('A-Line Pencil Skirt','SHEIN','$22','a-line pencil skirt midi women'), D('Satin Midi Skirt','Pull&Bear','$30','satin midi skirt women')],
        mid: [D('Tailored Midi Skirt','Mango','$79','tailored midi skirt women'), D('Pleated Wool Skirt','COS','$145','pleated wool midi skirt women'), D('Satin Midi Skirt','& Other Stories','$129','satin midi skirt women')],
        lux: [D('Pleated Silk Midi','Toteme','$395','pleated silk midi skirt women'), D('Structured Midi Skirt','Reformation','$248','structured midi skirt women'), D('Wool Pencil Skirt','A.P.C.','$245','wool pencil midi skirt women')]
      },
      dresses: {
        aff: [D('Wrap Shirt Dress','H&M','$39','wrap shirt dress midi women'), D('Midi Wrap Dress','SHEIN','$28','midi wrap dress women'), D('Linen Shirt Dress','ASOS','$45','linen shirt dress midi women')],
        mid: [D('Classic Wrap Dress','Mango','$89','classic wrap dress women midi'), D('Tailored Shirt Dress','Zara','$79','tailored shirt dress midi women'), D('Clean Shift Dress','COS','$165','clean shift dress women')],
        lux: [D('Silk Wrap Dress','Reformation','$248','silk wrap dress women'), D('Minimal Midi Dress','Toteme','$595','minimal midi dress women'), D('Structured Midi Dress','Massimo Dutti','$245','structured midi dress women')]
      },
      jackets: {
        aff: [D('Tailored Blazer','H&M','$65','tailored blazer women'), D('Classic Trench Coat','SHEIN','$55','classic trench coat women'), D('Double-Breasted Blazer','Bershka','$59','double breasted blazer women')],
        mid: [D('Wool Overcoat','Mango','$199','wool overcoat women'), D('Classic Blazer','Zara','$119','classic blazer women tailored'), D('Tailored Coat','COS','$395','tailored long coat women')],
        lux: [D('Classic Trench','Toteme','$895','classic trench coat women'), D('Structured Blazer','A.P.C.','$545','structured blazer women'), D('Cashmere Coat','Massimo Dutti','$595','cashmere wool coat women')]
      },
      shoes: {
        aff: [D('Pointed Ballet Flats','SHEIN','$22','pointed ballet flats women'), D('Block Heel Pumps','H&M','$45','block heel pumps women'), D('Classic Loafers','Bershka','$35','classic loafers women')],
        mid: [D('Leather Loafers','Mango','$99','leather loafers women'), D('Slingback Heels','& Other Stories','$165','slingback heels women'), D('Kitten Heel Mules','COS','$175','kitten heel mules women')],
        lux: [D('Pointed Slingback','A.P.C.','$395','pointed slingback heels women'), D('Classic Leather Loafer','Reformation','$278','leather loafer women classic'), D('Leather Mules','Toteme','$450','leather mules women')]
      },
      boots: {
        aff: [D('Faux-Leather Ankle Boots','H&M','$55','leather look ankle boots women'), D('Pointed Toe Boots','SHEIN','$45','pointed toe ankle boots women'), D('Block Heel Boots','Pull&Bear','$59','block heel ankle boots women')],
        mid: [D('Leather Ankle Boots','Mango','$129','leather ankle boots women'), D('Classic Chelsea Boots','Zara','$119','chelsea boots women leather'), D('Block Heel Knee Boots','ASOS','$115','block heel knee high boots women')],
        lux: [D('Leather Chelsea Boots','A.P.C.','$495','leather chelsea boots women'), D('Knee-High Leather Boots','Toteme','$695','leather knee high boots women'), D('Classic Ankle Boot','Reformation','$328','leather ankle boots women')]
      },
      bags: {
        aff: [D('Structured Faux-Leather Tote','H&M','$35','structured tote bag women'), D('Mini Top Handle','SHEIN','$25','mini top handle bag women'), D('Beige Shoulder Bag','Bershka','$39','beige shoulder bag women')],
        mid: [D('Structured Top Handle','Charles & Keith','$89','structured top handle bag women'), D('Leather Shoulder Bag','Mango','$119','leather shoulder bag women'), D('Mini Shoulder Bag','& Other Stories','$99','mini shoulder bag women')],
        lux: [D('Numéro Un Bag','Polène','$595','numero un bag polene'), D('Half Moon Bag','A.P.C.','$545','half moon leather bag women'), D('Structured Leather Tote','Toteme','$690','structured leather tote bag')]
      },
      jewelry: {
        aff: [D('Pearl Stud Earrings','H&M','$8','pearl stud earrings small'), D('Thin Gold Hoops','SHEIN','$6','thin gold hoop earrings women'), D('Dainty Gold Chain','Pandora','$45','dainty gold chain necklace')],
        mid: [D('Gold Bar Pendant','Mejuri','$65','gold bar pendant necklace'), D('Pearl Drop Earrings','& Other Stories','$45','pearl drop earrings'), D('Thin Gold Ring','Mejuri','$48','thin gold ring women')],
        lux: [D('Pearl Drop Earrings','Mejuri','$148','pearl drop gold earrings'), D('Gold Hoop Earrings','Tiffany & Co.','$295','gold hoop earrings classic'), D('Gold Signet Ring','Mejuri','$248','gold signet ring women')]
      },
      accessories: {
        aff: [D('Silk-Look Scarf','H&M','$15','silk square scarf women'), D('Classic Leather Belt','SHEIN','$12','classic leather belt women'), D('Tortoise Sunglasses','ASOS','$18','tortoise frame sunglasses women')],
        mid: [D('Silk Twill Scarf','& Other Stories','$45','silk twill scarf square'), D('Leather Waist Belt','Mango','$39','leather waist belt women'), D('Classic Sunglasses','Zara','$35','classic sunglasses women cat eye')],
        lux: [D('Cashmere Scarf','Toteme','$295','cashmere scarf women'), D('Fine Leather Belt','A.P.C.','$195','fine leather belt women'), D('Minimal Sunglasses','Acne Studios','$295','minimal sunglasses women')]
      },
      makeup: {
        aff: [D('Flawless Longwear Foundation','Sephora','$18','e.l.f. flawless longwear foundation'), D('Soft Matte Lip Cream','Sephora','$14','NYX Soft Matte Lip Cream'), D('Lash Mascara','Sephora','$12','essence lash princess mascara')],
        mid: [D('Beautiful Skin Foundation','Sephora','$49','Charlotte Tilbury beautiful skin foundation'), D('Velvet Teddy Lip Liner','Sephora','$28','MAC lip liner velvet teddy'), D('Blush & Glow','Sephora','$38','NARS blush orgasm')],
        lux: [D('Matte Revolution Lipstick','Sephora','$45','Charlotte Tilbury matte revolution lipstick'), D('Luminous Silk Foundation','Sephora','$68','Armani luminous silk foundation'), D('Radiant Concealer','Sephora','$55','NARS radiant creamy concealer')]
      },
      fragrances: {
        aff: [D('Clean Rose Perfume','Sephora','$32','clean reserve rose perfume women'), D('White Tea EDT','Sephora','$28','elizabeth arden white tea eau de toilette'), D('Classic Floral Mist','Sephora','$24','vera wang princess perfume')],
        mid: [D('You Perfume','Glossier','$72','You perfume Glossier'), D('La Vie Est Belle','Sephora','$98','lancome la vie est belle eau de parfum'), D('Bloom EDP','Sephora','$89','gucci bloom eau de parfum')],
        lux: [D('Chanel N°5 EDP','Sephora','$185','chanel no 5 eau de parfum'), D('Miss Dior EDP','Sephora','$165','miss dior blooming bouquet perfume'), D('Libre EDP','Sephora','$148','ysl libre eau de parfum')]
      }
    },

    casual: {
      tops: {
        aff: [D('Oversized White Tee','H&M','$15','oversized white t-shirt women'), D('Soft Ribbed Tank','SHEIN','$12','soft ribbed tank top women'), D('Graphic Pocket Tee','Pull&Bear','$18','graphic pocket t-shirt women')],
        mid: [D('Soft Knit Beige Sweater','Uniqlo','$45','soft knit beige sweater women'), D('Fine Rib Turtleneck','Uniqlo','$39','fine rib turtleneck women'), D('Relaxed Linen Shirt','Mango','$55','relaxed linen shirt women')],
        lux: [D('Cashmere Crew Sweater','COS','$175','cashmere crew sweater women'), D('Supima Pocket Tee','Everlane','$48','supima pocket tee women'), D('Linen Relaxed Shirt','Reformation','$128','linen relaxed shirt women')]
      },
      pants: {
        aff: [D('Straight-Leg Blue Jeans','SHEIN','$28','straight leg blue jeans women'), D('Relaxed Sweatpants','Pull&Bear','$28','relaxed sweatpants women'), D('High-Waist Barrel Jeans','Bershka','$35','high waist barrel jeans women')],
        mid: [D('Wide-Leg Light Wash Jeans','Mango','$69','wide leg light wash jeans women'), D('Classic Straight Jeans','Levis','$89','classic straight jeans women'), D('Wide-Leg Jeans','Aritzia','$128','wide leg jeans women')],
        lux: [D('High-Rise Straight Jeans','Levis','$98','high rise straight leg jeans women premium'), D('Barrel-Leg Jeans','Reformation','$148','barrel leg jeans women'), D('Perfect Jean','Everlane','$128','perfect straight jeans women')]
      },
      skirts: {
        aff: [D('Denim Mini Skirt','SHEIN','$22','denim mini skirt women'), D('Jersey Midi Skirt','H&M','$28','jersey midi skirt women'), D('Cargo Mini Skirt','Bershka','$32','cargo mini skirt women')],
        mid: [D('Linen Midi Skirt','Zara','$69','linen midi skirt women'), D('Denim Midi Skirt','Mango','$65','denim midi skirt women'), D('Wrap Skirt','ASOS','$45','wrap midi skirt women casual')],
        lux: [D('Linen Wrap Midi Skirt','Reformation','$148','linen wrap midi skirt women'), D('Denim Midi Skirt','Levis','$89','denim midi skirt women'), D('Cotton Maxi Skirt','Everlane','$98','cotton maxi skirt women')]
      },
      dresses: {
        aff: [D('Slip Mini Dress','SHEIN','$22','slip mini dress women casual'), D('Floral Midi Dress','H&M','$35','floral midi dress women casual'), D('Smocked Sundress','Pull&Bear','$32','smocked sundress women')],
        mid: [D('Linen Midi Dress','Mango','$79','linen midi dress women'), D('Day Dress','Zara','$69','casual day dress women midi'), D('Denim Shirt Dress','ASOS','$65','denim shirt dress midi women')],
        lux: [D('Linen Shirt Dress','Reformation','$178','linen shirt dress women'), D('Easy Slip Dress','Everlane','$128','easy slip dress women'), D('Sun Dress','COS','$165','minimal sun dress women')]
      },
      jackets: {
        aff: [D('Oversized Fleece Hoodie','H&M','$35','oversized fleece hoodie women'), D('Classic Denim Jacket','SHEIN','$35','classic denim jacket women'), D('Bomber Jacket','Pull&Bear','$45','bomber jacket women casual')],
        mid: [D('Light Wash Denim Jacket','Levis','$119','light wash denim jacket women'), D('Casual Blazer','Zara','$89','casual unstructured blazer women'), D('Track Jacket','Adidas','$75','adidas track jacket women')],
        lux: [D('Premium Denim Jacket','Levis','$168','premium denim trucker jacket women'), D('Relaxed Blazer','A.P.C.','$395','relaxed blazer women casual'), D('Coach Jacket','Reformation','$178','coach jacket women')]
      },
      shoes: {
        aff: [D('White Canvas Sneakers','SHEIN','$25','white canvas sneakers women'), D('Classic Low-Top','H&M','$35','classic low top sneakers women'), D('Slip-On Sneakers','ASOS','$28','slip on sneakers women white')],
        mid: [D('Classic Chuck Taylors','Converse','$65','chuck taylor all star women'), D('White Leather Sneakers','Veja','$150','veja sneakers white women'), D('Clean Leather Trainers','Mango','$89','clean leather trainers women white')],
        lux: [D('Campo Sneakers','Veja','$150','veja campo white sneakers women'), D('Leather Sneakers','A.P.C.','$295','white leather sneakers women premium'), D('Classic Runner','Adidas','$120','adidas stan smith white women')]
      },
      boots: {
        aff: [D('Ankle Combat Boots','H&M','$55','ankle combat boots women'), D('Chelsea Boots','SHEIN','$42','chelsea boots women'), D('Side-Zip Boots','Bershka','$48','side zip ankle boots women')],
        mid: [D('Leather Chelsea Boots','Mango','$119','leather chelsea boots women'), D('Combat Boots','Dr. Martens','$179','dr martens 1460 boots women'), D('Lug-Sole Ankle Boots','ASOS','$95','lug sole ankle boots women')],
        lux: [D('1460 Smooth Boots','Dr. Martens','$179','dr martens 1460 smooth boots women'), D('Leather Combat Boots','A.P.C.','$495','leather combat boots women'), D('Chelsea Boots','Reformation','$298','leather chelsea boots women')]
      },
      bags: {
        aff: [D('Canvas Tote Bag','H&M','$18','canvas tote bag beige women'), D('Mini Canvas Tote','SHEIN','$12','mini canvas tote bag'), D('Nylon Crossbody','Pull&Bear','$25','nylon crossbody bag women')],
        mid: [D('Small Leather Crossbody','Charles & Keith','$79','small leather crossbody bag women'), D('Bucket Bag','Mango','$89','bucket bag women leather'), D('Belt Bag','Zara','$45','belt bag waist pack women')],
        lux: [D('Leather Tote','Everlane','$198','leather tote bag women'), D('Small Shoulder Bag','A.P.C.','$395','small shoulder bag women leather'), D('Day Bag','Toteme','$590','leather day bag women')]
      },
      jewelry: {
        aff: [D('Silver Hoop Earrings','H&M','$8','silver hoop earrings small women'), D('Layered Chains Set','SHEIN','$10','layered chain necklace set women'), D('Simple Stud Set','ASOS','$12','simple stud earrings set women')],
        mid: [D('Silver Hoop Earrings','Pandora','$55','silver hoop earrings pandora'), D('Gold Layered Chain','Mejuri','$95','gold layered chain necklace women'), D('Bold Hoops','& Other Stories','$35','bold hoop earrings women')],
        lux: [D('Gold Chain Necklace','Mejuri','$148','gold chain necklace women'), D('Large Hoop Earrings','Mejuri','$128','large hoop earrings gold women'), D('Bezel Ring','Mejuri','$88','bezel set ring gold women')]
      },
      accessories: {
        aff: [D('Baseball Cap Beige','H&M','$12','beige baseball cap women'), D('Chunky Knit Beanie','SHEIN','$8','chunky knit beanie women'), D('Canvas Belt Bag','H&M','$18','canvas belt bag women')],
        mid: [D('Wool Baseball Cap','Mango','$35','wool baseball cap women'), D('Satin Headband','& Other Stories','$25','satin headband women'), D('Woven Straw Hat','Zara','$39','woven straw hat women summer')],
        lux: [D('Cashmere Beanie','COS','$75','cashmere beanie women'), D('Leather Belt','Everlane','$75','leather belt women'), D('Sunglasses','Le Specs','$89','le specs sunglasses women')]
      },
      makeup: {
        aff: [D('Tinted Moisturizer SPF','Sephora','$16','CeraVe tinted moisturizer SPF'), D('Brow Pencil','Sephora','$10','essence brow pencil makeup'), D('Mascara','Sephora','$12','L\'Oreal voluminous mascara')],
        mid: [D('Skin Tint Foundation','Sephora','$42','ILIA skin tint serum foundation'), D('Cream Blush Stick','Sephora','$36','Rare Beauty soft pinch liquid blush'), D('Brow Gel','Sephora','$32','Benefit gimme brow volumizing gel')],
        lux: [D('Skin Foundation','Sephora','$62','Armani luminous silk foundation'), D('Lip & Cheek Stick','Sephora','$45','NARS the multiple stick'), D('Lip Oil Gloss','Sephora','$38','Dior addict lip oil')]
      },
      fragrances: {
        aff: [D('Body Mist','Sephora','$18','bath and body works warm vanilla sugar'), D('Vanilla Roll-On','Sephora','$22','pacifica vanilla coconut perfume roll on'), D('Fresh Linen Spray','Sephora','$26','clean beauty collective fresh laundry')],
        mid: [D('You Perfume','Glossier','$72','You perfume Glossier'), D('Musky Floral EDP','Sephora','$89','maison margiela replica flower market'), D('Clean Citrus EDP','Sephora','$85','jo malone lime basil mandarin')],
        lux: [D('Replica Beach Walk','Sephora','$185','maison margiela replica beach walk perfume'), D('Chloe EDP','Sephora','$148','chloe eau de parfum women'), D('Free People Peach','Sephora','$138','phlur missing person perfume')]
      }
    },

    streetwear: {
      tops: {
        aff: [D('Oversized Graphic Hoodie','SHEIN','$25','oversized graphic hoodie unisex streetwear'), D('Boxy Graphic Tee','H&M','$18','boxy graphic t-shirt streetwear'), D('Zip-Up Jacket','Pull&Bear','$38','zip up track jacket women streetwear')],
        mid: [D('Oversized Crewneck Sweatshirt','Urban Outfitters','$69','oversized crewneck sweatshirt women'), D('Heavyweight Graphic Tee','Urban Outfitters','$45','heavyweight graphic t-shirt women'), D('Ribbed Long-Sleeve','ASOS','$35','ribbed long sleeve top women streetwear')],
        lux: [D('Heavyweight Cotton Tee','Acne Studios','$240','heavyweight cotton t-shirt women'), D('Cropped Sweatshirt','Jacquemus','$295','cropped sweatshirt women'), D('Logo Hoodie','Acne Studios','$395','logo hoodie women')]
      },
      pants: {
        aff: [D('Baggy Cargo Pants','SHEIN','$32','baggy cargo pants women streetwear'), D('Wide-Leg Joggers','Pull&Bear','$35','wide leg joggers women'), D('Relaxed Track Pants','H&M','$28','relaxed track pants women')],
        mid: [D('Wide-Leg Cargo Pants','ASOS','$65','wide leg cargo pants women'), D('Wide-Leg Cargo Trousers','Zara','$79','wide leg cargo trousers women'), D('Baggy Jeans','Urban Outfitters','$89','baggy jeans women streetwear')],
        lux: [D('Wide-Leg Trousers','Jacquemus','$395','wide leg trousers women'), D('Track Pants','Acne Studios','$345','track pants women'), D('Cargo Trousers','A.P.C.','$325','cargo trousers women')]
      },
      skirts: {
        aff: [D('Denim Mini Skirt','Cider','$22','denim mini skirt streetwear'), D('Cargo Mini Skirt','SHEIN','$25','cargo mini skirt women'), D('Skate Skirt','H&M','$28','skate skirt women short')],
        mid: [D('Denim Mini Skirt','Urban Outfitters','$55','denim mini skirt women urban'), D('Cargo Skirt','Zara','$65','cargo skirt women mini streetwear'), D('Pleated Skort','ASOS','$49','pleated skort women')],
        lux: [D('Denim Mini Skirt','Acne Studios','$295','denim mini skirt women'), D('Wrap Mini Skirt','Jacquemus','$345','wrap mini skirt women'), D('Slit Midi Skirt','A.P.C.','$245','slit midi skirt women')]
      },
      dresses: {
        aff: [D('Slip Dress','Cider','$25','slip dress streetwear women'), D('Jersey Dress','SHEIN','$22','jersey mini dress women'), D('Tank Mini Dress','H&M','$28','tank mini dress women')],
        mid: [D('Jersey Maxi Dress','Urban Outfitters','$75','jersey maxi dress women'), D('Mini T-Shirt Dress','ASOS','$45','mini t-shirt dress women'), D('Slip Dress','& Other Stories','$95','slip dress women streetwear')],
        lux: [D('Jersey Dress','Acne Studios','$395','jersey dress women'), D('Mini Dress','Jacquemus','$495','mini dress women'), D('Slip Dress','Reformation','$198','silk slip dress women')]
      },
      jackets: {
        aff: [D('Oversized Puffer Jacket','SHEIN','$45','oversized puffer jacket women'), D('Windbreaker Jacket','H&M','$55','windbreaker jacket women streetwear'), D('Bomber Jacket','Cider','$38','bomber jacket women streetwear')],
        mid: [D('Puffer Jacket','Nike','$125','puffer jacket women nike'), D('Coach Jacket','Urban Outfitters','$89','coach jacket women streetwear'), D('Utility Jacket','ASOS','$75','utility jacket women cargo')],
        lux: [D('Leather Jacket','Acne Studios','$1095','leather jacket women'), D('Cropped Bomber','Jacquemus','$595','cropped bomber jacket women'), D('Denim Jacket','A.P.C.','$395','denim jacket women premium')]
      },
      shoes: {
        aff: [D('Chunky Black Sneakers','SHEIN','$45','chunky black sneakers women streetwear'), D('Platform Trainers','Cider','$42','platform trainers women chunky'), D('Canvas Hi-Top','H&M','$35','canvas hi top sneakers women')],
        mid: [D('Air Force 1','Nike','$115','nike air force 1 women white'), D('Stan Smith','Adidas','$100','adidas stan smith women white'), D('Chunky Sneakers','Urban Outfitters','$89','chunky platform sneakers women')],
        lux: [D('Leather Sneakers','Acne Studios','$395','leather sneakers women low top'), D('Designer Trainers','Jacquemus','$495','trainers sneakers women designer'), D('High-Top Leather','A.P.C.','$345','high top leather sneakers women')]
      },
      boots: {
        aff: [D('Combat Boots','SHEIN','$48','combat lace up boots women'), D('Chunky Platform Boots','Cider','$52','chunky platform boots women'), D('Lug-Sole Boots','H&M','$58','lug sole ankle boots women')],
        mid: [D('1460 Combat Boots','Dr. Martens','$179','dr martens 1460 boots women black'), D('Platform Chelsea','ASOS','$95','platform chelsea boots women'), D('Lug Chelsea Boots','Urban Outfitters','$129','lug sole chelsea boots women')],
        lux: [D('Leather Combat Boots','Acne Studios','$695','leather combat boots women'), D('Platform Boots','Jacquemus','$595','platform boots women designer'), D('Tall Boots','A.P.C.','$595','tall leather boots women')]
      },
      bags: {
        aff: [D('Nylon Crossbody Sling','H&M','$25','nylon crossbody sling bag'), D('Belt Bag','SHEIN','$18','belt bag waist pack streetwear'), D('Mini Backpack','Cider','$28','mini backpack women streetwear')],
        mid: [D('Nike Belt Bag','Nike','$45','nike belt bag waist pack'), D('Nylon Tote','Urban Outfitters','$55','nylon tote bag women'), D('Mini Crossbody','ASOS','$45','mini crossbody bag streetwear')],
        lux: [D('Le Bambino Bag','Jacquemus','$795','le bambino bag jacquemus'), D('Leather Shoulder Bag','Acne Studios','$595','leather shoulder bag women'), D('Tote Bag','A.P.C.','$345','tote bag women leather')]
      },
      jewelry: {
        aff: [D('Chunky Silver Chain','SHEIN','$10','chunky silver chain necklace women'), D('Hoop Earring Set','H&M','$12','hoop earring set women silver'), D('Silver Ring Set','Cider','$8','silver ring set women chunky')],
        mid: [D('Chunky Chain Necklace','Urban Outfitters','$35','chunky chain necklace women silver'), D('XL Hoop Earrings','& Other Stories','$39','xl hoop earrings women silver'), D('Statement Ring','Urban Outfitters','$28','statement chunky ring women')],
        lux: [D('Chunky Sterling Chain','Mejuri','$198','chunky sterling silver chain necklace women'), D('Bold Hoop Earrings','Mejuri','$148','bold hoop earrings women gold'), D('Diamond Stud Set','Mejuri','$248','diamond stud earrings women')]
      },
      accessories: {
        aff: [D('Knit Beanie Black','H&M','$12','knit beanie black women'), D('Bucket Hat','SHEIN','$12','bucket hat women streetwear'), D('Tinted Sunglasses','Cider','$10','tinted sunglasses women streetwear')],
        mid: [D('Wool Bucket Hat','Urban Outfitters','$35','wool bucket hat women'), D('Tinted Oval Sunglasses','Urban Outfitters','$25','tinted oval sunglasses women'), D('Crossbody Wallet','ASOS','$32','crossbody wallet women')],
        lux: [D('Beanie','Acne Studios','$195','beanie knit hat women'), D('Sunglasses','Acne Studios','$295','sunglasses women designer'), D('Leather Gloves','A.P.C.','$195','leather gloves women')]
      },
      makeup: {
        aff: [D('Matte Foundation','Sephora','$16','NYX born to glow foundation'), D('Black Liquid Liner','Sephora','$10','essence eyeliner pen black'), D('Matte Lip Cream','Sephora','$14','NYX soft matte lip cream')],
        mid: [D('Skin Tint','Sephora','$52','Fenty Beauty skin tint'), D('Flypencil Liner','Sephora','$24','Urban Decay flypencil liner'), D('Cream Lipstick','Sephora','$38','NARS powermatte lipstick')],
        lux: [D('Pro Filt Foundation','Sephora','$40','Fenty Beauty pro filt foundation'), D('24/7 Eyeliner','Sephora','$24','Urban Decay 24/7 pencil liner'), D('Black Mascara','Sephora','$27','Lancome hypnose mascara')]
      },
      fragrances: {
        aff: [D('Street Vibes Spray','Sephora','$22','zara urban vibes perfume men women'), D('Urban Musk','Sephora','$28','good girl gone bad perfume'), D('Fresh Body Mist','Sephora','$18','axe apollo body spray women')],
        mid: [D('Replica Jazz Club','Sephora','$185','maison margiela replica jazz club'), D('Santal 33','Sephora','$185','le labo santal 33 perfume'), D('Ambiance Perfume','Sephora','$89','byredo blanche eau de parfum')],
        lux: [D('Byredo Gypsy Water','Sephora','$225','byredo gypsy water eau de parfum'), D('BDK Rouge Smoking','Sephora','$265','bdk rouge smoking perfume'), D('Maison 540','Sephora','$195','maison margiela 540 ambrette')]
      }
    },

    minimalist: {
      tops: {
        aff: [D('Fitted White Tee','H&M','$12','fitted white t-shirt women'), D('High-Neck Ribbed Top','SHEIN','$14','high neck ribbed top women'), D('Linen Button-Down','Uniqlo','$35','linen button down shirt women')],
        mid: [D('Merino Crew Sweater','COS','$125','merino wool crew sweater women'), D('Supima Cotton Tee','Everlane','$35','supima cotton tee women'), D('Fine Wool Turtleneck','Uniqlo','$59','fine wool turtleneck women')],
        lux: [D('Cashmere Turtleneck','Toteme','$580','cashmere turtleneck black women'), D('Silk Slip Top','& Other Stories','$145','silk slip top women'), D('Merino Polo','A.P.C.','$195','merino wool polo sweater women')]
      },
      pants: {
        aff: [D('High-Rise Black Trousers','SHEIN','$28','high rise black tailored trousers women'), D('Linen Wide-Leg','H&M','$35','linen wide leg trousers women'), D('Straight White Trousers','Bershka','$30','straight white trousers women')],
        mid: [D('Tailored Wide-Leg Trousers','COS','$165','tailored wide leg trousers women'), D('Linen Trousers','Everlane','$98','linen trousers women'), D('High-Rise Trousers','& Other Stories','$129','high rise tailored trousers women')],
        lux: [D('Wool Pleated Trousers','Toteme','$495','wool pleated trousers women'), D('Fluid Trousers','Acne Studios','$395','fluid trousers women'), D('Tailored Trousers','A.P.C.','$295','tailored straight trousers women')]
      },
      skirts: {
        aff: [D('Straight Midi Skirt','H&M','$30','straight midi skirt women'), D('A-Line Midi Skirt','SHEIN','$22','a-line midi skirt women minimal'), D('High-Slit Midi','Bershka','$28','high slit midi skirt women')],
        mid: [D('Tailored Midi Skirt','COS','$145','tailored midi skirt women'), D('Linen Midi Skirt','Everlane','$88','linen midi skirt women'), D('Straight Skirt','& Other Stories','$99','straight midi skirt women')],
        lux: [D('Pleated Silk Midi','Toteme','$395','pleated silk midi skirt women'), D('Slit Skirt','Acne Studios','$345','slit midi skirt women'), D('Pencil Skirt','A.P.C.','$245','pencil midi skirt women')]
      },
      dresses: {
        aff: [D('Slip Midi Dress','H&M','$35','slip midi dress women'), D('Fitted Sheath Dress','SHEIN','$28','fitted sheath dress women'), D('Linen Shift Dress','Bershka','$32','linen shift dress women')],
        mid: [D('Clean Shift Dress','COS','$165','clean shift dress women'), D('Linen Column Dress','Everlane','$128','linen column dress women'), D('Midi Dress','& Other Stories','$129','minimal midi dress women')],
        lux: [D('Minimal Midi Dress','Toteme','$595','minimal midi dress women'), D('Clean Column Dress','Acne Studios','$595','column dress women'), D('Cotton Dress','A.P.C.','$295','cotton minimal dress women')]
      },
      jackets: {
        aff: [D('Tailored Blazer','H&M','$65','tailored blazer women minimal'), D('Simple Trench','SHEIN','$45','simple trench coat women'), D('Clean Overcoat','Bershka','$55','clean overcoat women')],
        mid: [D('Clean-Cut Blazer','COS','$275','clean cut blazer women'), D('Classic Trench Coat','Everlane','$228','classic trench coat women'), D('Long Coat','& Other Stories','$245','long coat women minimal')],
        lux: [D('Minimal Trench','Toteme','$895','minimal trench coat women'), D('Structured Coat','Acne Studios','$895','structured coat women'), D('Long Coat','A.P.C.','$595','long coat women tailored')]
      },
      shoes: {
        aff: [D('Black Leather Loafers','H&M','$45','black leather loafers women'), D('White Sneakers','Uniqlo','$39','white sneakers women clean'), D('Pointed Ballet Flats','SHEIN','$22','pointed ballet flats black women')],
        mid: [D('Black Leather Mules','& Other Stories','$179','black leather mules women'), D('Loafers','COS','$175','leather loafers women'), D('Kitten Heel Slingback','Mango','$99','kitten heel slingback women')],
        lux: [D('Leather Mules','Toteme','$450','leather mules women'), D('Pointed Shoes','Acne Studios','$495','pointed leather shoes women'), D('Loafers','A.P.C.','$395','leather loafers women premium')]
      },
      boots: {
        aff: [D('Ankle Boots','H&M','$55','ankle boots women minimal'), D('Clean Chelsea','SHEIN','$42','clean chelsea boots women'), D('Square-Toe Boots','Bershka','$52','square toe ankle boots women')],
        mid: [D('Ankle Boots','COS','$245','leather ankle boots women'), D('Chelsea Boots','Everlane','$198','chelsea boots women leather'), D('Square-Toe Boots','& Other Stories','$195','square toe boots women')],
        lux: [D('Leather Ankle Boots','Toteme','$495','leather ankle boots women'), D('Leather Boots','Acne Studios','$695','leather boots women minimal'), D('Chelsea Boots','A.P.C.','$495','chelsea boots women leather premium')]
      },
      bags: {
        aff: [D('Black Shoulder Bag','H&M','$25','black shoulder bag minimal women'), D('Minimal Tote','SHEIN','$20','minimal tote bag women'), D('Clean Crossbody','Bershka','$28','clean crossbody bag women')],
        mid: [D('Structured Black Bag','COS','$175','structured black leather bag women'), D('Day Market Tote','Everlane','$148','day market tote bag women'), D('Minimal Shoulder Bag','& Other Stories','$129','minimal shoulder bag women')],
        lux: [D('Numéro Un Bag','Polène','$595','numero un bag polene'), D('Minimal Bag','Toteme','$595','minimal leather bag women'), D('Leather Tote','A.P.C.','$395','leather tote bag women')]
      },
      jewelry: {
        aff: [D('Thin Gold Hoops','H&M','$8','thin gold hoop earrings women'), D('Simple Ring Set','SHEIN','$6','simple ring set gold women'), D('Dainty Chain','Pandora','$45','dainty chain necklace women gold')],
        mid: [D('Gold Bar Pendant','Mejuri','$65','gold bar pendant necklace women'), D('Thin Gold Hoops','Mejuri','$95','thin gold hoop earrings women'), D('Stacking Ring Set','Mejuri','$88','stacking ring set gold women')],
        lux: [D('Gold Signet Ring','Mejuri','$248','gold signet ring women'), D('Diamond Studs','Mejuri','$395','diamond stud earrings women gold'), D('Gold Chain','Tiffany & Co.','$325','gold chain necklace women')]
      },
      accessories: {
        aff: [D('Minimal Sunglasses','ASOS','$18','minimal sunglasses women'), D('Linen Tote','Uniqlo','$25','linen tote bag women'), D('Simple Belt','H&M','$12','simple belt women minimal')],
        mid: [D('Clean Sunglasses','COS','$95','clean sunglasses women minimal'), D('Linen Scarf','Everlane','$55','linen scarf women'), D('Minimal Belt','& Other Stories','$45','minimal leather belt women')],
        lux: [D('Cashmere Scarf','Toteme','$295','cashmere scarf women'), D('Sunglasses','Acne Studios','$295','minimal sunglasses women designer'), D('Leather Belt','A.P.C.','$195','leather belt women minimal')]
      },
      makeup: {
        aff: [D('Tinted Moisturizer SPF','Sephora','$18','Neutrogena tinted moisturizer SPF women'), D('Clear Brow Gel','Sephora','$10','NYX brow glue stick women'), D('Lip Balm Tint','Sephora','$12','Burt\'s Bees tinted lip balm')],
        mid: [D('Skin Tint Serum','Sephora','$42','ILIA skin tint serum foundation'), D('Pinch Blush','Sephora','$36','Rare Beauty soft pinch liquid blush'), D('Brow Pomade','Sephora','$28','Anastasia Beverly Hills brow pomade')],
        lux: [D('Serum Foundation','Sephora','$68','Armani luminous silk foundation'), D('Cream Blush','Sephora','$48','Chanel baume essentiel blush'), D('Lip Treatment','Sephora','$38','Dior addict lip glow oil')]
      },
      fragrances: {
        aff: [D('Clean Cotton EDT','Sephora','$28','clean beauty collective clean cotton perfume'), D('Warm Cashmere Mist','Sephora','$22','bath and body works cashmere glow'), D('White Tea EDT','Sephora','$28','elizabeth arden white tea perfume')],
        mid: [D('You Perfume','Glossier','$72','You perfume Glossier'), D('Musk Therapy','Sephora','$89','Commodity Goods perfume'), D('Clean Vetiver','Sephora','$145','le labo vetiver 46 perfume')],
        lux: [D('Chanel Chance','Sephora','$185','chanel chance eau tendre perfume'), D('Maison Replica Flower','Sephora','$230','maison margiela replica flower market'), D('Clean Perfume','Sephora','$265','Byredo Blanche eau de parfum')]
      }
    },

    elegant: {
      tops: {
        aff: [D('Satin Camisole','SHEIN','$18','satin camisole top women elegant'), D('Lace-Trim Blouse','H&M','$28','lace trim blouse women'), D('Ruffle Silk-Look Top','ASOS','$32','ruffle silk look top women')],
        mid: [D('Silk Slip Blouse','Mango','$89','silk slip blouse women'), D('Ruffle Neck Top','& Other Stories','$89','ruffle neck top women elegant'), D('Bow Blouse','Zara','$79','bow neck blouse women silk')],
        lux: [D('Silk Camisole','Reformation','$148','silk camisole top women'), D('Silk Bow Blouse','Toteme','$495','silk bow blouse women'), D('Crystal-Strap Cami','Jacquemus','$295','crystal strap camisole women')]
      },
      pants: {
        aff: [D('Satin Wide-Leg Trousers','H&M','$35','satin wide leg trousers women'), D('Cigarette Trousers','SHEIN','$28','cigarette trousers women elegant'), D('Pleated Trousers','ASOS','$39','pleated trousers women elegant')],
        mid: [D('Pleated Wide-Leg Trousers','& Other Stories','$129','pleated wide leg trousers women'), D('Satin Trousers','Mango','$89','satin trousers women'), D('Fluid Trousers','Zara','$89','fluid wide leg trousers women')],
        lux: [D('Silk Wide-Leg Trousers','Reformation','$198','silk wide leg trousers women'), D('Tailored Silk Trousers','Toteme','$495','tailored silk trousers women'), D('Crystal-Hem Trousers','Jacquemus','$595','trousers women elegant designer')]
      },
      skirts: {
        aff: [D('Pleated Midi Skirt','H&M','$35','pleated midi skirt women elegant'), D('Satin Midi Skirt','SHEIN','$25','satin midi skirt women'), D('Lace-Trim Skirt','ASOS','$38','lace trim midi skirt women')],
        mid: [D('Satin Midi Slip Skirt','& Other Stories','$129','satin midi slip skirt women'), D('Pleated Silk Skirt','Mango','$89','pleated silk skirt women midi'), D('Fluid Midi Skirt','Zara','$75','fluid midi skirt women elegant')],
        lux: [D('Silk Slip Midi Skirt','Reformation','$248','silk slip midi skirt women'), D('Pleated Silk Midi','Toteme','$395','pleated silk midi skirt women'), D('Crystal-Hem Skirt','Jacquemus','$595','crystal hem skirt women')]
      },
      dresses: {
        aff: [D('Satin Slip Dress','SHEIN','$28','satin slip dress midi women elegant'), D('Lace Midi Dress','H&M','$45','lace midi dress women'), D('Chiffon Wrap Dress','ASOS','$48','chiffon wrap dress women midi')],
        mid: [D('Silk Midi Dress','Mango','$99','silk midi dress women elegant'), D('Slip Dress','& Other Stories','$145','slip dress women elegant'), D('Satin Midi Dress','Zara','$89','satin midi dress women')],
        lux: [D('Silk Midi Dress','Reformation','$298','silk midi dress women'), D('Satin Column Dress','Toteme','$695','satin column dress women'), D('Crystal Dress','Jacquemus','$795','crystal embellished dress women')]
      },
      jackets: {
        aff: [D('Satin Blazer','H&M','$65','satin blazer women elegant'), D('Cropped Jacket','SHEIN','$38','cropped jacket women elegant'), D('Velvet Blazer','ASOS','$55','velvet blazer women')],
        mid: [D('Tailored Blazer','Mango','$129','tailored blazer women elegant'), D('Velvet Jacket','& Other Stories','$195','velvet jacket women elegant'), D('Silk Bomber','Zara','$99','silk bomber jacket women')],
        lux: [D('Silk Blazer','Reformation','$248','silk blazer women'), D('Tailored Jacket','Toteme','$695','tailored jacket women elegant'), D('Crystal-Trim Blazer','Jacquemus','$895','blazer jacket women designer')]
      },
      shoes: {
        aff: [D('Pointed Block Heels','SHEIN','$30','pointed block heel pumps women'), D('Strappy Sandals','H&M','$38','strappy sandals women elegant'), D('Kitten Heel Mules','ASOS','$45','kitten heel mules women')],
        mid: [D('Satin Mules','Charles & Keith','$89','satin mules women'), D('Block Heel Sandals','Charles & Keith','$89','block heel sandals women elegant'), D('Kitten Heels','Mango','$79','kitten heel shoes women')],
        lux: [D('Crystal Strap Heels','Jacquemus','$595','crystal embellished heels women'), D('Silk Mules','Toteme','$545','silk mules women'), D('Slingback Heels','A.P.C.','$395','slingback heels women elegant')]
      },
      boots: {
        aff: [D('Knee-High Boots','SHEIN','$52','knee high boots women elegant'), D('Heeled Ankle Boots','H&M','$65','heeled ankle boots women elegant'), D('Over-Knee Boots','ASOS','$75','over knee boots women elegant')],
        mid: [D('Leather Knee-High Boots','Mango','$199','leather knee high boots women'), D('Heeled Chelsea Boots','& Other Stories','$249','heeled chelsea boots women'), D('Thigh-High Boots','ASOS','$149','thigh high boots women elegant')],
        lux: [D('Knee-High Boots','Toteme','$695','knee high leather boots women'), D('Heeled Boots','A.P.C.','$595','heeled leather boots women'), D('Tall Boots','Jacquemus','$895','tall boots women designer')]
      },
      bags: {
        aff: [D('Mini Pearl Clutch','SHEIN','$25','pearl beaded clutch bag women'), D('Satin Evening Bag','H&M','$28','satin evening bag women'), D('Mini Shoulder Bag','ASOS','$32','mini shoulder bag women elegant')],
        mid: [D('Mini Evening Bag','Charles & Keith','$79','mini evening bag pearl women'), D('Mini Flap Bag','Charles & Keith','$95','mini flap bag women elegant'), D('Satin Mini Bag','& Other Stories','$89','satin mini bag women')],
        lux: [D('Mini Top Handle','Polène','$395','mini top handle bag polene'), D('Micro Bag','Jacquemus','$595','micro bag women designer'), D('Evening Bag','Toteme','$595','evening leather bag women')]
      },
      jewelry: {
        aff: [D('Pearl Drop Earrings','H&M','$12','pearl drop earrings women'), D('Crystal Studs','SHEIN','$8','crystal stud earrings women elegant'), D('Pearl Chain Necklace','ASOS','$15','pearl chain necklace women')],
        mid: [D('Crystal Drop Earrings','& Other Stories','$45','crystal drop earrings women'), D('Pearl Necklace','Pandora','$89','pearl necklace women'), D('Crystal Stud Earrings','& Other Stories','$49','crystal stud earrings women')],
        lux: [D('Pearl Drop Earrings','Tiffany & Co.','$395','pearl drop earrings tiffany'), D('Diamond Huggies','Mejuri','$295','diamond huggie earrings women'), D('Pearl Necklace','Mejuri','$248','pearl necklace women gold')]
      },
      accessories: {
        aff: [D('Pearl Headband','SHEIN','$10','pearl headband women elegant'), D('Satin Gloves','ASOS','$22','satin gloves women elegant'), D('Velvet Choker','H&M','$12','velvet choker women')],
        mid: [D('Silk Scarf','& Other Stories','$55','silk scarf women elegant'), D('Satin Hair Bow','Mango','$25','satin hair bow women'), D('Pearl Sunglasses Chain','ASOS','$28','pearl sunglasses chain women')],
        lux: [D('Cashmere Wrap','Toteme','$395','cashmere wrap scarf women'), D('Silk Gloves','Jacquemus','$295','silk gloves women elegant'), D('Pearl Hair Pin','Mejuri','$98','pearl hair pin gold women')]
      },
      makeup: {
        aff: [D('Satin Lipstick','Sephora','$14','Maybelline color sensational lipstick nude'), D('Blush Duo','Sephora','$16','e.l.f. blush palette nude pink'), D('Lengthening Mascara','Sephora','$14','L\'Oreal voluminous mascara black')],
        mid: [D('Satin Lip Liner','Sephora','$28','Charlotte Tilbury lip liner pillowtalk'), D('Sheer Foundation','Sephora','$42','Laura Mercier tinted moisturizer nude'), D('Highlighter','Sephora','$38','NARS highlighter orgasm')],
        lux: [D('Rouge Allure Lipstick','Sephora','$42','Chanel rouge allure lipstick women'), D('Serum Cushion','Sephora','$68','Armani luminous silk foundation'), D('Dior Lip Glow','Sephora','$38','Dior addict lip glow oil rose')]
      },
      fragrances: {
        aff: [D('Pink Friday EDT','Sephora','$28','paris hilton can can perfume women'), D('Floral Bouquet','Sephora','$32','elizabeth arden green tea perfume'), D('Sweet Pea Mist','Sephora','$18','victorias secret pure seduction mist')],
        mid: [D('La Vie Est Belle','Sephora','$98','lancome la vie est belle eau de parfum'), D('Bloom EDP','Sephora','$89','gucci bloom eau de parfum'), D('Chloe EDP','Sephora','$115','chloe eau de parfum rose')],
        lux: [D('Chanel N°5 EDP','Sephora','$185','chanel no 5 eau de parfum women'), D('Miss Dior Blooming','Sephora','$165','miss dior blooming bouquet perfume'), D('YSL Libre EDP','Sephora','$148','ysl libre eau de parfum women')]
      }
    },

    korean: {
      tops: {
        aff: [D('Cropped Pastel Cardigan','YesStyle','$28','cropped pastel cardigan korean fashion'), D('Fitted Polo Crop','SHEIN','$16','fitted polo crop top women korean'), D('Peter Pan Collar Blouse','Cider','$22','peter pan collar blouse women')],
        mid: [D('Knit Cardigan Beige','Uniqlo','$59','knit cardigan beige women'), D('Cashmere Polo Sweater','Uniqlo','$79','cashmere polo sweater women'), D('Cropped Blazer','Mango','$79','cropped blazer women korean style')],
        lux: [D('Cashmere Cropped Cardigan','& Other Stories','$165','cashmere cropped cardigan women'), D('Fine-Knit Cardigan','COS','$125','fine knit cardigan women'), D('Silk Blouse','Reformation','$148','silk blouse women')]
      },
      pants: {
        aff: [D('Wide-Leg Trousers','YesStyle','$28','wide leg trousers women korean style'), D('High-Waist Straight Jeans','SHEIN','$28','high waist straight leg jeans women'), D('Plaid Trousers','Cider','$32','plaid trousers women korean')],
        mid: [D('High-Waist Wide Trousers','Mango','$65','high waist wide trousers women'), D('Pleated Wide-Leg','Uniqlo','$55','pleated wide leg trousers women'), D('Barrel-Leg Jeans','ASOS','$65','barrel leg jeans women')],
        lux: [D('Tailored Wide-Leg','Aritzia','$148','tailored wide leg trousers women'), D('Clean Trousers','COS','$165','clean tailored trousers women'), D('Silk Wide-Leg','Toteme','$495','silk wide leg trousers women')]
      },
      skirts: {
        aff: [D('Pleated Mini Skirt','SHEIN','$22','pleated mini skirt schoolgirl women'), D('Plaid Mini Skirt','YesStyle','$25','plaid mini skirt women korean'), D('Tennis Skirt','Cider','$20','tennis skirt women white')],
        mid: [D('Pleated Mini Skirt','Mango','$45','pleated mini skirt women'), D('Plaid Midi Skirt','ASOS','$55','plaid midi skirt women korean'), D('Wool Mini Skirt','Uniqlo','$49','wool mini skirt women')],
        lux: [D('Tailored Mini Skirt','Aritzia','$138','tailored mini skirt women'), D('Pleated Wool Skirt','COS','$145','pleated wool mini skirt women'), D('Leather Mini Skirt','Reformation','$198','leather mini skirt women')]
      },
      dresses: {
        aff: [D('A-Line Mini Dress','YesStyle','$28','a-line mini dress women korean'), D('Floral Wrap Dress','SHEIN','$25','floral wrap mini dress women'), D('Knit Mini Dress','Cider','$28','knit mini dress women cute')],
        mid: [D('Knit Midi Dress','Mango','$79','knit midi dress women'), D('Shirt Mini Dress','ASOS','$55','shirt mini dress women'), D('Floral Midi Dress','& Other Stories','$129','floral midi dress women')],
        lux: [D('Silk Midi Dress','Reformation','$228','silk midi dress women'), D('Knit Dress','COS','$195','knit dress women'), D('Mini Dress','Aritzia','$178','mini dress women tailored')]
      },
      jackets: {
        aff: [D('Oversized Blazer','YesStyle','$35','oversized blazer women korean style'), D('Cropped Bomber','SHEIN','$32','cropped bomber jacket women'), D('Plaid Blazer','Cider','$38','plaid blazer women korean')],
        mid: [D('Oversized Blazer','Mango','$115','oversized blazer women'), D('Wool Coat','Uniqlo','$149','wool coat women'), D('Denim Jacket','ASOS','$65','denim jacket women korean')],
        lux: [D('Structured Blazer','Aritzia','$228','structured blazer women'), D('Wool Coat','COS','$395','wool coat women'), D('Leather Jacket','A.P.C.','$695','leather jacket women')]
      },
      shoes: {
        aff: [D('White Sneakers','SHEIN','$35','white sneakers women korean fashion'), D('Platform Canvas Sneakers','Cider','$40','platform canvas sneakers white women'), D('Ballet Flats','YesStyle','$28','ballet flats women korean')],
        mid: [D('Chunky Mary Janes','Charles & Keith','$75','chunky mary jane shoes women'), D('Platform Loafers','Mango','$89','platform loafers women'), D('Leather Sneakers','& Other Stories','$149','leather sneakers women white')],
        lux: [D('Leather Mary Janes','Reformation','$248','leather mary jane shoes women'), D('Platform Shoes','A.P.C.','$345','platform shoes women'), D('Leather Ballet Flats','Toteme','$395','leather ballet flats women')]
      },
      boots: {
        aff: [D('Short Ankle Boots','YesStyle','$38','short ankle boots women korean'), D('Chelsea Boots','SHEIN','$42','chelsea boots women black'), D('Platform Boots','Cider','$45','platform boots women chunky')],
        mid: [D('Chunky Boots','Mango','$119','chunky ankle boots women'), D('Lug-Sole Boots','ASOS','$95','lug sole boots women'), D('Platform Boots','Charles & Keith','$89','platform boots women')],
        lux: [D('Leather Ankle Boots','A.P.C.','$495','leather ankle boots women'), D('Chelsea Boots','Toteme','$595','leather chelsea boots women'), D('Platform Boots','Reformation','$298','platform boots women')]
      },
      bags: {
        aff: [D('Mini Pearl Shoulder Bag','YesStyle','$32','mini pearl shoulder bag women'), D('Quilted Chain Bag','SHEIN','$25','quilted chain shoulder bag women'), D('Mini Zipper Bag','Cider','$18','mini zipper shoulder bag cute women')],
        mid: [D('Mini Shoulder Bag','Charles & Keith','$89','mini shoulder bag women'), D('Quilted Mini Bag','Mango','$89','quilted mini leather bag women'), D('Bucket Bag','& Other Stories','$99','bucket bag women small')],
        lux: [D('Mini Top Handle Bag','Polène','$395','mini top handle bag polene'), D('Leather Mini Bag','A.P.C.','$345','leather mini bag women'), D('Mini Quilted','Toteme','$495','mini quilted leather bag women')]
      },
      jewelry: {
        aff: [D('Pearl Hair Clips Set','SHEIN','$8','pearl hair clips set women korean'), D('Dainty Gold Hoops','YesStyle','$12','dainty gold hoop earrings women'), D('Bow Hair Clip Set','Cider','$6','bow hair clip set korean women')],
        mid: [D('Pearl Hair Pin','& Other Stories','$35','pearl hair pin gold women'), D('Satin Ribbon Clip','& Other Stories','$25','satin ribbon hair clip women'), D('Gold Chain Necklace','Mejuri','$65','gold chain necklace women dainty')],
        lux: [D('Pearl Hair Pin Gold','Mejuri','$98','pearl hair pin gold women'), D('Diamond Studs','Mejuri','$248','diamond stud earrings women gold'), D('Pearl Necklace','Tiffany & Co.','$295','pearl necklace women tiffany')]
      },
      accessories: {
        aff: [D('Satin Ribbon Headband','SHEIN','$6','satin ribbon headband women korean'), D('Mini Tote Bag','YesStyle','$18','mini tote bag women cute'), D('Clear Frame Sunglasses','Cider','$10','clear frame glasses women korean')],
        mid: [D('Satin Scrunchie Set','& Other Stories','$20','satin scrunchie set women'), D('Mini Shoulder Bag','Charles & Keith','$45','mini shoulder bag women korean'), D('Wire-Frame Sunglasses','Mango','$29','wire frame sunglasses women')],
        lux: [D('Silk Scarf','Toteme','$295','silk scarf women'), D('Leather Gloves','A.P.C.','$195','leather gloves women'), D('Sunglasses','Acne Studios','$295','sunglasses women minimal')]
      },
      makeup: {
        aff: [D('Glass Skin Primer','Sephora','$16','e.l.f. power grip primer'), D('Cushion Foundation','Sephora','$22','Missha magic cushion foundation'), D('Lip Tint','Sephora','$14','Romand juicy lasting tint')],
        mid: [D('Dewy Foundation','Sephora','$42','Fenty Beauty skin tint foundation'), D('Blush & Highlighter','Sephora','$38','Rare Beauty soft pinch liquid blush'), D('Cushion Lip Tint','Sephora','$32','Laneige lip sleeping mask')],
        lux: [D('Skin Perfecting Foundation','Sephora','$68','Armani luminous silk cushion foundation'), D('Serum Concealer','Sephora','$55','NARS radiant creamy concealer'), D('Glow Setting Powder','Sephora','$62','Charlotte Tilbury setting powder')]
      },
      fragrances: {
        aff: [D('Cherry Blossom Mist','Sephora','$18','bath and body works japanese cherry blossom'), D('Floral Youth EDT','Sephora','$28','clean beauty collective women perfume'), D('Pear & Lily Mist','Sephora','$22','bodycology pear blossom mist')],
        mid: [D('Bloom Florale','Sephora','$89','gucci bloom acqua di fiori'), D('Miss Dior Rose','Sephora','$125','miss dior rose n roses perfume'), D('Daisy EDT','Sephora','$95','marc jacobs daisy eau de toilette')],
        lux: [D('Chanel Chance Tender','Sephora','$185','chanel chance eau tendre perfume'), D('Chloe Rose EDP','Sephora','$135','chloe rose de chloe perfume'), D('YSL Mon Paris','Sephora','$148','ysl mon paris eau de parfum')]
      }
    },

    y2k: {
      tops: {
        aff: [D('Baby Tee Crop','SHEIN','$12','baby tee y2k crop top women'), D('Mesh Long-Sleeve Top','Cider','$18','mesh long sleeve top women y2k'), D('Sequin Crop Top','SHEIN','$18','sequin crop top y2k women')],
        mid: [D('Mesh Long-Sleeve Top','Princess Polly','$45','mesh long sleeve top women'), D('Corset Bustier Top','Princess Polly','$59','corset bustier top y2k women'), D('Halter Neck Top','Urban Outfitters','$45','halter neck top women y2k')],
        lux: [D('Logo Crop Top','Jacquemus','$295','logo crop top women'), D('Crystal Bralette','Jacquemus','$395','crystal bralette top women designer'), D('Bodycon Top','Acne Studios','$245','fitted bodycon top women')]
      },
      pants: {
        aff: [D('Low-Rise Flare Jeans','SHEIN','$28','low rise flare jeans women y2k'), D('Wide-Leg Cargo Pants','Cider','$32','wide leg cargo pants women y2k'), D('Track Pants','Pull&Bear','$30','track pants women y2k')],
        mid: [D('Low-Rise Flare Jeans','ASOS','$65','low rise flare jeans women'), D('Low-Rise Flare Trousers','Princess Polly','$75','low rise flare trousers women'), D('Embroidered Jeans','Urban Outfitters','$89','embroidered jeans women y2k')],
        lux: [D('Low-Rise Denim','Acne Studios','$395','low rise jeans women designer'), D('Designer Flare Jeans','Jacquemus','$495','flare jeans women designer'), D('Wide-Leg Trousers','Jacquemus','$395','wide leg trousers women')]
      },
      skirts: {
        aff: [D('Micro Denim Mini Skirt','SHEIN','$18','micro denim mini skirt women y2k'), D('Pleated Mini Skirt','Cider','$20','pleated mini skirt women y2k'), D('Butterfly Skirt','SHEIN','$22','butterfly print mini skirt women')],
        mid: [D('Denim Mini Skirt','Urban Outfitters','$65','low rise denim mini skirt y2k'), D('Satin Mini Skirt','Princess Polly','$55','satin mini skirt women y2k'), D('Wrap Mini Skirt','ASOS','$49','wrap mini skirt y2k women')],
        lux: [D('Denim Mini','Acne Studios','$295','denim mini skirt women designer'), D('Mini Skirt','Jacquemus','$395','mini skirt women designer'), D('Leather Mini Skirt','A.P.C.','$245','leather mini skirt women')]
      },
      dresses: {
        aff: [D('Bodycon Mini Dress','SHEIN','$20','bodycon mini dress women y2k'), D('Slip Dress Metallic','Cider','$28','metallic slip dress women y2k'), D('Velour Mini Dress','ASOS','$38','velour mini dress women y2k')],
        mid: [D('Slip Dress','Princess Polly','$79','slip dress women y2k'), D('Bodycon Dress','Urban Outfitters','$75','bodycon mini dress women'), D('Ruched Mini Dress','ASOS','$65','ruched mini dress women y2k')],
        lux: [D('Mini Dress','Jacquemus','$495','mini dress women designer'), D('Velvet Dress','Acne Studios','$595','velvet dress women'), D('Fitted Dress','Reformation','$228','fitted mini dress women')]
      },
      jackets: {
        aff: [D('Vinyl Trench Coat','SHEIN','$45','vinyl trench coat women y2k'), D('Faux Fur Jacket','Cider','$38','faux fur jacket women y2k'), D('Bomber Jacket','Pull&Bear','$45','bomber jacket women y2k')],
        mid: [D('Cropped Faux-Fur','Urban Outfitters','$89','cropped faux fur jacket women'), D('Shacket','Princess Polly','$79','oversized shacket women y2k'), D('Vinyl Jacket','ASOS','$75','vinyl jacket women y2k')],
        lux: [D('Leather Jacket','Acne Studios','$1095','leather jacket women y2k'), D('Mini Jacket','Jacquemus','$695','mini jacket women designer'), D('Fur-Trim Coat','A.P.C.','$695','fur trim coat women')]
      },
      shoes: {
        aff: [D('Platform Sneakers','Cider','$45','platform sneakers chunky women y2k'), D('Pointed Kitten Heels','SHEIN','$28','pointy kitten heels women y2k'), D('Platform Mules','ASOS','$38','platform mules women y2k')],
        mid: [D('Pointy Kitten Heels','ASOS','$65','pointy kitten heels women'), D('Platform Sneakers','Princess Polly','$79','platform sneakers women chunky'), D('Mary Janes','Urban Outfitters','$75','mary jane shoes women y2k')],
        lux: [D('Pointed Stiletto Heels','Jacquemus','$595','pointed stiletto heels women designer'), D('Crystal Shoes','Jacquemus','$695','crystal embellished shoes women'), D('Platform Boots','Acne Studios','$695','platform shoes women designer')]
      },
      boots: {
        aff: [D('Platform Boots','Cider','$48','platform boots women y2k chunky'), D('Knee-High Boots','SHEIN','$45','knee high boots women y2k'), D('Vinyl Thigh-High Boots','ASOS','$55','vinyl thigh high boots women y2k')],
        mid: [D('Platform Knee Boots','ASOS','$89','platform knee high boots women'), D('Square-Toe Boots','Urban Outfitters','$119','square toe boots women y2k'), D('Platform Chelsea','Princess Polly','$95','platform chelsea boots women')],
        lux: [D('Tall Boots','Jacquemus','$895','tall boots women designer'), D('Platform Boots','Acne Studios','$795','platform boots women designer'), D('Knee-High','A.P.C.','$595','knee high boots women')]
      },
      bags: {
        aff: [D('Mini Pink Shoulder Bag','SHEIN','$18','mini shoulder bag y2k pink women'), D('Rhinestone Mini Bag','SHEIN','$12','rhinestone mini bag y2k women'), D('Mini Baguette Bag','Cider','$22','mini baguette bag y2k women')],
        mid: [D('Mini Baguette Bag','ASOS','$45','mini baguette bag y2k women'), D('Mini Faux-Fur Bag','Urban Outfitters','$58','mini faux fur bag y2k women'), D('Croc-Embossed Mini','Princess Polly','$55','croc embossed mini bag women y2k')],
        lux: [D('Designer Mini Baguette','Jacquemus','$495','mini baguette bag women designer'), D('Le Chiquito','Jacquemus','$595','le chiquito bag jacquemus'), D('Micro Bag','Acne Studios','$595','micro bag women designer')]
      },
      jewelry: {
        aff: [D('Butterfly Hair Clips','SHEIN','$6','butterfly hair clips y2k women'), D('Rhinestone Choker','Cider','$8','rhinestone choker necklace y2k'), D('Colorful Hoop Set','SHEIN','$10','colorful hoop earrings set y2k')],
        mid: [D('Tinted Designer-Look Sunglasses','Urban Outfitters','$25','tinted oval sunglasses women y2k'), D('Crystal Choker','Urban Outfitters','$28','crystal choker necklace y2k women'), D('Charm Bracelet','Princess Polly','$35','charm bracelet women y2k')],
        lux: [D('Tinted Sunglasses','Acne Studios','$295','tinted sunglasses women designer'), D('Crystal Earrings','Jacquemus','$345','crystal earrings women designer'), D('Gold Hoops','Mejuri','$148','gold hoop earrings women bold')]
      },
      accessories: {
        aff: [D('Tinted Visor Cap','SHEIN','$10','y2k tinted visor cap women'), D('Feather Boa','AliExpress','$8','feather boa pink y2k women'), D('Mini Claw Clips Set','Cider','$6','mini claw clips set y2k women')],
        mid: [D('Oval Sunglasses','Urban Outfitters','$25','oval tinted sunglasses women y2k'), D('Mini Backpack','Princess Polly','$55','mini backpack women y2k'), D('Baguette Belt','ASOS','$32','baguette belt bag women y2k')],
        lux: [D('Logo Sunglasses','Acne Studios','$295','logo sunglasses women designer'), D('Embellished Belt','Jacquemus','$295','embellished belt women designer'), D('Chain Belt','A.P.C.','$195','chain belt women')]
      },
      makeup: {
        aff: [D('Holographic Glitter','Sephora','$12','NYX face glitter body glitter women'), D('Gloss Lip Balm','Sephora','$10','Laneige lip sleeping mask tinted'), D('Shimmer Eye Shadow','Sephora','$14','e.l.f. glitter eyeshadow palette')],
        mid: [D('Glossy Lip Plumper','Sephora','$26','Too Faced lip injection gloss plumper'), D('Iridescent Highlighter','Sephora','$38','Charlotte Tilbury Hollywood flawless filter'), D('Sheer Foundation','Sephora','$42','Fenty Beauty skin tint foundation')],
        lux: [D('Dior Lip Maximizer','Sephora','$38','Dior addict lip maximizer plumping gloss'), D('Armani Luminous Foundation','Sephora','$68','Armani luminous silk foundation'), D('YSL Candy Glaze Lip','Sephora','$38','YSL candy glaze lip gloss stick')]
      },
      fragrances: {
        aff: [D('VS Bombshell Body Mist','Sephora','$22','victorias secret bombshell body mist'), D('Juicy Couture EDT','Sephora','$68','juicy couture viva la juicy perfume'), D('Paris Hilton EDP','Sephora','$32','paris hilton can can perfume')],
        mid: [D('Viva La Juicy','Sephora','$89','juicy couture viva la juicy perfume women'), D('Princess Polly','Sephora','$75','vera wang princess perfume women'), D('Ariana Grande Cloud','Sephora','$75','ariana grande cloud perfume women')],
        lux: [D('Prada Candy','Sephora','$148','prada candy perfume women'), D('Versace Bright Crystal','Sephora','$125','versace bright crystal perfume women'), D('YSL Black Opium','Sephora','$148','ysl black opium perfume women')]
      }
    },

    vintage: {
      tops: {
        aff: [D('Prairie Blouse Cream','SHEIN','$22','prairie blouse vintage cream women'), D('Paisley Print Blouse','H&M','$28','paisley print blouse women vintage'), D('Ribbed Turtleneck','Bershka','$22','ribbed turtleneck women vintage')],
        mid: [D('70s Style Blouse','Free People','$98','70s style blouse women vintage'), D('Paisley Blouse','Urban Outfitters','$65','paisley print blouse women'), D('Vintage-Look Knit','ASOS','$55','vintage look knit top women')],
        lux: [D('Silk Romantic Blouse','Reformation','$178','silk romantic blouse women vintage'), D('Broderie Blouse','Sézane','$148','broderie blouse women vintage'), D('Prairie Blouse','Free People','$138','prairie blouse women premium')]
      },
      pants: {
        aff: [D('High-Waist Flare Jeans','SHEIN','$32','high waist flare jeans 70s vintage women'), D('Corduroy Wide-Leg','H&M','$38','corduroy wide leg trousers women vintage'), D('Patchwork Jeans','Bershka','$38','patchwork jeans women vintage')],
        mid: [D('High-Waist Flare Trousers','Mango','$85','high waist flare trousers women vintage'), D('Corduroy Flare Pants','Urban Outfitters','$79','corduroy flare pants women'), D('70s Flare Jeans','ASOS','$69','70s style flare jeans women')],
        lux: [D('Wide-Leg Wool Trousers','Reformation','$228','wide leg wool trousers women vintage'), D('Flare Jeans','Levis','$168','flare jeans women premium vintage wash'), D('Corduroy Flare','Free People','$138','corduroy flare pants women premium')]
      },
      skirts: {
        aff: [D('Corduroy A-Line Skirt','SHEIN','$28','corduroy a-line skirt vintage women'), D('Denim Midi Skirt','H&M','$35','denim midi skirt women vintage'), D('Suede Mini Skirt','Bershka','$30','suede mini skirt women vintage')],
        mid: [D('Corduroy Midi Skirt','Urban Outfitters','$75','corduroy midi skirt women'), D('Suede Midi Skirt','Free People','$98','suede midi skirt women vintage'), D('A-Line Midi Skirt','ASOS','$59','vintage a-line midi skirt women')],
        lux: [D('Corduroy Midi Skirt','Reformation','$178','corduroy midi skirt women'), D('Suede Skirt','Free People','$168','suede skirt women premium vintage'), D('Wool Midi Skirt','Sézane','$148','wool midi skirt women vintage')]
      },
      dresses: {
        aff: [D('Floral Midi Dress','SHEIN','$28','floral midi dress vintage women 70s'), D('Prairie Dress','H&M','$38','prairie dress women vintage boho'), D('Smocked Maxi Dress','Bershka','$35','smocked maxi dress women vintage')],
        mid: [D('70s Wrap Dress','Free People','$128','70s wrap dress women vintage'), D('Floral Maxi Dress','Urban Outfitters','$89','floral maxi dress women vintage boho'), D('Prairie Midi Dress','ASOS','$75','prairie midi dress women vintage')],
        lux: [D('Floral Midi Dress','Reformation','$248','floral midi dress women vintage'), D('Prairie Dress','Sézane','$198','prairie dress women premium'), D('Wrap Maxi Dress','Free People','$178','wrap maxi dress women vintage')]
      },
      jackets: {
        aff: [D('Faux Suede Jacket','H&M','$55','faux suede jacket women vintage'), D('Corduroy Blazer','SHEIN','$38','corduroy blazer women vintage'), D('Denim Jacket','Bershka','$42','vintage wash denim jacket women')],
        mid: [D('Suede Fringe Jacket','Free People','$198','suede fringe jacket women vintage'), D('Vintage Denim Jacket','Urban Outfitters','$75','vintage wash denim jacket women'), D('Corduroy Jacket','ASOS','$89','corduroy jacket women vintage')],
        lux: [D('Suede Jacket','Free People','$268','suede jacket women premium vintage'), D('Shearling Jacket','Acne Studios','$1295','shearling jacket women'), D('Leather Jacket','A.P.C.','$695','leather jacket women vintage')]
      },
      shoes: {
        aff: [D('Suede Ankle Boots','SHEIN','$45','suede ankle boots vintage women'), D('Brown Suede Loafers','H&M','$45','brown suede loafers vintage women'), D('Square-Toe Flats','Bershka','$32','square toe flats women vintage')],
        mid: [D('Tan Suede Knee Boots','Mango','$129','suede knee high boots tan women'), D('Vintage Loafers','Urban Outfitters','$89','vintage loafers women 70s'), D('Suede Block Heels','Free People','$98','suede block heel shoes women vintage')],
        lux: [D('Tall Suede Boots','Acne Studios','$595','tall suede boots tan women'), D('Leather Loafers','A.P.C.','$395','leather loafers women vintage'), D('Block Heel Boots','Reformation','$298','block heel boots women vintage')]
      },
      boots: {
        aff: [D('Suede Ankle Boots','H&M','$55','suede ankle boots women vintage'), D('Knee-High Boots','SHEIN','$48','knee high boots women vintage'), D('Cowboy Boots','Bershka','$58','cowboy boots women vintage')],
        mid: [D('Tan Suede Platform Boots','Mango','$129','tan suede platform boots vintage women'), D('Dr. Martens 1460','Dr. Martens','$179','dr martens 1460 cherry red women'), D('Cowboy Boots','Urban Outfitters','$149','cowboy boots women vintage')],
        lux: [D('Suede Boots','Acne Studios','$895','suede boots women vintage'), D('Leather Cowboy Boots','Reformation','$398','leather cowboy boots women'), D('Tall Boots','A.P.C.','$695','tall leather boots women')]
      },
      bags: {
        aff: [D('Leather Satchel Tan','SHEIN','$35','leather satchel bag vintage tan women'), D('Woven Bucket Bag','Etsy','$38','woven bucket bag vintage women'), D('Fringe Crossbody','H&M','$38','fringe crossbody bag women vintage')],
        mid: [D('Vintage Leather Crossbody','Etsy','$95','vintage leather crossbody bag women'), D('Suede Shoulder Bag','Free People','$98','suede shoulder bag women vintage'), D('Vintage Leather Satchel','Depop','$75','vintage leather satchel bag women')],
        lux: [D('Leather Shoulder Bag','A.P.C.','$425','leather shoulder bag women vintage'), D('Saddle Bag','Sézane','$298','saddle bag women leather vintage'), D('Structured Satchel','Reformation','$328','structured leather satchel women')]
      },
      jewelry: {
        aff: [D('Wide Leather Belt','H&M','$18','wide leather belt women vintage'), D('Round Vintage Sunglasses','SHEIN','$8','round retro sunglasses vintage women'), D('Large Gold Hoops','H&M','$10','large gold hoop earrings vintage women')],
        mid: [D('Large Gold Hoops','Mejuri','$85','gold hoop earrings large women'), D('Retro Hoop Earrings','Urban Outfitters','$32','retro gold hoop earrings vintage women'), D('Layered Necklace','& Other Stories','$45','layered necklace gold women vintage')],
        lux: [D('Statement Gold Earrings','Mejuri','$248','gold statement earrings women vintage'), D('Hammered Gold Hoops','Mejuri','$198','hammered gold hoop earrings women'), D('Diamond Studs','Mejuri','$395','diamond stud earrings women gold')]
      },
      accessories: {
        aff: [D('Wide-Brim Hat','H&M','$18','wide brim hat women vintage'), D('Floral Silk Scarf','SHEIN','$12','floral silk scarf women vintage'), D('Vintage Sunglasses','Depop','$15','vintage sunglasses women round')],
        mid: [D('Suede Hat','Free People','$65','suede hat women vintage'), D('Paisley Scarf','Urban Outfitters','$35','paisley scarf women vintage'), D('Retro Sunglasses','& Other Stories','$55','retro sunglasses women vintage')],
        lux: [D('Cashmere Hat','Toteme','$195','cashmere hat women'), D('Vintage Silk Scarf','Etsy','$95','vintage silk scarf women hermes style'), D('Leather Hat','Free People','$128','leather hat women vintage')]
      },
      makeup: {
        aff: [D('Sheer Lipstick','Sephora','$14','e.l.f. sheer lipstick vintage rose'), D('Brown Eyeliner','Sephora','$10','essence brown pencil eyeliner women'), D('Peachy Blush','Sephora','$12','NYX cream blush peach')],
        mid: [D('Vintage Rose Lipstick','Sephora','$38','Charlotte Tilbury pillowtalk lipstick'), D('Brown Mascara','Sephora','$32','Benefit bad gal bang mascara brown'), D('Sun-Kissed Bronzer','Sephora','$42','NARS bronzer laguna')],
        lux: [D('Chanel Rouge Coco Lip','Sephora','$42','Chanel rouge coco lip blush'), D('Guerlain Meteorites','Sephora','$68','Guerlain meteorites powder pearls'), D('Burberry Lip Velvet','Sephora','$42','Burberry velvet lip colour')]
      },
      fragrances: {
        aff: [D('Patchouli Musk Spray','Sephora','$24','patchouli body spray women vintage'), D('Warm Amber EDT','Sephora','$28','elizabeth arden red door perfume vintage'), D('Sandalwood Mist','Sephora','$18','bath body works warm sandalwood')],
        mid: [D('Santal 26 Candle','Sephora','$65','le labo santal 26 candle'), D('Musc Ravageur','Sephora','$185','frederic malle musc ravageur'), D('Fleurs de Magnolia','Sephora','$125','chanel les exclusifs magnolia')],
        lux: [D('Maison Magnolia','Sephora','$195','maison margiela replica magnolia'), D('Tom Ford Neroli','Sephora','$265','tom ford neroli portofino perfume women'), D('Chanel Coco Mademoiselle','Sephora','$185','chanel coco mademoiselle eau de parfum')]
      }
    },

    softgirl: {
      tops: {
        aff: [D('Lace-Trim Camisole Pink','SHEIN','$14','lace trim camisole pink women soft girl'), D('Ruffle Floral Blouse','Cider','$18','ruffle floral blouse women soft girl'), D('Bow-Tie Crop Top','H&M','$18','bow tie crop top women pastel')],
        mid: [D('Lace-Trim Cami Top','Reformation','$98','lace trim cami top women'), D('Floral Lace Blouse','& Other Stories','$79','floral lace blouse women romantic'), D('Ribbon Trim Blouse','Mango','$65','ribbon trim blouse women soft girl')],
        lux: [D('Silk Bow Camisole','Reformation','$148','silk bow camisole women romantic'), D('Lace Blouse','Sézane','$165','lace blouse women romantic'), D('Ruffled Silk Top','Jacquemus','$395','ruffled silk top women')]
      },
      pants: {
        aff: [D('Pastel Wide-Leg Trousers','Cider','$28','pastel wide leg trousers women soft girl'), D('Floral Wide-Leg','SHEIN','$28','floral wide leg pants women'), D('Lace-Trim Pyjama Pants','H&M','$25','lace trim pyjama pants women pastel')],
        mid: [D('Floral Trousers','Mango','$69','floral trousers women romantic'), D('Linen Trousers Cream','& Other Stories','$95','linen trousers cream women soft'), D('Wide-Leg Trousers Blush','ASOS','$55','wide leg trousers blush pink women')],
        lux: [D('Silk Trousers','Reformation','$198','silk trousers women pastel'), D('Floral Wide-Leg','& Other Stories','$145','floral wide leg trousers women'), D('Pleated Trousers','Jacquemus','$495','pleated trousers women pink')]
      },
      skirts: {
        aff: [D('Pleated Mini Skirt Pastel','SHEIN','$22','pleated mini skirt pastel pink women'), D('Floral Midi Skirt','Cider','$25','floral midi skirt women soft girl'), D('Tulle Mini Skirt Pink','H&M','$28','tulle mini skirt pink women')],
        mid: [D('Pleated Midi Skirt Pastel','& Other Stories','$95','pleated midi skirt pastel women romantic'), D('Tulle Mini Skirt','Mango','$69','tulle mini skirt pink women'), D('Floral Midi Skirt','ASOS','$55','floral midi skirt women romantic')],
        lux: [D('Tulle Midi Skirt','Reformation','$228','tulle midi skirt women romantic'), D('Floral Satin Midi','Toteme','$395','floral satin midi skirt women'), D('Crystal-Hem Skirt','Jacquemus','$595','crystal hem skirt women pink')]
      },
      dresses: {
        aff: [D('Floral Mini Dress','SHEIN','$25','floral mini dress women soft girl'), D('Smocked Midi Dress','H&M','$38','smocked midi dress women romantic'), D('Lace-Trim Sundress','Cider','$28','lace trim sundress women pastel')],
        mid: [D('Floral Midi Dress','& Other Stories','$145','floral midi dress women romantic'), D('Lace Midi Dress','Mango','$89','lace midi dress women soft girl'), D('Smocked Floral Midi','ASOS','$69','smocked floral midi dress women')],
        lux: [D('Floral Midi Dress','Reformation','$248','floral midi dress romantic women'), D('Lace Dress','Sézane','$198','lace dress women romantic'), D('Tulle Dress','Jacquemus','$695','tulle dress women pink designer')]
      },
      jackets: {
        aff: [D('Cropped Pastel Cardigan','Cider','$22','cropped cardigan pastel women soft girl'), D('Floral Bomber Jacket','SHEIN','$35','floral bomber jacket women'), D('Fluffy Fleece Jacket','H&M','$38','fluffy fleece jacket women pastel')],
        mid: [D('Lace-Trim Blazer','Mango','$89','lace trim blazer women soft girl'), D('Pastel Trench Coat','& Other Stories','$175','pastel trench coat women soft girl'), D('Floral Bomber','Urban Outfitters','$79','floral bomber jacket women')],
        lux: [D('Cropped Lace Jacket','Reformation','$198','cropped lace jacket women'), D('Tulle Jacket','Jacquemus','$695','tulle jacket women designer'), D('Pink Blazer','Acne Studios','$595','pink blazer women')]
      },
      shoes: {
        aff: [D('Ballet Flats with Ribbon','SHEIN','$28','ballet flats with ribbon ties women'), D('Mary Jane Flats','Cider','$25','mary jane flats women pink'), D('Kitten Heels Blush','H&M','$38','kitten heels blush pink women')],
        mid: [D('Ribbon Ballet Flats','Mango','$69','ribbon ballet flats women'), D('Pearl Mary Janes','Charles & Keith','$75','pearl mary jane shoes women'), D('Satin Mules','& Other Stories','$95','satin mules women soft girl')],
        lux: [D('Crystal Ballet Flats','Jacquemus','$395','crystal embellished ballet flats women'), D('Satin Heels','Reformation','$248','satin heels women romantic'), D('Leather Mary Janes','Toteme','$395','leather mary jane shoes women')]
      },
      boots: {
        aff: [D('Lace-Up Ankle Boots','H&M','$48','lace up ankle boots women soft girl'), D('Pastel Chelsea Boots','Cider','$42','pastel chelsea boots women'), D('Kitten Heel Boots','SHEIN','$38','kitten heel ankle boots women')],
        mid: [D('Mary Jane Boots','Mango','$119','mary jane boots women soft girl'), D('Lace-Up Boots','& Other Stories','$195','lace up boots women'), D('Heeled Ankle Boots','ASOS','$89','heeled ankle boots women soft girl')],
        lux: [D('Leather Ankle Boots','Reformation','$298','leather ankle boots women soft girl'), D('Satin Boots','Jacquemus','$695','satin boots women designer'), D('Mary Jane Boots','Toteme','$595','mary jane boots women')]
      },
      bags: {
        aff: [D('Quilted Mini Bag Pink','SHEIN','$25','quilted mini shoulder bag pink women'), D('Pearl-Strap Mini Bag','Cider','$20','pearl strap mini shoulder bag women'), D('Heart-Lock Bag','H&M','$22','heart lock mini bag women soft girl')],
        mid: [D('Quilted Pink Shoulder Bag','Charles & Keith','$89','pink quilted shoulder bag women'), D('Pearl-Strap Bag','& Other Stories','$89','pearl strap shoulder bag women'), D('Mini Flap Bag','Mango','$79','mini flap bag women pink')],
        lux: [D('Mini Quilted Chain Bag','Polène','$395','mini quilted chain bag polene'), D('Satin Mini Bag','Jacquemus','$495','satin mini bag women designer'), D('Quilted Shoulder Bag','Toteme','$595','quilted shoulder bag women pink')]
      },
      jewelry: {
        aff: [D('Pearl Hair Bow','SHEIN','$8','pearl hair bow clip pastel women'), D('Heart Pendant Necklace','H&M','$10','heart pendant necklace women soft girl'), D('Pearl Drop Earrings','Cider','$6','pearl drop earrings women soft girl')],
        mid: [D('Pearl Heart Necklace','Pandora','$85','pearl heart pendant necklace women'), D('Pearl Drop Earrings','& Other Stories','$45','pearl drop earrings women romantic'), D('Bow Ring','Mango','$25','bow ring women soft girl')],
        lux: [D('Pearl Drop Earrings','Tiffany & Co.','$395','pearl drop earrings tiffany women'), D('Pearl Choker','Mejuri','$198','pearl choker necklace women'), D('Diamond Heart Ring','Mejuri','$295','diamond heart ring women')]
      },
      accessories: {
        aff: [D('Satin Hair Ribbons Set','SHEIN','$6','satin hair ribbons set women soft girl'), D('Pearl Headband','Cider','$8','pearl headband women soft girl'), D('Mini Bow Claw Clips','H&M','$8','mini bow claw clips women pastel')],
        mid: [D('Satin Hair Bow','Mango','$22','satin hair bow women'), D('Ribbon Headband','& Other Stories','$28','ribbon headband women soft girl'), D('Pearl Sunglasses','Urban Outfitters','$30','pearl trim sunglasses women soft girl')],
        lux: [D('Silk Ribbon Bow','Toteme','$95','silk ribbon bow women'), D('Pearl Hair Pin','Mejuri','$98','pearl hair pin gold women'), D('Sunglasses','Jacquemus','$295','sunglasses women romantic pink')]
      },
      makeup: {
        aff: [D('Pink Blush','Sephora','$14','e.l.f. monochromatic multi-stick pink blush'), D('Cherry Lip Tint','Sephora','$10','Laneige lip sleeping mask berry'), D('Dewy Setting Spray','Sephora','$12','NYX dewy setting spray women')],
        mid: [D('Soft Pinch Blush','Sephora','$36','Rare Beauty soft pinch liquid blush rose'), D('Lash & Brow Serum','Sephora','$58','Grande Lash serum mascara women'), D('Satin Lip Liner','Sephora','$28','Charlotte Tilbury lip liner pillowtalk rose')],
        lux: [D('Dior Lip Glow Rose','Sephora','$38','Dior addict lip glow oil rose women'), D('Charlotte Tilbury Blush','Sephora','$50','Charlotte Tilbury glowgasm blush palette'), D('YSL Lash Clash Mascara','Sephora','$42','YSL lash clash mascara women')]
      },
      fragrances: {
        aff: [D('VS Bombshell Mist','Sephora','$22','victorias secret bombshell body mist women'), D('Cherry Blossom Mist','Sephora','$18','bath and body works japanese cherry blossom'), D('Pink Sugar EDT','Sephora','$38','Aquolina pink sugar perfume women')],
        mid: [D('Daisy by Marc Jacobs','Sephora','$95','marc jacobs daisy eau de toilette women'), D('Chloe Rose De Chloe','Sephora','$125','chloe rose de chloe perfume women'), D('YSL Mon Paris','Sephora','$135','ysl mon paris eau de parfum women')],
        lux: [D('Chanel Chance Tender','Sephora','$185','chanel chance eau tendre perfume women'), D('Miss Dior Blooming','Sephora','$165','miss dior blooming bouquet perfume women'), D('Guerlain Mon Guerlain','Sephora','$145','mon guerlain eau de parfum women')]
      }
    }
  };

  // Build fashion directory HTML
  function buildFashionDir() {
    const dir = FASHION_DIR[s.id];
    if (!dir) return '';

    const catBtns = FDIR_CATS.map((cat, i) =>
      '<button class="fshop-cat' + (i === 0 ? ' fshop-cat-active' : '') + '" data-fshop-cat="' + cat.id + '">' + cat.label + '</button>'
    ).join('');

    const panels = FDIR_CATS.map((cat, i) => {
      const catData = dir[cat.id] || {};
      const tierBlocks = [['aff','Affordable'],['mid','Mid-Range'],['lux','Luxury']].map(function(t) {
        const tier = t[0], tierLabel = t[1];
        const items = catData[tier] || [];
        if (!items.length) return '';
        const itemsHtml = items.map(function(item) {
          return '<a class="fshop-item" href="' + buildUrl(item.store, item.q) + '" target="_blank" rel="noopener noreferrer">' +
            '<span class="fshop-item-name">' + item.name + '</span>' +
            '<span class="fshop-item-right">' +
              '<span class="fshop-item-store">' + item.store + '</span>' +
              '<span class="fshop-item-price">' + item.price + '</span>' +
            '</span>' +
          '</a>';
        }).join('');
        return '<div class="fshop-tier-block" data-fshop-tier="' + tier + '">' +
          '<span class="fshop-tier-tag fshop-tier-tag-' + tier + '">' + tierLabel + '</span>' +
          '<div class="fshop-items">' + itemsHtml + '</div>' +
        '</div>';
      }).join('');
      return '<div class="fshop-cat-panel' + (i === 0 ? ' fshop-cat-panel-active' : '') + '" data-fshop-cat="' + cat.id + '">' +
        tierBlocks +
      '</div>';
    }).join('');

    return '<div class="fshop">' +
      '<div class="fshop-bar">' +
        '<div class="fshop-cats-scroll"><div class="fshop-cats">' + catBtns + '</div></div>' +
        '<div class="fshop-buds">' +
          '<button class="fshop-bud fshop-bud-active" data-fshop-bud="all">All</button>' +
          '<button class="fshop-bud" data-fshop-bud="aff">Affordable</button>' +
          '<button class="fshop-bud" data-fshop-bud="mid">Mid-range</button>' +
          '<button class="fshop-bud" data-fshop-bud="lux">Luxury</button>' +
        '</div>' +
      '</div>' +
      '<div class="fshop-panel">' + panels + '</div>' +
    '</div>';
  }

  html += '<div class="rich-block">';
  html += '<div class="rich-block-head"><span class="rich-block-eyebrow">Fashion Directory</span>';
  html += '<h3>Build your wardrobe, category by category.</h3></div>';
  html += '<p class="fdir-intro">Every category. Every budget. Every link opens a live search so you can shop directly.</p>';
  html += buildFashionDir();
  html += '</div>'; // closes rich-block (fashion directory)

  html += '</div></section>'; // closes ssec-shop-rich

  // 05 — How to wear it (styling rules at the very end)
  const tips = STYLING_TIPS[s.id] || [];
  if (tips.length) {
    html += '<section class="ssec ssec-tips-end"><div class="ssec-inner">';
    html += '<span class="ssec-num">How to wear it</span>';
    html += '<h2 class="ssec-tips-title">Four rules for <em>' + s.name + '.</em></h2>';
    html += '<div class="style-tips-grid">';
    tips.forEach((t, i) => {
      html += '<div class="style-tip">';
      html += '<span class="style-tip-num">0' + (i + 1) + '</span>';
      html += '<p class="style-tip-rule">' + t.tip + '</p>';
      html += '<p class="style-tip-detail">' + t.detail + '</p>';
      html += '</div>';
    });
    html += '</div></div></section>';
  }

  // 06 — Closing section
  const CLOSING = {
    classic:    { quote: 'Dress quietly. Make noise with your presence.', note: 'The art of lasting style is knowing exactly what to leave out.' },
    casual:     { quote: 'The best outfit is the one you forget you\'re wearing.', note: 'Comfort isn\'t a compromise — it\'s a considered choice.' },
    streetwear: { quote: 'Your clothes are your first language.', note: 'Street culture made fashion personal, permanent, and loud.' },
    minimalist: { quote: 'Simplicity is the ultimate sophistication.', note: 'A wardrobe of fewer, better things is the most radical choice you can make.' },
    elegant:    { quote: 'Elegance is not about being noticed — it\'s about being remembered.', note: 'Silk moves. Pearls glow. Some things are simply worth it.' },
    korean:     { quote: 'Style is a conversation. Make yours soft, sharp, and surprising.', note: 'K-fashion doesn\'t follow trends. It writes them.' },
    y2k:        { quote: 'Low rise. High energy. Zero apologies.', note: 'The 2000s got it right the first time. Now you get to do it better.' },
    vintage:    { quote: 'The best pieces have already been worn and loved.', note: 'Vintage dressing is a form of archaeology — and the finds are always worth it.' },
    softgirl:   { quote: 'Be soft. Be sweet. Be exactly who you are.', note: 'Femininity is not a weakness. It is a whole aesthetic universe.' }
  };
  const closing = CLOSING[s.id] || { quote: 'Dress with intention.', note: 'Your wardrobe tells your story before you say a word.' };

  html += '<section class="ssec ssec-closing">';
  html += '<div class="ssec-inner ssec-closing-inner">';
  html += '<div class="ssec-closing-divider"></div>';
  html += '<blockquote class="ssec-closing-quote">' + closing.quote + '</blockquote>';
  html += '<p class="ssec-closing-note">' + closing.note + '</p>';
  html += '<div class="ssec-closing-ctas">';
  html += '<a href="index.html#styles" class="btn btn-large">Explore all aesthetics</a>';
  html += '<a href="quiz.html" class="ssec-closing-link">Retake the style quiz →</a>';
  html += '</div>';
  html += '<p class="ssec-closing-credit">Curated by <strong>AURA</strong> — dressed with intention.</p>';
  html += '</div></section>';

  root.innerHTML = html;

  // Init fashion shop filter
  (function initFashionShop() {
    var fshopBar = document.querySelector('.fshop-bar');
    if (!fshopBar) return;
    var catBtns = Array.from(document.querySelectorAll('[data-fshop-cat]'));
    var budBtns = Array.from(document.querySelectorAll('[data-fshop-bud]'));
    var allPanels = Array.from(document.querySelectorAll('.fshop-cat-panel'));
    var activeBud = 'all';

    function applyBudget(bud, panel) {
      var p = panel || document.querySelector('.fshop-cat-panel-active');
      if (!p) return;
      p.querySelectorAll('.fshop-tier-block').forEach(function(block) {
        block.style.display = (bud === 'all' || block.dataset.fshopTier === bud) ? '' : 'none';
      });
    }

    catBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var cat = btn.dataset.fshopCat;
        catBtns.forEach(function(b) { b.classList.toggle('fshop-cat-active', b.dataset.fshopCat === cat); });
        allPanels.forEach(function(p) { p.classList.toggle('fshop-cat-panel-active', p.dataset.fshopCat === cat); });
        applyBudget(activeBud);
      });
    });

    budBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        activeBud = btn.dataset.fshopBud;
        budBtns.forEach(function(b) { b.classList.toggle('fshop-bud-active', b.dataset.fshopBud === activeBud); });
        applyBudget(activeBud);
      });
    });
  })();

  // Scroll to top after render — overrides browser scroll restoration
  requestAnimationFrame(() => window.scrollTo(0, 0));

  // Wire up save buttons on inspo grid
  document.querySelectorAll('[data-save-id]').forEach(btn => {
    if (btn._wired) return;
    btn._wired = true;
    if (typeof isSaved === 'function' && isSaved(btn.dataset.saveId)) btn.classList.add('saved');
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      const item = { id: btn.dataset.saveId, img: btn.dataset.saveImg, label: btn.dataset.saveLabel || '', style: btn.dataset.saveStyle || '' };
      const added = typeof toggleMoodboard === 'function' ? toggleMoodboard(item) : false;
      btn.classList.toggle('saved', added);
      if (typeof showToast === 'function') showToast(added ? 'Saved to moodboard ✦' : 'Removed from moodboard');
    });
  });
})();
