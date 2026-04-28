-- Función updated_at (se crea si no existe por migration anterior)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS pedidos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_pedido TEXT UNIQUE NOT NULL,
  cliente_nombre TEXT NOT NULL,
  cliente_apellido TEXT NOT NULL,
  cliente_telefono TEXT NOT NULL,
  cliente_email TEXT,
  cliente_direccion TEXT,
  cliente_notas TEXT,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  total NUMERIC NOT NULL,
  metodo_pago TEXT NOT NULL CHECK (metodo_pago IN ('efectivo', 'transferencia', 'mercadopago')),
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmado', 'pagado', 'cancelado')),
  mp_preference_id TEXT,
  mp_payment_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede crear un pedido (checkout público)
DROP POLICY IF EXISTS "Public can insert pedidos" ON pedidos;
CREATE POLICY "Public can insert pedidos"
  ON pedidos FOR INSERT
  WITH CHECK (true);

-- Cualquiera puede ver un pedido por su ID (UUID como secreto)
DROP POLICY IF EXISTS "Public can view pedidos" ON pedidos;
CREATE POLICY "Public can view pedidos"
  ON pedidos FOR SELECT
  USING (true);

-- Solo admins pueden actualizar / eliminar
DROP POLICY IF EXISTS "Admins can manage pedidos" ON pedidos;
CREATE POLICY "Admins can manage pedidos"
  ON pedidos FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM perfiles
      WHERE perfiles.id = auth.uid()
        AND perfiles.rol = 'admin'
    )
  );

-- Trigger updated_at
DROP TRIGGER IF EXISTS pedidos_updated_at ON pedidos;
CREATE TRIGGER pedidos_updated_at
  BEFORE UPDATE ON pedidos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
