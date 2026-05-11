import { Metadata } from "next";
import CatalogView from "@/components/productos/CatalogView";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "Línea Bienestar | La Parfumerie de Solange",
  description: "Explorá nuestra línea completa de bienestar. Aceites esenciales, brumas, tratamientos y bálsamos en Santa Rosa, La Pampa.",
  alternates: {
    canonical: "/bienestar",
  },
};

export default async function BienestarMainPage({ searchParams }: Props) {
  const params = await searchParams;
  
  return (
    <CatalogView 
      searchParams={{ 
        ...params, 
        seccion: "bienestar" 
      } as any} 
      title="Línea Bienestar"
    />
  );
}
