-- =========================================================
-- El dashboard deja de manejar precio_costo/margen de ganancia.
-- Se maneja precio_venta (contado efectivo/transferencia) y un
-- porcentaje de recargo propio por producto para calcular el
-- precio de lista (hasta 3 cuotas sin interés), reemplazando el
-- factor global fijo que usaba el front (LIST_PRICE_FACTOR = 1.2236).
--
-- precio_costo NO se elimina de la tabla: queda como dato histórico
-- pero ya no se lee ni se escribe desde la app.
-- =========================================================

ALTER TABLE productos
  ADD COLUMN IF NOT EXISTS porcentaje_recargo_lista NUMERIC(5,2) NOT NULL DEFAULT 22.36;
