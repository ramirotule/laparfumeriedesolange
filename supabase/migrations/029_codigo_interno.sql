-- =========================================================
-- La Parfumerie — Agrega columna codigo_interno a productos
-- Código propio por categoría (ej: FRA-001, ARO-002) para
-- identificar productos en el local. Se completa manualmente
-- o vía importación masiva; los productos existentes quedan
-- en NULL hasta que se les asigne un código.
--
-- Índice único parcial: evita códigos duplicados entre
-- productos que sí tienen código cargado, sin bloquear los
-- múltiples productos que todavía están en NULL.
-- =========================================================

ALTER TABLE productos
  ADD COLUMN IF NOT EXISTS codigo_interno TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_productos_codigo_interno
  ON productos(codigo_interno)
  WHERE codigo_interno IS NOT NULL;
