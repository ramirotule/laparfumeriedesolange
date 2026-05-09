"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X, ChevronDown, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

import { aromatizantes, bienestar } from "@/constants/navigation";

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

// Constantes movidas a @/constants/navigation.ts

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    width="20"
    height="20"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [bienestarOpen, setBienestarOpen] = useState(false);
  const [aromatizantesOpen, setAromatizantesOpen] = useState(false);
  const [busquedaOpen, setBusquedaOpen] = useState(false);
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
        <div className="flex items-center gap-8 pt-1 pb-6 md:pt-2 md:pb-8">
            {/* Columna Izquierda: Logo */}
            <div className="shrink-0 py-2">
              <Link href="/">
                <Image
                  src="/logo2.png"
                  alt="La Parfumerie de Solange"
                  width={300}
                  height={300}
                  className="h-20 md:h-32 lg:h-44 w-auto object-contain transition-transform hover:scale-105"
                  priority
                />
              </Link>
            </div>

            {/* Columna Derecha: Menús */}
            <div className="flex-1 flex flex-col gap-6 xl:gap-8">
              {/* Fila 1: Menú Superior (Utilidades) */}
              <div className="hidden md:flex items-center justify-end gap-6 border-b border-[#1A1A1A]/50 pb-4">
                <Link
                  href="https://wa.me/542954808202?text=Me%20interesa%20emprender%20con%20Bagu%C3%A9s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.2em] text-[#D4AF37] hover:text-white transition-colors font-bold uppercase flex items-center gap-2 group"
                >
                  <WhatsAppIcon className="w-3 h-3 transition-transform group-hover:scale-110" />
                  Emprendé con Bagués
                </Link>
                <Link
                  href="/quienes-somos"
                  className={`text-[11px] tracking-[0.2em] transition-colors font-bold uppercase ${
                    pathname === "/quienes-somos"
                      ? "text-[#D4AF37]"
                      : "text-[#888888] hover:text-white"
                  }`}
                >
                  Nosotros
                </Link>
                <Link
                  href="/preguntas-frecuentes"
                  className={`text-[11px] tracking-[0.2em] transition-colors font-bold uppercase ${
                    pathname === "/preguntas-frecuentes"
                      ? "text-[#D4AF37]"
                      : "text-[#888888] hover:text-white"
                  }`}
                >
                  Preguntas Frecuentes
                </Link>
                <Link
                  href="/login"
                  className="text-[11px] tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37]/50 px-3 py-1 rounded hover:bg-[#D4AF37] hover:text-black transition-all font-bold uppercase"
                >
                  Acceso Emprendedores
                </Link>
              </div>

              {/* Fila 2: Menú Inferior (Navegación + Acciones) */}
              <div className="flex items-center justify-between">
                {/* Navegación Principal (Desktop) */}
                <nav className="hidden lg:flex items-center gap-x-6 xl:gap-x-10">
                  <Link
                    href="/"
                    className={`text-xs tracking-[0.2em] transition-colors font-bold uppercase ${
                      pathname === "/"
                        ? "text-[#D4AF37]"
                        : "text-white hover:text-[#D4AF37]"
                    }`}
                  >
                    INICIO
                  </Link>

                  {/* Fragancias */}
                  <div
                    className="relative"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                  >
                    <button
                      onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                      className="flex items-center gap-1.5 text-xs tracking-[0.2em] text-white hover:text-[#D4AF37] transition-colors font-bold uppercase"
                    >
                      Fragancias
                      <ChevronDown
                        size={12}
                        className={`transition-transform ${megaMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {megaMenuOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[240px] pt-4 z-50">
                        <div className="bg-[#0D0D0D] border border-[#1A1A1A] shadow-2xl shadow-black/80 p-6 flex flex-col gap-6">
                          <Link
                            href="/perfumes"
                            className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1 hover:opacity-100 transition-opacity block"
                          >
                            VER TODO
                          </Link>

                          {/* Unlock */}
                          <div>
                            <Link
                              href="/perfumes/unlock"
                              className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1 hover:opacity-100 transition-opacity block"
                            >
                              Unlock
                            </Link>
                            <div className="flex flex-col gap-1.5">
                              <Link
                                href="/perfumes?marca=Unlock&genero=Femenino"
                                className="text-xs text-[#cccccc] hover:text-[#D4AF37] transition-colors"
                              >
                                Femeninas
                              </Link>
                              <Link
                                href="/perfumes?marca=Unlock&genero=Masculino"
                                className="text-xs text-[#cccccc] hover:text-[#D4AF37] transition-colors"
                              >
                                Masculinas
                              </Link>
                              <Link
                                href="/perfumes?marca=Unlock&genero=Unisex"
                                className="text-xs text-[#cccccc] hover:text-[#D4AF37] transition-colors"
                              >
                                Unisex
                              </Link>
                            </div>
                          </div>

                          {/* Árabes */}
                          <div>
                            <Link
                              href="/arabes"
                              className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1 hover:opacity-100 transition-opacity block"
                            >
                              Árabes
                            </Link>
                            <div className="flex flex-col gap-1.5">
                              <Link
                                href="/perfumes?categoria=arabes&genero=Femenino"
                                className="text-xs text-[#cccccc] hover:text-[#D4AF37] transition-colors"
                              >
                                Femeninos
                              </Link>
                              <Link
                                href="/perfumes?categoria=arabes&genero=Masculino"
                                className="text-xs text-[#cccccc] hover:text-[#D4AF37] transition-colors"
                              >
                                Masculinos
                              </Link>
                              <Link
                                href="/perfumes?categoria=arabes&genero=Unisex"
                                className="text-xs text-[#cccccc] hover:text-[#D4AF37] transition-colors"
                              >
                                Unisex
                              </Link>
                            </div>
                          </div>

                          {/* Internacionales */}
                          <div>
                            <Link
                              href="/perfumes/internacionales"
                              className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1 hover:opacity-100 transition-opacity block"
                            >
                              Internacionales
                            </Link>
                            <div className="flex flex-col gap-1.5">
                              <Link
                                href="/perfumes?tipo=internacional&genero=Femenino"
                                className="text-xs text-[#cccccc] hover:text-[#D4AF37] transition-colors"
                              >
                                Femeninos
                              </Link>
                              <Link
                                href="/perfumes?tipo=internacional&genero=Masculino"
                                className="text-xs text-[#cccccc] hover:text-[#D4AF37] transition-colors"
                              >
                                Masculinos
                              </Link>
                              <Link
                                href="/perfumes?tipo=internacional&genero=Unisex"
                                className="text-xs text-[#cccccc] hover:text-[#D4AF37] transition-colors"
                              >
                                Unisex
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Filtrar por */}
                  <div
                    className="relative"
                    onMouseEnter={() => setBusquedaOpen(true)}
                    onMouseLeave={() => setBusquedaOpen(false)}
                  >
                    <button
                      onClick={() => setBusquedaOpen(!busquedaOpen)}
                      className="flex items-center gap-1.5 text-xs tracking-[0.2em] text-white hover:text-[#D4AF37] transition-colors font-bold uppercase"
                    >
                      Filtrar por
                      <ChevronDown
                        size={12}
                        className={`transition-transform ${busquedaOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {busquedaOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[220px] pt-4 z-50">
                        <div className="bg-[#0D0D0D] border border-[#2D2D2D] shadow-2xl shadow-black/80 p-5">
                          <Link
                            href="/perfumes?open=notas"
                            className="block text-xs text-[#cccccc] hover:text-[#D4AF37] py-1.5 transition-colors"
                          >
                            Buscar por Notas
                          </Link>
                          <Link
                            href="/perfumes?open=acordes"
                            className="block text-xs text-[#cccccc] hover:text-[#D4AF37] py-1.5 transition-colors"
                          >
                            Buscar por Acordes
                          </Link>
                          <div className="border-t border-[#2D2D2D] mt-2 pt-2">
                            <p className="text-[#555555] text-xs tracking-widest mb-1.5 uppercase">
                              Familia Olfativa
                        </p>
                            {familias.map((f) => (
                              <Link
                                key={f.nombre}
                                href={f.href}
                                className="block text-xs text-[#cccccc] hover:text-[#D4AF37] py-1 transition-colors"
                              >
                                {f.nombre}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bienestar */}
                  <div
                    className="relative"
                    onMouseEnter={() => setBienestarOpen(true)}
                    onMouseLeave={() => setBienestarOpen(false)}
                  >
                    <button
                      onClick={() => setBienestarOpen(!bienestarOpen)}
                      className="flex items-center gap-1.5 text-xs tracking-[0.2em] text-white hover:text-[#D4AF37] transition-colors font-bold uppercase"
                    >
                      Bienestar
                      <ChevronDown
                        size={12}
                        className={`transition-transform ${bienestarOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {bienestarOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[240px] pt-4 z-50">
                        <div className="bg-[#0D0D0D] border border-[#2D2D2D] shadow-2xl shadow-black/80 p-6 flex flex-col gap-6">
                          {bienestar.map((item) => (
                            <div key={item.nombre}>
                              {item.sub ? (
                                <>
                                  {item.href ? (
                                    <Link
                                      href={item.href}
                                      className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1 hover:opacity-100 transition-opacity block"
                                    >
                                      {item.nombre}
                                    </Link>
                                  ) : (
                                    <h3 className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1">
                                      {item.nombre}
                                    </h3>
                                  )}
                                  <div className="flex flex-col gap-1.5">
                                    {item.sub.map((s) => (
                                      <Link
                                        key={s.nombre}
                                        href={s.href}
                                        className="text-xs text-[#cccccc] hover:text-[#D4AF37] transition-colors"
                                      >
                                        {s.nombre}
                                      </Link>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <Link
                                  href={item.href}
                                  className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1 hover:opacity-100 transition-opacity block"
                                >
                                  {item.nombre}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Aromatizantes */}
                  <div
                    className="relative"
                    onMouseEnter={() => setAromatizantesOpen(true)}
                    onMouseLeave={() => setAromatizantesOpen(false)}
                  >
                    <button
                      onClick={() => setAromatizantesOpen(!aromatizantesOpen)}
                      className="flex items-center gap-1.5 text-xs tracking-[0.2em] text-white hover:text-[#D4AF37] transition-colors font-bold uppercase"
                    >
                      Aromatizantes
                      <ChevronDown
                        size={12}
                        className={`transition-transform ${aromatizantesOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {aromatizantesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[240px] pt-4 z-50">
                        <div className="bg-[#0D0D0D] border border-[#2D2D2D] shadow-2xl shadow-black/80 p-6 flex flex-col gap-6">
                          {aromatizantes.map((item) => (
                            <div key={item.nombre}>
                              {item.sub ? (
                                <>
                                  {item.href ? (
                                    <Link
                                      href={item.href}
                                      className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1 hover:opacity-100 transition-opacity block"
                                    >
                                      {item.nombre}
                                    </Link>
                                  ) : (
                                    <h3 className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1">
                                      {item.nombre}
                                    </h3>
                                  )}
                                  <div className="flex flex-col gap-1.5">
                                    {item.sub.map((s) => (
                                      <Link
                                        key={s.nombre}
                                        href={s.href}
                                        className="text-xs text-[#cccccc] hover:text-[#D4AF37] transition-colors"
                                      >
                                        {s.nombre}
                                      </Link>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <Link
                                  href={item.href}
                                  className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1 hover:opacity-100 transition-opacity block"
                                >
                                  {item.nombre}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </nav>

                {/* Acciones: Buscador + Carrito */}
                <div className="flex flex-1 justify-end items-center gap-4 xl:gap-6">
                  {/* Buscador (Desktop) */}
                  <form
                    onSubmit={handleSearch}
                    className="hidden md:flex w-[160px] xl:w-[220px]"
                  >
                    <input
                      type="search"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                      placeholder="¿Qué buscás?"
                      className="flex-1 bg-[#0D0D0D] border border-[#1A1A1A] border-r-0 text-white placeholder-[#555555] px-3 py-1.5 text-[11px] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-[#D4AF37] hover:bg-[#E8CC6B] text-black px-3 py-1.5 transition-colors"
                      aria-label="Buscar"
                    >
                      <Search size={14} />
                    </button>
                  </form>

                  {/* Cart Button */}
                  <button
                    onClick={openDrawer}
                    aria-label="Ver carrito"
                    className="relative text-white hover:text-[#D4AF37] transition-all flex items-center gap-2 group p-1"
                  >
                    <div className="relative">
                      <ShoppingBag
                        size={20}
                        className="group-hover:scale-110 transition-transform"
                      />
                      {count > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none border-2 border-black">
                          {count > 9 ? "9+" : count}
                        </span>
                      )}
                    </div>
                    <span className="text-[9px] tracking-widest font-medium uppercase hidden xl:inline">
                      Carrito
                    </span>
                  </button>

                  {/* Mobile Menu Icon */}
                  <button
                    className="lg:hidden text-white hover:text-[#D4AF37] transition-colors shrink-0"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menú"
                  >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-t border-[#1A1A1A] px-4 py-6">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wider text-white hover:text-[#D4AF37] transition-colors"
            >
              INICIO
            </Link>
            <Link
              href="/perfumes"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wider text-white hover:text-[#D4AF37] transition-colors"
            >
              FRAGANCIAS
            </Link>

            {/* Bienestar Mobile */}
            <div className="border-t border-[#2D2D2D] pt-4">
              <p className="text-[#D4AF37] text-xs tracking-widest mb-4 uppercase font-bold">
                BIENESTAR
              </p>
              {bienestar.map((item) => (
                <div key={item.nombre} className="pl-2 mb-4 last:mb-0">
                  {item.sub ? (
                    <>
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1 hover:opacity-100 transition-opacity block"
                        >
                          {item.nombre}
                        </Link>
                      ) : (
                        <h3 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase opacity-50 border-b border-[#2D2D2D] pb-1">
                          {item.nombre}
                        </h3>
                      )}
                      <div className="flex flex-col gap-1">
                        {item.sub.map((s) => (
                          <Link
                            key={s.nombre}
                            href={s.href}
                            onClick={() => setMenuOpen(false)}
                            className="block text-xs text-[#cccccc] hover:text-[#D4AF37] py-1 transition-colors pl-2"
                          >
                            {s.nombre}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1 hover:opacity-100 transition-opacity block"
                    >
                      {item.nombre}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Aromatizantes Mobile */}
            <div className="border-t border-[#2D2D2D] pt-4">
              <p className="text-[#D4AF37] text-xs tracking-widest mb-4 uppercase font-bold">
                AROMATIZANTES
              </p>
              {aromatizantes.map((item) => (
                <div key={item.nombre} className="pl-2 mb-4 last:mb-0">
                  {item.sub ? (
                    <>
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1 hover:opacity-100 transition-opacity block"
                        >
                          {item.nombre}
                        </Link>
                      ) : (
                        <h3 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase opacity-50 border-b border-[#2D2D2D] pb-1">
                          {item.nombre}
                        </h3>
                      )}
                      <div className="flex flex-col gap-1">
                        {item.sub.map((s) => (
                          <Link
                            key={s.nombre}
                            href={s.href}
                            onClick={() => setMenuOpen(false)}
                            className="block text-xs text-[#cccccc] hover:text-[#D4AF37] py-1 transition-colors pl-2"
                          >
                            {s.nombre}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] mb-3 uppercase opacity-50 border-b border-[#2D2D2D] pb-1 hover:opacity-100 transition-opacity block"
                    >
                      {item.nombre}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <Link
              href="/quienes-somos"
              onClick={() => setMenuOpen(false)}
              className={`text-sm tracking-wider transition-colors ${pathname === "/quienes-somos" ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"}`}
            >
              NOSOTROS
            </Link>
            <Link
              href="/preguntas-frecuentes"
              onClick={() => setMenuOpen(false)}
              className={`text-sm tracking-wider transition-colors ${pathname === "/preguntas-frecuentes" ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"}`}
            >
              FAQ
            </Link>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-wider text-[#D4AF37] font-bold transition-colors"
            >
              INGRESAR (EMPRENDEDORES)
            </Link>
            <div className="border-t border-[#2D2D2D] pt-4">
              <p className="text-[#888888] text-xs tracking-widest mb-3">
                POR GÉNERO
              </p>
              {generos.map((g) => (
                <Link
                  key={g.nombre}
                  href={g.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-xs text-[#cccccc] hover:text-[#D4AF37] py-1.5 transition-colors"
                >
                  {g.nombre}
                </Link>
              ))}
            </div>
            <div className="border-t border-[#2D2D2D] pt-4">
              <p className="text-[#888888] text-xs tracking-widest mb-3">
                BÚSQUEDA
              </p>
              <Link
                href="/perfumes?open=notas"
                onClick={() => setMenuOpen(false)}
                className="block text-xs text-[#cccccc] hover:text-[#D4AF37] py-1.5 transition-colors"
              >
                Buscar por Notas
              </Link>
              <Link
                href="/perfumes?open=acordes"
                onClick={() => setMenuOpen(false)}
                className="block text-xs text-[#cccccc] hover:text-[#D4AF37] py-1.5 transition-colors"
              >
                Buscar por Acordes
              </Link>
            </div>
            <div className="border-t border-[#2D2D2D] pt-4">
              <p className="text-[#888888] text-xs tracking-widest mb-3">
                FAMILIA OLFATIVA
              </p>
              {familias.map((f) => (
                <Link
                  key={f.nombre}
                  href={f.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-[#cccccc] hover:text-[#D4AF37] py-1.5 transition-colors"
                >
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
