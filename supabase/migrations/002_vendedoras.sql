-- Tabla de vendedoras
CREATE TABLE IF NOT EXISTS vendedoras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  telefono TEXT,
  email TEXT,
  activo BOOLEAN NOT NULL DEFAULT true,
  notas TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: solo admins pueden operar
ALTER TABLE vendedoras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access vendedoras"
  ON vendedoras
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM perfiles
      WHERE perfiles.id = auth.uid()
        AND perfiles.rol = 'admin'
    )
  );

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vendedoras_updated_at
  BEFORE UPDATE ON vendedoras
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
