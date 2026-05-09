import { Metadata } from "next";
import CatalogView from "@/components/perfumes/CatalogView";

interface SearchParams {
  genero?: string;
  familia?: string;
  ordenar?: string;
  busqueda?: string;
  nuevo?: string;
  destacado?: string;
  q?: string;
  acordes?: string;
  notas?: string;
  marca?: string;
  categoria?: string;
  seccion?: string;
}

export const metadata: Metadata = {
  title: "Catálogo de Perfumes de Lujo en Santa Rosa, La Pampa",
  description:
    "Explorá nuestro catálogo completo de perfumes de lujo. Femeninos, masculinos, unisex y árabes. Envío gratis en Santa Rosa, La Pampa. Visitanos en Ayala 604.",
  alternates: {
    canonical: "/perfumes",
  },
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  return <CatalogView searchParams={params} />;
}
