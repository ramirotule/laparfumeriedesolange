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
      className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] text-white h-14 w-14 hover:w-48 rounded-full shadow-2xl hover:scale-105 transition-all duration-500 ease-in-out group flex items-center overflow-hidden"
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative flex items-center h-full w-full">
        {/* Icono siempre centrado en el círculo inicial */}
        <div className="absolute left-0 w-14 h-14 flex items-center justify-center z-10 flex-shrink-0">
          <div className="relative w-8 h-8">
            <Image
              src="/what.png"
              alt="WhatsApp"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Texto que aparece al costado */}
        <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 pl-14 pr-6 transition-all duration-300 group-hover:duration-500 font-bold text-sm tracking-wide transform translate-x-4 group-hover:translate-x-0">
          ¿Te asesoramos?
        </span>
      </div>

      {/* Efecto de pulso */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none group-hover:hidden"></span>
    </a>
  );
}
