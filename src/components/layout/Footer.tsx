import Link from "next/link";
import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import InstagramIcon from "@/components/ui/InstagramIcon";

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1A1A1A] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="block mb-4">
              <Image
                src="/logo2.png"
                alt="La Parfumerie de Solange"
                width={192}
                height={192}
                className="w-48 h-auto object-contain"
              />
            </Link>
            <p className="text-[#888888] text-sm leading-relaxed">
              Perfumería de lujo en Santa Rosa, La Pampa. Fragancias exclusivas
              para quienes buscan lo mejor.
            </p>
          </div>

          {/* Catálogo */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Catálogo
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Todos los Perfumes", href: "/perfumes" },
                {
                  label: "Perfumes Femeninos",
                  href: "/perfumes?genero=Femenino",
                },
                {
                  label: "Perfumes Masculinos",
                  href: "/perfumes?genero=Masculino",
                },
                { label: "Unisex", href: "/perfumes?genero=Unisex" },
                { label: "Árabes & Oud", href: "/arabes" },
                { label: "✱ Unlock", href: "/perfumes?marca=Unlock" },
                { label: "Novedades", href: "/perfumes?nuevo=true" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#888888] text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Familias */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Familias Olfativas
            </h4>
            <ul className="space-y-2">
              {[
                "Floral",
                "Oriental",
                "Amaderado",
                "Fresco",
                "Chipre",
                "Gourmand",
              ].map((familia) => (
                <li key={familia}>
                  <Link
                    href={`/perfumes?familia=${familia}`}
                    className="text-[#888888] text-sm hover:text-[#D4AF37] transition-colors"
                  >
                    {familia}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Contacto & Ubicación
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[#cccccc] text-sm">Ayala 604</p>
                  <p className="text-[#888888] text-sm">Santa Rosa, La Pampa</p>
                  <p className="text-[#888888] text-sm">Argentina</p>
                </div>
              </div>

              <a
                href="https://wa.me/2954808202"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#888888] hover:text-[#D4AF37] transition-colors text-sm"
              >
                <MessageCircle size={16} className="text-[#D4AF37]" />
                +54 9 2954 808202
              </a>

              <a
                href="https://www.instagram.com/laparfumerie.desolange/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#888888] hover:text-[#D4AF37] transition-colors text-sm"
              >
                <InstagramIcon size={16} className="text-[#D4AF37]" />
                @laparfumerie.desolange
              </a>

              <a
                href="https://www.tiktok.com/@bagues.byromisolange"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#888888] hover:text-[#D4AF37] transition-colors text-sm"
              >
                <span className="text-[#D4AF37]"><TikTokIcon size={16} /></span>
                @bagues.byromisolange
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1A1A1A] mt-12 pt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-white text-xs font-bold tracking-wider uppercase">
            © {new Date().getFullYear()} La Parfumerie de Solange — Todos los derechos reservados.
          </p>
          <p className="text-[#444444] text-xs">
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
