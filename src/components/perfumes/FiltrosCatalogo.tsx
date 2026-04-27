"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

const generos = ["Femenino", "Masculino", "Unisex", "Árabe"];
const familias = ["Floral", "Oriental", "Amaderado", "Fresco", "Chipre", "Fougère", "Gourmand", "Árabe / Oud"];
const ordenOpciones = [
  { value: "", label: "Relevancia" },
  { value: "precio_asc", label: "Precio: menor a mayor" },
  { value: "precio_desc", label: "Precio: mayor a menor" },
  { value: "nombre", label: "Nombre A-Z" },
];

interface Props {
  activeParams: Record<string, string | undefined>;
}

export default function FiltrosCatalogo({ activeParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="space-y-6 pl-4 pr-5 border-r border-[#1A1A1A]">
      {/* Limpiar filtros */}
      {Object.values(activeParams).some(Boolean) && (
        <Link
          href="/perfumes"
          className="block text-xs text-[#888888] hover:text-[#D4AF37] transition-colors border border-[#2D2D2D] hover:border-[#D4AF37]/40 px-3 py-2 text-center"
        >
          ✕ Limpiar filtros
        </Link>
      )}

      {/* Género */}
      <div>
        <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Género
        </h3>
        <div className="space-y-1.5">
          {generos.map((g) => (
            <button
              key={g}
              onClick={() =>
                updateParam("genero", activeParams.genero === g ? null : g)
              }
              className={`block w-full text-left text-sm px-3 py-2 transition-all duration-150 ${
                activeParams.genero === g
                  ? "bg-[#D4AF37]/10 border-l-2 border-[#D4AF37] text-[#D4AF37] pl-2.5"
                  : "text-[#888888] hover:text-white border-l-2 border-transparent"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Familia olfativa */}
      <div>
        <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Familia Olfativa
        </h3>
        <div className="space-y-1.5">
          {familias.map((f) => (
            <button
              key={f}
              onClick={() =>
                updateParam("familia", activeParams.familia === f ? null : f)
              }
              className={`block w-full text-left text-sm px-3 py-2 transition-all duration-150 ${
                activeParams.familia === f
                  ? "bg-[#D4AF37]/10 border-l-2 border-[#D4AF37] text-[#D4AF37] pl-2.5"
                  : "text-[#888888] hover:text-white border-l-2 border-transparent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Colecciones */}
      <div>
        <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Colecciones
        </h3>
        <div className="space-y-1.5">
          <button
            onClick={() =>
              updateParam("nuevo", activeParams.nuevo === "true" ? null : "true")
            }
            className={`block w-full text-left text-sm px-3 py-2 transition-all duration-150 ${
              activeParams.nuevo === "true"
                ? "bg-[#D4AF37]/10 border-l-2 border-[#D4AF37] text-[#D4AF37] pl-2.5"
                : "text-[#888888] hover:text-white border-l-2 border-transparent"
            }`}
          >
            Novedades
          </button>
          <button
            onClick={() =>
              updateParam(
                "destacado",
                activeParams.destacado === "true" ? null : "true"
              )
            }
            className={`block w-full text-left text-sm px-3 py-2 transition-all duration-150 ${
              activeParams.destacado === "true"
                ? "bg-[#D4AF37]/10 border-l-2 border-[#D4AF37] text-[#D4AF37] pl-2.5"
                : "text-[#888888] hover:text-white border-l-2 border-transparent"
            }`}
          >
            Destacados
          </button>
        </div>
      </div>

      {/* Ordenar */}
      <div>
        <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Ordenar por
        </h3>
        <div className="space-y-1.5">
          {ordenOpciones.map((op) => (
            <button
              key={op.value}
              onClick={() => updateParam("ordenar", op.value || null)}
              className={`block w-full text-left text-sm px-3 py-2 transition-all duration-150 ${
                (activeParams.ordenar || "") === op.value
                  ? "bg-[#D4AF37]/10 border-l-2 border-[#D4AF37] text-[#D4AF37] pl-2.5"
                  : "text-[#888888] hover:text-white border-l-2 border-transparent"
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
