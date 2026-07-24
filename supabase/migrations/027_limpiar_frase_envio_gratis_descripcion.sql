-- =========================================================
-- La descripción de los productos importados desde
-- PERFUS_ROMI_PROCESADO_IMPORT_READY.xlsx quedó con la frase
-- "Envío gratis dentro de Santa Rosa, La Pampa." pegada al final.
-- El dueño no quiere esa frase ahí (ya está en el banner del header).
-- =========================================================

UPDATE productos
SET descripcion = trim(
  regexp_replace(
    descripcion,
    '\s*Env.o gratis dentro de Santa Rosa,\s*La Pampa\.?',
    '',
    'gi'
  )
)
WHERE descripcion ~* 'Env.o gratis dentro de Santa Rosa,\s*La Pampa';
