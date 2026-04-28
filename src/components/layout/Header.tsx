"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X, ChevronDown, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const familias = [
  { nombre: "Floral", href: "/perfumes?familia=Floral" },
  { nombre: "Oriental", href: "/perfumes?familia=Oriental" },
  { nombre: "Amaderado", href: "/perfumes?familia=Amaderado" },
  { nombre: "Fresco", href: "/perfumes?familia=Fresco" },
  { nombre: "Chipre", href: "/perfumes?familia=Chipre" },
  { nombre: "Gourmand", href: "/perfumes?familia=Gourmand" },
];

const generos = [
  { nombre: "Femenino", href: "/perfumes?genero=Femenino" },
  { nombre: "Masculino", href: "/perfumes?genero=Masculino" },
  { nombre: "Unisex", href: "/perfumes?genero=Unisex" },
];

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const { count, openDrawer } = useCart();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!busqueda.trim()) return;
    startTransition(() => {
      router.push(`/buscar?q=${encodeURIComponent(busqueda.trim())}`);
    });
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-[#1A1A1A]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-1.5 md:py-2">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo2.png"
              alt="La Parfumerie de Solange"
              width={180}
              height={180}
              className="h-16 md:h-28 w-auto object-contain transition-transform hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop: nav (centrado) + bagués/buscador (derecha) */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            {/* Nav links centrado */}
            <nav className="flex items-center gap-8 mx-auto">
              <Link
                href="/"
                className={`text-xs tracking-[0.2em] transition-colors font-medium ${
                  pathname === "/" ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"
                }`}
              >
                INICIO
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <button 
                  onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                  className="flex items-center gap-1.5 text-xs tracking-[0.2em] text-white hover:text-[#D4AF37] transition-colors font-medium uppercase"
                >
                  Fragancias
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${megaMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {megaMenuOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] pt-4 z-50">
                    <div className="bg-[#0D0D0D] border border-[#2D2D2D] shadow-2xl shadow-black/80 p-6">
                      <div className="grid grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] mb-3 uppercase">
                          Por Género
                        </h3>
                        {generos.map((g) => (
                          <Link key={g.nombre} href={g.href}
                            className="block text-sm text-[#cccccc] hover:text-[#D4AF37] py-1 transition-colors">
                            {g.nombre}
                          </Link>
                        ))}
                      </div>
                      <div>
                        <h3 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] mb-3 uppercase">
                          Familia Olfativa
                        </h3>
                        {familias.map((f) => (
                          <Link key={f.nombre} href={f.href}
                            className="block text-sm text-[#cccccc] hover:text-[#D4AF37] py-1 transition-colors">
                            {f.nombre}
                          </Link>
                        ))}
                      </div>
                      <div>
                        <h3 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] mb-3 uppercase">
                          Colecciones
                        </h3>
                        <Link href="/perfumes?destacado=true"
                          className="block text-sm text-[#cccccc] hover:text-[#D4AF37] py-1 transition-colors">
                          Destacados
                        </Link>
                        <Link href="/perfumes?nuevo=true"
                          className="block text-sm text-[#cccccc] hover:text-[#D4AF37] py-1 transition-colors">
                          Novedades
                        </Link>
                        <Link href="/arabes"
                          className="block text-sm text-[#D4AF37] hover:text-[#E8CC6B] py-1 transition-colors font-semibold">
                          ✦ Árabes
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                )}
              </div>

              <Link
                href="/arabes"
                className={`text-xs tracking-[0.2em] transition-colors font-medium ${
                  pathname === "/arabes" ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"
                }`}
              >
                ÁRABES
              </Link>

              <Link
                href="/perfumes"
                className={`text-xs tracking-[0.2em] transition-colors font-medium ${
                  pathname === "/perfumes" ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"
                }`}
              >
                CATÁLOGO
              </Link>

              <Link
                href="/quienes-somos"
                className={`text-xs tracking-[0.2em] transition-colors font-medium ${
                  pathname === "/quienes-somos" ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"
                }`}
              >
                QUIÉNES SOMOS
              </Link>
            </nav>

            <div className="flex items-center gap-6 shrink-0">
              {/* Bagués Link */}
              <Link 
                href="https://wa.me/5492954808202?text=Me%20interesa%20que%20me%20cuentes%20qu%C3%A9%20hacer%20para%20vender%20Bagu%C3%A9s" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group"
              >
                <WhatsAppIcon className="text-[#D4AF37] transition-transform group-hover:scale-110" />
                <span className="text-white text-[10px] tracking-[0.2em] font-light group-hover:text-[#D4AF37] transition-colors uppercase whitespace-nowrap">
                  Quiero vender <span className="font-bold">Bagués</span>
                </span>
              </Link>

              {/* Buscador */}
              <form onSubmit={handleSearch} className="flex w-[240px]">
                <input
                  type="search"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar..."
                  className="flex-1 bg-[#0D0D0D] border border-[#2D2D2D] border-r-0 text-white placeholder-[#555555] px-3 py-1.5 text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#E8CC6B] text-black px-3 py-1.5 transition-colors"
                  aria-label="Buscar"
                >
                  <Search size={14} />
                </button>
              </form>

              {/* Cart */}
              <button
                onClick={openDrawer}
                aria-label="Ver carrito"
                className="relative text-white hover:text-[#D4AF37] transition-colors shrink-0"
              >
                <ShoppingBag size={20} />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile: buscador + carrito + hamburguesa */}
          <div className="flex md:hidden items-center gap-2 flex-1 justify-end">
            <form onSubmit={handleSearch} className="flex flex-1 max-w-[180px]">
              <input
                type="search"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar fragancia..."
                className="flex-1 bg-[#0D0D0D] border border-[#2D2D2D] border-r-0 text-white placeholder-[#555555] px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#D4AF37] text-black px-3 py-2"
                aria-label="Buscar"
              >
                <Search size={14} />
              </button>
            </form>

            {/* Cart mobile */}
            <button
              onClick={openDrawer}
              aria-label="Ver carrito"
              className="relative text-white hover:text-[#D4AF37] transition-colors shrink-0 p-1"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            <button
              className="text-white hover:text-[#D4AF37] transition-colors shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-t border-[#2D2D2D] px-4 py-6">
          <nav className="flex flex-col gap-4">
            <Link href="/" onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wider text-white hover:text-[#D4AF37] transition-colors">
              INICIO
            </Link>
            <Link href="/perfumes" onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wider text-white hover:text-[#D4AF37] transition-colors">
              CATÁLOGO
            </Link>
            <Link href="/arabes" onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wider text-[#D4AF37]">
              ✦ PERFUMES ÁRABES
            </Link>
            <Link href="/quienes-somos" onClick={() => setMenuOpen(false)}
              className={`text-sm tracking-wider transition-colors ${pathname === "/quienes-somos" ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"}`}>
              QUIÉNES SOMOS
            </Link>
            <div className="border-t border-[#2D2D2D] pt-4">
              <p className="text-[#888888] text-xs tracking-widest mb-3">POR GÉNERO</p>
              {generos.map((g) => (
                <Link key={g.nombre} href={g.href} onClick={() => setMenuOpen(false)}
                  className="block text-sm text-[#cccccc] hover:text-[#D4AF37] py-1.5 transition-colors">
                  {g.nombre}
                </Link>
              ))}
            </div>
            <div className="border-t border-[#2D2D2D] pt-4">
              <p className="text-[#888888] text-xs tracking-widest mb-3">FAMILIAS OLFATIVAS</p>
              {familias.map((f) => (
                <Link key={f.nombre} href={f.href} onClick={() => setMenuOpen(false)}
                  className="block text-sm text-[#cccccc] hover:text-[#D4AF37] py-1.5 transition-colors">
                  {f.nombre}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
