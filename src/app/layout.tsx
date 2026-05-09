import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://laparfumerie.com.ar"
  ),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  title: {
    default: "La Parfumerie de Solange | Perfumería de Lujo en Santa Rosa, La Pampa",
    template: "%s | La Parfumerie de Solange",
  },
  description:
    "Perfumería de lujo en Santa Rosa, La Pampa. Fragancias exclusivas: Femeninas, Masculinas, Unisex y Árabes. Envío gratis dentro de Santa Rosa. Visitanos en Ayala 604.",
  keywords: [
    "perfumería santa rosa la pampa",
    "perfumes de lujo argentina",
    "perfumes árabes santa rosa",
    "comprar perfumes santa rosa",
    "La Parfumerie de Solange",
    "perfumería Ayala 604",
  ],
  authors: [{ name: "La Parfumerie de Solange" }],
  creator: "La Parfumerie de Solange",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://laparfumerie.com.ar",
    siteName: "La Parfumerie de Solange",
    title: "La Parfumerie de Solange | Perfumería de Lujo en Santa Rosa, La Pampa",
    description:
      "Fragancias exclusivas para quienes buscan lo mejor. Envío gratis en Santa Rosa.",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Parfumerie de Solange",
    description: "Perfumería de lujo en Santa Rosa, La Pampa.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiUrl =
    process.env.NEXT_PUBLIC_UMAMI_URL ||
    "https://analytics.umami.is/script.js";

  return (
    <html lang="es-AR" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "La Parfumerie de Solange",
              description:
                "Perfumería de lujo en Santa Rosa, La Pampa, Argentina.",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://laparfumerie.com.ar",
              telephone: "+542954808202",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ayala 604",
                addressLocality: "Santa Rosa",
                addressRegion: "La Pampa",
                addressCountry: "AR",
              },
              sameAs: ["https://www.instagram.com/laparfumerie.desolange/"],
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body 
        className="min-h-full flex flex-col bg-black text-white antialiased"
        suppressHydrationWarning
      >
        {children}
        <WhatsAppButton />

        {umamiId && (
          <Script
            src={umamiUrl}
            data-website-id={umamiId}
            strategy="afterInteractive"
            defer
          />
        )}
      </body>
    </html>
  );
}
