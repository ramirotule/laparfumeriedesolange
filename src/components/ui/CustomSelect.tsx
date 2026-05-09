"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  label?: string;
  loading?: boolean;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Seleccionar...",
  label,
  loading = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Filtrar opciones basado en la búsqueda
  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enfocar el input cuando se abre el dropdown
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => {
          if (!loading) {
            setIsOpen(!isOpen);
            setSearchTerm("");
          }
        }}
        className={`w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 text-left text-sm transition-all flex items-center justify-between hover:border-[#D4AF37]/50 ${
          isOpen ? "border-[#D4AF37] ring-1 ring-[#D4AF37]/20" : ""
        } ${loading ? "opacity-70 cursor-wait" : "cursor-pointer"}`}
      >
        <span className={!selectedOption ? "text-[#555555]" : "text-white"}>
          {loading ? "Cargando..." : selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-[#D4AF37] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-[110] w-full mt-1 bg-[#111111] border border-[#2D2D2D] shadow-2xl max-h-60 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Input de Búsqueda */}
          <div className="p-2 border-b border-[#2D2D2D] bg-[#0A0A0A]">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-2 py-1.5 text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>

          {/* Lista de Opciones */}
          <div className="overflow-y-auto custom-scrollbar flex-1">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-xs text-[#555555] italic text-center">No se encontraron resultados</div>
            ) : (
              filteredOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-[#D4AF37] hover:text-black ${
                    value === opt.value ? "bg-[#D4AF37]/10 text-[#D4AF37] font-medium" : "text-[#cccccc]"
                  }`}
                >
                  {opt.label}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
