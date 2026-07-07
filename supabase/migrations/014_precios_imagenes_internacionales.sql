-- =========================================================
-- La Parfumerie — Precios e imágenes Fragancias Internacionales
-- Fuente: bagues.com.ar/collections/fragancias-1/internacionales
-- Fecha: 2026-07-06
-- =========================================================
-- Estrategia de precios:
--   Estándar  → $19.999
--   Premium   → $25.699 (Torino, Sidney, Bellagio, Mónaco Red,
--                         Amsterdam Masc, Siena)
--   Especial  → $21.999 (Barcelona) — Zayed ya cubierto en 013
-- =========================================================

-- ---------------------------------------------------------
-- PRECIO ESTÁNDAR — $19.999
-- ---------------------------------------------------------
UPDATE productos SET precio_venta = 19999
WHERE lower(nombre) ~ '(granada|atenas|charlotte|miami|ginebra|bangkok|prades|mumbai|arizona|marsella|amsterdam femen|milan|milán|new york sexy|brujas|esparta|mykonos|paris cristal|parís cristal|tokio flower|las vegas|manhattan black|york|capri|angers|new york femen|queens|singapour|amalfi|londres)'
  AND lower(nombre) LIKE '%eau de parfum%';

-- ---------------------------------------------------------
-- PRECIO PREMIUM — $25.699
-- ---------------------------------------------------------
UPDATE productos SET precio_venta = 25699
WHERE lower(nombre) ~ '(torino|sidney|bellagio|monaco red|mónaco red|amsterdam masc|siena)'
  AND lower(nombre) LIKE '%eau de parfum%';

-- ---------------------------------------------------------
-- PRECIO ESPECIAL — $21.999
-- ---------------------------------------------------------
UPDATE productos SET precio_venta = 21999
WHERE lower(nombre) LIKE '%barcelona%'
  AND lower(nombre) LIKE '%eau de parfum%';

