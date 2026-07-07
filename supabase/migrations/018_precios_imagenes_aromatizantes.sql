-- =========================================================
-- La Parfumerie — Precios e imágenes Aromatizantes
-- Fuente: bagues.com.ar/collections/aromatizantes (API Shopify)
-- Fecha: 2026-07-06
-- =========================================================

-- =========================================================
-- AROMATIZANTES AMBIENTALES 500ml — $13.599
-- =========================================================
UPDATE productos SET precio_venta = 13599, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-Lino-2025-Montaje_33e93864-0607-4edb-8411-dc4eff1148d3.png?v=1770736337'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%lino%' AND lower(nombre) LIKE '%500ml%';
UPDATE productos SET precio_venta = 13599, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-Mora_y_vainilla-2025-Montaje_93c40089-5100-452f-8bab-b702eceb039b.png?v=1770736246'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%mora%' AND lower(nombre) LIKE '%vainilla%';
UPDATE productos SET precio_venta = 13599, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-Orquidea_y_jazmin-2025-Montaje_af45fe8f-d489-4110-86e7-99594fdb58ec.png?v=1770736221'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) ~ 'orqu[ií]dea' AND lower(nombre) LIKE '%jazmin%';
UPDATE productos SET precio_venta = 13599, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-Duraznoylimon-2025-Montaje.png?v=1770736518'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%durazno%' AND lower(nombre) ~ 'lim[oó]n';
UPDATE productos SET precio_venta = 13599, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-BosquedeLahuen-2025-Montaje.png?v=1770735990'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%lahuen%';
UPDATE productos SET precio_venta = 13599, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-Brisa-Floral-Montaje.png?v=1767725541'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%brisa floral%';
UPDATE productos SET precio_venta = 13599, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEAPEON_f4411815-ea57-4529-a344-2a373a3b93da.png?v=1756845972'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) ~ 'peon[ií]as';
UPDATE productos SET precio_venta = 13599, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-Bebeyalgodon-2025-Montaje.png?v=1770736658'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%bebe%' AND lower(nombre) LIKE '%algodon%';
UPDATE productos SET precio_venta = 13599, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-Teverdeyverbena-2025-Montaje.png?v=1770736032'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%te verde%';
UPDATE productos SET precio_venta = 13599, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-Pachuliycanela-2025-Montaje.png?v=1770735881'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%patchouli%' AND lower(nombre) LIKE '%canela%';
UPDATE productos SET precio_venta = 13599, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-citrus-2026-Montaje.png?v=1779222663'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%citrus%';
UPDATE productos SET precio_venta = 13599, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-frutas_exoticas-2026-Montaje_9b4d225e-e0a9-4a57-8c03-03fc6b372ef8.png?v=1770736440'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%frutas exoticas%';
UPDATE productos SET precio_venta = 13599, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEALIRE_45ef8a1d-f995-48e4-8c98-e9e5eec0c874.png?v=1756845959'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%libre%';

-- =========================================================
-- AROMATIZANTES AMBIENTALES 500ml — $12.999
-- =========================================================
UPDATE productos SET precio_venta = 12999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/repuesto-aromatizante-campo-de-flores_2.png?v=1764094886'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%campo de flores%';
UPDATE productos SET precio_venta = 12999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEACCFRR_9779818f-be45-49dd-83ac-c3ce183c2f6b.png?v=1755295294'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%caricia%';
UPDATE productos SET precio_venta = 12999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/repuesto-aromatizante-fresca-naturaleza_1.png?v=1763749669'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) ~ 'ambiental' AND lower(nombre) LIKE '%fresca naturaleza%';

-- =========================================================
-- AROMATIZANTES AMBIENTALES 500ml — $10.999
-- =========================================================
UPDATE productos SET precio_venta = 10999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/repuesto-aromatizante-dulzura-matinal.png?v=1763055200'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%dulzura matinal%' AND lower(nombre) LIKE '%500ml%';

