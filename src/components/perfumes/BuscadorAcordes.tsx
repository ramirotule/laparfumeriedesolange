"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Search } from "lucide-react";

export const ACORDES_PREDEFINIDOS = [
  { nombre: "Amaderado", bg: "#6b4423", text: "#ffffff", barBg: "#4a2f18" },
  { nombre: "Avainillado", bg: "#f3e5ab", text: "#000000", barBg: "#d4c89c" },
  { nombre: "Cuero", bg: "#4a3018", text: "#ffffff", barBg: "#2d1d0e" },
  { nombre: "Ahumado", bg: "#5c5c5c", text: "#ffffff", barBg: "#3d3d3d" },
  { nombre: "Atalcado", bg: "#eaddcf", text: "#000000", barBg: "#c9beaf" },
  { nombre: "Ámbar", bg: "#d06300", text: "#ffffff", barBg: "#a14d00" },
  { nombre: "Animálico", bg: "#5a3a22", text: "#ffffff", barBg: "#3b2616" },
  { nombre: "Dulce", bg: "#e91e63", text: "#ffffff", barBg: "#ad1449" },
  { nombre: "Cítrico", bg: "#ffeb3b", text: "#000000", barBg: "#c4b52b" },
  { nombre: "Floral", bg: "#f48fb1", text: "#000000", barBg: "#c2708c" },
  { nombre: "Afrutado", bg: "#ff9800", text: "#000000", barBg: "#c27400" },
  { nombre: "Fresco", bg: "#81d4fa", text: "#000000", barBg: "#63a3c2" },
  { nombre: "Acuático", bg: "#0288d1", text: "#ffffff", barBg: "#015b8c" },
  { nombre: "Especiado cálido", bg: "#8e1600", text: "#ffffff", barBg: "#5e0f00" },
  { nombre: "Especiado fresco", bg: "#8bc34a", text: "#000000", barBg: "#699437" },
  { nombre: "Verde", bg: "#4caf50", text: "#ffffff", barBg: "#37803a" },
  { nombre: "Almizclado", bg: "#e0e0e0", text: "#000000", barBg: "#ababab" },
  { nombre: "Oud", bg: "#2d1606", text: "#ffffff", barBg: "#170a02" },
];

export default function BuscadorAcordes() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [acordesSeleccionados, setAcordesSeleccionados] = useState<string[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  useEffect(() => {
    const queryAcordes = searchParams.get("acordes");
    if (queryAcordes) {
      setAcordesSeleccionados(queryAcordes.split(",").map(a => a.trim()));
    } else {
      setAcordesSeleccionados([]);
    }
  }, [searchParams]);

  const updateUrl = (nuevosAcordes: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nuevosAcordes.length > 0) {
      params.set("acordes", nuevosAcordes.join(","));
    } else {
      params.delete("acordes");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const agregarAcorde = (acorde: string) => {
    if (!acordesSeleccionados.includes(acorde)) {
      const nuevos = [...acordesSeleccionados, acorde];
      setAcordesSeleccionados(nuevos);
      updateUrl(nuevos);
    }
    setBusqueda("");
    setMostrarDropdown(false);
  };

  const quitarAcorde = (acorde: string) => {
    const nuevos = acordesSeleccionados.filter((a) => a !== acorde);
    setAcordesSeleccionados(nuevos);
    updateUrl(nuevos);
  };

  const limpiar = () => {
    setAcordesSeleccionados([]);
    updateUrl([]);
  };

  const acordesDisponibles = ACORDES_PREDEFINIDOS.filter(
    (a) =>
      !acordesSeleccionados.includes(a.nombre.toLowerCase()) &&
      a.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-4 sm:p-6 mb-8 w-full max-w-4xl mx-auto rounded-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-white font-serif text-2xl mb-1">Buscar por Acordes</h2>
          <p className="text-[#888888] text-xs">Añadí acordes para filtrar los perfumes.</p>
        </div>
        {acordesSeleccionados.length > 0 && (
          <button
            onClick={limpiar}
            className="text-xs text-[#D4AF37] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black px-3 py-1.5 transition-colors uppercase tracking-wider"
          >
            Limpiar Filtros
          </button>
        )}
      </div>

      <div className="relative mb-8">
        <div className="flex items-center bg-[#1A1A1A] border border-[#2D2D2D] p-2 focus-within:border-[#D4AF37] transition-colors">
          <Search size={18} className="text-[#555555] mx-2" />
          <input
            type="text"
            placeholder="Buscar o seleccionar un acorde..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setMostrarDropdown(true);
            }}
            onFocus={() => setMostrarDropdown(true)}
            className="bg-transparent border-none outline-none text-white w-full text-sm placeholder-[#555555]"
          />
        </div>

        {mostrarDropdown && (
          <div className="absolute z-50 top-full left-0 w-full mt-1 bg-[#111111] border border-[#2D2D2D] shadow-xl max-h-60 overflow-y-auto">
            {acordesDisponibles.length > 0 ? (
              acordesDisponibles.map((acorde) => (
                <button
                  key={acorde.nombre}
                  onClick={() => agregarAcorde(acorde.nombre.toLowerCase())}
                  className="w-full text-left px-4 py-2 text-sm text-[#cccccc] hover:bg-[#1A1A1A] hover:text-[#D4AF37] flex items-center justify-between transition-colors"
                >
                  {acorde.nombre}
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: acorde.bg }}
                  ></div>
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-[#555555]">No se encontraron acordes.</div>
            )}
          </div>
        )}
      </div>

      {acordesSeleccionados.length > 0 && (
        <div className="space-y-3">
          {acordesSeleccionados.map((acordeName, index) => {
            const data = ACORDES_PREDEFINIDOS.find(
              (a) => a.nombre.toLowerCase() === acordeName.toLowerCase()
            );
            const bgColor = data?.bg || "#333333";
            const textColor = data?.text || "#ffffff";
            
            // Variar ligeramente el ancho para darle un estilo visual tipo Fragrantica
            // El primer acorde suele tener la barra más larga
            const barWidth = Math.max(40, 100 - (index * 15)) + "%";

            return (
              <div key={acordeName} className="flex items-center gap-3 w-full">
                {/* Nombre del acorde */}
                <div className="w-32 sm:w-40 shrink-0 bg-[#1A1A1A] border border-[#2D2D2D] py-1.5 px-3 text-xs text-white capitalize overflow-hidden text-ellipsis whitespace-nowrap text-center">
                  {acordeName}
                </div>

                {/* Barra de color */}
                <div className="flex-1 bg-[#1A1A1A] rounded overflow-hidden h-6 relative flex items-center">
                  <div
                    className="h-full transition-all duration-500 rounded-r shadow-sm"
                    style={{ 
                      width: barWidth, 
                      backgroundColor: bgColor,
                      boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.2)'
                    }}
                  />
                  {/* Etiqueta dentro de la barra si quisiéramos, pero Fragrantica no la tiene */}
                </div>

                {/* Botón eliminar */}
                <button
                  onClick={() => quitarAcorde(acordeName)}
                  className="text-[#555555] hover:text-red-500 transition-colors p-1"
                  aria-label={`Eliminar acorde ${acordeName}`}
                >
                  <X size={18} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Backdrop invisible para cerrar el dropdown al hacer clic fuera */}
      {mostrarDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setMostrarDropdown(false)}
        />
      )}
    </div>
  );
}
