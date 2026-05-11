import { Metadata } from "next";
import CatalogView from "@/components/productos/CatalogView";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Mapeo opcional por si el slug de la URL es distinto al de la base de datos
const CATEGORY_MAP: Record<string, string> = {
  "aceites-esenciales": "aceites-esenciales",
  "brumas-almohada": "brumas",
  "tratamientos": "tratamientos",
  "balsamos": "balsamos",
  "aceites-puros": "aceites-puros",
  "aceites-cosmetologicos": "aceites-cosmetologicos",
  "aceites-blend": "aceites-blend",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  
  return {
    title: `${title} | Línea Bienestar La Parfumerie`,
    description: `Descubrí nuestra selección de ${title}. Productos de bienestar y cuidado personal en Santa Rosa, La Pampa.`,
    alternates: {
      canonical: `/bienestar/${slug}`,
    },
  };
}

export default async function BienestarCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sParams = await searchParams;
  
  // Si el slug no está en nuestro mapa, igual intentamos usarlo como categoría
  const categoria = CATEGORY_MAP[slug] || slug;

  return (
    <CatalogView 
      searchParams={{ 
        ...sParams, 
        categoria: categoria,
        seccion: "bienestar" 
      } as any} 
      title={slug.replace(/-/g, " ").toUpperCase()}
    />
  );
}