-- =========================================================
-- AROMATIZANTES AMBIENTALES 500ml — $9.999
-- =========================================================
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-Buenosdeseos-2025-Montaje.png?v=1770736635'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%buenos deseos%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEACOKI_b12a3aca-3e9d-42f7-93cc-2810af0ccb3f.png?v=1756845949'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%cookies%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-Sandiaymelon-2025-Montaje.png?v=1770736108'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%sandia%' AND lower(nombre) LIKE '%melon%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-menta_y_coco-2026-Montaje_015c335e-9947-4e8d-9da8-bf8a896c3dce.png?v=1770736582'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%coco%' AND lower(nombre) LIKE '%menta%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-Uvayfrutosrojos-2025-Montaje.png?v=1770736829'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%uva%' AND lower(nombre) LIKE '%frutos rojos%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Repuesto-Aromatizante-Sandiaymelon-2025-Montaje.png?v=1770736108'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%sandia%' AND lower(nombre) LIKE '%pomelo%';

-- =========================================================
-- AROMATIZANTES AMBIENTALES PEQUEÑOS / 125ml
-- =========================================================
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Aromatizante_HigosdeOriente_montaje.png?v=1774968666'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%higos%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Aromatizante_GreenMatcha_montaje.png?v=1774968666'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%green matcha%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Aromatizante_Sahara_montaje.png?v=1769536133'
  WHERE lower(nombre) LIKE '%aromatizante ambiental%' AND lower(nombre) LIKE '%sahara%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Aromatizante_Marrakech_montaje.png?v=1769535974'
  WHERE lower(nombre) LIKE '%aromatizante ambiental%' AND lower(nombre) LIKE '%marrakech%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Aromatizante_Pistacho_Caramel_montaje_1.png?v=1762530974'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%pistacho caramel%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Aromatizante_Melocoton_Tentacion_montaje.png?v=1762530933'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) ~ 'melocot[oó]n';
UPDATE productos SET precio_venta = 12499, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Aromatizante_Oriental_Nag_Champa_2025_montaje_1_1.png?v=1765477616'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%nag champa%' AND lower(nombre) NOT LIKE '%difusor%';
UPDATE productos SET precio_venta = 12499, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Aromatizante_Oriental_Sandalo_2025_montaje_1_1.png?v=1765477746'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) ~ 's[aá]ndalo' AND lower(nombre) NOT LIKE '%difusor%';
UPDATE productos SET precio_venta = 12499, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Aromatizante_Oriental_Palo_Santo_2025_montaje-_1_-_1.png?v=1763749969'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%palo santo%';
UPDATE productos SET precio_venta = 12499, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Aromatizante_Oriental_Loto_Sagrado_2025_montaje-_1_-_1.png?v=1763749996'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%loto sagrado%';
UPDATE productos SET precio_venta = 12499, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Aromatizante_Oriental_Azafran_Mantra.png?v=1765477913'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) ~ 'azafr[aá]n';
UPDATE productos SET precio_venta = 6999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Aromatizante_Zayed_montaje_1_42edceb0-d663-4188-8f61-42160e955a5b.png?v=1780415691'
  WHERE lower(nombre) LIKE '%aromatizante ambiental%' AND lower(nombre) LIKE '%zayed%';
UPDATE productos SET precio_venta = 6999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/Aromatizante_Jeddah_montaje_82706cae-42ac-4f3e-b390-c12e305ed99d.png?v=1780415598'
  WHERE lower(nombre) LIKE '%aromatizante ambiental%' AND lower(nombre) LIKE '%jeddah%';
UPDATE productos SET precio_venta = 7999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEATADV_be80b23f-3352-4775-8386-57bb1bacf99a.png?v=1755294028'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%dulce vitalidad%';

