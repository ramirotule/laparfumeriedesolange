import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Perfume } from "@/types";
import PerfumeGrid from "@/components/perfumes/PerfumeGrid";
import FiltrosCatalogo from "@/components/perfumes/FiltrosCatalogo";
import BuscadorAcordes from "@/components/perfumes/BuscadorAcordes";
import BuscadorNotas from "@/components/perfumes/BuscadorNotas";

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
}

export const metadata: Metadata = {
  title: "Catálogo de Perfumes de Lujo en Santa Rosa, La Pampa",
  description:
    "Explorá nuestro catálogo completo de perfumes de lujo. Femeninos, masculinos, unisex y árabes. Envío gratis en Santa Rosa, La Pampa. Visitanos en Ayala 604.",
  alternates: {
    canonical: "/perfumes",
  },
};

async function getPerfumes(params: SearchParams): Promise<Perfume[]> {
  try {
    const supabase = await createClient();
    let query = supabase
      .from("perfumes")
      .select("*, familia_olfativa:familias_olfativas(*)")
      .eq("activo", true);

    if (params.genero) query = query.eq("genero", params.genero);
    if (params.nuevo === "true") query = query.eq("nuevo", true);
    if (params.destacado === "true") query = query.eq("destacado", true);

    if (params.busqueda || params.q) {
      const term = params.busqueda || params.q || "";
      query = query.or(
        `nombre.ilike.%${term}%,marca.ilike.%${term}%,descripcion.ilike.%${term}%`,
      );
    }

    if (params.acordes) {
      const acordesList = params.acordes.split(",").map(a => a.trim());
      acordesList.forEach(acorde => {
        query = query.ilike("descripcion", `%${acorde}%`);
      });
    }

    if (params.notas) {
      const notasList = params.notas.split(",").map(n => n.trim());
      notasList.forEach(nota => {
        // En un futuro podrías filtrar por la relación 'notas' real
        // Por ahora lo filtramos buscando la palabra en la descripción
        query = query.ilike("descripcion", `%${nota}%`);
      });
    }

    if (params.familia) {
      const { data: familia } = await supabase
        .from("familias_olfativas")
        .select("id")
        .eq("nombre", params.familia)
        .single();
      if (familia) query = query.eq("familia_olfativa_id", familia.id);
    }

    switch (params.ordenar) {
      case "precio_asc":
        query = query.order("precio_venta", { ascending: true });
        break;
      case "precio_desc":
        query = query.order("precio_venta", { ascending: false });
        break;
      case "nombre":
        query = query.order("nombre", { ascending: true });
        break;
      default:
        query = query
          .order("destacado", { ascending: false })
          .order("created_at", { ascending: false });
    }

    const { data } = await query.limit(100);
    return (data as Perfume[]) || [];
  } catch {
    return [];
  }
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const perfumes = await getPerfumes(params);

  const titulo = params.genero
    ? `Perfumes ${params.genero}s`
    : params.familia
      ? `Perfumes ${params.familia}s`
      : params.nuevo === "true"
        ? "Novedades"
        : params.destacado === "true"
          ? "Perfumes Destacados"
          : "Catálogo de Perfumes";

  return (
    <div className="w-full mx-auto px-15 sm:px-6 lg:px-18 py-12">
      {/* Header con padding normal */}
      <div className="px-4 sm:px-6 lg:px-8 mb-10">
        <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">
          La Parfumerie de Solange
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
          {titulo}
        </h1>
        <p className="text-[#888888] text-sm">
          {perfumes.length} fragancia{perfumes.length !== 1 ? "s" : ""}{" "}
          encontrada
          {perfumes.length !== 1 ? "s" : ""}
        </p>
      </div>

      {!params.familia && !params.genero && params.nuevo !== "true" && params.destacado !== "true" && !params.marca && (
        <div className="px-4 sm:px-6 lg:px-8">
          <BuscadorNotas />
          <BuscadorAcordes />
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filtros — pegado al borde izquierdo sin padding */}
        <aside className="lg:w-52 shrink-0">
          <FiltrosCatalogo
            activeParams={params as Record<string, string | undefined>}
          />
        </aside>

        {/* Grid con padding derecho */}
        <div className="flex-1 min-w-0 pr-4 sm:pr-6 lg:pr-8">
          <PerfumeGrid
            perfumes={perfumes}
            emptyMessage="No encontramos perfumes con ese filtro. Probá con otras opciones."
          />
        </div>
      </div>
    </div>
  );
}
