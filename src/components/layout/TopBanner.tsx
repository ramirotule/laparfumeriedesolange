"use client";

import { Truck } from "lucide-react";

export default function TopBanner() {
  return (
    <div className="bg-[#D4AF37] text-black text-center py-2 px-4 text-[12px] font-semibold tracking-wider flex items-center justify-center gap-3">
      <Truck size={14} strokeWidth={2.5} />
      <span>
        ENVÍO SANTA ROSA $4.000 · TOAY $5.000 · GRATIS EN COMPRAS +$60.000 · RETIRO SIN CARGO · INTERIOR A CONSULTAR
      </span>
    </div>
  );
}
