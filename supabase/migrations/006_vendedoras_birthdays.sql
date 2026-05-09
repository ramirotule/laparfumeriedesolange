-- Adición de fecha de nacimiento a vendedoras
ALTER TABLE vendedoras ADD COLUMN IF NOT EXISTS fecha_nacimiento DATE;
