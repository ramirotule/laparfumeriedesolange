-- =========================================================
-- La Parfumerie - Esquema de Base de Datos
-- Supabase / PostgreSQL
-- =========================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "unaccent";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =========================================================
-- TABLA: familias_olfativas
-- =========================================================
CREATE TABLE IF NOT EXISTS familias_olfativas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion TEXT,
  icono_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO familias_olfativas (nombre, descripcion) VALUES
  ('Floral', 'Fragancias dominadas por flores: rosa, jazmín, lirio, nardo.'),
  ('Oriental', 'Cálidas y especiadas: ámbar, vainilla, resinas, especias exóticas.'),
  ('Amaderado', 'Sándalos, cedro, pachulí, madera de oud.'),
  ('Fresco', 'Acuático, cítrico, aromático. Ligero y energizante.'),
  ('Chipre', 'Bergamota, musgo de roble, labdanum. Elegante y sofisticado.'),
  ('Fougère', 'Lavanda, cumarina, musgo. Clásico masculino.'),
  ('Gourmand', 'Notas comestibles: caramelo, chocolate, vainilla.'),
  ('Árabe / Oud', 'Oud, ambar, musk oriental, rosa árabe. Intenso y persistente.');

-- =========================================================
-- TABLA: perfumes
-- =========================================================
CREATE TABLE IF NOT EXISTS perfumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(200) NOT NULL,
  marca VARCHAR(200) NOT NULL,
  slug VARCHAR(250) UNIQUE,
  descripcion TEXT NOT NULL,
  descripcion_corta VARCHAR(500),
  precio_costo DECIMAL(10, 2),
  precio_venta DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  imagen_url TEXT,
  imagenes_adicionales TEXT[],
  familia_olfativa_id INTEGER REFERENCES familias_olfativas(id),
  genero VARCHAR(20) CHECK (genero IN ('Femenino', 'Masculino', 'Unisex', 'Árabe')) NOT NULL,
  concentracion VARCHAR(50), -- EDP, EDT, Parfum, etc.
  volumen_ml INTEGER,
  activo BOOLEAN DEFAULT TRUE,
  destacado BOOLEAN DEFAULT FALSE,
  nuevo BOOLEAN DEFAULT FALSE,
  meta_titulo VARCHAR(160),
  meta_descripcion VARCHAR(320),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance y búsqueda
CREATE INDEX IF NOT EXISTS idx_perfumes_slug ON perfumes(slug);
CREATE INDEX IF NOT EXISTS idx_perfumes_marca ON perfumes(marca);
CREATE INDEX IF NOT EXISTS idx_perfumes_genero ON perfumes(genero);
CREATE INDEX IF NOT EXISTS idx_perfumes_familia ON perfumes(familia_olfativa_id);
CREATE INDEX IF NOT EXISTS idx_perfumes_activo ON perfumes(activo);
-- Índice de búsqueda full-text (sin unaccent para evitar el error IMMUTABLE)
CREATE INDEX IF NOT EXISTS idx_perfumes_search ON perfumes USING GIN(
  to_tsvector('spanish', nombre || ' ' || marca || ' ' || descripcion)
);

-- =========================================================
-- TABLA: notas_aromaticas
-- =========================================================
CREATE TABLE IF NOT EXISTS notas_aromaticas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  categoria VARCHAR(50) CHECK (categoria IN ('salida', 'corazon', 'fondo')) NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notas comunes pre-cargadas
INSERT INTO notas_aromaticas (nombre, categoria) VALUES
  -- Notas de salida
  ('Bergamota', 'salida'),
  ('Limón', 'salida'),
  ('Naranja', 'salida'),
  ('Mandarina', 'salida'),
  ('Pomelo', 'salida'),
  ('Lavanda', 'salida'),
  ('Menta', 'salida'),
  ('Pimienta Rosa', 'salida'),
  -- Notas de corazón
  ('Rosa', 'corazon'),
  ('Jazmín', 'corazon'),
  ('Iris', 'corazon'),
  ('Tuberosa', 'corazon'),
  ('Neroli', 'corazon'),
  ('Peonía', 'corazon'),
  ('Ylang Ylang', 'corazon'),
  ('Canela', 'corazon'),
  ('Cardamomo', 'corazon'),
  -- Notas de fondo
  ('Sándalo', 'fondo'),
  ('Cedro', 'fondo'),
  ('Vetiver', 'fondo'),
  ('Pachulí', 'fondo'),
  ('Musgo', 'fondo'),
  ('Oud', 'fondo'),
  ('Ámbar', 'fondo'),
  ('Vainilla', 'fondo'),
  ('Almizcle Blanco', 'fondo'),
  ('Labdanum', 'fondo'),
  ('Benjuí', 'fondo');

-- =========================================================
-- TABLA: perfume_notas (relación muchos a muchos)
-- =========================================================
CREATE TABLE IF NOT EXISTS perfume_notas (
  perfume_id UUID REFERENCES perfumes(id) ON DELETE CASCADE,
  nota_id INTEGER REFERENCES notas_aromaticas(id) ON DELETE CASCADE,
  PRIMARY KEY (perfume_id, nota_id)
);

CREATE INDEX IF NOT EXISTS idx_perfume_notas_nota ON perfume_notas(nota_id);

