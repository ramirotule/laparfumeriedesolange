"use client";

import Link from "next/link";

export default function TopBanner() {
  return (
    <div className="bg-[#D4AF37] text-black text-center py-2 px-4 text-sm font-semibold tracking-wider">
      <span className="hidden sm:inline">✦ </span>
      ENVIOS GRATIS A DOMICILIO EN COMPRAS SUPERIORES A $60.000 - SOLO EN SANTA
      ROSA - LA PAMPA.
      <span className="hidden sm:inline"> ✦</span>
      {/* <Link
        href="https://wa.me/5492954808202"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 underline hover:no-underline hidden sm:inline"
      >
        Consultar por WhatsApp
      </Link> */}
    </div>
  );
}