-- ---------------------------------------------------------
-- IMÁGENES — CDN Bagués
-- Sólo actualiza si imagen_url está vacía o es NULL.
-- Para forzar actualización quitá la condición del WHERE.
-- ---------------------------------------------------------
UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/fotoproducto-FI-granada.png?v=1770304636'
  WHERE lower(nombre) LIKE '%granada%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/BATNSIF50_1_ae7bfaf9-d03c-47a3-9f93-1d9c4117a459.png?v=1756850860'
  WHERE lower(nombre) LIKE '%atenas intense%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/0015_Atenas.png?v=1772111119'
  WHERE lower(nombre) LIKE '%atenas%' AND lower(nombre) NOT LIKE '%intense%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/BCHTTF50_1_bf447f8f-44c9-4c24-a94d-7d4d33590cbb.png?v=1756850902'
  WHERE lower(nombre) LIKE '%charlotte%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Transparente_0005_Miami-her.png?v=1763050494'
  WHERE lower(nombre) LIKE '%miami%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/BGINEF50_1_683d9eb5-186f-4987-8101-febb75434cdd.png?v=1756851004'
  WHERE lower(nombre) LIKE '%ginebra%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/BBANGF50_1_6bd23fef-130d-4c03-817c-3e80bd14656e.png?v=1756850871'
  WHERE lower(nombre) LIKE '%bangkok%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/BTORIM50_1_833788f1-6e55-472a-ba07-acfbd6b3c06b.png?v=1756851328'
  WHERE lower(nombre) LIKE '%torino%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Foto-Producto-08Ago2025-B_0000_Prades.png?v=1761593433'
  WHERE lower(nombre) LIKE '%prades%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Foto_Producto_08Ago2025_0003_Mumbai.png?v=1756911303'
  WHERE lower(nombre) LIKE '%mumbai%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Foto_Producto_08Ago2025_0012_Arizona.png?v=1756911353'
  WHERE lower(nombre) LIKE '%arizona%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Productos_0011_Marsella.png?v=1756910987'
  WHERE lower(nombre) LIKE '%marsella%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Foto_Producto_08Ago2025_0001_Sidney.png?v=1756911288'
  WHERE lower(nombre) LIKE '%sidney%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Productos_0016_Amsterdan.png?v=1756911066'
  WHERE lower(nombre) ~ 'amsterdam femen' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/FotoProducto-Dic2025_0004_Milan.png?v=1770735402'
  WHERE lower(nombre) ~ 'mil[aá]n' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Productos_0010_New_York_Sexy.png?v=1756910811'
  WHERE lower(nombre) LIKE '%new york sexy%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Productos_0014_Brujas.png?v=1756911044'
  WHERE lower(nombre) LIKE '%brujas%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Productos_0015_Bellagio.png?v=1756911052'
  WHERE lower(nombre) LIKE '%bellagio%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/BSPRTM50_1_ed3f100f-1ee5-4b44-9cd4-139f79871e3e.png?v=1756850984'
  WHERE lower(nombre) LIKE '%esparta%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Productos_0008_Siena.png?v=1756911074'
  WHERE lower(nombre) LIKE '%siena%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Foto-Producto-08Ago2025-B_0007_Monaco_red_2025_frasco_frente_transparente_montaje_1.png?v=1758633713'
  WHERE lower(nombre) ~ 'm[oó]naco red' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Foto-Producto-08Ago2025-B_0005_Mykonos_2025_frasco_frente_transparente_montaje_1.png?v=1758632905'
  WHERE lower(nombre) LIKE '%mykonos%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Foto-Producto-08Ago2025-B_0001_Paris.png?v=1761594941'
  WHERE lower(nombre) ~ 'par[ií]s cristal' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Productos_0007_Tokio_Flower.png?v=1756911083'
  WHERE lower(nombre) LIKE '%tokio flower%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Productos_0012_Las_Vegas.png?v=1756910974'
  WHERE lower(nombre) LIKE '%las vegas%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/FotoProducto_0008_Manhattan_Black_2025_frasco_frente_montaje_2.png?v=1768312609'
  WHERE lower(nombre) LIKE '%manhattan black%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/FotoProducto_0020_Amsterdam_mas_2025_frasco_frente_transparente_montaje_1.png?v=1765888921'
  WHERE lower(nombre) ~ 'amsterdam masc' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/FotoProducto_0019_Barcelona_2025_frasco_frente_transparente_montaje_1.png?v=1765888969'
  WHERE lower(nombre) LIKE '%barcelona%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/York-transp.png?v=1772205877'
  WHERE lower(nombre) = 'york eau de parfum';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/FotoProducto-Dic2025_0007_Capri.png?v=1770735255'
  WHERE lower(nombre) LIKE '%capri%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Foto-Producto-08Ago2025-B_0017_Angers.png?v=1761595456'
  WHERE lower(nombre) LIKE '%angers%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Foto-Producto-08Ago2025-B_0003_New-York.png?v=1761595096'
  WHERE lower(nombre) ~ 'new york femen' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/FotoProducto_0006_Queens_2025_frasco_frente_transparente_montaje_1.png?v=1765889376'
  WHERE lower(nombre) LIKE '%queens%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/BRHANM50_1_ad7f9af8-27f1-4274-bd32-37a7055f5821.png?v=1756851307'
  WHERE lower(nombre) LIKE '%singapour%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/FotoProducto-Dic2025_0011_Amalfi.png?v=1770734959'
  WHERE lower(nombre) LIKE '%amalfi%' AND lower(nombre) LIKE '%eau de parfum%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/BLONDM50_1_989a6022-2743-4aa1-918c-7472d8526890.png?v=1756851077'
  WHERE lower(nombre) LIKE '%londres%' AND lower(nombre) LIKE '%eau de parfum%';

-- =========================================================
-- IMÁGENES ÁRABES (complementa migración 013)
-- =========================================================
UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Transparente_0000_Zayed.png?v=1763050712'
  WHERE lower(nombre) LIKE '%zayed%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Transparente_0003_Sahara.png?v=1763050712'
  WHERE lower(nombre) LIKE '%sahara%' AND lower(nombre) NOT LIKE '%body lotion%';

UPDATE productos SET imagen_url = 'https://www.bagues.com.ar/cdn/shop/files/Transparente_0001_Dubai.png?v=1763050712'
  WHERE lower(nombre) LIKE '%dubai%' AND lower(nombre) NOT LIKE '%body lotion%';
