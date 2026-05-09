import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import InstagramIcon from "@/components/ui/InstagramIcon";

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#1A1A1A] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Catálogo */}
          <div>
            <h4 className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Catálogo
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Fragancias", href: "/perfumes" },
                { label: "Bienestar", href: "/bienestar" },
                { label: "Aromatizantes", href: "/aromatizantes" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horarios */}
          <div>
            <h4 className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              🕒 Horarios de Atención
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-gray-400 text-xs">🗓</span>
                <div>
                  <p className="text-[#cccccc] text-sm font-medium">Lunes a Viernes</p>
                  <p className="text-gray-500 text-sm">9:30 a 12 hs</p>
                  <p className="text-gray-500 text-sm">14 a 18 hs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Contacto & Ubicación
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#cccccc] text-sm">Ayala 604</p>
                  <p className="text-gray-500 text-sm">Santa Rosa, La Pampa</p>
                  <p className="text-gray-500 text-sm">Argentina</p>
                </div>
              </div>

              <a
                href="https://wa.me/2954808202"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] transition-colors text-sm"
              >
                <img src="/what.png" alt="WhatsApp" className="w-4 h-4 rounded-full object-cover" />
                +54 9 2954 808202
              </a>

              <a
                href="https://www.instagram.com/laparfumerie.desolange/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] transition-colors text-sm"
              >
                <InstagramIcon size={16} className="text-[#D4AF37]" />
                @laparfumerie.desolange
              </a>

              <a
                href="https://www.tiktok.com/@bagues.byromisolange"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] transition-colors text-sm"
              >
                <span className="text-[#D4AF37]"><TikTokIcon size={16} /></span>
                @bagues.byromisolange
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-[#888888] text-xs font-bold tracking-wider uppercase">
            © {new Date().getFullYear()} La Parfumerie de Solange — Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-xs">
            Página web desarrollada por{" "}
            <a
              href="https://www.rtsoftwarefactory.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00D0FC] hover:text-[#D4AF37] transition-colors"
            >
              RT Software Factory
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
