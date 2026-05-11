import { Metadata } from "next";
import CatalogView from "@/components/productos/CatalogView";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CATEGORY_MAP: Record<string, string> = {
  "aromatizantes-ambientales": "aromatizantes",
  "difusores": "difusores",
  "ropa": "ropa",
  "esenciales": "esenciales",
  "hogar": "aromatizantes-hogar",
  "textil": "aromatizantes-textil",
  "auto": "aromatizantes-auto",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  
  return {
    title: `${title} | Aromatizantes La Parfumerie`,
    description: `Fragancias para el hogar y ambientes. Descubrí nuestra línea de ${title} en Santa Rosa, La Pampa.`,
    alternates: {
      canonical: `/aromatizantes/${slug}`,
    },
  };
}

export default async function AromatizantesCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sParams = await searchParams;
  
  const categoria = CATEGORY_MAP[slug] || slug;

  return (
    <CatalogView 
      searchParams={{ 
        ...sParams, 
        categoria: categoria,
        seccion: "aromatizantes" 
      } as any} 
      title={slug.replace(/-/g, " ").toUpperCase()}
    />
  );
}
