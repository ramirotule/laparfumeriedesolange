import { Metadata } from "next";
import CatalogView from "@/components/productos/CatalogView";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CATEGORY_MAP: Record<string, string> = {
  "facial": "Cuidado Facial",
  "facial-limpieza": "Limpieza",
  "facial-serum": "Serum",
  "facial-crema": "Crema",
  "facial-tratamiento": "Tratamiento",
  "facial-suncare": "Suncare",
  "facial-rutinas": "Rutinas",
  "corporal": "Cuidado Corporal",
  "corporal-corporales": "Corporales",
  "corporal-manos": "Manos",
  "tipos-de-piel": "Tipos de Piel",
  "piel-mixta": "Mixta",
  "piel-grasa": "Grasa",
  "piel-seca": "Seca",
  "piel-normal": "Normal",
  "piel-todo": "Todo tipo",
  "linea": "Línea",
  "linea-bioetape": "Bioetape",
  "linea-semplice": "Semplice",
  "linea-patagonia": "Patagonia",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  
  return {
    title: `${title} | Cuidados de la Piel La Parfumerie`,
    description: `Productos de ${title} para tu rutina diaria. Descubrí lo mejor en skincare en La Parfumerie.`,
    alternates: {
      canonical: `/cuidados-piel/${slug}`,
    },
  };
}

export default async function SkincareCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sParams = await searchParams;
  
  const categoria = CATEGORY_MAP[slug] || slug;

  return (
    <CatalogView 
      searchParams={{ 
        ...sParams, 
        categoria: categoria,
        seccion: "cuidados-piel" 
      } as any} 
      title={slug.replace(/-/g, " ").toUpperCase()}
    />
  );
}
