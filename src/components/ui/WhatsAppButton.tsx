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
      className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group flex items-center gap-2"
      aria-label="Contactar por WhatsApp"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-bold text-sm tracking-wide ml-2">
        ¿Te asesoramos?
      </span>
      <div className="relative w-10 h-10">
        <Image 
          src="/wsp.png" 
          alt="WhatsApp" 
          fill
          className="object-contain"
        />
      </div>
      
      {/* Efecto de pulso */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none"></span>
    </a>
  );
}
