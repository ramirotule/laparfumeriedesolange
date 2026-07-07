-- =========================================================
-- La Parfumerie — Sincronizar categoria_id desde subcategoria_id
-- Corrige: productos con subcategoria_id asignado pero categoria_id
-- desactualizado (apuntando aún a Fragancias u otro valor viejo).
-- =========================================================

UPDATE productos p
SET categoria_id = s.categoria_id
FROM subcategorias s
WHERE s.id = p.subcategoria_id
  AND p.categoria_id IS DISTINCT FROM s.categoria_id;
