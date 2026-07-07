-- =========================================================
-- La Parfumerie — Agrega columna inspired_in a productos
-- =========================================================

ALTER TABLE productos
  ADD COLUMN IF NOT EXISTS inspired_in TEXT;
