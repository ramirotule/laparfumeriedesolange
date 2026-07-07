-- =========================================================
-- La Parfumerie — Actualización precios línea Árabe Bagués
-- Fuente: bagues.com.ar/collections/arabes-1/arabes
-- Fecha: 2026-07-06
-- =========================================================

-- EDP 50ml → $21.999
UPDATE productos SET precio_venta = 21999
WHERE lower(nombre) ~ '(marrakech|zayed|sahara|shali|dubai|doha|jeddah)'
  AND lower(nombre) LIKE '%eau de parfum%'
  AND lower(nombre) NOT LIKE '%perfumero%';

UPDATE productos SET precio_venta = 21999
WHERE lower(nombre) ~ 'abu.?dabi|al.?hamra'
  AND lower(nombre) LIKE '%eau de parfum%'
  AND lower(nombre) NOT LIKE '%perfumero%';

-- Perfumeros 20ml → $9.999
UPDATE productos SET precio_venta = 9999
WHERE lower(nombre) LIKE '%perfumero%'
  AND lower(nombre) ~ '(marrakech|sahara|dubai|shali|doha|abu.?dabi)';

-- Body Lotions → $5.999
UPDATE productos SET precio_venta = 5999
WHERE lower(nombre) LIKE '%body lotion%'
  AND lower(nombre) ~ '(marrakech|sahara|shali)';
