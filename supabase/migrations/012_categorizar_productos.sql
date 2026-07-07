-- =========================================================
-- La Parfumerie — Categorización de productos existentes
-- =========================================================
-- Aplica subcategoria_id y genero a los productos del stock
-- basado en nombres de productos de Bagués.
-- Idempotente: se puede correr más de una vez sin daño.
-- =========================================================

-- =========================================================
-- FRAGANCIAS ÁRABES
-- =========================================================
-- Asigna subcategoría "Árabes" a todos los productos cuyo
-- nombre contiene palabras clave de la línea árabe de Bagués.

UPDATE productos
SET subcategoria_id = (
  SELECT s.id FROM subcategorias s
  JOIN categorias c ON c.id = s.categoria_id
  WHERE lower(s.slug) = 'arabes'
  LIMIT 1
)
WHERE lower(nombre) ~ '(marrakech|zayed|sahara|shali|dubai|doha|abu dabi|al hamra|jeddah)'
  AND subcategoria_id IS NULL;

-- Géneros por nombre de perfume árabe (según bagues.com.ar)
UPDATE productos SET genero = 'Unisex'    WHERE lower(nombre) LIKE '%marrakech%';
UPDATE productos SET genero = 'Femenino'  WHERE lower(nombre) LIKE '%zayed%';
UPDATE productos SET genero = 'Femenino'  WHERE lower(nombre) LIKE '%sahara%';
UPDATE productos SET genero = 'Femenino'  WHERE lower(nombre) LIKE '%shali%';
UPDATE productos SET genero = 'Masculino' WHERE lower(nombre) LIKE '%dubai%';
UPDATE productos SET genero = 'Femenino'  WHERE lower(nombre) LIKE '%doha%';
UPDATE productos SET genero = 'Masculino' WHERE lower(nombre) ~ 'abu.?dabi';
UPDATE productos SET genero = 'Masculino' WHERE lower(nombre) ~ 'al.?hamra';
UPDATE productos SET genero = 'Masculino' WHERE lower(nombre) LIKE '%jeddah%';

-- =========================================================
-- FRAGANCIAS INTERNACIONALES
-- =========================================================
-- Todos los perfumes que NO son árabes y tienen subcategoria_id
-- NULL quedan como Internacionales. Ajustá la condición si tenés
-- otra línea (ej: Unlock) que merece su propia subcategoría.

UPDATE productos
SET subcategoria_id = (
  SELECT s.id FROM subcategorias s
  JOIN categorias c ON c.id = s.categoria_id
  WHERE lower(s.slug) = 'internacionales'
  LIMIT 1
)
WHERE subcategoria_id IS NULL
  AND lower(nombre) !~ '(body lotion|perfumero|body splash|crema|serum|aceite)';

-- =========================================================
-- BODY LOTIONS / PERFUMEROS → Cuidados de la Piel > Cuidado Corporal
-- =========================================================

UPDATE productos
SET subcategoria_id = (
  SELECT s.id FROM subcategorias s
  JOIN categorias c ON c.id = s.categoria_id
  WHERE lower(s.slug) = 'cuidado-corporal'
  LIMIT 1
)
WHERE lower(nombre) ~ '(body lotion|body splash|crema corporal)'
  AND subcategoria_id IS NULL;