-- =========================================================
-- AROMATIZANTES TEXTILES
-- =========================================================
UPDATE productos SET precio_venta = 7999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEATVAL_e1174170-d1ba-4b21-9134-a795e443f3d6.png?v=1755294110'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%valle de algodón%';
UPDATE productos SET precio_venta = 7999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEATFBE_4bfd5502-e676-41e2-bffb-b997d72462e8.png?v=1755294104'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%frescura de bebe%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEAGLAM_97c9783b-4b61-427a-aab2-b1f739ee4b9c.png?v=1755294082'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%amr glam%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEAMEN_aed08052-7f86-44d8-b07a-39e8dd2c994c.png?v=1755294091'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%amr men%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEAPRTY_1_7b43a7b7-d803-4bfa-b543-1387f2c74b6d.png?v=1755294095'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%amr party%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEASPOR_54c495a6-2b8c-4f6c-b422-ac250e8b5576.png?v=1756850857'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%amr sport%';
UPDATE productos SET precio_venta = 9999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEAKIDS_bfd75840-1acd-4f12-959d-c1d2ca0dacb4.png?v=1755294087'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%amr kids%';

-- =========================================================
-- AROMATIZANTES TEXTILES 500ml
-- =========================================================
UPDATE productos SET precio_venta = 12999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEACCFRR_9779818f-be45-49dd-83ac-c3ce183c2f6b.png?v=1755295294'
  WHERE lower(nombre) LIKE '%aromatizante textil%' AND lower(nombre) LIKE '%caricia%';

-- =========================================================
-- DIFUSORES DE AMBIENTE
-- =========================================================
UPDATE productos SET precio_venta = 16499, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEDLINO_07819aee-be96-43e5-a8f7-c81fc5c6544f.png?v=1755294562'
  WHERE lower(nombre) LIKE '%difusor%' AND lower(nombre) LIKE '%lino%';
UPDATE productos SET precio_venta = 16499, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/difusor-orquidea.png?v=1763751176'
  WHERE lower(nombre) LIKE '%difusor%' AND lower(nombre) ~ 'orqu[ií]dea';
UPDATE productos SET precio_venta = 16499, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/difusor-durazno.png?v=1775586590'
  WHERE lower(nombre) LIKE '%difusor%' AND lower(nombre) LIKE '%durazno%';
UPDATE productos SET precio_venta = 16499, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEDMVAI_a5729460-699e-4ce8-90ed-4844e1412bf2.png?v=1756850953'
  WHERE lower(nombre) LIKE '%difusor%' AND lower(nombre) LIKE '%mora%' AND lower(nombre) LIKE '%vainilla%';
UPDATE productos SET precio_venta = 16499, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEDPCAN_97720e03-4008-4440-9c75-ca0dcef5cae8.png?v=1756850959'
  WHERE lower(nombre) LIKE '%difusor%' AND lower(nombre) LIKE '%patchouli%';
UPDATE productos SET precio_venta = 13999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEDNACH_1_fe18dabe-52e1-4984-a27a-8c690e2912ca.png?v=1755294572'
  WHERE lower(nombre) LIKE '%difusor%' AND lower(nombre) LIKE '%nag champa%';
UPDATE productos SET precio_venta = 13999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEDPALS_1_5d0595ea-d90d-4dd1-9fc9-85543c731a42.png?v=1755294580'
  WHERE lower(nombre) LIKE '%difusor%' AND lower(nombre) LIKE '%palo santo%';

-- =========================================================
-- AROMATIZANTES PARA AUTO
-- =========================================================
UPDATE productos SET precio_venta = 8999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEABP100_9fc910fd-eafe-4153-ae37-dea715a13146.png?v=1763747862'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%bosque patagonico%';
UPDATE productos SET precio_venta = 8999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEANV100_66d23af9-747c-4f8e-bc2a-b40538f10376.png?v=1756850854'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%nuevos caminos%';
UPDATE productos SET precio_venta = 8999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEACA100_1af9d851-9817-4ec9-8796-a56652889a5d.png?v=1763747978'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%costa atlantica%';
UPDATE productos SET precio_venta = 8999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEACT100_8981a638-56af-4ccc-a484-78b8fd99cd0a.png?v=1763748042'
  WHERE lower(nombre) LIKE '%aromatizante%' AND lower(nombre) LIKE '%traslasierra%';

