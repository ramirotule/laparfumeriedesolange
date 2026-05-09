-- Agregar columna categoria a perfumes
ALTER TABLE perfumes ADD COLUMN IF NOT EXISTS categoria VARCHAR(100);
CREATE INDEX IF NOT EXISTS idx_perfumes_categoria ON perfumes(categoria);
