-- =========================================================
-- La Parfumerie — Actualización de familias olfativas
-- Sincroniza las descripciones con las notas definidas por la tienda
-- =========================================================

UPDATE familias_olfativas SET descripcion = 'Rosas, jazmines, flores del jardín. Delicadas y románticas.'
WHERE nombre = 'Floral';

UPDATE familias_olfativas SET descripcion = 'Ámbar, vainilla, especias exóticas. Cálidas y sensuales.'
WHERE nombre = 'Oriental';

UPDATE familias_olfativas SET descripcion = 'Sándalo, cedro, oud. Profundas y sofisticadas.'
WHERE nombre = 'Amaderado';

UPDATE familias_olfativas SET descripcion = 'Cítricos, acuático, aromático. Ligeras y energizantes.'
WHERE nombre = 'Fresco';

UPDATE familias_olfativas SET descripcion = 'Bergamota, musgo, labdanum. Elegantes y clásicas.'
WHERE nombre = 'Chipre';

UPDATE familias_olfativas SET descripcion = 'Vainilla, caramelo, tonka. Dulces e irresistibles.'
WHERE nombre = 'Gourmand';
