export type TipoEntrega =
  | "domicilio_santa_rosa"
  | "domicilio_toay"
  | "retiro_tienda"
  | "domicilio_interior";

export const SHIPPING_RATES: Record<
  Exclude<TipoEntrega, "domicilio_interior">,
  number
> = {
  domicilio_santa_rosa: 4000,
  domicilio_toay: 5000,
  retiro_tienda: 0,
};

export const FREE_SHIPPING_THRESHOLD = 60000;

export const TIPO_ENTREGA_LABELS: Record<TipoEntrega, string> = {
  domicilio_santa_rosa: "Envío a domicilio — Santa Rosa",
  domicilio_toay: "Envío a domicilio — Toay",
  retiro_tienda: "Retiro en tienda — Ayala 604, Santa Rosa",
  domicilio_interior: "Envío al interior del país",
};

export function isTipoEntrega(value: string): value is TipoEntrega {
  return value in TIPO_ENTREGA_LABELS;
}

export function calculateShipping(
  subtotal: number,
  tipoEntrega: TipoEntrega
): { costo: number | null; label: string; pendienteCotizacion: boolean } {
  if (tipoEntrega === "domicilio_interior") {
    return { costo: null, label: "A consultar", pendienteCotizacion: true };
  }

  if (tipoEntrega === "retiro_tienda") {
    return { costo: 0, label: "Gratis", pendienteCotizacion: false };
  }

  if (subtotal > FREE_SHIPPING_THRESHOLD) {
    return { costo: 0, label: "Gratis", pendienteCotizacion: false };
  }

  const costo = SHIPPING_RATES[tipoEntrega];
  return {
    costo,
    label: `$${costo.toLocaleString("es-AR")}`,
    pendienteCotizacion: false,
  };
}

export function qualifiesForFreeLocalShipping(subtotal: number): boolean {
  return subtotal > FREE_SHIPPING_THRESHOLD;
}
