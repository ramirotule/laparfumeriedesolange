"use client";

import { useEffect, useState } from "react";
import { Cake, MessageCircle, X } from "lucide-react";
import { Vendedora } from "@/types";

interface Props {
  vendedoras: Vendedora[];
}

export default function BirthdayAlert({ vendedoras }: Props) {
  const [cumpleañeras, setCumpleañeras] = useState<Vendedora[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hoy = new Date();
    const diaHoy = hoy.getDate();
    const mesHoy = hoy.getMonth() + 1; // getMonth() es 0-indexed

    const hoyCumplen = vendedoras.filter((v) => {
      if (!v.fecha_nacimiento || !v.activo) return false;
      const f = new Date(v.fecha_nacimiento);
      // Ajuste por zona horaria si es necesario, pero para cumple solemos usar el local
      return f.getUTCDate() === diaHoy && (f.getUTCMonth() + 1) === mesHoy;
    });

    setCumpleañeras(hoyCumplen);
  }, [vendedoras]);

  if (!visible || cumpleañeras.length === 0) return null;

  return (
    <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
      {cumpleañeras.map((v) => (
        <div 
          key={v.id} 
          className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden group"
        >
          {/* Brillo decorativo */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-[#D4AF37] text-black p-2.5 rounded-full">
              <Cake size={20} />
            </div>
            <div>
              <p className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-0.5">
                ¡Hoy es su cumpleaños!
              </p>
              <h3 className="text-white font-serif text-xl">
                {v.nombre} {v.apellido}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10 w-full sm:w-auto">
            <a
              href={`https://wa.me/5492954808202?text=Romi acordate que hoy cumple años ${v.nombre} ${v.apellido}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-[#E8CC6B] text-black font-bold px-6 py-2.5 text-sm transition-colors"
            >
              <MessageCircle size={18} />
              Mandar Recordatorio
            </a>
            <button 
              onClick={() => setVisible(false)}
              className="p-2 text-[#888888] hover:text-white transition-colors"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
