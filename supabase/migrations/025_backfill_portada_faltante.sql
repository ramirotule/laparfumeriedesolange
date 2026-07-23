-- =========================================================
-- Productos importados antes del fix de portada en BulkImportModal
-- quedaron con imagen_url NULL a pesar de tener fotos en
-- imagenes_adicionales. Promovemos la primera foto adicional
-- a portada para esos casos.
-- =========================================================

UPDATE productos
SET imagen_url = imagenes_adicionales[1],
    imagenes_adicionales = imagenes_adicionales[2:array_length(imagenes_adicionales, 1)]
WHERE imagen_url IS NULL
  AND imagenes_adicionales IS NOT NULL
  AND array_length(imagenes_adicionales, 1) > 0;
