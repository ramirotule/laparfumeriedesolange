-- =========================================================
-- La Parfumerie — Subcategorías (idempotente)
-- =========================================================

-- Crear tabla si no existe (por si no fue creada antes)
CREATE TABLE IF NOT EXISTS subcategorias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  categoria_id UUID REFERENCES categorias(id) ON DELETE CASCADE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(categoria_id, slug)
);

-- Agregar columna activo si no existe (tabla preexistente no la tenía)
ALTER TABLE subcategorias
  ADD COLUMN IF NOT EXISTS activo BOOLEAN DEFAULT TRUE;

CREATE INDEX IF NOT EXISTS idx_subcategorias_categoria ON subcategorias(categoria_id);

-- FK en productos
ALTER TABLE productos
  ADD COLUMN IF NOT EXISTS subcategoria_id UUID REFERENCES subcategorias(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_productos_subcategoria ON productos(subcategoria_id);

-- RLS
ALTER TABLE subcategorias ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "subcategorias_read_public" ON subcategorias;
CREATE POLICY "subcategorias_read_public" ON subcategorias
  FOR SELECT USING (activo = TRUE);

DROP POLICY IF EXISTS "subcategorias_admin_all" ON subcategorias;
CREATE POLICY "subcategorias_admin_all" ON subcategorias
  FOR ALL USING (
    EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol = 'admin')
  );

-- =========================================================
-- SEED: subcategorías por categoría
-- =========================================================

-- Fragancias
INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Internacionales', 'internacionales', 1
FROM categorias WHERE lower(nombre) = 'fragancias'
ON CONFLICT (categoria_id, slug) DO NOTHING;

INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Árabes', 'arabes', 2
FROM categorias WHERE lower(nombre) = 'fragancias'
ON CONFLICT (categoria_id, slug) DO NOTHING;

-- Cuidados de la Piel
INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Cuidado Facial', 'cuidado-facial', 1
FROM categorias WHERE lower(nombre) LIKE '%piel%'
ON CONFLICT (categoria_id, slug) DO NOTHING;

INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Cuidado Corporal', 'cuidado-corporal', 2
FROM categorias WHERE lower(nombre) LIKE '%piel%'
ON CONFLICT (categoria_id, slug) DO NOTHING;

INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Tipos de Piel', 'tipos-de-piel', 3
FROM categorias WHERE lower(nombre) LIKE '%piel%'
ON CONFLICT (categoria_id, slug) DO NOTHING;

INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Línea', 'linea', 4
FROM categorias WHERE lower(nombre) LIKE '%piel%'
ON CONFLICT (categoria_id, slug) DO NOTHING;

-- Bienestar
INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Aceites Esenciales', 'aceites-esenciales', 1
FROM categorias WHERE lower(nombre) = 'bienestar'
ON CONFLICT (categoria_id, slug) DO NOTHING;

INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Brumas de Almohadas', 'brumas-almohada', 2
FROM categorias WHERE lower(nombre) = 'bienestar'
ON CONFLICT (categoria_id, slug) DO NOTHING;

INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Tratamientos', 'tratamientos', 3
FROM categorias WHERE lower(nombre) = 'bienestar'
ON CONFLICT (categoria_id, slug) DO NOTHING;

INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Bálsamos', 'balsamos', 4
FROM categorias WHERE lower(nombre) = 'bienestar'
ON CONFLICT (categoria_id, slug) DO NOTHING;

-- Aromatizantes
INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Aromatizantes Ambientales', 'aromatizantes-ambientales', 1
FROM categorias WHERE lower(nombre) = 'aromatizantes'
ON CONFLICT (categoria_id, slug) DO NOTHING;

INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Difusores', 'difusores', 2
FROM categorias WHERE lower(nombre) = 'aromatizantes'
ON CONFLICT (categoria_id, slug) DO NOTHING;

INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Ropa', 'ropa', 3
FROM categorias WHERE lower(nombre) = 'aromatizantes'
ON CONFLICT (categoria_id, slug) DO NOTHING;

INSERT INTO subcategorias (categoria_id, nombre, slug, orden)
SELECT id, 'Esenciales', 'esenciales', 4
FROM categorias WHERE lower(nombre) = 'aromatizantes'
ON CONFLICT (categoria_id, slug) DO NOTHING;
