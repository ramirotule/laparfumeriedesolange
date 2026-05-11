-- Agregar campos extra a la tabla vendedoras
ALTER TABLE vendedoras 
ADD COLUMN IF NOT EXISTS direccion TEXT,
ADD COLUMN IF NOT EXISTS ciudad TEXT,
ADD COLUMN IF NOT EXISTS provincia TEXT,
ADD COLUMN IF NOT EXISTS codigo_postal TEXT;

-- Asegurar que notas y fecha_nacimiento existan (por las dudas)
ALTER TABLE vendedoras 
ADD COLUMN IF NOT EXISTS notas TEXT,
ADD COLUMN IF NOT EXISTS fecha_nacimiento DATE;
