export const DEFAULT_RECARGO_LISTA = 22.36;

export function calculateListPrice(
  precioContado: number,
  porcentajeRecargo: number = DEFAULT_RECARGO_LISTA
): number {
  return precioContado * (1 + porcentajeRecargo / 100);
}

export function calculateInstallment(
  precioContado: number,
  porcentajeRecargo: number = DEFAULT_RECARGO_LISTA,
  installments: number = 3
): number {
  return calculateListPrice(precioContado, porcentajeRecargo) / installments;
}

export function formatPrice(price: number): string {
  return `$${Math.round(price).toLocaleString("es-AR")}`;
}
