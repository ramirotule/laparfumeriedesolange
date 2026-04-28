"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, Search, X, ChevronDown } from "lucide-react";

const NOTAS_POPULARES = [
  { nombre: "Nardo", emoji: "💮" },
  { nombre: "Pachulí", emoji: "🌿" },
  { nombre: "Musgo de roble", emoji: "🍃" },
  { nombre: "yerba mate", emoji: "🧉" },
  { nombre: "Pimienta", emoji: "🧆" },
  { nombre: "Aldehídos", emoji: "✨" },
  { nombre: "Papiro", emoji: "🌾" },
  { nombre: "Fresa", emoji: "🍓" },
  { nombre: "Hoja y yema de grosellero", emoji: "🌱" },
  { nombre: "Crema", emoji: "🍦" },
  { nombre: "Notas Atalcadas", emoji: "☁️" },
  { nombre: "Notas Ozónicas", emoji: "💨" },
];

export default function BuscadorNotas() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [notasSeleccionadas, setNotasSeleccionadas] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Cargar estado desde la URL inicialmente
  useEffect(() => {
    const queryNotas = searchParams.get("notas");
    const openParam = searchParams.get("open");
    
    if (queryNotas) {
      setNotasSeleccionadas(queryNotas.split(",").map(n => n.trim().toLowerCase()));
      setIsOpen(true);
    } else {
      setNotasSeleccionadas([]);
    }
    
    if (openParam === "notas") {
      setIsOpen(true);
    }
  }, [searchParams]);

  const toggleNotaPopular = (nota: string) => {
    const notaLower = nota.toLowerCase();
    if (notasSeleccionadas.includes(notaLower)) {
      setNotasSeleccionadas(notasSeleccionadas.filter((n) => n !== notaLower));
    } else {
      setNotasSeleccionadas([...notasSeleccionadas, notaLower]);
    }
  };

  const removeNota = (notaToRemove: string) => {
    setNotasSeleccionadas(notasSeleccionadas.filter((n) => n !== notaToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const nuevaNota = inputValue.trim().toLowerCase();
      if (!notasSeleccionadas.includes(nuevaNota)) {
        setNotasSeleccionadas([...notasSeleccionadas, nuevaNota]);
      }
      setInputValue("");
    }
  };

  const handleBuscar = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Si el usuario escribió algo pero no apretó Enter, lo sumamos igual
    let finalNotas = [...notasSeleccionadas];
    if (inputValue.trim() !== "") {
      const nuevaNota = inputValue.trim().toLowerCase();
      if (!finalNotas.includes(nuevaNota)) {
        finalNotas.push(nuevaNota);
      }
    }

    if (finalNotas.length > 0) {
      params.set("notas", finalNotas.join(","));
    } else {
      params.delete("notas");
    }
    
    // Ejecutamos la búsqueda
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-[#111111] border border-[#1A1A1A] mb-8 w-full max-w-4xl mx-auto rounded-xl">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 sm:p-8 text-left group transition-colors hover:bg-[#151515] rounded-xl"
      >
        <div>
          <h2 className="text-white font-serif text-xl sm:text-2xl mb-1 transition-colors group-hover:text-[#D4AF37]">Buscar por Notas</h2>
          <p className="text-[#888888] text-sm">
            Seleccioná las notas abajo o escribí tus propias notas para filtrar.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ChevronDown 
            size={20} 
            className={`text-[#888888] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>
      
      {isOpen && (
        <div className="p-6 sm:p-8 pt-0 border-t border-[#1A1A1A] mt-2">
      {/* Input de búsqueda */}
      <div className="mb-8 mt-4">

        <div className="flex flex-wrap items-center bg-[#0A0A0A] border border-[#2D2D2D] p-2 focus-within:border-[#D4AF37] transition-colors rounded-lg min-h-[56px]">
          {notasSeleccionadas.map((nota) => (
            <span 
              key={nota} 
              className="flex items-center gap-1.5 bg-[#1A1A1A] border border-[#333] text-white px-3 py-1.5 m-1 text-sm rounded-md capitalize shadow-sm"
            >
              {nota}
              <button 
                onClick={() => removeNota(nota)} 
                className="text-[#888888] hover:text-red-400 transition-colors"
                aria-label="Quitar nota"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <input
            type="text"
            placeholder={notasSeleccionadas.length === 0 ? "Ej. vainilla, cuero, rosa..." : ""}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-white p-2 flex-1 min-w-[150px] text-sm placeholder-[#555555]"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleBuscar}
            className="bg-[#D4AF37] hover:bg-[#E8CC6B] text-black font-bold uppercase tracking-wider text-sm px-8 py-3 transition-colors rounded flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
          >
            <Search size={18} />
            Buscar
          </button>
        </div>
      </div>

      {/* Puntos de partida populares */}
      <div className="border-t border-[#1A1A1A] pt-8">
        <div className="flex items-center justify-center gap-2 mb-6 text-white">
          <Star className="text-[#00a685]" fill="#00a685" size={24} />
          <h3 className="font-serif text-xl sm:text-2xl">Puntos de partida populares</h3>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {NOTAS_POPULARES.map((nota) => {
            const isSelected = notasSeleccionadas.includes(nota.nombre.toLowerCase());
            
            return (
              <button
                key={nota.nombre}
                onClick={() => toggleNotaPopular(nota.nombre)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 text-sm font-medium ${
                  isSelected
                    ? "bg-[#D4AF37] border-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    : "bg-white border-gray-200 text-gray-800 hover:border-[#D4AF37] hover:shadow-md"
                }`}
              >
                <span className="text-lg leading-none">{nota.emoji}</span>
                {nota.nombre}
              </button>
            );
          })}
        </div>
      </div>
        </div>
      )}
    </div>
  );
}
