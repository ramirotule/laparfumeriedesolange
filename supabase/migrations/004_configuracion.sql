CREATE TABLE IF NOT EXISTS configuracion (
  clave TEXT PRIMARY KEY,
  valor TEXT NOT NULL DEFAULT '',
  descripcion TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read configuracion" ON configuracion;
CREATE POLICY "Public read configuracion"
  ON configuracion FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage configuracion" ON configuracion;
CREATE POLICY "Admins manage configuracion"
  ON configuracion FOR ALL
  USING (EXISTS (
    SELECT 1 FROM perfiles
    WHERE perfiles.id = auth.uid() AND perfiles.rol = 'admin'
  ));

-- Valores por defecto
INSERT INTO configuracion (clave, valor, descripcion) VALUES
  ('cbu',         '',                    'CBU para transferencias bancarias'),
  ('alias_cbu',   '',                    'Alias del CBU'),
  ('titular',     '',                    'Titular de la cuenta bancaria'),
  ('banco',       '',                    'Nombre del banco'),
  ('instagram',   'https://www.instagram.com/laparfumerie.desolange/', 'URL de Instagram'),
  ('whatsapp',    '5492954808202',       'Número de WhatsApp (código país + número)'),
  ('facebook',    '',                    'URL de Facebook'),
  ('tiktok',      '',                    'URL de TikTok')
ON CONFLICT (clave) DO NOTHING;
