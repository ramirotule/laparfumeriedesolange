import { Metadata } from "next";
import CatalogView from "@/components/productos/CatalogView";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "Cuidados de la Piel | La Parfumerie",
  description: "Descubrí nuestra línea completa de cuidado facial y corporal. Productos diseñados para cada tipo de piel.",
  alternates: {
    canonical: "/cuidados-piel",
  },
};

export default async function SkincareMainPage({ searchParams }: Props) {
  const params = await searchParams;
  
  return (
    <CatalogView 
      searchParams={{ 
        ...params, 
        seccion: "cuidados-piel" 
      } as any} 
      title="Cuidados de la Piel"
    />
  );
}