-- =========================================================
-- TABLA: usuarios (extiende auth.users de Supabase)
-- =========================================================
CREATE TABLE IF NOT EXISTS perfiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nombre VARCHAR(200),
  rol VARCHAR(20) DEFAULT 'cliente' CHECK (rol IN ('admin', 'cliente')),
  telefono VARCHAR(30),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- FUNCIÓN: auto-generar slug limpio
-- =========================================================
CREATE OR REPLACE FUNCTION generar_slug(texto TEXT, marca TEXT)
RETURNS TEXT AS $$
DECLARE
  slug_base TEXT;
  slug_final TEXT;
  contador INTEGER := 0;
BEGIN
  slug_base := lower(
    regexp_replace(
      unaccent(texto || '-' || marca),
      '[^a-z0-9]+', '-', 'g'
    )
  );
  slug_base := trim(both '-' from slug_base);
  slug_final := slug_base;

  WHILE EXISTS (SELECT 1 FROM perfumes WHERE slug = slug_final) LOOP
    contador := contador + 1;
    slug_final := slug_base || '-' || contador;
  END LOOP;

  RETURN slug_final;
END;
$$ LANGUAGE plpgsql;

-- =========================================================
-- TRIGGER: auto-slug y updated_at en perfumes
-- =========================================================
CREATE OR REPLACE FUNCTION handle_perfume_upsert()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-slug si no viene definido
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generar_slug(NEW.nombre, NEW.marca);
  END IF;

  -- Auto meta_titulo SEO si no viene definido
  IF NEW.meta_titulo IS NULL OR NEW.meta_titulo = '' THEN
    NEW.meta_titulo := 'Perfume ' || NEW.nombre || ' ' || NEW.marca ||
      ' en Santa Rosa - La Parfumerie';
  END IF;

  -- Auto meta_descripcion SEO
  IF NEW.meta_descripcion IS NULL OR NEW.meta_descripcion = '' THEN
    NEW.meta_descripcion := 'Comprá ' || NEW.nombre || ' de ' || NEW.marca ||
      ' en La Parfumerie, Santa Rosa La Pampa. Envío gratis. Precio: $' ||
      NEW.precio_venta::TEXT;
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_perfume_upsert
BEFORE INSERT OR UPDATE ON perfumes
FOR EACH ROW EXECUTE FUNCTION handle_perfume_upsert();

-- =========================================================
-- TRIGGER: crear perfil al registrar usuario
-- =========================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO perfiles (id, nombre)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =========================================================
-- ROW LEVEL SECURITY (RLS)
-- =========================================================
ALTER TABLE perfumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfume_notas ENABLE ROW LEVEL SECURITY;

-- Perfumes: todos pueden leer los activos
CREATE POLICY "perfumes_read_public" ON perfumes
  FOR SELECT USING (activo = TRUE);

-- Perfumes: solo admins pueden modificar
CREATE POLICY "perfumes_admin_all" ON perfumes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol = 'admin')
  );

-- Perfiles: cada usuario ve el suyo
CREATE POLICY "perfiles_own" ON perfiles
  FOR ALL USING (id = auth.uid());

-- Notas de perfumes: lectura pública
CREATE POLICY "perfume_notas_read" ON perfume_notas
  FOR SELECT USING (TRUE);

CREATE POLICY "perfume_notas_admin" ON perfume_notas
  FOR ALL USING (
    EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol = 'admin')
  );

-- =========================================================
-- DATOS DE EJEMPLO (perfumes demo)
-- =========================================================
INSERT INTO perfumes (nombre, marca, descripcion, descripcion_corta, precio_venta, precio_costo, stock, genero, concentracion, volumen_ml, destacado, nuevo)
VALUES
  (
    'Black Orchid',
    'Tom Ford',
    'Una fragancia oriental oscura y sensual. Notas de orquídea negra, especias ricas y madera vetiver. Ideal para noches especiales en Santa Rosa La Pampa.',
    'Fragancia oscura y sensual con orquídea negra.',
    28500, 18000, 5, 'Unisex', 'EDP', 100, TRUE, FALSE
  ),
  (
    'Good Girl',
    'Carolina Herrera',
    'La dualidad entre lo bueno y lo malo. Jazmín y tonka bean crean una fragancia floral gourmand adictiva. Uno de los perfumes más vendidos en Argentina.',
    'Floral gourmand con jazmín y tonka bean.',
    22000, 14000, 8, 'Femenino', 'EDP', 80, TRUE, FALSE
  ),
  (
    'Sauvage',
    'Dior',
    'Fresco, salvaje e intensamente masculino. Bergamota de Calabria y pimienta de Sichuan con una base de ambroxán. Éxito mundial disponible en Santa Rosa.',
    'Fresco e intenso. Bergamota y ambroxán.',
    25000, 16000, 10, 'Masculino', 'EDT', 100, TRUE, TRUE
  ),
  (
    'Oud Wood',
    'Tom Ford',
    'El oud más refinado del mundo. Madera de oud con notas de palo de rosa, cardamomo y sándalo de China. Perfumería árabe de lujo en Santa Rosa La Pampa.',
    'Oud refinado con sándalo y cardamomo.',
    35000, 22000, 3, 'Árabe', 'EDP', 50, TRUE, FALSE
  );
