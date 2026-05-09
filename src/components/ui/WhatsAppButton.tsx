"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const phoneNumber = "542954808202"; // Número sacado del schema de LocalBusiness
  const message = "¡Hola! Estoy interesado en uno de sus perfumes.";

  // No mostrar el botón en el dashboard
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] text-white h-14 w-14 hover:w-auto hover:px-6 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group flex items-center justify-center overflow-hidden"
      aria-label="Contactar por WhatsApp"
    >
      <div className="flex items-center justify-center">
        <div className="relative w-8 h-8 flex-shrink-0 z-10">
          <Image src="/what.png" alt="WhatsApp" fill className="object-contain" />
        </div>
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-xs group-hover:ml-3 group-hover:opacity-100 transition-all duration-500 font-bold text-sm tracking-wide">
          ¿Te asesoramos?
        </span>
      </div>

      {/* Efecto de pulso */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none"></span>
    </a>
  );
}
