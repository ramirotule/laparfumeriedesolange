"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { FamiliaOlfativa, Perfume } from "@/types";

interface Props {
  familias: FamiliaOlfativa[];
}

// Descripción corta por familia para mostrar debajo del chip
const DESCRIPCION_CORTA: Record<string, string> = {
  "Floral":      "Rosa, jazmín, peonía",
  "Oriental":    "Ámbar, vainilla, especias",
  "Amaderado":   "Sándalo, cedro, oud",
  "Fresco":      "Cítrico, acuático, aromático",
  "Chipre":      "Bergamota, musgo, labdanum",
  "Fougère":     "Lavanda, cumarina, musgo",
  "Gourmand":    "Caramelo, chocolate, vainilla",
  "Árabe / Oud": "Oud, ámbar, rosa árabe",
};

export default function BuscarAcordesClient({ familias }: Props) {
  const [familiaSeleccionada, setFamiliaSeleccionada] = useState<FamiliaOlfativa | null>(null);
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [cargando, setCargando] = useState(false);

  async function seleccionarFamilia(familia: FamiliaOlfativa) {
    if (familiaSeleccionada?.id === familia.id) {
      setFamiliaSeleccionada(null);
      setPerfumes([]);
      return;
    }

    setFamiliaSeleccionada(familia);
    setCargando(true);

    const supabase = createClient();
    const { data } = await supabase
      .from("perfumes")
      .select("*, familia_olfativa:familias_olfativas(*)")
      .eq("activo", true)
      .eq("familia_olfativa_id", familia.id)
      .order("destacado", { ascending: false })
      .limit(40);

    setPerfumes((data as Perfume[]) || []);
    setCargando(false);
  }

  return (
    <div>
      {/* Grid de acordes/familias */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-12">
        {familias.map((familia) => {
          const activa = familiaSeleccionada?.id === familia.id;
          return (
            <button
              key={familia.id}
              onClick={() => seleccionarFamilia(familia)}
              className={`text-left p-4 border transition-all duration-200 ${
                activa
                  ? "bg-[#D4AF37]/10 border-[#D4AF37] "
                  : "bg-[#0D0D0D] border-[#1A1A1A] hover:border-[#D4AF37]/40"
              }`}
            >
              <p className={`text-sm font-semibold mb-1 transition-colors ${activa ? "text-[#D4AF37]" : "text-white"}`}>
                {familia.nombre}
              </p>
              <p className="text-[#555555] text-xs leading-relaxed">
                {DESCRIPCION_CORTA[familia.nombre] || familia.descripcion?.substring(0, 50) || ""}
              </p>
            </button>
          );
        })}
      </div>

      {/* Resultados */}
      {familiaSeleccionada && (
        <div>
          <div className="border-t border-[#1A1A1A] pt-8 mb-6">
            <p className="text-[#888888] text-sm">
              {cargando
                ? "Buscando..."
                : `${perfumes.length} fragancia${perfumes.length !== 1 ? "s" : ""} con acorde `}
              {!cargando && (
                <span className="text-[#D4AF37] font-semibold">{familiaSeleccionada.nombre}</span>
              )}
            </p>
          </div>

          {!cargando && perfumes.length === 0 && (
            <p className="text-[#555555] text-sm text-center py-12">
              No hay perfumes cargados con este acorde aún.
            </p>
          )}

          {!cargando && perfumes.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {perfumes.map((p) => (
                <Link
                  key={p.id}
                  href={`/perfumes/${p.slug}`}
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
      {!familiaSeleccionada && (
        <div className="text-center py-12 text-[#333333]">
          <div className="text-5xl mb-4">✦</div>
          <p className="text-[#555555] text-sm">Seleccioná un acorde para ver las fragancias que lo contienen.</p>
        </div>
      )}
    </div>
  );
}
