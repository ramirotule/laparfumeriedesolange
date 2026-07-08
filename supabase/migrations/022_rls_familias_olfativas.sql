-- =========================================================
-- La Parfumerie — RLS policies for familias_olfativas
-- =========================================================

ALTER TABLE familias_olfativas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "familias_olfativas_read_public" ON familias_olfativas;
CREATE POLICY "familias_olfativas_read_public" ON familias_olfativas
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "familias_olfativas_admin_all" ON familias_olfativas;
CREATE POLICY "familias_olfativas_admin_all" ON familias_olfativas
  FOR ALL USING (
    EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol = 'admin')
  );
