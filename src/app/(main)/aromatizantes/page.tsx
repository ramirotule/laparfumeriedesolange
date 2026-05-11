import { Metadata } from "next";
import CatalogView from "@/components/productos/CatalogView";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "Aromatizantes y Fragancias de Ambiente | La Parfumerie",
  description: "Descubrí nuestra colección de aromatizantes ambientales, difusores y fragancias para ropa. Ambientá tu hogar con aromas exclusivos.",
  alternates: {
    canonical: "/aromatizantes",
  },
};

export default async function AromatizantesMainPage({ searchParams }: Props) {
  const params = await searchParams;
  
  return (
    <CatalogView 
      searchParams={{ 
        ...params, 
        seccion: "aromatizantes" 
      } as any} 
      title="Aromatizantes"
    />
  );
}
