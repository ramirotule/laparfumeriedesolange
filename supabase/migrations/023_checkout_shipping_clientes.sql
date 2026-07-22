-- Campos de envío y cliente en pedidos
ALTER TABLE pedidos
  ADD COLUMN IF NOT EXISTS cliente_id UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS tipo_entrega TEXT CHECK (
    tipo_entrega IN (
      'domicilio_santa_rosa',
      'domicilio_toay',
      'retiro_tienda',
      'domicilio_interior'
    )
  ),
  ADD COLUMN IF NOT EXISTS costo_envio NUMERIC,
  ADD COLUMN IF NOT EXISTS envio_pendiente_cotizacion BOOLEAN NOT NULL DEFAULT FALSE;

-- Datos extra en perfiles de clientes
ALTER TABLE perfiles
  ADD COLUMN IF NOT EXISTS apellido TEXT,
  ADD COLUMN IF NOT EXISTS direccion TEXT,
  ADD COLUMN IF NOT EXISTS localidad TEXT,
  ADD COLUMN IF NOT EXISTS provincia TEXT;

-- Trigger: crear perfil al registrar (email o Google)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfiles (id, nombre, rol)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    'cliente'
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
