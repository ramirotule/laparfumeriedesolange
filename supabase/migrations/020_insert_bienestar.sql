-- =========================================================
-- La Parfumerie — INSERT Bienestar (43 productos)
-- Fuente: bagues.com.ar/collections/bienestar
-- Fecha: 2026-07-06
-- Idempotente: ON CONFLICT (slug) DO NOTHING
-- =========================================================

WITH
  sub_aceites AS (
    SELECT s.id AS sub_id, s.categoria_id AS cat_id
    FROM subcategorias s WHERE lower(s.slug) = 'aceites-esenciales' LIMIT 1
  ),
  sub_brumas AS (
    SELECT s.id AS sub_id, s.categoria_id AS cat_id
    FROM subcategorias s WHERE lower(s.slug) = 'brumas-almohada' LIMIT 1
  ),
  sub_tratamientos AS (
    SELECT s.id AS sub_id, s.categoria_id AS cat_id
    FROM subcategorias s WHERE lower(s.slug) = 'tratamientos' LIMIT 1
  ),
  sub_balsamos AS (
    SELECT s.id AS sub_id, s.categoria_id AS cat_id
    FROM subcategorias s WHERE lower(s.slug) = 'balsamos' LIMIT 1
  )

INSERT INTO productos (nombre, marca, slug, descripcion, precio_venta, stock, imagen_url, genero, activo, subcategoria_id, categoria_id)
SELECT * FROM (

  -- =========================================================
  -- ACEITES ESENCIALES PUROS
  -- =========================================================
  SELECT 'Aceite Esencial Lavanda','Bagués','aceite-esencial-lavanda','Aceite esencial puro de Lavanda. Propiedades relajantes y calmantes. Ideal para difusor, masajes y aromaterapia. 10ml.',14499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAALA10_1_1c5dcdc0-7c88-43c1-9c60-887c5791596e.png?v=1756850792','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite Esencial Neroli','Bagués','aceite-esencial-neroli','Aceite esencial puro de Neroli. Floral y delicado, reconocido por sus propiedades ansiolíticas y regeneradoras. 10ml.',14499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAANE10_1_952d14a1-36dd-44ae-9bc7-bd3950fd2007.png?v=1756850808','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite Esencial Melisa','Bagués','aceite-esencial-melisa','Aceite esencial puro de Melisa. Suaviza el estrés y la ansiedad. Propiedades antiespasmódicas y calmantes. 10ml.',14499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAAME10_1_2f25ee04-fad3-4e8c-839f-b2b3e405e6bb.png?v=1756850800','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite Esencial Tea Tree','Bagués','aceite-esencial-tea-tree','Aceite esencial puro de Árbol de Té. Antiséptico natural de uso múltiple. Ideal para piel, difusor y limpieza del hogar. 10ml.',14499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAATE10_1_06c8ccb4-13f5-4cae-b0dc-6eeed81de852.png?v=1756850817','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite Esencial Romero','Bagués','aceite-esencial-romero','Aceite esencial puro de Romero. Estimulante y energizante. Favorece la concentración y el bienestar muscular. 10ml.',14499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAARO10_1_ac369bd3-633a-42f5-9ce3-cabb190d68d7.png?v=1756850814','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite Esencial Manzanilla','Bagués','aceite-esencial-manzanilla','Aceite esencial puro de Manzanilla. Suavizante y antiinflamatorio. Ideal para pieles sensibles y estados de tensión. 10ml.',14499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAAMA10_1_8d3a4403-6718-456a-8fd4-6377ecfd4f10.png?v=1756850797','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite Esencial Jazmín','Bagués','aceite-esencial-jazmin','Aceite esencial puro de Jazmín. Floral intenso y sensual. Reconocido por sus propiedades afrodisíacas y antidepresivas. 10ml.',14499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAAJZ10_2_c7ed850a-9e47-419b-aec6-ee741a7150e9.png?v=1755293878','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite Esencial Menta','Bagués','aceite-esencial-menta','Aceite esencial puro de Menta. Refrescante y descongestionante. Ideal para dolores de cabeza, fatiga mental y digestión. 10ml.',14499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAAMT10_1_59e09cf7-03b6-4510-ae63-bcc5cb886230.png?v=1756850803','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite Esencial Naranja','Bagués','aceite-esencial-naranja','Aceite esencial puro de Naranja dulce. Cítrico y alegre. Eleva el ánimo y purifica ambientes. 10ml.',14499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAANA10_1_8fd839e9-9d41-4551-ac30-652a92967bac.png?v=1756850806','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite Esencial Limón','Bagués','aceite-esencial-limon','Aceite esencial puro de Limón. Purificante y energizante. Excelente para difusor, limpieza y cosmética natural. 10ml.',14499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAALI10_1_2f2989c3-786e-428a-b320-68c76bc0f4cc.png?v=1756850794','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite Esencial Palmarosa','Bagués','aceite-esencial-palmarosa','Aceite esencial puro de Palmarosa. Floral y herbáceo. Hidratante natural para piel y cabello. 10ml.',14499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Palmarosa.png?v=1774968664','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite Esencial Puro Almendras Dulces','Bagués','aceite-esencial-puro-almendras-dulces','Aceite portador de Almendras Dulces. Suavizante e hidratante para piel y cabello. Base ideal para mezclas con aceites esenciales.',10449,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAAPADU_1_61012c49-1b35-4678-821d-30229174e87a.png?v=1756850811','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite Esencial Argán','Bagués','aceite-esencial-argan','Aceite cosmético de Argán. El "oro líquido" marroquí. Regenerador, antienvejecimiento y nutritivo para piel y cabello.',15999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAACARG_1_5280f802-63d6-4623-8a2a-a5e9b39cdb61.png?v=1756850788','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Oleo Corporal Guduchi','Bagués','oleo-corporal-guduchi','Oleo corporal con Guduchi. Planta ayurvédica adaptógena que fortalece el sistema inmunológico y revitaliza la piel. 10ml.',14499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAAGD10_1_aba9c76e-fe5d-407e-a1ab-86b6bf98d1fb.png?v=1756851155','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite de Coco','Bagués','aceite-de-coco','Aceite de coco virgen. Hidratante profundo para piel y cabello. Multifuncional: corporal, capilar y base para mezclas.',15999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAACO_1_a5948f51-75e0-4573-9145-7adabf856805.png?v=1756850786','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Aceite Cosmetológico Rosa Mosqueta','Bagués','aceite-cosmetologico-rosa-mosqueta','Aceite cosmetológico de Rosa Mosqueta. Regenerador celular por excelencia. Atenúa cicatrices, manchas y signos de envejecimiento.',15999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAARMOS_1_964b458c-bebf-424e-b261-67d54c817d1b.png?v=1756850783','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Blend Aceites Esenciales','Bagués','blend-aceites-esenciales','Blend de 31 aceites esenciales. Una combinación única que equilibra cuerpo y mente. Ideal para difusor y aromaterapia.',12999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBABLEND_1_69f250ba-a83f-4b3b-8568-7d3a149bf786.png?v=1756850883','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Blend Corporal AntiStress','Bagués','aceite-corporal-antistress','Blend corporal AntiStress. Mezcla sinérgica de aceites esenciales para reducir el estrés y la tensión muscular. 10ml.',14499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAAAE10_1_a3d5b99-0bf5-4d82-b4bf-a53d22322b1f.png?v=1756850780','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)

  -- =========================================================
  -- BRUMAS
  -- =========================================================
  UNION ALL SELECT 'Bruma de Almohada Calm','Bagués','bruma-de-almohada-calm','Bruma de almohada Calm. Fragancia suave y relajante para facilitar el descanso y el sueño reparador.',14999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBASCALM_a69a97ec-3235-4a3e-8ccf-97635b0ae336.png?v=1755294298','Unisex',true,(SELECT sub_id FROM sub_brumas),(SELECT cat_id FROM sub_brumas)
  UNION ALL SELECT 'Bruma de Almohada Relax','Bagués','bruma-de-almohada-relax','Bruma de almohada Relax. Aroma envolvente para crear un ritual nocturno de relajación profunda.',14999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBARELAX_daaafbe1-663f-4d1d-9d54-f49f9098143f.png?v=1755294278','Unisex',true,(SELECT sub_id FROM sub_brumas),(SELECT cat_id FROM sub_brumas)
  UNION ALL SELECT 'Bruma Ultrahidratante Aloe Vera y Vitamina E','Bagués','bruma-ultrahidratante-aloe-vera-vitamina-e','Bruma corporal ultrahidratante con Aloe Vera y Vitamina E. Refresca, hidrata y cuida la piel al instante.',17199,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBABRALO_e17a232d-1107-4a1b-9e99-14444819908a.png?v=1755294290','Unisex',true,(SELECT sub_id FROM sub_brumas),(SELECT cat_id FROM sub_brumas)

  -- =========================================================
  -- CREAM OIL
  -- =========================================================
  UNION ALL SELECT 'Cream Oil Aceites Esenciales','Bagués','cream-oil-aceites-esenciales','Cream Oil con aceites esenciales. Textura única entre crema y aceite para una hidratación profunda y un aroma terapéutico.',12999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBACREOI_1_05240083-b92a-4555-9732-48140de15724.png?v=1755294357','Unisex',true,(SELECT sub_id FROM sub_balsamos),(SELECT cat_id FROM sub_balsamos)
  UNION ALL SELECT 'Cream Oil Eucalipto','Bagués','cream-oil-eucalipto','Cream Oil de Eucalipto. Alivia la congestión y aporta frescura. Ideal para masajes descongestivos y bienestar respiratorio.',12999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BCREUCAL_1_5604ccf5-0e4d-4090-9b84-0593ba4b5374.png?v=1755294371','Unisex',true,(SELECT sub_id FROM sub_balsamos),(SELECT cat_id FROM sub_balsamos)
  UNION ALL SELECT 'Cream Oil Antistress','Bagués','cream-oil-antistress','Cream Oil AntiStress. Combina la suavidad de una crema con la eficacia de los aceites esenciales calmantes.',12999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BCRANTIS_1_470cd328-0b5d-4094-9086-31ceef04d0b0.png?v=1755294363','Unisex',true,(SELECT sub_id FROM sub_balsamos),(SELECT cat_id FROM sub_balsamos)
  UNION ALL SELECT 'Cream Oil SOS Invierno','Bagués','cream-oil-sos-invierno','Cream Oil SOS Invierno. Formulación de emergencia para pieles castigadas por el frío. Nutre y repara intensamente.',12999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Bienestar_cream_sos_invierno_20g_Caja_perfil1_montaje.png?v=1777489993','Unisex',true,(SELECT sub_id FROM sub_balsamos),(SELECT cat_id FROM sub_balsamos)

  -- =========================================================
  -- TRATAMIENTOS CORPORALES
  -- =========================================================
  UNION ALL SELECT 'Crema de Enebro','Bagués','crema-de-enebro','Crema corporal de Enebro. Descongestionante y purificante. Ideal para piernas pesadas y circulación. 60g.',16999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBASCENE_1_c80251d5-cb3a-4f08-9425-2fbe35bc359c.png?v=1756850916','Unisex',true,(SELECT sub_id FROM sub_tratamientos),(SELECT cat_id FROM sub_tratamientos)
  UNION ALL SELECT 'Crema de Tomillo','Bagués','crema-de-tomillo','Crema corporal de Tomillo. Antiséptica y revitalizante. Fortalece el sistema inmune y estimula la circulación. 60g.',16999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBACTOMI_1_c69a6cb5-ce4b-44da-a211-9a5c6668e314.png?v=1756850930','Unisex',true,(SELECT sub_id FROM sub_tratamientos),(SELECT cat_id FROM sub_tratamientos)
  UNION ALL SELECT 'Crema de Tea Tree','Bagués','crema-de-tea-tree','Crema corporal de Árbol de Té. Purificante y antibacteriana. Ideal para pieles con imperfecciones y necesidad de limpieza profunda. 60g.',16999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Bienestar_crema_tea_tree_60g_Caja_perfil1_montaje.png?v=1759428873','Unisex',true,(SELECT sub_id FROM sub_tratamientos),(SELECT cat_id FROM sub_tratamientos)
  UNION ALL SELECT 'Crema de Lavanda','Bagués','crema-de-lavanda','Crema corporal de Lavanda. Calmante y relajante. Perfecta para uso nocturno y pieles sensibles. 60g.',16999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Bienestar_crema_lavanda_60g_Caja_perfil1_montaje_1.png?v=1759428845','Unisex',true,(SELECT sub_id FROM sub_tratamientos),(SELECT cat_id FROM sub_tratamientos)
  UNION ALL SELECT 'Crema de Caléndula','Bagués','crema-de-calendula','Crema corporal de Caléndula. Cicatrizante y calmante. Ideal para pieles irritadas, bebés y uso post-solar. 60g.',16999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBACCALE_1_8c989bdf-41ee-4451-930c-b626f67f809d.png?v=1756850914','Unisex',true,(SELECT sub_id FROM sub_tratamientos),(SELECT cat_id FROM sub_tratamientos)
  UNION ALL SELECT 'Crema Manzanilla y Malva','Bagués','crema-manzanilla-y-malva','Crema corporal de Manzanilla y Malva. Doble acción calmante para pieles reactivas y sensibles. 60g.',16999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BMANYMAL_1_241d3d93-e722-46bd-8784-5b66ddf1c703.png?v=1755294499','Unisex',true,(SELECT sub_id FROM sub_tratamientos),(SELECT cat_id FROM sub_tratamientos)
  UNION ALL SELECT 'Crema para Masajes','Bagués','crema-para-masajes','Crema para masajes corporales. Textura deslizante y nutritiva. Potencia los beneficios del masaje terapéutico. 100g.',10499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBACM100_1_7548b8f2-0b01-447c-9b20-83513fa8ded8.png?v=1755294505','Unisex',true,(SELECT sub_id FROM sub_tratamientos),(SELECT cat_id FROM sub_tratamientos)
  UNION ALL SELECT 'Criogel Piernas Livianas','Bagués','criogel-piernas-livianas','Criogel Piernas Livianas. Efecto frío intenso que alivia la pesadez y activa la circulación. Ideal para después del trabajo o el deporte.',12999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBAGELPI_c2a20a55-c9bc-4c25-9b1d-dfedd441c5c3.png?v=1756846310','Unisex',true,(SELECT sub_id FROM sub_tratamientos),(SELECT cat_id FROM sub_tratamientos)
  UNION ALL SELECT 'Tratamiento Fortalecedor Cejas y Pestañas','Bagués','tratamiento-fortalecedor-cejas-pestanas','Tratamiento fortalecedor para cejas y pestañas. Activos nutritivos que estimulan el crecimiento y fortalecen cada pelo.',9199,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBCREPES_3_c2c641d5-1d56-4c9f-94d1-01ddf7b2ae81.png?v=1756849871','Unisex',true,(SELECT sub_id FROM sub_tratamientos),(SELECT cat_id FROM sub_tratamientos)

  -- =========================================================
  -- BÁLSAMOS
  -- =========================================================
  UNION ALL SELECT 'Bálsamo Corporal Árnica y Hamamelis','Bagués','balsamo-corporal-arnica-hamamelis','Bálsamo corporal de Árnica y Hamamelis. Antiinflamatorio y descongestivo. Alivia contracturas, golpes y piernas cansadas. 125g.',11999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBABC125_d3ddf176-925c-4ac7-88bf-73fbc8a0b1ee.png?v=1755294170','Unisex',true,(SELECT sub_id FROM sub_balsamos),(SELECT cat_id FROM sub_balsamos)
  UNION ALL SELECT 'Bálsamo Bucal Propóleo','Bagués','balsamo-bucal-propoleo','Bálsamo bucal de Propóleo. Cicatrizante y antiséptico natural. Protege y repara los labios en todo momento.',16399,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBABBUCA_dcd8faca-829f-4075-90d2-c6005ea64a75.png?v=1755294165','Unisex',true,(SELECT sub_id FROM sub_balsamos),(SELECT cat_id FROM sub_balsamos)
  UNION ALL SELECT 'Bálsamo Bucal Menta','Bagués','balsamo-bucal-menta','Bálsamo bucal de Menta. Refrescante y protector. Hidrata y suaviza los labios con un toque fresco y aromático.',16399,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBABBMEN_47eabaaa-30df-4b30-87be-248c796276cb.png?v=1755294165','Unisex',true,(SELECT sub_id FROM sub_balsamos),(SELECT cat_id FROM sub_balsamos)
  UNION ALL SELECT 'Spray Eucalipto','Bagués','spray-eucalipto','Spray de Eucalipto. Descongestiona las vías respiratorias y purifica el ambiente. Ideal para estados gripales y espacios cerrados.',16399,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBASEU50_ae796850-02bd-4659-805d-439749531e04.png?v=1755295536','Unisex',true,(SELECT sub_id FROM sub_balsamos),(SELECT cat_id FROM sub_balsamos)

  -- =========================================================
  -- BODY BUTTERS
  -- =========================================================
  UNION ALL SELECT 'Body Butter Almendras','Bagués','body-butter-almendras','Body Butter de Almendras. Manteca corporal ultranutritiva para pieles muy secas. Textura rica y envolvente. 100g.',10499,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBABA100_1_7ffb09ac-dba5-4c2c-b812-138f13175764.png?v=1755294242','Unisex',true,(SELECT sub_id FROM sub_tratamientos),(SELECT cat_id FROM sub_tratamientos)
  UNION ALL SELECT 'Body Butter Oliva','Bagués','bagues-body-butter-oliva-25gr','Body Butter de Oliva. Manteca corporal antioxidante con beneficios del aceite de oliva virgen. Tamaño viaje. 25g.',5999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBBOLI25_1_a496d7e6-872b-4341-bef3-33bb64171cb4.png?v=1756850867','Unisex',true,(SELECT sub_id FROM sub_tratamientos),(SELECT cat_id FROM sub_tratamientos)
  UNION ALL SELECT 'Body Butter Semillas de Uva','Bagués','body-butter-semillas-de-uva','Body Butter de Semillas de Uva. Antioxidante y regenerador. Textura ligera que no deja residuo graso. 25g.',5999,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BBBUVA25_1_4ff8606d-13f2-43c0-ab6f-9fca54ccbc92.png?v=1755294258','Unisex',true,(SELECT sub_id FROM sub_tratamientos),(SELECT cat_id FROM sub_tratamientos)

  -- =========================================================
  -- DUOS / KITS
  -- =========================================================
  UNION ALL SELECT 'Duo Aceites Esenciales','Bagués','duo-aceites-esenciales','Duo de Aceites Esenciales. Set de dos aceites seleccionados para aromaterapia y bienestar. El regalo perfecto.',28298,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/FotoProductoAceites.png?v=1763046499','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)
  UNION ALL SELECT 'Duo Antistress','Bagués','duo-antistress','Duo AntiStress. Kit de dos productos especialmente formulados para combatir el estrés del día a día. Ideal para regalo.',28298,0,'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/FotoProductoAntiestres.png?v=1763046499','Unisex',true,(SELECT sub_id FROM sub_aceites),(SELECT cat_id FROM sub_aceites)

) AS data(nombre, marca, slug, descripcion, precio_venta, stock, imagen_url, genero, activo, subcategoria_id, categoria_id)
ON CONFLICT (slug) DO NOTHING;
