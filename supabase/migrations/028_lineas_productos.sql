-- =========================================================
-- La Parfumerie — Líneas de productos (idempotente)
-- Agrupa variantes del mismo perfume/línea bajo distintas
-- marcas o formatos (ej: Bagués vs Unlock, perfume + body splash).
-- =========================================================

CREATE TABLE IF NOT EXISTS lineas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FK en productos
ALTER TABLE productos
  ADD COLUMN IF NOT EXISTS linea_id UUID REFERENCES lineas(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_productos_linea ON productos(linea_id);

-- RLS
ALTER TABLE lineas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "lineas_read_public" ON lineas;
CREATE POLICY "lineas_read_public" ON lineas
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "lineas_admin_all" ON lineas;
CREATE POLICY "lineas_admin_all" ON lineas
  FOR ALL USING (
    EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol = 'admin')
  );
