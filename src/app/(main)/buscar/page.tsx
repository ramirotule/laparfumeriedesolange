import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Producto, NotaAromatica, FamiliaOlfativa } from "@/types";
import ProductoGrid from "@/components/productos/ProductoGrid";
import BuscarNotasClient from "@/components/buscar/BuscarNotasClient";
import BuscarAcordesClient from "@/components/buscar/BuscarAcordesClient";

export const metadata: Metadata = {
  title: "Buscar Productos | La Parfumerie de Solange",
  description: "Buscá entre toda nuestra colección de productos de lujo en Santa Rosa, La Pampa.",
};

async function buscarProductos(q: string): Promise<Producto[]> {
  if (!q || q.length < 2) return [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("productos")
      .select("*, familia_olfativa:familias_olfativas(*)")
      .eq("activo", true)
      .or(`nombre.ilike.%${q}%,marca.ilike.%${q}%,descripcion.ilike.%${q}%,genero.ilike.%${q}%`)
      .order("destacado", { ascending: false })
      .limit(50);
    return (data as Producto[]) || [];
  } catch {
    return [];
  }
}

async function fetchNotas(): Promise<NotaAromatica[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("notas_aromaticas")
      .select("*")
      .order("categoria")
      .order("nombre");
    return (data as NotaAromatica[]) || [];
  } catch {
    return [];
  }
}

async function fetchFamilias(): Promise<FamiliaOlfativa[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("familias_olfativas")
      .select("*")
      .order("nombre");
    return (data as FamiliaOlfativa[]) || [];
  } catch {
    return [];
  }
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tipo?: string }>;
}) {
  const { q, tipo } = await searchParams;

  // — Buscar por notas —
  if (tipo === "notas") {
    const notas = await fetchNotas();
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">Búsqueda avanzada</p>
          <h1 className="font-serif text-4xl text-white">Buscar por Notas</h1>
          <p className="text-[#888888] text-sm mt-3">
            Seleccioná una nota olfativa para descubrir las fragancias que la contienen.
          </p>
        </div>
        <BuscarNotasClient notas={notas} />
      </div>
    );
  }

  // — Buscar por acordes —
  if (tipo === "acordes") {
    const familias = await fetchFamilias();
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">Búsqueda avanzada</p>
          <h1 className="font-serif text-4xl text-white">Buscar por Acordes</h1>
          <p className="text-[#888888] text-sm mt-3">
            Seleccioná un acorde olfativo para explorar las fragancias de esa familia.
          </p>
        </div>
        <BuscarAcordesClient familias={familias} />
      </div>
    );
  }

  // — Búsqueda por texto (comportamiento original) —
  const productos = await buscarProductos(q || "");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-white mb-2">Resultados de búsqueda</h1>
      </div>

      {q && q.length >= 2 ? (
        <>
          <p className="text-[#888888] text-sm mb-8">
            {productos.length > 0
              ? `${productos.length} resultado${productos.length !== 1 ? "s" : ""} para: "${q.toUpperCase()}"`
              : `Sin resultados para: "${q.toUpperCase()}"`}
          </p>
          <ProductoGrid
            productos={productos}
            emptyMessage={`No encontramos fragancias para "${q}". Probá con el nombre de la marca o nota olfativa.`}
          />
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-5xl mb-4 text-[#1A1A1A]">✦</div>
          <p className="text-[#888888]">Ingresá el nombre de un producto, marca o nota olfativa.</p>
        </div>
      )}
    </div>
  );
}
