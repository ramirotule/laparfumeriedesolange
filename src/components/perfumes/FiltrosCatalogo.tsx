"use client";

import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { bienestar, aromatizantes, skincare } from "@/constants/navigation";
import { Search, X } from "lucide-react";
import CustomSelect from "@/components/ui/CustomSelect";

const generos = [
  { value: "Femenino", label: "FEMENINO" },
  { value: "Masculino", label: "MASCULINO" },
  { value: "Unisex", label: "UNISEX" },
  { value: "Árabe", label: "ÁRABE" },
];

const familias = [
  { value: "Floral", label: "FLORAL" },
  { value: "Oriental", label: "ORIENTAL" },
  { value: "Amaderado", label: "AMADERADO" },
  { value: "Fresco", label: "FRESCO" },
  { value: "Chipre", label: "CHIPRE" },
  { value: "Fougère", label: "FOUGÈRE" },
  { value: "Gourmand", label: "GOURMAND" },
  { value: "Árabe / Oud", label: "ÁRABE / OUD" },
];

const colecciones = [
  { value: "nuevo", label: "NOVEDADES" },
  { value: "destacado", label: "DESTACADOS" },
];

const ordenOpciones = [
  { value: "", label: "RELEVANCIA" },
  { value: "precio_asc", label: "MENOR PRECIO" },
  { value: "precio_desc", label: "MAYOR PRECIO" },
  { value: "nombre", label: "NOMBRE A-Z" },
];

interface Props {
  activeParams: Record<string, string | undefined>;
}

export default function FiltrosCatalogo({ activeParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(activeParams.q || activeParams.busqueda || "");

  useEffect(() => {
    setSearchValue(activeParams.q || activeParams.busqueda || "");
  }, [activeParams.q, activeParams.busqueda]);

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("q", searchValue || null);
  };

  const hasActiveFilters = Object.entries(activeParams).some(([key, value]) => {
    if (key === 'seccion') return false;
    return Boolean(value);
  });

  return (
    <div className="w-full space-y-4 mb-10">
      {/* Contenedor Único de Filtros y Búsqueda */}
      <div className="flex flex-col lg:flex-row gap-4 bg-[#0D0D0D] border border-[#1A1A1A] p-4 rounded-sm shadow-2xl items-end">
        {/* Input de Búsqueda */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 w-full">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="¿Qué estás buscando?..."
            className="w-full bg-black border border-[#2D2D2D] text-white text-[10px] uppercase tracking-widest px-10 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors rounded-sm placeholder:text-gray-600 h-[46px]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          {searchValue && (
            <button
              type="button"
              onClick={() => {
                setSearchValue("");
                updateParam("q", null);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X size={12} />
            </button>
          )}
        </form>

        {/* Grupo de Dropdowns Custom */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {!(activeParams.seccion === "bienestar" || 
             activeParams.seccion === "aromatizantes" || 
             activeParams.seccion === "cuidados-piel") && (
            <>
              <div className="min-w-[140px] flex-1 lg:flex-none">
                <CustomSelect
                  value={activeParams.genero || ""}
                  onChange={(val) => updateParam("genero", val || null)}
                  options={generos}
                  placeholder="GÉNERO"
                />
              </div>

              <div className="min-w-[160px] flex-1 lg:flex-none">
                <CustomSelect
                  value={activeParams.familia || ""}
                  onChange={(val) => updateParam("familia", val || null)}
                  options={familias}
                  placeholder="FAMILIA"
                />
              </div>

              <div className="min-w-[160px] flex-1 lg:flex-none">
                <CustomSelect
                  value={activeParams.nuevo === "true" ? "nuevo" : activeParams.destacado === "true" ? "destacado" : ""}
                  onChange={(val) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("nuevo");
                    params.delete("destacado");
                    if (val === "nuevo") params.set("nuevo", "true");
                    if (val === "destacado") params.set("destacado", "true");
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                  options={colecciones}
                  placeholder="COLECCIÓN"
                />
              </div>
            </>
          )}

          <div className="min-w-[160px] flex-1 lg:flex-none">
            <CustomSelect
              value={activeParams.ordenar || ""}
              onChange={(val) => updateParam("ordenar", val || null)}
              options={ordenOpciones}
              placeholder="ORDENAR POR"
            />
          </div>

          {/* Botón Limpiar */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchValue("");
                router.push(pathname + (activeParams.seccion ? `?seccion=${activeParams.seccion}` : ""));
              }}
              className="h-[46px] px-4 text-red-500 hover:bg-red-500/10 transition-colors rounded-sm flex items-center justify-center border border-red-500/20"
              title="Limpiar filtros"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Subcategorías específicas (Bienestar/Aromatizantes/Skincare) */}
      {(activeParams.seccion === "bienestar" || 
        activeParams.seccion === "aromatizantes" || 
        activeParams.seccion === "cuidados-piel") && (
        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            href={`/${activeParams.seccion}`}
            className={`px-4 py-2 text-[9px] uppercase tracking-widest border transition-all rounded-sm ${
              !activeParams.categoria
                ? "bg-[#D4AF37] border-[#D4AF37] text-black font-bold"
                : "bg-black/40 border-[#2D2D2D] text-gray-500 hover:border-[#D4AF37] hover:text-white"
            }`}
          >
            VER TODO
          </Link>
          {(activeParams.seccion === "bienestar" 
             ? bienestar 
             : activeParams.seccion === "cuidados-piel" 
               ? skincare 
               : aromatizantes)
            .filter(item => item.nombre !== "VER TODO")
            .map((item) => (
              <div key={item.nombre} className="flex gap-2">
                {/* Categoría Principal */}
                <Link
                  href={item.href || "#"}
                  className={`px-4 py-2 text-[9px] uppercase tracking-widest border transition-all rounded-sm ${
                    activeParams.categoria === item.href?.split("/").pop()
                      ? "bg-[#D4AF37] border-[#D4AF37] text-black font-bold"
                      : "bg-black/40 border-[#2D2D2D] text-gray-500 hover:border-[#D4AF37] hover:text-white"
                  }`}
                >
                  {item.nombre}
                </Link>

                {/* Subcategorías si existen */}
                {item.sub && item.sub.map(s => (
                  <Link
                    key={s.nombre}
                    href={s.href}
                    className={`px-4 py-2 text-[9px] uppercase tracking-widest border transition-all rounded-sm ${
                      activeParams.categoria === s.href.split("/").pop()
                        ? "bg-[#D4AF37] border-[#D4AF37] text-black font-bold"
                        : "bg-black/40 border-[#2D2D2D] text-gray-500 hover:border-[#D4AF37] hover:text-white"
                    }`}
                  >
                    {s.nombre}
                  </Link>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
