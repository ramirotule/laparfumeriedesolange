"use client";

import Link from "next/link";

export default function TopBanner() {
  return (
    <div className="bg-[#D4AF37] text-black text-center py-2 px-4 text-sm font-semibold tracking-wider">
      <span className="hidden sm:inline">✦ </span>
      ENVÍO GRATIS DENTRO DE SANTA ROSA - LA PAMPA
      <span className="hidden sm:inline"> ✦</span>
      <Link
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2954808202"}`}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 underline hover:no-underline hidden sm:inline"
      >
        Consultar por WhatsApp
      </Link>
    </div>
  );
}
