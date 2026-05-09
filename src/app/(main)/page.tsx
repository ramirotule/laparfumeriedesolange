import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Perfume } from "@/types";
import PerfumeGrid from "@/components/perfumes/PerfumeGrid";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { MapPin, ChevronRight } from "lucide-react";

async function getPerfumesDestacados(): Promise<Perfume[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("perfumes")
      .select("*, familia_olfativa:familias_olfativas(*)")
      .eq("activo", true)
      .eq("destacado", true)
      .order("created_at", { ascending: false })
      .limit(8);
    return (data as Perfume[]) || [];
  } catch {
    return [];
  }
}

async function getPerfumesNuevos(): Promise<Perfume[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("perfumes")
      .select("*, familia_olfativa:familias_olfativas(*)")
      .eq("activo", true)
      .eq("nuevo", true)
      .order("created_at", { ascending: false })
      .limit(4);
    return (data as Perfume[]) || [];
  } catch {
    return [];
  }
}

const familias = [
  { nombre: "Floral", emoji: "🌸", descripcion: "Rosas, jazmines, flores del jardín" },
  { nombre: "Oriental", emoji: "✦", descripcion: "Ámbar, vainilla, especias exóticas" },
  { nombre: "Amaderado", emoji: "🌲", descripcion: "Sándalo, cedro, oud" },
  { nombre: "Fresco", emoji: "💧", descripcion: "Cítricos, acuático, aromático" },
  { nombre: "Chipre", emoji: "🌿", descripcion: "Bergamota, musgo, labdanum" },
  { nombre: "Gourmand", emoji: "🍫", descripcion: "Vainilla, caramelo, tonka" },
];

export default async function HomePage() {
  const [destacados, nuevos] = await Promise.all([
    getPerfumesDestacados(),
    getPerfumesNuevos(),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-black overflow-hidden">
        {/* Fondo con patrón sutil */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-6 animate-fade-in">
            Santa Rosa · La Pampa · Argentina
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-none mb-6 tracking-wide">
            La
            <span className="block text-[#D4AF37]">Parfumerie</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Fragancias exclusivas que narran historias únicas.
            Perfumería de lujo en el corazón de Santa Rosa.
          </p>
          <p className="text-[#D4AF37] text-sm font-semibold mb-10 tracking-wider">
            ✦ ENVÍO GRATIS DENTRO DE SANTA ROSA ✦
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/perfumes"
              data-umami-event="cta-explorar-catalogo"
              className="bg-[#D4AF37] text-black font-bold px-8 py-4 tracking-widest text-sm uppercase hover:bg-[#E8CC6B] transition-colors duration-200 hover:shadow-lg hover:shadow-[#D4AF37]/20"
            >
              Explorar Catálogo
            </Link>
            <Link
              href="/arabes"
              className="border border-[#D4AF37]/60 text-[#D4AF37] font-semibold px-8 py-4 tracking-widest text-sm uppercase hover:bg-[#D4AF37]/10 transition-colors duration-200"
            >
              Perfumes Árabes
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-gray-500 text-xs tracking-widest uppercase">Descubrí</span>
          <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent" />
        </div>
      </section>

      {/* NOVEDADES */}
      {nuevos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">
                Recién llegados
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-white">Novedades</h2>
            </div>
            <Link
              href="/perfumes?nuevo=true"
              className="hidden sm:flex items-center gap-1 text-[#888888] hover:text-[#D4AF37] text-sm transition-colors"
            >
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>
          <PerfumeGrid perfumes={nuevos} />
        </section>
      )}

      {/* FAMILIAS OLFATIVAS */}
      <section className="bg-[#0D0D0D] border-y border-[#1A1A1A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">
              Encontrá tu esencia
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              Familias Olfativas
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {familias.map((familia) => (
              <Link
                key={familia.nombre}
                href={`/perfumes?familia=${familia.nombre}`}
                className="group bg-[#0D0D0D] border border-[#1A1A1A] hover:border-[#D4AF37]/40 p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-black/50"
              >
                <div className="text-3xl mb-3">{familia.emoji}</div>
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-[#D4AF37] transition-colors">
                  {familia.nombre}
                </h3>
                <p className="text-[#555555] text-xs leading-snug">{familia.descripcion}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DESTACADOS */}
      {destacados.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">
                Selección exclusiva
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-white">Destacados</h2>
            </div>
            <Link
              href="/perfumes?destacado=true"
              className="hidden sm:flex items-center gap-1 text-[#888888] hover:text-[#D4AF37] text-sm transition-colors"
            >
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>
          <PerfumeGrid perfumes={destacados} />
        </section>
      )}

      {/* SECCIÓN ÁRABES CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-black via-[#0D0D0D] to-black border-y border-[#D4AF37]/20 py-20">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-4">
            Colección especial
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Perfumería Árabe
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-2 leading-relaxed">
            El arte milenario de la perfumería oriental. Oud, ámbar, rosas árabes
            y especias exóticas en fragancias de larga duración.
          </p>
          <p className="text-[#D4AF37] text-sm mb-8">
            Bagues exclusivos disponibles en Santa Rosa, La Pampa
          </p>
          <Link
            href="/arabes"
            data-umami-event="cta-perfumes-arabes"
            className="inline-block bg-[#D4AF37] text-black font-bold px-10 py-4 tracking-widest text-sm uppercase hover:bg-[#E8CC6B] transition-colors duration-200"
          >
            Ver Colección Árabe
          </Link>
        </div>
      </section>

      {/* INFO LOCAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4">
              <MapPin size={20} className="text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-lg text-white mb-2">Visitanos</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Ayala 604, Santa Rosa<br />La Pampa, Argentina
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4">
              <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 rounded-full object-cover" />
            </div>
            <h3 className="font-serif text-lg text-white mb-2">Consultas</h3>
            <a
              href="https://wa.me/2954808202"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 text-sm hover:text-[#D4AF37] transition-colors"
            >
              +54 9 2954 808202<br />
              <span className="text-xs">WhatsApp disponible</span>
            </a>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 border border-[#D4AF37]/40 flex items-center justify-center mx-auto mb-4">
              <InstagramIcon size={20} className="text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-lg text-white mb-2">Instagram</h3>
            <a
              href="https://www.instagram.com/laparfumerie.desolange/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 text-sm hover:text-[#D4AF37] transition-colors"
            >
              @laparfumerie.desolange
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
