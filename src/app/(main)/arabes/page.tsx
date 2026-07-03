import { Metadata } from "next";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";
import { Producto } from "@/types";
import CatalogView from "@/components/productos/CatalogView";

interface SearchParams {
  genero?: string;
  familia?: string;
  ordenar?: string;
  busqueda?: string;
}

export const metadata: Metadata = {
  title:
    "Perfumería Árabe en Santa Rosa La Pampa | Oud, Bagues y Fragancias Orientales",
  description:
    "La mejor selección de productos árabes en Argentina. Oud, ámbar, rosas árabes y bagues exclusivos disponibles en Santa Rosa, La Pampa. Perfumería árabe con envío gratis.",
  keywords: [
    "perfumería árabe argentina",
    "productos árabes santa rosa la pampa",
    "oud santa rosa",
    "bagues productos argentina",
    "productos orientales argentina",
    "comprar productos arabes argentina",
  ],
  alternates: { canonical: "/arabes" },
};

async function getProductosArabes(): Promise<Producto[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("productos")
      .select("*, familia_olfativa:familias_olfativas(*)")
      .eq("activo", true)
      .eq("genero", "Árabe")
      .order("destacado", { ascending: false })
      .order("created_at", { ascending: false });
    return (data as Producto[]) || [];
  } catch {
    return [];
  }
}

export default async function ArabesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const productos = await getProductosArabes();

  const localSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Productos Árabes - La Parfumerie de Solange",
    description:
      "Colección de productos árabes: Oud, Bagues y fragancias orientales disponibles en Santa Rosa, La Pampa, Argentina.",
    numberOfItems: productos.length,
    itemListElement: productos.slice(0, 10).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${p.nombre} - ${p.marca}`,
        description: p.descripcion_corta || p.descripcion,
        offers: {
          "@type": "Offer",
          price: p.precio_venta,
          priceCurrency: "ARS",
          availability:
            p.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
        },
      },
    })),
  };

  return (
    <>
      <Script
        id="ld-json-arabes"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      <CatalogView
        searchParams={{ ...params, genero: "Árabe" }}
        title="Fragancias Árabes"
      />
    </>
  );
}
