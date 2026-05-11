"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { NotaAromatica, Producto } from "@/types";

interface Props {
  notas: NotaAromatica[];
}

const LABEL_CATEGORIA: Record<string, string> = {
  salida:  "Notas de Salida",
  corazon: "Notas de Corazón",
  fondo:   "Notas de Fondo",
};

const COLOR_CATEGORIA: Record<string, string> = {
  salida:  "border-[#D4AF37]/60 text-[#D4AF37]",
  corazon: "border-[#E8CC6B]/60 text-[#E8CC6B]",
  fondo:   "border-[#B8960C]/60 text-[#B8960C]",
};

export default function BuscarNotasClient({ notas }: Props) {
  const [notaSeleccionada, setNotaSeleccionada] = useState<NotaAromatica | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(false);

  const categorias = ["salida", "corazon", "fondo"] as const;

  async function seleccionarNota(nota: NotaAromatica) {
    if (notaSeleccionada?.id === nota.id) {
      setNotaSeleccionada(null);
      setProductos([]);
      return;
    }

    setNotaSeleccionada(nota);
    setCargando(true);

    const supabase = createClient();

    // Primero obtenemos los IDs de productos que tienen esta nota
    const { data: relaciones } = await supabase
      .from("producto_notas")
      .select("producto_id")
      .eq("nota_id", nota.id);

    const productoIds = (relaciones || []).map((r: { producto_id: string }) => r.producto_id);

    if (productoIds.length === 0) {
      setProductos([]);
      setCargando(false);
      return;
    }

    const { data } = await supabase
      .from("productos")
      .select("*, familia_olfativa:familias_olfativas(*)")
      .eq("activo", true)
      .in("id", productoIds)
      .order("destacado", { ascending: false })
      .limit(40);

    setProductos((data as Producto[]) || []);
    setCargando(false);
  }

  return (
    <div>
      {/* Chips de notas agrupados por categoría */}
      <div className="space-y-8 mb-12">
        {categorias.map((cat) => {
          const notasCat = notas.filter((n) => n.categoria === cat);
          if (notasCat.length === 0) return null;
          return (
            <div key={cat}>
              <p className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-3 ${COLOR_CATEGORIA[cat]}`}>
                {LABEL_CATEGORIA[cat]}
              </p>
              <div className="flex flex-wrap gap-2">
                {notasCat.map((nota) => {
                  const activa = notaSeleccionada?.id === nota.id;
                  return (
                    <button
                      key={nota.id}
                      onClick={() => seleccionarNota(nota)}
                      className={`px-4 py-1.5 text-sm border transition-all duration-200 ${
                        activa
                          ? "bg-[#D4AF37] border-[#D4AF37] text-black font-semibold"
                          : "border-[#2D2D2D] text-[#888888] hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                      }`}
                    >
                      {nota.nombre}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resultados */}
      {notaSeleccionada && (
        <div>
          <div className="border-t border-[#1A1A1A] pt-8 mb-6">
            <p className="text-[#888888] text-sm">
              {cargando
                ? "Buscando..."
                : `${productos.length} fragancia${productos.length !== 1 ? "s" : ""} con nota de `}
              {!cargando && (
                <span className="text-[#D4AF37] font-semibold">{notaSeleccionada.nombre}</span>
              )}
            </p>
          </div>

          {!cargando && productos.length === 0 && (
            <p className="text-[#555555] text-sm text-center py-12">
              No hay productos cargados con esta nota aún.
            </p>
          )}

          {!cargando && productos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {productos.map((p) => (
                <Link
                  key={p.id}
                  href={`/productos/${p.slug}`}
                  className="group bg-[#0D0D0D] border border-[#1A1A1A] hover:border-[#D4AF37]/40 transition-all duration-200 flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#111111]">
                    {p.imagen_url ? (
                      <Image
                        src={p.imagen_url}
                        alt={p.nombre}
                        fill
                        sizes="(max-width: 640px) 50vw, 20vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#2A2A2A] text-3xl">✦</div>
                    )}
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <p className="text-[#666666] text-[10px] tracking-wider uppercase">{p.marca}</p>
                    <p className="text-white text-sm font-serif leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-2 mt-0.5">
                      {p.nombre}
                    </p>
                    <p className="text-[#D4AF37] font-bold text-sm mt-auto pt-2">
                      ${p.precio_venta.toLocaleString("es-AR")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Estado inicial */}
      {!notaSeleccionada && (
        <div className="text-center py-12 text-[#333333]">
          <div className="text-5xl mb-4">✦</div>
          <p className="text-[#555555] text-sm">Seleccioná una nota para ver las fragancias que la contienen.</p>
        </div>
      )}
    </div>
  );
}
