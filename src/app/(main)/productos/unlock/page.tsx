import { Metadata } from "next";
import CatalogView from "@/components/productos/CatalogView";

interface SearchParams {
  genero?: string;
  familia?: string;
  ordenar?: string;
  busqueda?: string;
}

export const metadata: Metadata = {
  title: "Línea Unlock | Fragancias Exclusivas en La Parfumerie",
  description: "Descubrí la colección exclusiva de fragancias Unlock. Productos femeninos, masculinos y unisex con el sello distintivo de Bagués.",
  alternates: {
    canonical: "/productos/unlock",
  },
};

export default async function UnlockCategoryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  return (
    <CatalogView 
      searchParams={{ ...params, marca: "Unlock" }} 
      title="Línea Unlock"
    />
  );
}
