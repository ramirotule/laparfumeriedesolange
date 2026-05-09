"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CATEGORIAS_MAIN = [
  { 
    nombre: "UNLOCK", 
    href: "/perfumes/unlock",
    description: "Nuestra línea exclusiva"
  },
  { 
    nombre: "INTERNACIONALES", 
    href: "/perfumes/internacionales",
    description: "Fragancias del mundo"
  },
  { 
    nombre: "ÁRABES", 
    href: "/perfumes/arabes",
    description: "Esencias de oriente"
  },
];

export default function CategoriasSidebar() {
  const searchParams = useSearchParams();
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  return (
    <div className="space-y-6">
      <div className="border-b border-[#2D2D2D] pb-2 mb-6">
        <h3 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase">
          Categorías Principales
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {CATEGORIAS_MAIN.map((cat) => {
          const isActive = currentPath === cat.href;
          
          return (
            <Link
              key={cat.nombre}
              href={cat.href}
              className={`group block p-4 border transition-all duration-300 ${
                isActive 
                  ? "bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)]" 
                  : "bg-[#0D0D0D] border-[#1A1A1A] hover:border-[#D4AF37]/50"
              }`}
            >
              <div className="flex flex-col gap-1">
                <span className={`text-xs font-bold tracking-[0.2em] transition-colors ${
                  isActive ? "text-[#D4AF37]" : "text-white group-hover:text-[#D4AF37]"
                }`}>
                  {cat.nombre}
                </span>
                <span className="text-[10px] text-[#666666] tracking-wider uppercase">
                  {cat.description}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Banner decorativo o info adicional */}
      <div className="mt-12 p-6 bg-gradient-to-b from-[#111111] to-black border border-[#1A1A1A] text-center">
        <p className="text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase mb-2 font-bold">
          Calidad Premium
        </p>
        <p className="text-[9px] text-[#666666] leading-relaxed uppercase tracking-widest">
          Todas nuestras fragancias son seleccionadas cuidadosamente para garantizar la mejor experiencia.
        </p>
      </div>
    </div>
  );
}