-- =========================================================
-- ENJUAGUES PARA ROPA
-- =========================================================
UPDATE productos SET precio_venta = 8999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEESENR_47170c64-9445-442d-ab05-641c91eec620.png?v=1756846416'
  WHERE lower(nombre) LIKE '%enjuage%' AND lower(nombre) LIKE '%suavidad%';
UPDATE productos SET precio_venta = 8999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/enjuague-fresca-naturaleza_9066eb15-928d-4045-9690-2d83e4193be7.png?v=1759433057'
  WHERE lower(nombre) LIKE '%enjuage%' AND lower(nombre) LIKE '%fresca naturaleza%';
UPDATE productos SET precio_venta = 8999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/enjuague-dulzura-matinal_1.png?v=1759433127'
  WHERE lower(nombre) LIKE '%enjuage%' AND lower(nombre) LIKE '%dulzura matinal%';
UPDATE productos SET precio_venta = 8999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/enjuague-capullo-de-flores.png?v=1759433178'
  WHERE lower(nombre) LIKE '%enjuage%' AND lower(nombre) LIKE '%capullo%';
UPDATE productos SET precio_venta = 8999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEELINO_9f373a0c-be22-44f2-b0f1-47bba7aa71f1.png?v=1755294637'
  WHERE lower(nombre) LIKE '%enjuage%' AND lower(nombre) LIKE '%lino%';
UPDATE productos SET precio_venta = 8999, imagen_url = 'https://cdn.shopify.com/s/files/1/0621/1944/4614/files/BDEEJARD_0c329b3e-88eb-4d77-b706-6e0bed518d60.png?v=1756846409'
  WHERE lower(nombre) LIKE '%enjuage%' AND lower(nombre) LIKE '%jardin%';

-- =========================================================
-- RECATEGORIZAR: asignar subcategoria_id correcta
-- =========================================================
-- Aromatizantes Ambientales
UPDATE productos
SET subcategoria_id = (
  SELECT s.id FROM subcategorias s
  JOIN categorias c ON c.id = s.categoria_id
  WHERE lower(s.slug) = 'aromatizantes-ambientales' LIMIT 1
)
WHERE lower(nombre) ~ '(aromatizante ambiental|aromatizante de ambiente)';

-- Difusores
UPDATE productos
SET subcategoria_id = (
  SELECT s.id FROM subcategorias s
  JOIN categorias c ON c.id = s.categoria_id
  WHERE lower(s.slug) = 'difusores' LIMIT 1
)
WHERE lower(nombre) LIKE '%difusor%';

-- Ropa (textiles + enjuagues)
UPDATE productos
SET subcategoria_id = (
  SELECT s.id FROM subcategorias s
  JOIN categorias c ON c.id = s.categoria_id
  WHERE lower(s.slug) = 'ropa' LIMIT 1
)
WHERE lower(nombre) ~ '(aromatizante textil|enjuage para ropa|enjuague para ropa)';

-- Esenciales (auto)
UPDATE productos
SET subcategoria_id = (
  SELECT s.id FROM subcategorias s
  JOIN categorias c ON c.id = s.categoria_id
  WHERE lower(s.slug) = 'esenciales' LIMIT 1
)
WHERE lower(nombre) LIKE '%aromatizante para auto%';

-- Sincronizar categoria_id
UPDATE productos p
SET categoria_id = s.categoria_id
FROM subcategorias s
WHERE s.id = p.subcategoria_id
  AND p.categoria_id IS DISTINCT FROM s.categoria_id;
