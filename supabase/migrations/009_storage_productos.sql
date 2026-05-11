-- 1. Crear el bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('productos', 'productos', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Permiso de Lectura (Público)
CREATE POLICY "Public Read" ON storage.objects FOR SELECT USING ( bucket_id = 'productos' );

-- 3. Permiso de Subida (Admin)
CREATE POLICY "Admin Insert" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'productos' AND (EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol = 'admin'))
);

-- 4. Permiso de Edición (Admin)
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING (
  bucket_id = 'productos' AND (EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol = 'admin'))
);

-- 5. Permiso de Borrado (Admin)
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (
  bucket_id = 'productos' AND (EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol = 'admin'))
);
