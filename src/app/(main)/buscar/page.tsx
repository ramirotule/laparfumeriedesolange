import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Perfume } from "@/types";
import PerfumeGrid from "@/components/perfumes/PerfumeGrid";

export const metadata: Metadata = {
  title: "Buscar Perfumes | La Parfumerie de Solange",
  description: "Buscá entre toda nuestra colección de perfumes de lujo en Santa Rosa, La Pampa.",
};

async function buscarPerfumes(q: string): Promise<Perfume[]> {
  if (!q || q.length < 2) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("perfumes")
      .select("*, familia_olfativa:familias_olfativas(*)")
      .eq("activo", true)
      .or(`nombre.ilike.%${q}%,marca.ilike.%${q}%,descripcion.ilike.%${q}%,genero.ilike.%${q}%`)
      .order("destacado", { ascending: false })
      .limit(50);
    return (data as Perfume[]) || [];
  } catch {
    return [];
  }
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const perfumes = await buscarPerfumes(q || "");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-white mb-2">Resultados de búsqueda</h1>
      </div>

      {q && q.length >= 2 ? (
        <>
          <p className="text-[#888888] text-sm mb-8">
            {perfumes.length > 0
              ? `${perfumes.length} resultado${perfumes.length !== 1 ? "s" : ""} para: "${q.toUpperCase()}"`
              : `Sin resultados para: "${q.toUpperCase()}"`}
          </p>
          <PerfumeGrid
            perfumes={perfumes}
            emptyMessage={`No encontramos fragancias para "${q}". Probá con el nombre de la marca o nota olfativa.`}
          />
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4 text-[#1A1A1A]">✦</div>
          <p className="text-[#888888]">Ingresá el nombre de un perfume, marca o nota olfativa.</p>
        </div>
      )}
    </div>
  );
}
