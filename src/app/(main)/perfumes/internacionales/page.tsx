import { Metadata } from "next";
import CatalogView from "@/components/perfumes/CatalogView";

interface SearchParams {
  genero?: string;
  familia?: string;
  ordenar?: string;
  busqueda?: string;
}

export const metadata: Metadata = {
  title: "Fragancias Internacionales | Catálogo de Lujo en La Parfumerie",
  description: "Explorá nuestra selección de las mejores fragancias internacionales. Perfumes importados de las marcas más prestigiosas del mundo.",
  alternates: {
    canonical: "/perfumes/internacionales",
  },
};

export default async function InternacionalesCategoryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  return (
    <CatalogView 
      searchParams={{ ...params, tipo: "internacional" }} 
      title="Fragancias Internacionales"
    />
  );
}
