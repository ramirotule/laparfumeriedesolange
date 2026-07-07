-- =========================================================
-- La Parfumerie — Recategorización Skincare + Bienestar
-- Corrige productos mal asignados a "Internacionales" por 012
-- Fuente: bagues.com.ar colecciones cuidados-de-la-piel + bienestar
-- Fecha: 2026-07-06
-- =========================================================
-- Esta migración SOBREESCRIBE subcategoria_id (sin condición IS NULL)
-- para garantizar que productos de skincare/bienestar queden bien,
-- independientemente de lo que haya asignado la migración 012.
-- =========================================================

-- =========================================================
-- CUIDADO FACIAL
-- =========================================================
UPDATE productos
SET subcategoria_id = (
  SELECT s.id FROM subcategorias s
  JOIN categorias c ON c.id = s.categoria_id
  WHERE lower(s.slug) = 'cuidado-facial'
  LIMIT 1
)
WHERE lower(nombre) ~ '(crema facial|serum facial|espuma.*limpieza|loción micelar|exfoliante facial|kit rutina|desmaquillante|emulsión.*limpieza.*facial|leche desmaquillante|bruma facial|jabón detox|protector solar facial|autobronceante|lápiz secativo|lapiz secativo|tónico facial|tonico facial|contorno de ojos)';

-- =========================================================
-- CUIDADO CORPORAL
-- =========================================================
UPDATE productos
SET subcategoria_id = (
  SELECT s.id FROM subcategorias s
  JOIN categorias c ON c.id = s.categoria_id
  WHERE lower(s.slug) = 'cuidado-corporal'
  LIMIT 1
)
WHERE lower(nombre) ~ '(crema de manos|crema corporal|jabón líquido|jabón intimo|jabón íntimo|desodorante antitranspirante|emulsión corporal|exfoliante corporal|body butter|brillo de luna body mist|body mist)';

-- =========================================================
-- BIENESTAR — Aceites Esenciales
-- =========================================================
UPDATE productos
SET subcategoria_id = (
  SELECT s.id FROM subcategorias s
  JOIN categorias c ON c.id = s.categoria_id
  WHERE lower(s.slug) = 'aceites-esenciales'
  LIMIT 1
)
WHERE lower(nombre) ~ '(aceite esencial|aceite cosmetológico|aceite cosmetologico|aceite de coco|oleo corporal|blend aceites|blend corporal|cream oil|criogel|body butter.*25g|duo aceites|duo antistress)';

-- =========================================================
-- BIENESTAR — Brumas de Almohada
-- =========================================================
UPDATE productos
SET subcategoria_id = (
  SELECT s.id FROM subcategorias s
  JOIN categorias c ON c.id = s.categoria_id
  WHERE lower(s.slug) = 'brumas-almohada'
  LIMIT 1
)
WHERE lower(nombre) LIKE '%bruma de almohada%';

-- =========================================================
-- BIENESTAR — Tratamientos
-- =========================================================
UPDATE productos
SET subcategoria_id = (
  SELECT s.id FROM subcategorias s
  JOIN categorias c ON c.id = s.categoria_id
  WHERE lower(s.slug) = 'tratamientos'
  LIMIT 1
)
WHERE lower(nombre) ~ '(spray eucalipto|bruma ultrahidratante|tratamiento fortalecedor|crema para masajes)';

-- =========================================================
-- BIENESTAR — Bálsamos
-- =========================================================
UPDATE productos
SET subcategoria_id = (
  SELECT s.id FROM subcategorias s
  JOIN categorias c ON c.id = s.categoria_id
  WHERE lower(s.slug) = 'balsamos'
  LIMIT 1
)
WHERE lower(nombre) ~ '(bálsamo|balsamo|crema de enebro|crema de tomillo|crema de tea tree|crema de lavanda|crema de caléndula|crema manzanilla|crema para masajes)';
