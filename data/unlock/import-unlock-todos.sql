-- ============================================================
-- Importación de productos Unlock → La Parfumerie Supabase
-- Generado: 2026-04-28T02:06:49.940Z
-- Total productos: 58
-- ============================================================

-- Insertar familias olfativas detectadas
INSERT INTO familias_olfativas (nombre, descripcion) VALUES
  ('Floral', 'Floral — Familia olfativa Unlock'),
  ('Oriental', 'Oriental — Familia olfativa Unlock'),
  ('Fougère', 'Fougère — Familia olfativa Unlock'),
  ('Aromática', 'Aromática — Familia olfativa Unlock')
ON CONFLICT (nombre) DO NOTHING;

INSERT INTO perfumes (
  nombre, marca, descripcion, descripcion_corta, precio_venta, precio_costo,
  stock, imagen_url, genero, concentracion, volumen_ml,
  activo, destacado, nuevo, meta_titulo, meta_descripcion
) VALUES
  ('22 HROS FEM', 'Unlock', 'Juventud en Estado Puro

Un perfume que celebra la juventud y la energía con una combinación de frutas exóticas y flores chispeantes. Las notas de salida de mandarina y frambuesa aportan dulzura, mientras que el corazón floral de jazmín y peonía le da una dimensión romántica. Ideal para mujeres jóvenes y dinámicas, perfecto para el día a día o eventos casuales.

Familia Olfativa: Floral-Frutal

Salida: Frambuesa, Mandarina
Corazón: Jazmín, Flor de Naranjo
Fondo: Cedro, Sándalo.', 'Juventud en Estado Puro

Un perfume que celebra la juventud y la energía con una combinación de frutas exóticas y flores chispeantes. Las notas de salida de mandarina y frambuesa aportan dulzura, mientras que el corazón floral de jazmín y peonía le da una dimensión romántica. Ideal para mujeres jóvenes y dinámicas, perfecto para el día a día o eventos casuales.

Familia Olfativa: Floral-Frutal
...', 29999, 17999, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/2_2_h_ro_s_fem_80ml_dfdeefbd-a661-4dfe-ad30-96d48cb34d7f.webp', 'Femenino', 'EDP', 80, TRUE, FALSE, FALSE, '22 HROS FEM Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá 22 HROS FEM de Unlock en La Parfumerie, Santa Rosa La Pampa. Juventud en Estado Puro

Un perfume que celebra la juventud y la energía con una combinación de frutas exóticas y flores. Envío gratis en Santa Rosa.'),
  ('SCNDL FEM', 'Unlock', 'Rebelde y Seductor

Este perfume es un manifiesto de confianza y provocación. Con notas de salida de mandarina y miel, su corazón de jazmín y flor de naranjo despierta los sentidos. La base de benjuí y pachulí añade un toque misterioso. Perfecto para las noches en la ciudad o cualquier ocasión donde quieras brillar.

Familia Olfativa: Oriental-Floral

Salida: Miel, Naranja Amarga, Cítricos
Corazón: Cerezas, Nardos, Flor de Naranjo, Pera, Nardo Índico
Fondo: Haba Tonka, Vainilla, Pachuli, Oud, Almizcle blanco.', 'Rebelde y Seductor

Este perfume es un manifiesto de confianza y provocación. Con notas de salida de mandarina y miel, su corazón de jazmín y flor de naranjo despierta los sentidos. La base de benjuí y pachulí añade un toque misterioso. Perfecto para las noches en la ciudad o cualquier ocasión donde quieras brillar.

Familia Olfativa: Oriental-Floral

Salida: Miel, Naranja Amarga, Cítricos
Cora...', 25499, 15299, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/sc_nd_l_fem_100ml_95f42b4b-352f-4373-9824-e2a0dc8c2237.webp', 'Femenino', 'EDP', 100, TRUE, FALSE, FALSE, 'SCNDL FEM Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá SCNDL FEM de Unlock en La Parfumerie, Santa Rosa La Pampa. Rebelde y Seductor

Este perfume es un manifiesto de confianza y provocación. Con notas de salida de mandarina y miel, s. Envío gratis en Santa Rosa.'),
  ('OLMPA', 'Unlock', 'La Divina Femeninidad

Un perfume que encarna la fuerza y la elegancia. Con notas de salida de mandarina y jengibre, su corazón floral de jazmín y vainilla se complementa con una base de amber. Ideal para mujeres que buscan un aroma atractivo y seductor, perfecto para citas o eventos especiales.

Familia Olfativa: Floriental

Salida: Mandarina Verde, Jazmín de Agua, Flor de Jengibre
Corazón: Vainilla, Notas Saladas
Fondo: Ámbar Gris, Madera de Cachemira, Sándalo.', 'La Divina Femeninidad

Un perfume que encarna la fuerza y la elegancia. Con notas de salida de mandarina y jengibre, su corazón floral de jazmín y vainilla se complementa con una base de amber. Ideal para mujeres que buscan un aroma atractivo y seductor, perfecto para citas o eventos especiales.

Familia Olfativa: Floriental

Salida: Mandarina Verde, Jazmín de Agua, Flor de Jengibre
Corazón: Va...', 22999, 13799, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/ol_mp_a_80ml_57fceea5-74be-4420-b1eb-274aaeb277e5.webp', 'Femenino', 'EDP', 80, TRUE, FALSE, FALSE, 'OLMPA Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá OLMPA de Unlock en La Parfumerie, Santa Rosa La Pampa. La Divina Femeninidad

Un perfume que encarna la fuerza y la elegancia. Con notas de salida de mandarina y jengibre, su . Envío gratis en Santa Rosa.'),
  ('IDLE', 'Unlock', 'Empoderamiento Femenino

Un perfume que celebra el empoderamiento femenino con una combinación de flores blancas y almizcle. La rosa y el jazmín crean un corazón floral embriagador, mientras que las notas cítricas de salida añaden frescura. Ideal para mujeres que buscan una fragancia moderna y luminosa, perfecta para el día y eventos casuales.

Familia Olfativa: Floral-Chypré

Salida: Pera, Bergamota
Corazón: Rosa Damascena, Rosa de Mayo, Jazmín Sambac
Fondo: Almizcle Blanco, Vainilla.', 'Empoderamiento Femenino

Un perfume que celebra el empoderamiento femenino con una combinación de flores blancas y almizcle. La rosa y el jazmín crean un corazón floral embriagador, mientras que las notas cítricas de salida añaden frescura. Ideal para mujeres que buscan una fragancia moderna y luminosa, perfecta para el día y eventos casuales.

Familia Olfativa: Floral-Chypré

Salida: Pera, Ber...', 25999, 15599, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/id_le_75ml_-_2_3699e8c7-d536-43e7-b313-3aa3aa249684.webp', 'Femenino', 'EDP', 75, TRUE, FALSE, FALSE, 'IDLE Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá IDLE de Unlock en La Parfumerie, Santa Rosa La Pampa. Empoderamiento Femenino

Un perfume que celebra el empoderamiento femenino con una combinación de flores blancas y almiz. Envío gratis en Santa Rosa.'),
  ('PUR S FEM', 'Unlock', 'La Seducción en un Frasco

Esta fragancia es un viaje a la feminidad y la tentación. Con notas de salida de flor de azahar y mandarina, su corazón floral de jengibre y jazmín se complementa con una base dulce de vainilla y almizcle. Ideal para mujeres que buscan un aroma cautivador y envolvente, perfecto para noches de fiesta o citas románticas.

Familia Olfativa: Oriental

Salida: Almizcle Ambreta, Notas de Palomitas de Maíz, Vainilla, Ylang Ylang
Corazón: Nerolí, Melocotón, Sándalo
Fondo: Almizcle Blanco, Ámbar, Coco.', 'La Seducción en un Frasco

Esta fragancia es un viaje a la feminidad y la tentación. Con notas de salida de flor de azahar y mandarina, su corazón floral de jengibre y jazmín se complementa con una base dulce de vainilla y almizcle. Ideal para mujeres que buscan un aroma cautivador y envolvente, perfecto para noches de fiesta o citas románticas.

Familia Olfativa: Oriental

Salida: Almizcle Amb...', 25999, 15599, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/pur___s_fem_90ml_-_3_14e8deb2-9d2f-46f3-84cc-58618650ffc7.webp', 'Femenino', 'EDP', 90, TRUE, FALSE, FALSE, 'PUR S FEM Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá PUR S FEM de Unlock en La Parfumerie, Santa Rosa La Pampa. La Seducción en un Frasco

Esta fragancia es un viaje a la feminidad y la tentación. Con notas de salida de flor de azah. Envío gratis en Santa Rosa.'),
  ('22 VP PRTY', 'Unlock', 'Celebración de la Vida Nocturna

Este perfume frutal y festivo es una celebración de la vida nocturna. Las notas de salida de ron y maracuyá ofrecen un toque exótico, mientras que el corazón floral de gardenia le añade un carácter elegante. Ideal para mujeres que buscan un perfume audaz y divertido, perfecto para Noches de fiesta o eventos especiales. 212 VIP Rosé

Familia Olfativa: Floral

Salida: Lichi, Frambuesa, Notas de Licor
Corazón: Notas Marinas, Jazmín
Fondo:Almizcle, Sándalo, Notas Amaderadas.', 'Celebración de la Vida Nocturna

Este perfume frutal y festivo es una celebración de la vida nocturna. Las notas de salida de ron y maracuyá ofrecen un toque exótico, mientras que el corazón floral de gardenia le añade un carácter elegante. Ideal para mujeres que buscan un perfume audaz y divertido, perfecto para Noches de fiesta o eventos especiales. 212 VIP Rosé

Familia Olfativa: Floral

Sal...', 25999, 15599, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/2_2v_pp_rty80ml-2.png', 'Femenino', 'EDP', 80, TRUE, FALSE, FALSE, '22 VP PRTY Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá 22 VP PRTY de Unlock en La Parfumerie, Santa Rosa La Pampa. Celebración de la Vida Nocturna

Este perfume frutal y festivo es una celebración de la vida nocturna. Las notas de sali. Envío gratis en Santa Rosa.'),
  ('RBNNE FME', 'Unlock', 'Sensualidad y Elegancia

Este perfume es una mezcla perfecta de flores y especias. Con notas de salida de flor de azahar y frutas rojas, su corazón de rosa y lirio se complementa con una base de almizcle y madera de sándalo. Ideal para mujeres que buscan un aroma sofisticado y seductor, perfecto para eventos formales.

Familia Olfativa: Floral-Frutal

Salida: Bergamota, Mandarina, Mango
Corazón: Jazmín, Incienso
Fondo: Pachuli, Sándalo, Vainilla.', 'Sensualidad y Elegancia

Este perfume es una mezcla perfecta de flores y especias. Con notas de salida de flor de azahar y frutas rojas, su corazón de rosa y lirio se complementa con una base de almizcle y madera de sándalo. Ideal para mujeres que buscan un aroma sofisticado y seductor, perfecto para eventos formales.

Familia Olfativa: Floral-Frutal

Salida: Bergamota, Mandarina, Mango
Corazón...', 22799, 13679, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/r_b_nne_f_me_80ml_-_2_3a98d756-598b-443c-ade2-ca16aaa22a32.webp', 'Femenino', 'EDP', 80, TRUE, FALSE, FALSE, 'RBNNE FME Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá RBNNE FME de Unlock en La Parfumerie, Santa Rosa La Pampa. Sensualidad y Elegancia

Este perfume es una mezcla perfecta de flores y especias. Con notas de salida de flor de azahar. Envío gratis en Santa Rosa.'),
  ('HALLOWN FEM', 'Unlock', 'Misterio y Encanto

Este perfume seductor y intrigante combina notas de frutas y flores para crear un aura de misterio. Con un corazón floral de jazmín y lirio, y una base cálida de madera de sándalo y almizcle. Ideal para ocasiones especiales y noches de fiesta, es perfecto para mujeres que buscan algo único.

Familia Olfativa: Floral

Salida: Bergamota, Jazmín, Tuberosa
Corazón: Fresias, Muguete, Magnolia
Fondo: Almizcle, Sándalo.', 'Misterio y Encanto

Este perfume seductor y intrigante combina notas de frutas y flores para crear un aura de misterio. Con un corazón floral de jazmín y lirio, y una base cálida de madera de sándalo y almizcle. Ideal para ocasiones especiales y noches de fiesta, es perfecto para mujeres que buscan algo único.

Familia Olfativa: Floral

Salida: Bergamota, Jazmín, Tuberosa
Corazón: Fresias, Mugu...', 27499, 16499, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/hallow_n_fem_90ml_-_3_b9aa6238-eaef-4366-9df9-ffc1ad5078d1.webp', 'Femenino', 'EDP', 90, TRUE, FALSE, FALSE, 'HALLOWN FEM Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá HALLOWN FEM de Unlock en La Parfumerie, Santa Rosa La Pampa. Misterio y Encanto

Este perfume seductor y intrigante combina notas de frutas y flores para crear un aura de misterio. . Envío gratis en Santa Rosa.'),
  ('SCNDL FEM MINI', 'Unlock', 'Rebelde y Seductor

Este perfume es un manifiesto de confianza y provocación. Con notas de salida de mandarina y miel, su corazón de jazmín y flor de naranjo despierta los sentidos. La base de benjuí y pachulí añade un toque misterioso. Perfecto para las noches en la ciudad o cualquier ocasión donde quieras brillar.

Familia Olfativa: Oriental-Floral

Salida: Miel, Naranja Amarga, Cítricos
Corazón: Cerezas, Nardos, Flor de Naranjo, Pera, Nardo Índico
Fondo: Haba Tonka, Vainilla, Pachuli, Oud, Almizcle blanco.', 'Rebelde y Seductor

Este perfume es un manifiesto de confianza y provocación. Con notas de salida de mandarina y miel, su corazón de jazmín y flor de naranjo despierta los sentidos. La base de benjuí y pachulí añade un toque misterioso. Perfecto para las noches en la ciudad o cualquier ocasión donde quieras brillar.

Familia Olfativa: Oriental-Floral

Salida: Miel, Naranja Amarga, Cítricos
Cora...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/sc_nd_l_fem_100ml_95f42b4b-352f-4373-9824-e2a0dc8c2237.webp', 'Femenino', 'EDP', 25, TRUE, FALSE, FALSE, 'SCNDL FEM MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá SCNDL FEM MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. Rebelde y Seductor

Este perfume es un manifiesto de confianza y provocación. Con notas de salida de mandarina y miel, s. Envío gratis en Santa Rosa.'),
  ('DVNE', 'Unlock', 'Es la fragancia de una diva audaz, glamorosa y radiante. Es 
un perfume dulce y floral, diseñado para la mujer que busca 
destacar con elegancia y brillo en las noches más especiales 
de otoño e invierno. Perfecta para citas románticas o fiestas 
exclusivas, es el complemento ideal para quienes desean dejar 
una impresión imborrable.

Familia Olfativa: Oriental-Floral
SALIDA: Calipsone, Bergamota y Bayas rojas
CORAZÓN: Azucena, Ylang-ylang y Jazmín
FONDO: Merengue, Almizcle y Pachuli', 'Es la fragancia de una diva audaz, glamorosa y radiante. Es 
un perfume dulce y floral, diseñado para la mujer que busca 
destacar con elegancia y brillo en las noches más especiales 
de otoño e invierno. Perfecta para citas románticas o fiestas 
exclusivas, es el complemento ideal para quienes desean dejar 
una impresión imborrable.

Familia Olfativa: Oriental-Floral
SALIDA: Calipsone, Bergamo...', 31199, 18719, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/UNLOCKDivine.png', 'Femenino', 'EDP', 100, TRUE, FALSE, FALSE, 'DVNE Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá DVNE de Unlock en La Parfumerie, Santa Rosa La Pampa. Es la fragancia de una diva audaz, glamorosa y radiante. Es 
un perfume dulce y floral, diseñado para la mujer que busca. Envío gratis en Santa Rosa.'),
  ('ARMNI MY WY', 'Unlock', 'Un perfume que celebra el  empoderamiento femenino con una combinación de flores blancas y almizcle. La rosa y el jazmín crean un corazón floral embriagador, mientras que las notas cítricas de salida añaden frescura. Ideal para mujeres que buscan una fragancia moderna y luminosa, perfecta para el día y eventos casuales.

 FAMILIA OLFATIVA: Floral-Chypré
 
SALIDA: Pera, Bergamota
CORAZÓN: Rosa Damascena, Rosa de Mayo, Jazmín, Sambac
FONDO: Almizcle Blanco, Vainilla.', 'Un perfume que celebra el  empoderamiento femenino con una combinación de flores blancas y almizcle. La rosa y el jazmín crean un corazón floral embriagador, mientras que las notas cítricas de salida añaden frescura. Ideal para mujeres que buscan una fragancia moderna y luminosa, perfecta para el día y eventos casuales.

 FAMILIA OLFATIVA: Floral-Chypré
 
SALIDA: Pera, Bergamota
CORAZÓN: Rosa D...', 31999, 19199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/04.png', 'Femenino', 'EDP', 90, TRUE, FALSE, FALSE, 'ARMNI MY WY Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá ARMNI MY WY de Unlock en La Parfumerie, Santa Rosa La Pampa. Un perfume que celebra el  empoderamiento femenino con una combinación de flores blancas y almizcle. La rosa y el jazmín. Envío gratis en Santa Rosa.'),
  ('22 VP RSE', 'Unlock', 'Sophistiqué et Événementiel

Un perfume sofisticado y efervescente que abre con notas de champán y flor de melocotón. El corazón floral de rosa aporta feminidad y elegancia, mientras que la base amaderada de ámbar y almizcle añade una profundidad seductora. Perfecto para mujeres que buscan brillar en eventos nocturnos o celebraciones exclusivas.

Familia Olfativa: Floral

Salida: Champagne Rosado, Pimienta Rosa
Corazón: Flor de Melocotón, Bouquet de Rosas
Fondo: Madera de Frambuesa, Almizcle.', 'Sophistiqué et Événementiel

Un perfume sofisticado y efervescente que abre con notas de champán y flor de melocotón. El corazón floral de rosa aporta feminidad y elegancia, mientras que la base amaderada de ámbar y almizcle añade una profundidad seductora. Perfecto para mujeres que buscan brillar en eventos nocturnos o celebraciones exclusivas.

Familia Olfativa: Floral

Salida: Champagne Rosa...', 25999, 15599, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/2_2_v_p_r_se_80ml_3a02a55c-4112-489c-bf83-a592f6a399e4.webp', 'Femenino', 'EDP', 80, TRUE, FALSE, FALSE, '22 VP RSE Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá 22 VP RSE de Unlock en La Parfumerie, Santa Rosa La Pampa. Sophistiqué et Événementiel

Un perfume sofisticado y efervescente que abre con notas de champán y flor de melocotón. El. Envío gratis en Santa Rosa.'),
  ('HRRRA FR WOMEN', 'Unlock', 'Una fragancia distinguida y sofisticada, símbolo de elegancia y refinamiento donde el día y la noche son testigos de su estilo único e incomparable. Un clásico atemporal y un accesorio 
invisible que completa el look de una mujer inolvidable.   

Familia Olfativa: Oriental-Floral
SALIDA: Chabacano, Flor de azahar del naranjo, Notas verdes, Palo de rosa de Brasil Bergamota
CORAZÓN: Jazmín, Jazmín español, Ylang-ylang, Narciso, Madreselva, Nardo de la India Jacinto y Lirio de los valles
FONDO: Algalia, Almizcle, Musgo de roble, Ámbar, Sándalo, Vetiver y Cedro', 'Una fragancia distinguida y sofisticada, símbolo de elegancia y refinamiento donde el día y la noche son testigos de su estilo único e incomparable. Un clásico atemporal y un accesorio 
invisible que completa el look de una mujer inolvidable.   

Familia Olfativa: Oriental-Floral
SALIDA: Chabacano, Flor de azahar del naranjo, Notas verdes, Palo de rosa de Brasil Bergamota
CORAZÓN: Jazmín, Jazmí...', 28999, 17399, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/Herrerafem.png', 'Femenino', 'EDP', 95, TRUE, FALSE, FALSE, 'HRRRA FR WOMEN Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá HRRRA FR WOMEN de Unlock en La Parfumerie, Santa Rosa La Pampa. Una fragancia distinguida y sofisticada, símbolo de elegancia y refinamiento donde el día y la noche son testigos de su . Envío gratis en Santa Rosa.'),
  ('GD GRL VRY', 'Unlock', 'Es una fragancia que te transporta a un paraíso tropical bajo el sol radiante, donde la frescura del mar se mezcla con la dulzura de las frutas exóticas. Captura la esencia de la mujer moderna, audaz y llena de vida, que sabe cómo brillar en cualquier momento del día o de la noche. Con un espíritu alegre y sexy, es la elección perfecta para quienes buscan una fragancia que combine la ligereza del día con la intensidad de la noche.

FAMILIA OLFATIVA: Floral-Frutal
Salida: Lichi y Grosella roja
Corazón: Rosa 
Fondo: Vainilla y Vetiver', 'Es una fragancia que te transporta a un paraíso tropical bajo el sol radiante, donde la frescura del mar se mezcla con la dulzura de las frutas exóticas. Captura la esencia de la mujer moderna, audaz y llena de vida, que sabe cómo brillar en cualquier momento del día o de la noche. Con un espíritu alegre y sexy, es la elección perfecta para quienes buscan una fragancia que combine la ligereza d...', 32999, 19799, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/UNLOCKGoodGirlVery.png', 'Femenino', 'EDP', 90, TRUE, FALSE, FALSE, 'GD GRL VRY Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá GD GRL VRY de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia que te transporta a un paraíso tropical bajo el sol radiante, donde la frescura del mar se mezcla con l. Envío gratis en Santa Rosa.'),
  ('ANG U DMN', 'Unlock', 'Es una fragancia que encarna la dualidad de la mujer: angelical y misteriosa, cálida y fría, dulce y  seductora. Avainillado y envolvente marca un estilo de vida sofisticado y audaz que invita descubrir cada faceta de tu personalidad.

FAMILIA OLFATIVA: Oriental-Floral

SALIDA: Azafrán, Tomillo y Mandarina
CORAZÓN: Azucena, Ylang-ylang y Orquídea
FONDO: Vainilla, Haba tonka, Palo de rosa de Brasil y Musgo de robl', 'Es una fragancia que encarna la dualidad de la mujer: angelical y misteriosa, cálida y fría, dulce y  seductora. Avainillado y envolvente marca un estilo de vida sofisticado y audaz que invita descubrir cada faceta de tu personalidad.

FAMILIA OLFATIVA: Oriental-Floral

SALIDA: Azafrán, Tomillo y Mandarina
CORAZÓN: Azucena, Ylang-ylang y Orquídea
FONDO: Vainilla, Haba tonka, Palo de rosa de Bra...', 26999, 16199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/22.png', 'Femenino', 'EDP', 100, TRUE, FALSE, FALSE, 'ANG U DMN Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá ANG U DMN de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia que encarna la dualidad de la mujer: angelical y misteriosa, cálida y fría, dulce y  seductora. Avainil. Envío gratis en Santa Rosa.'),
  ('GD GRL MINI', 'Unlock', 'El Doble Rostro de la Feminidad

Esta fragancia es una mezcla seductora de florales y orientales. Con notas de salida de mandarina y almendra, su corazón floral de jazmín y tuberosa se combina con una base de cacao y madera de sándalo. Ideal para mujeres que buscan un aroma intenso y cautivador, perfecto para noches especiales y citas.

Familia Olfativa: Floral-Oriental-Gourmand

Salida: Almendra, Café, Bergamota, Limón
Corazón: Jazmín, Nardo, Raíz de Lirio, Nerolí
Fondo: Haba Tonka, Cacao, Sándalo, Praliné, Notas Amaderadas.', 'El Doble Rostro de la Feminidad

Esta fragancia es una mezcla seductora de florales y orientales. Con notas de salida de mandarina y almendra, su corazón floral de jazmín y tuberosa se combina con una base de cacao y madera de sándalo. Ideal para mujeres que buscan un aroma intenso y cautivador, perfecto para noches especiales y citas.

Familia Olfativa: Floral-Oriental-Gourmand

Salida: Almend...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/g_d_g_rl_90ml_c3f71fc7-7613-4528-ae4a-a39963093df9.webp', 'Femenino', 'EDP', 30, TRUE, FALSE, FALSE, 'GD GRL MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá GD GRL MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. El Doble Rostro de la Feminidad

Esta fragancia es una mezcla seductora de florales y orientales. Con notas de salida de. Envío gratis en Santa Rosa.'),
  ('J´ADRE', 'Unlock', 'Elegancia Atemporal

Esta fragancia es una oda a la feminidad y la elegancia. Con un bouquet floral lujoso de jazmín, rosa y ylang-ylang, su apertura es fresca y seductora, mientras que la base de almizcle y notas amaderadas aporta una profundidad suave y envolvente. Ideal para mujeres sofisticadas, este aroma es perfecto para ocasiones especiales o eventos formales.

Familia Olfativa: Floral-Frutal

Salida: Pera, Melón, Magnolia, Durazno, Mandarina, Bergamota
Corazón: Jazmín, Muguet, Nardos, Fresias,Rosa, Orquídea, Ciruela y Violeta
Fondo: Almizcle, Vainilla, Zarzamora, Cedro.', 'Elegancia Atemporal

Esta fragancia es una oda a la feminidad y la elegancia. Con un bouquet floral lujoso de jazmín, rosa y ylang-ylang, su apertura es fresca y seductora, mientras que la base de almizcle y notas amaderadas aporta una profundidad suave y envolvente. Ideal para mujeres sofisticadas, este aroma es perfecto para ocasiones especiales o eventos formales.

Familia Olfativa: Floral-F...', 23999, 14399, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/j_ad_re_100ml_-_3_36cfdf33-6441-40a9-82a2-6792e7973245.webp', 'Femenino', 'EDP', 100, TRUE, FALSE, FALSE, 'J´ADRE Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá J´ADRE de Unlock en La Parfumerie, Santa Rosa La Pampa. Elegancia Atemporal

Esta fragancia es una oda a la feminidad y la elegancia. Con un bouquet floral lujoso de jazmín, ro. Envío gratis en Santa Rosa.'),
  ('KNZO AMR', 'Unlock', 'Es una fragancia dulce y ambarada que irradia pasión y ternura en un símbolo aromático del amor en todas sus facetas. Ideal para enamorar en una cita romántica en una noche de otoño o invierno. 

FAMILIA OLFATIVA: Oriental

SALIDA: Arroz y Té Blanco
CORAZÓN: Frangipani, Flor del cerezo y Heliotropo
FONDO: Vainilla, Almizcle, Incienso y Madera de thanaka.', 'Es una fragancia dulce y ambarada que irradia pasión y ternura en un símbolo aromático del amor en todas sus facetas. Ideal para enamorar en una cita romántica en una noche de otoño o invierno. 

FAMILIA OLFATIVA: Oriental

SALIDA: Arroz y Té Blanco
CORAZÓN: Frangipani, Flor del cerezo y Heliotropo
FONDO: Vainilla, Almizcle, Incienso y Madera de thanaka.', 29999, 17999, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/14.png', 'Femenino', 'EDP', 75, TRUE, FALSE, FALSE, 'KNZO AMR Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá KNZO AMR de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia dulce y ambarada que irradia pasión y ternura en un símbolo aromático del amor en todas sus facetas. Id. Envío gratis en Santa Rosa.'),
  ('BLCK OPM', 'Unlock', 'Es una fragancia adictiva y cautivadora, que resalta la audacia, la seducción y la pasión sin distinguir edades. Perfecta para noches de fiesta o citas románticas, es el complemento ideal para quienes desean destacar con estilo.

 

FAMILIA OLFATIVA: Oriental

SALIDA: Pera, Pimienta rosa y Flor de azahar del naranjo
CORAZÓN: Café, Jazmín, Almendra, amarga y Regaliz
FONDO: Vainilla, Pachulí, Madera de cachemira y Cedro.', 'Es una fragancia adictiva y cautivadora, que resalta la audacia, la seducción y la pasión sin distinguir edades. Perfecta para noches de fiesta o citas románticas, es el complemento ideal para quienes desean destacar con estilo.

 

FAMILIA OLFATIVA: Oriental

SALIDA: Pera, Pimienta rosa y Flor de azahar del naranjo
CORAZÓN: Café, Jazmín, Almendra, amarga y Regaliz
FONDO: Vainilla, Pachulí, Mad...', 31999, 19199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/17.png', 'Femenino', 'EDP', 100, TRUE, FALSE, FALSE, 'BLCK OPM Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá BLCK OPM de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia adictiva y cautivadora, que resalta la audacia, la seducción y la pasión sin distinguir edades. Perfect. Envío gratis en Santa Rosa.'),
  ('OLMPA  MINI', 'Unlock', 'Un perfume que encarna la fuerza y la elegancia. Con notas de salida de mandarina y jengibre, su corazón floral de jazmín y vainilla se complementa con una base de amber. Ideal para mujeres que buscan un aroma atractivo y seductor, perfecto para citas o eventos especiales.

Familia Olfativa: Floriental

Salida: Mandarina Verde, Jazmín de Agua, Flor de Jengibre
Corazón: Vainilla, Notas Saladas
Fondo: Ámbar Gris, Madera de Cachemira, Sándalo.', 'Un perfume que encarna la fuerza y la elegancia. Con notas de salida de mandarina y jengibre, su corazón floral de jazmín y vainilla se complementa con una base de amber. Ideal para mujeres que buscan un aroma atractivo y seductor, perfecto para citas o eventos especiales.

Familia Olfativa: Floriental

Salida: Mandarina Verde, Jazmín de Agua, Flor de Jengibre
Corazón: Vainilla, Notas Saladas
F...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/BaccaratRougeMini_14c72601-4e2d-4a5b-8450-d5e47f532e2c.png', 'Femenino', 'EDP', 100, TRUE, FALSE, FALSE, 'OLMPA  MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá OLMPA  MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. Un perfume que encarna la fuerza y la elegancia. Con notas de salida de mandarina y jengibre, su corazón floral de jazmí. Envío gratis en Santa Rosa.'),
  ('BLCK OPM MINI', 'Unlock', 'Es una fragancia adictiva y cautivadora, que resalta la audacia, la seducción y la pasión sin distinguir edades. Perfecta para noches de fiesta o citas románticas, es el complemento ideal para quienes desean destacar con estilo.

FAMILIA OLFATIVA: Oriental

SALIDA: Pera, Pimienta rosa y Flor de azahar del naranjo
CORAZÓN: Café, Jazmín, Almendra, amarga y Regaliz
FONDO: Vainilla, Pachulí, Madera de cachemira y Cedro.', 'Es una fragancia adictiva y cautivadora, que resalta la audacia, la seducción y la pasión sin distinguir edades. Perfecta para noches de fiesta o citas románticas, es el complemento ideal para quienes desean destacar con estilo.

FAMILIA OLFATIVA: Oriental

SALIDA: Pera, Pimienta rosa y Flor de azahar del naranjo
CORAZÓN: Café, Jazmín, Almendra, amarga y Regaliz
FONDO: Vainilla, Pachulí, Madera...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/17_5cb0e23f-bdd1-4f5b-a5ff-866ddb5bb509.png', 'Femenino', 'EDP', 25, TRUE, FALSE, FALSE, 'BLCK OPM MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá BLCK OPM MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia adictiva y cautivadora, que resalta la audacia, la seducción y la pasión sin distinguir edades. Perfect. Envío gratis en Santa Rosa.'),
  ('UNLOCK ANG U DMN MINI', 'Unlock', 'Una fragancia que encarna la dualidad de la mujer: angelical y misteriosa, cálida y fría, dulce y seductora. Avainillado y envolvente. Marca un estilo de vida sofisticado y audaz que invita descubrir cada faceta de tu personalidad.

Familia olfativa:  Oriental - Floral

Salida: Azafrán, Tomillo y Mandarina

Corazón: Azucena, Ylang-ylang y Orquídea

Fondo: Vainilla, Haba tonka, Palo de rosa de Brasil y Musgo de roble', 'Una fragancia que encarna la dualidad de la mujer: angelical y misteriosa, cálida y fría, dulce y seductora. Avainillado y envolvente. Marca un estilo de vida sofisticado y audaz que invita descubrir cada faceta de tu personalidad.

Familia olfativa:  Oriental - Floral

Salida: Azafrán, Tomillo y Mandarina

Corazón: Azucena, Ylang-ylang y Orquídea

Fondo: Vainilla, Haba tonka, Palo de rosa de B...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/UNLOCK_PRODUCTOS-149.jpg', 'Femenino', 'EDP', 30, TRUE, FALSE, FALSE, 'UNLOCK ANG U DMN MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá UNLOCK ANG U DMN MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. Una fragancia que encarna la dualidad de la mujer: angelical y misteriosa, cálida y fría, dulce y seductora. Avainillado. Envío gratis en Santa Rosa.'),
  ('SCNDL INTNSE FEM', 'Unlock', 'Es una fragancia audaz, sensual y provocativa para quienes buscan vivir cada momento intensamente. Ideal para una cita de noche o una fiesta donde busques dejar tu sello de seducción a cada paso. 

FAMILIA OLFATIVA: Oriental - Floral

SALIDA: Ylang-ylang
CORAZÓN: Vainilla
FONDO: Cardamomo', 'Es una fragancia audaz, sensual y provocativa para quienes buscan vivir cada momento intensamente. Ideal para una cita de noche o una fiesta donde busques dejar tu sello de seducción a cada paso. 

FAMILIA OLFATIVA: Oriental - Floral

SALIDA: Ylang-ylang
CORAZÓN: Vainilla
FONDO: Cardamomo', 31999, 19199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/12.png', 'Femenino', 'EDP', 80, TRUE, FALSE, FALSE, 'SCNDL INTNSE FEM Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá SCNDL INTNSE FEM de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia audaz, sensual y provocativa para quienes buscan vivir cada momento intensamente. Ideal para una cita d. Envío gratis en Santa Rosa.'),
  ('KNZO FLWR', 'Unlock', 'Esta fragancia es la esencia de la feminidad en su forma más pura y alegre. Es un perfume dulce y cálido, diseñado para la mujer que irradia positividad y encanto en cada momento. Perfecta para ser usada todo el año y es tan versátil que puede acompañarte desde un día soleado hasta una noche especial.

FAMILIA OLFATIVA: Oriental-Floral

SALIDA: Rosa de Bulgaria, Flor del espino, Grosellas negras y Mandarina
CORAZÓN: Violeta de Parma, Rosa, Opopónaco y Jazmín
FONDO: Vainilla, Almizcle blanco e Incienso', 'Esta fragancia es la esencia de la feminidad en su forma más pura y alegre. Es un perfume dulce y cálido, diseñado para la mujer que irradia positividad y encanto en cada momento. Perfecta para ser usada todo el año y es tan versátil que puede acompañarte desde un día soleado hasta una noche especial.

FAMILIA OLFATIVA: Oriental-Floral

SALIDA: Rosa de Bulgaria, Flor del espino, Grosellas negra...', 25999, 15599, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/05.png', 'Femenino', 'EDP', 55, TRUE, FALSE, FALSE, 'KNZO FLWR Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá KNZO FLWR de Unlock en La Parfumerie, Santa Rosa La Pampa. Esta fragancia es la esencia de la feminidad en su forma más pura y alegre. Es un perfume dulce y cálido, diseñado para . Envío gratis en Santa Rosa.'),
  ('ARMNI S', 'Unlock', 'Es una fragancia que celebra la esencia de la mujer moderna: empoderada, fresca y profundamente enamorada de la vida. Trasciende edades y acompaña en cada momento, ya sea bajo la luz del día o en la mágica noche. Perfecto para ser usado todo el año, es el complemento ideal para quienes buscan una fragancia versátil y llena de significado.

FAMILIA OLFATIVA: Chipres-Frutal
 

SALIDA: Casis
CORAZÓN: Rosa de mayo y Fresia
FONDO: Vainilla, Pachulí, Notas amaderadas y Ambroxan.', 'Es una fragancia que celebra la esencia de la mujer moderna: empoderada, fresca y profundamente enamorada de la vida. Trasciende edades y acompaña en cada momento, ya sea bajo la luz del día o en la mágica noche. Perfecto para ser usado todo el año, es el complemento ideal para quienes buscan una fragancia versátil y llena de significado.

FAMILIA OLFATIVA: Chipres-Frutal
 

SALIDA: Casis
CORAZ...', 31999, 19199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/06.png', 'Femenino', 'EDP', 100, TRUE, FALSE, FALSE, 'ARMNI S Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá ARMNI S de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia que celebra la esencia de la mujer moderna: empoderada, fresca y profundamente enamorada de la vida. Tr. Envío gratis en Santa Rosa.'),
  ('SUVGE', 'Unlock', 'Para el Hombre Moderno

Este perfume es una explosión de frescura y masculinidad. Las notas de salida de bergamota y pimienta se combinan con un corazón de lavanda y salvia, mientras que la base amaderada ofrece un acabado elegante. Ideal para hombres que buscan un aroma audaz y contemporáneo, perfecto para el día a día.

Familia Olfativa: Fougere

Salida: Bergamota de Calabria, Pimienta
Corazón: Pimienta de Sichuan, Lavanda,Pimienta Rosa
Fondo: Ámbar Gris, Cedro, Ládano.', 'Para el Hombre Moderno

Este perfume es una explosión de frescura y masculinidad. Las notas de salida de bergamota y pimienta se combinan con un corazón de lavanda y salvia, mientras que la base amaderada ofrece un acabado elegante. Ideal para hombres que buscan un aroma audaz y contemporáneo, perfecto para el día a día.

Familia Olfativa: Fougere

Salida: Bergamota de Calabria, Pimienta
Corazó...', 25499, 15299, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/s_uv_ge_100ml_-_2_53495742-f2dc-4cbe-81b1-64af8e35b0ad.webp', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'SUVGE Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá SUVGE de Unlock en La Parfumerie, Santa Rosa La Pampa. Para el Hombre Moderno

Este perfume es una explosión de frescura y masculinidad. Las notas de salida de bergamota y pim. Envío gratis en Santa Rosa.'),
  ('INVTUS', 'Unlock', 'Victoria y Fuerza

Este perfume es una celebración de la fuerza masculina. Con notas de salida de pomelo y mandarina, su corazón de jazmín y bayas de enebro se complementa con una base amaderada. Ideal para hombres que buscan un aroma potente y viril, perfecto para citas o eventos nocturnos.

Familia Olfativa: Amaderada-Acuática

Salida: Pomelo, Notas Marinas, Mandarina
Corazón: Laurel, Jazmín
Fondo: Notas Amaderadas, Musgo de Roble, Ámbar Gris.', 'Victoria y Fuerza

Este perfume es una celebración de la fuerza masculina. Con notas de salida de pomelo y mandarina, su corazón de jazmín y bayas de enebro se complementa con una base amaderada. Ideal para hombres que buscan un aroma potente y viril, perfecto para citas o eventos nocturnos.

Familia Olfativa: Amaderada-Acuática

Salida: Pomelo, Notas Marinas, Mandarina
Corazón: Laurel, Jazmín
...', 22799, 13679, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/inv_tus_100ml_c3a6ac1a-2771-45f6-87ee-8207c0716754.webp', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'INVTUS Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá INVTUS de Unlock en La Parfumerie, Santa Rosa La Pampa. Victoria y Fuerza

Este perfume es una celebración de la fuerza masculina. Con notas de salida de pomelo y mandarina, su. Envío gratis en Santa Rosa.'),
  ('RBNNE PHNTOM', 'Unlock', 'Futurista y Sensual

Una fragancia futurista que combina frescura y sensualidad. La apertura con notas de limón y lavanda ofrece una energía vibrante, mientras que el vetiver y el pachulí añaden un toque terroso. Ideal para hombres audaces y con estilo, este perfume es perfecto tanto para el día como para la Noche, destacando por su carácter innovador.

Familia Olfativa: Amaderada-Aromática

Salida: Lavanda, Limón de Amalfi
Corazón: Manzana, Smoke, Notas Terrosas, Pachuli
Fondo: Vainilla, Lavanda, Vetiver.', 'Futurista y Sensual

Una fragancia futurista que combina frescura y sensualidad. La apertura con notas de limón y lavanda ofrece una energía vibrante, mientras que el vetiver y el pachulí añaden un toque terroso. Ideal para hombres audaces y con estilo, este perfume es perfecto tanto para el día como para la Noche, destacando por su carácter innovador.

Familia Olfativa: Amaderada-Aromática

Sa...', 11157.02, 6694, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/Phantom.jpg', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'RBNNE PHNTOM Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá RBNNE PHNTOM de Unlock en La Parfumerie, Santa Rosa La Pampa. Futurista y Sensual

Una fragancia futurista que combina frescura y sensualidad. La apertura con notas de limón y lavand. Envío gratis en Santa Rosa.'),
  ('BD BY', 'Unlock', 'Para el Hombre Atrevido

Este perfume es un homenaje a la masculinidad moderna. Con notas de salida de pimienta negra y bergamota, su corazón de salvia y cacao se combina con una base de madera de sándalo. Ideal para noches intensas.

Familia Olfativa: Amaderada-Aromática

Salida: Pomelo, Pimienta Blanca
Corazón: Vetiver, Salvia Esclarea
Fondo: Haba Tonka, Cacao.', 'Para el Hombre Atrevido

Este perfume es un homenaje a la masculinidad moderna. Con notas de salida de pimienta negra y bergamota, su corazón de salvia y cacao se combina con una base de madera de sándalo. Ideal para noches intensas.

Familia Olfativa: Amaderada-Aromática

Salida: Pomelo, Pimienta Blanca
Corazón: Vetiver, Salvia Esclarea
Fondo: Haba Tonka, Cacao.', 26499, 15899, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/b_d_b_y_100ml_5ff1600f-ce05-4e72-b50f-599cccd2fb0c.webp', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'BD BY Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá BD BY de Unlock en La Parfumerie, Santa Rosa La Pampa. Para el Hombre Atrevido

Este perfume es un homenaje a la masculinidad moderna. Con notas de salida de pimienta negra y . Envío gratis en Santa Rosa.'),
  ('22 HROS HOM', 'Unlock', 'Espíritu Rebelde

Un perfume inspirado en el espíritu rebelde y la autenticidad. Las notas de salida de jengibre y pomelo ofrecen frescura, mientras que el corazón de lavanda y salvia aportan una profundidad aromática masculina. Ideal para hombres dinámicos y atrevidos, perfecto para el día o eventos casuales. Su energía resalta en cualquier ocasión, dejando una estela inolvidable.

Familia Olfativa: Aromática-Frutal

Salida: Pera, Notas Aromáticas, Jengibre
Corazón: Geranio, Salvia
Fondo: Almizcle, Cuero.', 'Espíritu Rebelde

Un perfume inspirado en el espíritu rebelde y la autenticidad. Las notas de salida de jengibre y pomelo ofrecen frescura, mientras que el corazón de lavanda y salvia aportan una profundidad aromática masculina. Ideal para hombres dinámicos y atrevidos, perfecto para el día o eventos casuales. Su energía resalta en cualquier ocasión, dejando una estela inolvidable.

Familia Olf...', 28999, 17399, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/2_2_h_ro_s_hom_80ml_815332a2-d2f2-470f-8c66-a02b8775220c.webp', 'Masculino', 'EDP', 80, TRUE, FALSE, FALSE, '22 HROS HOM Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá 22 HROS HOM de Unlock en La Parfumerie, Santa Rosa La Pampa. Espíritu Rebelde

Un perfume inspirado en el espíritu rebelde y la autenticidad. Las notas de salida de jengibre y pomel. Envío gratis en Santa Rosa.'),
  ('ON MLLON', 'Unlock', 'El Oro de la Fragancia

Un perfume que representa el lujo y la riqueza. Con notas de salida de pomelo y madera de rosa, su corazón floral de jazmín se complementa con una base cálida de madera de sándalo y ámbar. Ideal para hombres que buscan un aroma llamativo y elegante, perfecto para eventos formales.

Familia Olfativa: Amaderada

Salida: Toronja, Menta, Mandarina Roja
Corazón: Rosa, Canela, Notas Especiadas
Fondo: Cuero, Notas Amaderadas, Pachuli Hindú.', 'El Oro de la Fragancia

Un perfume que representa el lujo y la riqueza. Con notas de salida de pomelo y madera de rosa, su corazón floral de jazmín se complementa con una base cálida de madera de sándalo y ámbar. Ideal para hombres que buscan un aroma llamativo y elegante, perfecto para eventos formales.

Familia Olfativa: Amaderada

Salida: Toronja, Menta, Mandarina Roja
Corazón: Rosa, Canela,...', 23999, 14399, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/on__m_ll_on_100ml_06ff846f-aca6-447f-ae18-3a819f3b5a8d.webp', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'ON MLLON Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá ON MLLON de Unlock en La Parfumerie, Santa Rosa La Pampa. El Oro de la Fragancia

Un perfume que representa el lujo y la riqueza. Con notas de salida de pomelo y madera de rosa, . Envío gratis en Santa Rosa.'),
  ('BLCK S', 'Unlock', 'Rebelde y Apasionado

Un perfume que captura la esencia de la juventud y la rebelión. Con notas de salida de limón y pimienta, su corazón de madera de rosa y jazmín se combina con una base amaderada. Ideal para hombres jóvenes y atrevidos, perfecto para noches de fiesta o eventos informales.

Familia Olfativa: Oriental-Amaderada

Salida: Limón, Salvia
Corazón: Praliné, Canela, Bálsamo de Tolú, Cardamomo Negro
Fondo: Palo de Rosa de Brasil, Pachuli, Ámbar Negro.', 'Rebelde y Apasionado

Un perfume que captura la esencia de la juventud y la rebelión. Con notas de salida de limón y pimienta, su corazón de madera de rosa y jazmín se combina con una base amaderada. Ideal para hombres jóvenes y atrevidos, perfecto para noches de fiesta o eventos informales.

Familia Olfativa: Oriental-Amaderada

Salida: Limón, Salvia
Corazón: Praliné, Canela, Bálsamo de Tolú, ...', 21999, 13199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/bl_ck__s_75ml_a242cf0e-55b2-4857-aa19-9f6d78a58d43.webp', 'Masculino', 'EDP', 75, TRUE, FALSE, FALSE, 'BLCK S Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá BLCK S de Unlock en La Parfumerie, Santa Rosa La Pampa. Rebelde y Apasionado

Un perfume que captura la esencia de la juventud y la rebelión. Con notas de salida de limón y pim. Envío gratis en Santa Rosa.'),
  ('PL BLE', 'Unlock', 'Refrescante y Masculino

Una fragancia que evoca la frescura del océano y la aventura al aire libre. Con notas de salida de melón y mandarina, su corazón de jazmín y salvia añade un toque herbáceo. Ideal para hombres activos y dínamicos, perfecto para el día y eventos casuales.

Familia Olfativa: Fougere-Aromático

Salida: Melón, Pepino, Melón Aguado, Aceite de bergamota
Corazón: Nota Acuática, Salvia, Geranio, Verbena, Albahaca
Fondo: Pachuli, Almizcle.', 'Refrescante y Masculino

Una fragancia que evoca la frescura del océano y la aventura al aire libre. Con notas de salida de melón y mandarina, su corazón de jazmín y salvia añade un toque herbáceo. Ideal para hombres activos y dínamicos, perfecto para el día y eventos casuales.

Familia Olfativa: Fougere-Aromático

Salida: Melón, Pepino, Melón Aguado, Aceite de bergamota
Corazón: Nota Acuática,...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/POLO_BLUE2048.png', 'Masculino', 'EDP', 25, TRUE, FALSE, FALSE, 'PL BLE Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá PL BLE de Unlock en La Parfumerie, Santa Rosa La Pampa. Refrescante y Masculino

Una fragancia que evoca la frescura del océano y la aventura al aire libre. Con notas de salida. Envío gratis en Santa Rosa.'),
  ('22 HROS HOM MINI', 'Unlock', 'Espíritu Rebelde

Un perfume inspirado en el espíritu rebelde y la autenticidad. Las notas de salida de jengibre y pomelo ofrecen frescura, mientras que el corazón de lavanda y salvia aportan una profundidad aromática masculina. Ideal para hombres dinámicos y atrevidos, perfecto para el día o eventos casuales. Su energía resalta en cualquier ocasión, dejando una estela inolvidable.

Familia Olfativa: Aromática-Frutal

Salida: Pera, Notas Aromáticas, Jengibre
Corazón: Geranio, Salvia
Fondo: Almizcle, Cuero.', 'Espíritu Rebelde

Un perfume inspirado en el espíritu rebelde y la autenticidad. Las notas de salida de jengibre y pomelo ofrecen frescura, mientras que el corazón de lavanda y salvia aportan una profundidad aromática masculina. Ideal para hombres dinámicos y atrevidos, perfecto para el día o eventos casuales. Su energía resalta en cualquier ocasión, dejando una estela inolvidable.

Familia Olf...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/2_2_h_ro_s_hom_80ml_815332a2-d2f2-470f-8c66-a02b8775220c.webp', 'Masculino', 'EDP', 20, TRUE, FALSE, FALSE, '22 HROS HOM MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá 22 HROS HOM MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. Espíritu Rebelde

Un perfume inspirado en el espíritu rebelde y la autenticidad. Las notas de salida de jengibre y pomel. Envío gratis en Santa Rosa.'),
  ('PUR S HOM', 'Unlock', 'El Deseo Masculino

Este perfume captura la esencia de la sensualidad masculina. Las notas de salida de jengibre y limón se combinan con un corazón de manzana y flor de azahar, mientras que la base de almizcle y madera de sándalo añade profundidad. Ideal para hombres que buscan un aroma audaz y seductor, perfecto para eventos nocturnos o celebraciones.

Familia Olfativa: Oriental-Aromática

Salida: Jengibre, Tomillo, Pomelo, Bergamota, Notas Verdes
Corazón: Vainilla, Licor, Canela, Notas Cuero,Manzana 
Fondo: Mirra, Azúcar, Cedro, Notas Amaderadas, Cachemira, Pachuli.', 'El Deseo Masculino

Este perfume captura la esencia de la sensualidad masculina. Las notas de salida de jengibre y limón se combinan con un corazón de manzana y flor de azahar, mientras que la base de almizcle y madera de sándalo añade profundidad. Ideal para hombres que buscan un aroma audaz y seductor, perfecto para eventos nocturnos o celebraciones.

Familia Olfativa: Oriental-Aromática

Sal...', 25499, 15299, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/pur___s_hom_95ml_aa3cdae2-2470-4a47-876d-796f54576e1d.webp', 'Masculino', 'EDP', 95, TRUE, FALSE, FALSE, 'PUR S HOM Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá PUR S HOM de Unlock en La Parfumerie, Santa Rosa La Pampa. El Deseo Masculino

Este perfume captura la esencia de la sensualidad masculina. Las notas de salida de jengibre y limón. Envío gratis en Santa Rosa.'),
  ('INVTUS MINI', 'Unlock', 'Victoria y Fuerza

Este perfume es una celebración de la fuerza masculina. Con notas de salida de pomelo y mandarina, su corazón de jazmín y bayas de enebro se complementa con una base amaderada. Ideal para hombres que buscan un aroma potente y viril, perfecto para citas o eventos nocturnos.

Familia Olfativa: Amaderada-Acuática

Salida: Pomelo, Notas Marinas, Mandarina
Corazón: Laurel, Jazmín
Fondo: Notas Amaderadas, Musgo de Roble, Ámbar Gris.', 'Victoria y Fuerza

Este perfume es una celebración de la fuerza masculina. Con notas de salida de pomelo y mandarina, su corazón de jazmín y bayas de enebro se complementa con una base amaderada. Ideal para hombres que buscan un aroma potente y viril, perfecto para citas o eventos nocturnos.

Familia Olfativa: Amaderada-Acuática

Salida: Pomelo, Notas Marinas, Mandarina
Corazón: Laurel, Jazmín
...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/inv_tus_100ml_c3a6ac1a-2771-45f6-87ee-8207c0716754.webp', 'Masculino', 'EDP', 25, TRUE, FALSE, FALSE, 'INVTUS MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá INVTUS MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. Victoria y Fuerza

Este perfume es una celebración de la fuerza masculina. Con notas de salida de pomelo y mandarina, su. Envío gratis en Santa Rosa.'),
  ('PL RD', 'Unlock', 'Intenso y Apasionado

Este perfume es un homenaje a la audacia masculina. Con notas de salida de grano de café y frutos rojos, su corazón de jengibre y salvia aporta una energía vibrante. La base de almizcle y madera refuerza su carácter audaz. Ideal para hombres que buscan destacar en cualquier ocasión, tanto para el día como la noche.

Familia Olfativa: Amaderada-Oriental

Salida: Arándano, Toronja, Limón Italiano
Corazón: Azafrán, Salvia
Fondo: Ámbar, Café, Notas Amaderadas.', 'Intenso y Apasionado

Este perfume es un homenaje a la audacia masculina. Con notas de salida de grano de café y frutos rojos, su corazón de jengibre y salvia aporta una energía vibrante. La base de almizcle y madera refuerza su carácter audaz. Ideal para hombres que buscan destacar en cualquier ocasión, tanto para el día como la noche.

Familia Olfativa: Amaderada-Oriental

Salida: Arándano, T...', 22499, 13499, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/p_l__r_d_100ml_adcd260d-21bc-4dc7-bd60-078c881ec1ca.webp', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'PL RD Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá PL RD de Unlock en La Parfumerie, Santa Rosa La Pampa. Intenso y Apasionado

Este perfume es un homenaje a la audacia masculina. Con notas de salida de grano de café y frutos . Envío gratis en Santa Rosa.'),
  ('RBNNE PHNTOM BLCK', 'Unlock', 'Desafía los límites de la perfumería tradicional. Diseñado para el hombre contemporáneo que busca destacar en la noche más vibrante. Es un elixir audaz y futurista que combina contrastes sorprendentes, creando una experiencia olfativa tan disruptiva como inolvidable. Es una fragancia que no solo se lleva, sino que se vive.

FAMILIA OLFATIVA: Aromática

SALIDA: Cardamomo, Bergamota, Ruibarbo y Limón
CORAZÓN: Lavanda, Pachulí, Cedro y Geranio
FONDO: Vainilla, Bálsamo de Tolú y Vetiver de Hait', 'Desafía los límites de la perfumería tradicional. Diseñado para el hombre contemporáneo que busca destacar en la noche más vibrante. Es un elixir audaz y futurista que combina contrastes sorprendentes, creando una experiencia olfativa tan disruptiva como inolvidable. Es una fragancia que no solo se lleva, sino que se vive.

FAMILIA OLFATIVA: Aromática

SALIDA: Cardamomo, Bergamota, Ruibarbo y L...', 28999, 17399, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/15_9e5e2ce1-ba35-4dc4-a4af-6f5431d90102.png', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'RBNNE PHNTOM BLCK Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá RBNNE PHNTOM BLCK de Unlock en La Parfumerie, Santa Rosa La Pampa. Desafía los límites de la perfumería tradicional. Diseñado para el hombre contemporáneo que busca destacar en la noche m. Envío gratis en Santa Rosa.'),
  ('TM FRD OD WD', 'Unlock', 'Fragancia que encarna la esencia  de la sofisticación y el lujo atemporal. Es un perfume clásico y elegante, diseñado para el hombre que busca destacar con estilo. Perfecto para las noches frías de otoño  e invierno, es el complemento ideal para ocasiones especiales como citas románticas o fiestas exclusivas. Es el complemento perfecto para looks refinados y  actitudes sofisticadas. 

FAMILIA OLFATIVA: Amaderada-Aromática

SALIDA: Pomelo, Pimienta Blanca
CORAZÓN: Oud, Palo de Rosa de Brasil
FONDO: Vetiver, Haba Tonka y Ambar.', 'Fragancia que encarna la esencia  de la sofisticación y el lujo atemporal. Es un perfume clásico y elegante, diseñado para el hombre que busca destacar con estilo. Perfecto para las noches frías de otoño  e invierno, es el complemento ideal para ocasiones especiales como citas románticas o fiestas exclusivas. Es el complemento perfecto para looks refinados y  actitudes sofisticadas. 

FAMILIA O...', 27499, 16499, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/20.png', 'Masculino', 'EDP', 90, TRUE, FALSE, FALSE, 'TM FRD OD WD Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá TM FRD OD WD de Unlock en La Parfumerie, Santa Rosa La Pampa. Fragancia que encarna la esencia  de la sofisticación y el lujo atemporal. Es un perfume clásico y elegante, diseñado pa. Envío gratis en Santa Rosa.'),
  ('SCNDL HOM', 'Unlock', 'Es una fragancia que desafía las convenciones para el hombre joven que no teme romper las reglas y dejar su marca en el mundo. Atrevida y disruptiva combina la intensidad de lo dulce con la audacia de lo inesperado, perfecto para las noches más vibrantes de otoño e invierno.
Un aliado para seducir a tu cita o atraer las miradas en una noche de fiesta donde tu estilo y confianza deslumbran a todos. 

FAMILIA OLFATIVA: Oriental-Amaderado

SALIDA: Mandarina y Esclarea
CORAZÓN: Caramelo y Haba tonka
FONDO: Vetiver', 'Es una fragancia que desafía las convenciones para el hombre joven que no teme romper las reglas y dejar su marca en el mundo. Atrevida y disruptiva combina la intensidad de lo dulce con la audacia de lo inesperado, perfecto para las noches más vibrantes de otoño e invierno.
Un aliado para seducir a tu cita o atraer las miradas en una noche de fiesta donde tu estilo y confianza deslumbran a tod...', 31199, 18719, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/18.png', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'SCNDL HOM Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá SCNDL HOM de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia que desafía las convenciones para el hombre joven que no teme romper las reglas y dejar su marca en el . Envío gratis en Santa Rosa.'),
  ('HRRRA FR MEN', 'Unlock', 'Desafía los límites de la perfumería tradicional. Diseñado para el hombre contemporáneo que busca destacar en la noche más vibrante. Un elixir audaz y futurista que combina contrastes sorprendentes, creando una experiencia olfativa tan disruptiva como  inolvidable. Una fragancia que no solo se lleva, sino que se vive.

FAMILIA OLFATIVA: Amaderada-Floral
SALIDA: Limón (lima ácida), Lavanda, Romero y Neroli
CORAZÓN: Clavos de olor, Geranio y Trébol blanco
FONDO: Tabaco, Sándalo y Ámbar gris', 'Desafía los límites de la perfumería tradicional. Diseñado para el hombre contemporáneo que busca destacar en la noche más vibrante. Un elixir audaz y futurista que combina contrastes sorprendentes, creando una experiencia olfativa tan disruptiva como  inolvidable. Una fragancia que no solo se lleva, sino que se vive.

FAMILIA OLFATIVA: Amaderada-Floral
SALIDA: Limón (lima ácida), Lavanda, Rome...', 28499, 17099, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/Herreramen.png', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'HRRRA FR MEN Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá HRRRA FR MEN de Unlock en La Parfumerie, Santa Rosa La Pampa. Desafía los límites de la perfumería tradicional. Diseñado para el hombre contemporáneo que busca destacar en la noche m. Envío gratis en Santa Rosa.'),
  ('ON MLLON MINI', 'Unlock', 'El Oro de la Fragancia

Un perfume que representa el lujo y la riqueza. Con notas de salida de pomelo y madera de rosa, su corazón floral de jazmín se complementa con una base cálida de madera de sándalo y ámbar. Ideal para hombres que buscan un aroma llamativo y elegante, perfecto para eventos formales.

Familia Olfativa: Amaderada

Salida: Toronja, Menta, Mandarina Roja
Corazón: Rosa, Canela, Notas Especiadas
Fondo: Cuero, Notas Amaderadas, Pachuli Hindú.', 'El Oro de la Fragancia

Un perfume que representa el lujo y la riqueza. Con notas de salida de pomelo y madera de rosa, su corazón floral de jazmín se complementa con una base cálida de madera de sándalo y ámbar. Ideal para hombres que buscan un aroma llamativo y elegante, perfecto para eventos formales.

Familia Olfativa: Amaderada

Salida: Toronja, Menta, Mandarina Roja
Corazón: Rosa, Canela,...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/on__m_ll_on_100ml_06ff846f-aca6-447f-ae18-3a819f3b5a8d.webp', 'Masculino', 'EDP', 20, TRUE, FALSE, FALSE, 'ON MLLON MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá ON MLLON MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. El Oro de la Fragancia

Un perfume que representa el lujo y la riqueza. Con notas de salida de pomelo y madera de rosa, . Envío gratis en Santa Rosa.'),
  ('INVTUS VCTRY', 'Unlock', 'Es una fragancia con un aroma que combina frescura, dulzura y calidez en perfecto equilibrio para un hombre con un espíritu potente y triunfante, una elección perfecta para quien busca vivir con pasión superando sus límites y transmitir que la verdadera victoria está en no 
rendirse jamás.

FAMILIA OLFATIVA: Oriental
SALIDA: Pimienta rosa y Limón
CORAZÓN: Incienso de olíbano y Lavanda
FONDO: Vainilla, Haba tonka y Ámbar', 'Es una fragancia con un aroma que combina frescura, dulzura y calidez en perfecto equilibrio para un hombre con un espíritu potente y triunfante, una elección perfecta para quien busca vivir con pasión superando sus límites y transmitir que la verdadera victoria está en no 
rendirse jamás.

FAMILIA OLFATIVA: Oriental
SALIDA: Pimienta rosa y Limón
CORAZÓN: Incienso de olíbano y Lavanda
FONDO: Va...', 31199, 18719, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/UNLOCKInvictusVictory.png', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'INVTUS VCTRY Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá INVTUS VCTRY de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia con un aroma que combina frescura, dulzura y calidez en perfecto equilibrio para un hombre con un espír. Envío gratis en Santa Rosa.'),
  ('YVS SNT LURNT HOM', 'Unlock', 'Es una fragancia que evoca el espíritu libre y audaz de la juventud. Es una  declaración de estilo y alegría, fresco y vibrante para quienes buscan vivir cada momento con intensidad y 
diversión. Perfecto para los días soleados de primavera y verano, es el compañero ideal para momentos informales y relajados. 

FAMILIA OLFATIVA: Amaderada-Aromática
Salida: Aldehídos, Bergamota, Jengibre, Menta y Limón
Corazón: Manzana, Hojas de violeta, Piña, Salvia y Geranio
Fondo: Ámbar gris, Almizcle, Cedro, Abeto balsámico, Vetiver e Incienso', 'Es una fragancia que evoca el espíritu libre y audaz de la juventud. Es una  declaración de estilo y alegría, fresco y vibrante para quienes buscan vivir cada momento con intensidad y 
diversión. Perfecto para los días soleados de primavera y verano, es el compañero ideal para momentos informales y relajados. 

FAMILIA OLFATIVA: Amaderada-Aromática
Salida: Aldehídos, Bergamota, Jengibre, Menta ...', 24499, 14699, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/UNLOCKYvesSaintLaurent_5a82c7e0-36bd-419a-805f-a5475cb139c7.png', 'Masculino', 'EDP', 95, TRUE, FALSE, FALSE, 'YVS SNT LURNT HOM Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá YVS SNT LURNT HOM de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia que evoca el espíritu libre y audaz de la juventud. Es una  declaración de estilo y alegría, fresco y v. Envío gratis en Santa Rosa.'),
  ('SUVGE MINI', 'Unlock', 'Para el Hombre Moderno

Este perfume es una explosión de frescura y masculinidad. Las notas de salida de bergamota y pimienta se combinan con un corazón de lavanda y salvia, mientras que la base amaderada ofrece un acabado elegante. Ideal para hombres que buscan un aroma audaz y contemporáneo, perfecto para el día a día.

Familia Olfativa: Fougere

Salida: Bergamota de Calabria, Pimienta
Corazón: Pimienta de Sichuan, Lavanda,Pimienta Rosa
Fondo: Ámbar Gris, Cedro, Ládano.', 'Para el Hombre Moderno

Este perfume es una explosión de frescura y masculinidad. Las notas de salida de bergamota y pimienta se combinan con un corazón de lavanda y salvia, mientras que la base amaderada ofrece un acabado elegante. Ideal para hombres que buscan un aroma audaz y contemporáneo, perfecto para el día a día.

Familia Olfativa: Fougere

Salida: Bergamota de Calabria, Pimienta
Corazó...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/s_uv_ge_100ml_-_2_53495742-f2dc-4cbe-81b1-64af8e35b0ad.webp', 'Masculino', 'EDP', 25, TRUE, FALSE, FALSE, 'SUVGE MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá SUVGE MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. Para el Hombre Moderno

Este perfume es una explosión de frescura y masculinidad. Las notas de salida de bergamota y pim. Envío gratis en Santa Rosa.'),
  ('SCNDL HOM MINI', 'Unlock', 'Es una fragancia que desafía las convenciones para el hombre joven que no teme romper las reglas y dejar su marca en el mundo. Atrevida y disruptiva combina la intensidad de lo dulce con la audacia de lo inesperado, perfecto para las noches más vibrantes de otoño e invierno.
Un aliado para seducir a tu cita o atraer las miradas en una noche de fiesta donde tu estilo y confianza deslumbran a todos. 

FAMILIA OLFATIVA: Oriental-Amaderado

SALIDA: Mandarina y Esclarea
CORAZÓN: Caramelo y Haba tonka
FONDO: Vetiver', 'Es una fragancia que desafía las convenciones para el hombre joven que no teme romper las reglas y dejar su marca en el mundo. Atrevida y disruptiva combina la intensidad de lo dulce con la audacia de lo inesperado, perfecto para las noches más vibrantes de otoño e invierno.
Un aliado para seducir a tu cita o atraer las miradas en una noche de fiesta donde tu estilo y confianza deslumbran a tod...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/18.png', 'Masculino', 'EDP', 20, TRUE, FALSE, FALSE, 'SCNDL HOM MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá SCNDL HOM MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia que desafía las convenciones para el hombre joven que no teme romper las reglas y dejar su marca en el . Envío gratis en Santa Rosa.'),
  ('VRSCE ERS', 'Unlock', 'Es una fragancia icónica que combina lo mejor de la tradición con un toque contemporáneo, creando un perfume masculino que trasciende generaciones. Es una obra maestra olfativa 
diseñada para el hombre moderno que busca versatilidad y elegancia en cada ocasión.
Es más que un perfume; es una declaración de estilo y confianza para el hombre que sabe que la verdadera elegancia radica en la capacidad de adaptarse sin perder su esencia. Un clásico moderno que nunca pasa de moda.

FAMILIA OLFATIVA: Aromática - Fougere
 
SALIDA: Menta, Manzana verde y Limón
CORAZÓN: Haba tonka, Ambroxan y Geranio
FONDO: Vainilla de Madagascar, Cedro de Virginia, Cedro del Atlas, Vetiver y Musgo de roble', 'Es una fragancia icónica que combina lo mejor de la tradición con un toque contemporáneo, creando un perfume masculino que trasciende generaciones. Es una obra maestra olfativa 
diseñada para el hombre moderno que busca versatilidad y elegancia en cada ocasión.
Es más que un perfume; es una declaración de estilo y confianza para el hombre que sabe que la verdadera elegancia radica en la capacid...', 31199, 18719, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/11.png', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'VRSCE ERS Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá VRSCE ERS de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia icónica que combina lo mejor de la tradición con un toque contemporáneo, creando un perfume masculino q. Envío gratis en Santa Rosa.'),
  ('ACQA DI GO', 'Unlock', 'Es un clásico atemporal que seduce a todo  el mundo, gracias a su frescura versátil y su elegancia relajada. Es como una brisa marina en una botella. Desde el primer instante, su apertura fresca y acuática, te transporta a un atardecer junto al mar. Es una fragancia que evoca la sensación de libertad y relajación, ideal para esos días de verano donde el sol, la arena y el agua son los protagonistas. 

FAMILIA OLFATIVA: Aromática-Acuática

SALIDA: Lima (limón verde), Limón (lima ácida), Bergamota, Jazmín, Naranja, Mandarina y Neroli
CORAZÓN: Notas marinas, Jazmín, Calone, Romero, Durazno, Fresia, Jacinto, Ciclamen,
 Violeta, Cilantro, Rosa, Nuez moscada y Reseda
FONDO: Almizcle blanco, Cedro, Musgo de roble, Pachulí y Ámbar', 'Es un clásico atemporal que seduce a todo  el mundo, gracias a su frescura versátil y su elegancia relajada. Es como una brisa marina en una botella. Desde el primer instante, su apertura fresca y acuática, te transporta a un atardecer junto al mar. Es una fragancia que evoca la sensación de libertad y relajación, ideal para esos días de verano donde el sol, la arena y el agua son los protagoni...', 28999, 17399, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/10.png', 'Masculino', 'EDP', 95, TRUE, FALSE, FALSE, 'ACQA DI GO Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá ACQA DI GO de Unlock en La Parfumerie, Santa Rosa La Pampa. Es un clásico atemporal que seduce a todo  el mundo, gracias a su frescura versátil y su elegancia relajada. Es como una. Envío gratis en Santa Rosa.'),
  ('KNZO HMME', 'Unlock', 'Es una fragancia que captura la esencia del hombre contemporáneo: elegante, dinámico y en armonía con su entorno. Inspirado en la fuerza y serenidad del océano, es una brisa fresca que combina lo clásico con un toque moderno, creando una experiencia olfativa versátil y atemporal. Es la expresión de libertad y modernidad en perfecto equilibrio. El día y la noche, el frío y el calor. 

FAMILIA OLFATIVA: Aromática-Acuática

SALIDA: Notas marinas, Caoba, Salvia, Bergamota y Limón 
CORAZÓN: Pino, Bayas de enebro, Clavel, Nuez moscada, Rosa, lirio de los valles, Alcaravea, Jazmín, Durazno y raíz de lirio
FONDO: Abeto balsámico, Sándalo, Cedro, Almizcle, Musgo de Roble, Vetiver, Ámbar y Ládano.', 'Es una fragancia que captura la esencia del hombre contemporáneo: elegante, dinámico y en armonía con su entorno. Inspirado en la fuerza y serenidad del océano, es una brisa fresca que combina lo clásico con un toque moderno, creando una experiencia olfativa versátil y atemporal. Es la expresión de libertad y modernidad en perfecto equilibrio. El día y la noche, el frío y el calor. 

FAMILIA OL...', 28499, 17099, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/21.png', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'KNZO HMME Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá KNZO HMME de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia que captura la esencia del hombre contemporáneo: elegante, dinámico y en armonía con su entorno. Inspir. Envío gratis en Santa Rosa.'),
  ('UNLOCK L BEU', 'Unlock', 'Una invitación a escapar sin moverse. La fragancia se percibe luminosa y envolvente, con un carácter fresco pero seductor, que evoca un paraíso moderno: exuberante, cálido y despreocupado. Desde el primer momento transmite una sensación de libertad y placer, como piel acariciada por el sol en un entorno natural y sofisticado a la vez.

FAMILIA OLFATIVA: Aromática

SALIDA: Notas verdes, Menta

CORAZÓN: Coco, Higo

FONDO: Haba tonka, Sándalo', 'Una invitación a escapar sin moverse. La fragancia se percibe luminosa y envolvente, con un carácter fresco pero seductor, que evoca un paraíso moderno: exuberante, cálido y despreocupado. Desde el primer momento transmite una sensación de libertad y placer, como piel acariciada por el sol en un entorno natural y sofisticado a la vez.

FAMILIA OLFATIVA: Aromática

SALIDA: Notas verdes, Menta

C...', 31199, 18719, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/DSC09977_39ec76e4-3f40-471e-aa68-04799bae533d.jpg', 'Femenino', 'EDP', 125, TRUE, FALSE, FALSE, 'UNLOCK L BEU Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá UNLOCK L BEU de Unlock en La Parfumerie, Santa Rosa La Pampa. Una invitación a escapar sin moverse. La fragancia se percibe luminosa y envolvente, con un carácter fresco pero seducto. Envío gratis en Santa Rosa.'),
  ('UNLOCK TM FRD OD WD MINI', 'Unlock', 'Fragancia que encarna la esencia  de la sofisticación y el lujo atemporal. Es un perfume clásico y elegante, diseñado para el hombre que busca destacar con estilo. Perfecto para las noches frías de otoño  e invierno, es el complemento ideal para ocasiones especiales como citas románticas o fiestas exclusivas. Es el complemento perfecto para looks refinados y  actitudes sofisticadas. 

Familia Olfativa: Amaderada-Aromática

Salida: Pomelo, Pimienta Blanca

Corazón: Oud, Palo de Rosa de Brasil

• Fondo: Vetiver, Haba Tonka y Ambar.', 'Fragancia que encarna la esencia  de la sofisticación y el lujo atemporal. Es un perfume clásico y elegante, diseñado para el hombre que busca destacar con estilo. Perfecto para las noches frías de otoño  e invierno, es el complemento ideal para ocasiones especiales como citas románticas o fiestas exclusivas. Es el complemento perfecto para looks refinados y  actitudes sofisticadas. 

Familia O...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/UNLOCK_PRODUCTOS-145.jpg', 'Masculino', 'EDP', 30, TRUE, FALSE, FALSE, 'UNLOCK TM FRD OD WD MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá UNLOCK TM FRD OD WD MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. Fragancia que encarna la esencia  de la sofisticación y el lujo atemporal. Es un perfume clásico y elegante, diseñado pa. Envío gratis en Santa Rosa.'),
  ('UNLOCK ON MLLON LCKY MINI', 'Unlock', 'Familia Olfativa: Amaderada

Salida: Ciruela, Notas ozónicas, Pomelo Bergamota

Corazón: Avellana, Miel, Cedro, Madera de cachemira, Flor de azahar del

naranjo y Jazmín

Fondo: Amberwood, Pachulí, Vetiver y Musgo de roble', 'Familia Olfativa: Amaderada

Salida: Ciruela, Notas ozónicas, Pomelo Bergamota

Corazón: Avellana, Miel, Cedro, Madera de cachemira, Flor de azahar del

naranjo y Jazmín

Fondo: Amberwood, Pachulí, Vetiver y Musgo de roble', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/Untitleddesign_17.png', 'Masculino', 'EDP', 20, TRUE, FALSE, FALSE, 'UNLOCK ON MLLON LCKY MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá UNLOCK ON MLLON LCKY MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. Familia Olfativa: Amaderada

Salida: Ciruela, Notas ozónicas, Pomelo Bergamota

Corazón: Avellana, Miel, Cedro, Madera d. Envío gratis en Santa Rosa.'),
  ('VRSCE ERS MINI', 'Unlock', 'Es una fragancia icónica que combina lo mejor de la tradición con un toque contemporáneo, creando un perfume masculino que trasciende generaciones. Es una obra maestra olfativa 
diseñada para el hombre moderno que busca versatilidad y elegancia en cada ocasión.
Es más que un perfume; es una declaración de estilo y confianza para el hombre que sabe que la verdadera elegancia radica en la capacidad de adaptarse sin perder su esencia. Un clásico moderno que nunca pasa de moda.

FAMILIA OLFATIVA: Aromática - Fougere
 
SALIDA: Menta, Manzana verde y Limón
CORAZÓN: Haba tonka, Ambroxan y Geranio
FONDO: Vainilla de Madagascar, Cedro de Virginia, Cedro del Atlas, Vetiver y Musgo de roble', 'Es una fragancia icónica que combina lo mejor de la tradición con un toque contemporáneo, creando un perfume masculino que trasciende generaciones. Es una obra maestra olfativa 
diseñada para el hombre moderno que busca versatilidad y elegancia en cada ocasión.
Es más que un perfume; es una declaración de estilo y confianza para el hombre que sabe que la verdadera elegancia radica en la capacid...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/11_1.png', 'Masculino', 'EDP', 30, TRUE, FALSE, FALSE, 'VRSCE ERS MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá VRSCE ERS MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. Es una fragancia icónica que combina lo mejor de la tradición con un toque contemporáneo, creando un perfume masculino q. Envío gratis en Santa Rosa.'),
  ('PL RD MINI', 'Unlock', 'Este perfume es un homenaje a la audacia masculina. Con notas de salida de grano de café y frutos rojos, su corazón de jengibre y salvia aporta una energía vibrante. La base de almizcle y madera refuerza su carácter audaz. Ideal para hombres que buscan destacar en cualquier ocasión, tanto para el día como la noche.

Familia Olfativa: Amaderada-Oriental

Salida: Arándano, Toronja, Limón Italiano
Corazón: Azafrán, Salvia
Fondo: Ámbar, Café, Notas Amaderadas.', 'Este perfume es un homenaje a la audacia masculina. Con notas de salida de grano de café y frutos rojos, su corazón de jengibre y salvia aporta una energía vibrante. La base de almizcle y madera refuerza su carácter audaz. Ideal para hombres que buscan destacar en cualquier ocasión, tanto para el día como la noche.

Familia Olfativa: Amaderada-Oriental

Salida: Arándano, Toronja, Limón Italiano...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/POLORED1.jpg', 'Masculino', 'EDP', 25, TRUE, FALSE, FALSE, 'PL RD MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá PL RD MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. Este perfume es un homenaje a la audacia masculina. Con notas de salida de grano de café y frutos rojos, su corazón de j. Envío gratis en Santa Rosa.'),
  ('UNLOCK L´EU D´SSY HOM', 'Unlock', 'Una fragancia masculina que encarna la esencia de la elegancia atemporal y la frescura natural. Es un
perfume floral y delicado, para quienes buscan encantar con sutileza y gracia en los días soleados de primavera y verano.

Perfecta para ocasiones informales.

Familia Olfativa: Floral-Acuática

Salida: Flor de loto, Melón, Fresia, Agua de rosas, Rosa, Calone y Ciclamen.

Corazón: Lirio de los valles, Azucena, Peonía de agua y Clavel.

Fondo: Almizcle, Nardos, Maderas exóticas, Osmanto, Cedro, Sándalo y Ámbar.', 'Una fragancia masculina que encarna la esencia de la elegancia atemporal y la frescura natural. Es un
perfume floral y delicado, para quienes buscan encantar con sutileza y gracia en los días soleados de primavera y verano.

Perfecta para ocasiones informales.

Familia Olfativa: Floral-Acuática

Salida: Flor de loto, Melón, Fresia, Agua de rosas, Rosa, Calone y Ciclamen.

Corazón: Lirio de los ...', 27499, 16499, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/UNLOCK_PRODUCTOS-35_d738640d-eb18-476a-adeb-f544d751591b.jpg', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'UNLOCK L´EU D´SSY HOM Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá UNLOCK L´EU D´SSY HOM de Unlock en La Parfumerie, Santa Rosa La Pampa. Una fragancia masculina que encarna la esencia de la elegancia atemporal y la frescura natural. Es un
perfume floral y d. Envío gratis en Santa Rosa.'),
  ('ON MLLON LCKY', 'Unlock', 'Un perfume que irradia opulencia y extravagancia, para quienes buscan destacar en fiestas de lujo o citas memorables. Desde el primer instante, su apertura fresca y vibrante, te envuelve en una atmósfera de energía y juventud. El compañero perfecto para el hombre moderno que vive al límite, disfruta los placeres de la vida y no teme ser el centro de atención. Una fragancia que dejará tu marca en esas noches inolvidables.  

FAMILIA OLFATIVA: Amaderada
SALIDA: Ciruela, Notas ozónicas, Pomelo, Bergamota
CORAZÓN: Avellana, Miel, Cedro, Madera de cachemira, Flor de azahar del naranjo y Jazmín
FONDO: Amberwood, Pachulí, Vetiver y Musgo de roble', 'Un perfume que irradia opulencia y extravagancia, para quienes buscan destacar en fiestas de lujo o citas memorables. Desde el primer instante, su apertura fresca y vibrante, te envuelve en una atmósfera de energía y juventud. El compañero perfecto para el hombre moderno que vive al límite, disfruta los placeres de la vida y no teme ser el centro de atención. Una fragancia que dejará tu marca e...', 28499, 17099, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/UNLOCKOneMillionLucky.png', 'Masculino', 'EDP', 100, TRUE, FALSE, FALSE, 'ON MLLON LCKY Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá ON MLLON LCKY de Unlock en La Parfumerie, Santa Rosa La Pampa. Un perfume que irradia opulencia y extravagancia, para quienes buscan destacar en fiestas de lujo o citas memorables. De. Envío gratis en Santa Rosa.'),
  ('BCCRT ROGE MINI', 'Unlock', 'FAMILIA OLFATIVA: Oriental - Floral

SALIDA: Mandarina, Naranja y Azafrán de la India

CORAZÓN: Osmanto y Nardo de la India

FONDO: Notas amaderadas y Ámbar', 'FAMILIA OLFATIVA: Oriental - Floral

SALIDA: Mandarina, Naranja y Azafrán de la India

CORAZÓN: Osmanto y Nardo de la India

FONDO: Notas amaderadas y Ámbar', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/BAGUES_16122025-77_4.jpg', 'Unisex', 'EDP', 25, TRUE, FALSE, FALSE, 'BCCRT ROGE MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá BCCRT ROGE MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. FAMILIA OLFATIVA: Oriental - Floral

SALIDA: Mandarina, Naranja y Azafrán de la India

CORAZÓN: Osmanto y Nardo de la In. Envío gratis en Santa Rosa.'),
  ('UNLOCK PUR S HOM MINI', 'Unlock', 'Este perfume captura la esencia de la sensualidad masculina. Las notas de salida de jengibre y limón se combinan con un corazón de manzana y flor de azahar, mientras que la base de almizcle y madera de sándalo añade profundidad. Ideal para hombres que buscan un aroma audaz y seductor, perfecto para eventos nocturnos o celebraciones.

Familia Olfativa: Oriental-Aromática

Salida: Jengibre, Tomillo, Pomelo, Bergamota, Notas Verdes

Corazón: Vainilla, Licor, Canela, Notas Cuero,Manzana 

• Fondo: Mirra, Azúcar, Cedro, Notas Amaderadas, Cachemira, Pachuli.', 'Este perfume captura la esencia de la sensualidad masculina. Las notas de salida de jengibre y limón se combinan con un corazón de manzana y flor de azahar, mientras que la base de almizcle y madera de sándalo añade profundidad. Ideal para hombres que buscan un aroma audaz y seductor, perfecto para eventos nocturnos o celebraciones.

Familia Olfativa: Oriental-Aromática

Salida: Jengibre, Tomil...', 16999, 10199, 5, 'https://cdn.shopify.com/s/files/1/0665/4456/6445/files/UNLOCK_06082024-1.jpg', 'Masculino', 'EDP', 25, TRUE, FALSE, FALSE, 'UNLOCK PUR S HOM MINI Unlock en Santa Rosa La Pampa - La Parfumerie', 'Comprá UNLOCK PUR S HOM MINI de Unlock en La Parfumerie, Santa Rosa La Pampa. Este perfume captura la esencia de la sensualidad masculina. Las notas de salida de jengibre y limón se combinan con un . Envío gratis en Santa Rosa.')
ON CONFLICT (slug) DO UPDATE SET
  descripcion = EXCLUDED.descripcion,
  precio_venta = EXCLUDED.precio_venta,
  imagen_url = EXCLUDED.imagen_url,
  updated_at = NOW();