/** URL pública del sitio (sin barra final). Usar en redirects de auth y emails. */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "https://laparfumerie.com.ar";
}

export function authCallbackUrl(next = "/cuenta"): string {
  return `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(next)}`;
}
