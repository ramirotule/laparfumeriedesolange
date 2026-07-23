-- =========================================================
-- Familias olfativas compuestas detectadas en la importación
-- de fragancias (PERFUS_ROMI_PROCESADO.xlsx) que no existían
-- en el vocabulario controlado original de familias_olfativas.
-- Se agregan tal cual vienen del proveedor para no dejar
-- productos con familia_olfativa_id NULL.
-- =========================================================

INSERT INTO familias_olfativas (nombre) VALUES
  ('Almizcle Amaderado Floral'),
  ('Almizcle Floral Amaderado'),
  ('Amaderada'),
  ('Amaderada Acuática'),
  ('Amaderada Almizclada'),
  ('Amaderada Ambarada Gourmand'),
  ('Amaderada Aromática'),
  ('Amaderada Aromática Gourmand'),
  ('Amaderada Especiada'),
  ('Amaderada Especiado'),
  ('Amaderada Oriental Especiada'),
  ('Ambar Floral'),
  ('Ambarada Floral'),
  ('Ambarado Amaderado'),
  ('Ambarado Fougére'),
  ('Aromática'),
  ('Aromática Acuática'),
  ('Aromática Fougère'),
  ('Chipre Frutal'),
  ('Chypre Floral'),
  ('Chypre Frutal'),
  ('Cítrica'),
  ('Cítrica Acuática'),
  ('Especiada Amaderada Fresca'),
  ('Floral Acuática'),
  ('Floral Amaderado'),
  ('Floral Chypré'),
  ('Floral Frutal'),
  ('Floral Frutal Gourmand'),
  ('Floral Oriental'),
  ('Floral Oriental Frutal'),
  ('Floriental Frutal'),
  ('Fougére Frutal'),
  ('Oriental Amaderado'),
  ('Oriental Floral'),
  ('Oriental Fougère'),
  ('Oriental o Amaderado Ambarado')
ON CONFLICT (nombre) DO NOTHING;
