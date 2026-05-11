import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Producto } from "@/types";
import ProductoGrid from "@/components/productos/ProductoGrid";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { MapPin, ChevronRight, Award } from "lucide-react";
import { Great_Vibes, Cinzel } from "next/font/google";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
});

async function getProductosDestacados(): Promise<Producto[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("productos")
      .select("*, familia_olfativa:familias_olfativas(*)")
      .eq("activo", true)
      .eq("destacado", true)
      .order("created_at", { ascending: false })
      .limit(8);
    return (data as Producto[]) || [];
  } catch {
    return [];
  }
}

async function getProductosNuevos(): Promise<Producto[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("productos")
      .select("*, familia_olfativa:familias_olfativas(*)")
      .eq("activo", true)
      .eq("nuevo", true)
      .order("created_at", { ascending: false })
      .limit(4);
    return (data as Producto[]) || [];
  } catch {
    return [];
  }
}

const familias = [
  {
    nombre: "Floral",
    emoji: "🌸",
    descripcion: "Rosas, jazmines, flores del jardín",
  },
  {
    nombre: "Oriental",
    emoji: "✦",
    descripcion: "Ámbar, vainilla, especias exóticas",
  },
  { nombre: "Amaderado", emoji: "🌲", descripcion: "Sándalo, cedro, oud" },
  {
    nombre: "Fresco",
    emoji: "💧",
    descripcion: "Cítricos, acuático, aromático",
  },
  { nombre: "Chipre", emoji: "🌿", descripcion: "Bergamota, musgo, labdanum" },
  { nombre: "Gourmand", emoji: "🍫", descripcion: "Vainilla, caramelo, tonka" },
];

export default async function HomePage() {
  const [destacados, nuevos] = await Promise.all([
    getProductosDestacados(),
    getProductosNuevos(),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-start justify-center pt-12 md:pt-16 bg-black overflow-hidden">
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
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl leading-tight mb-4 tracking-normal">
            <span
              className={`${greatVibes.className} bg-gradient-to-b from-[#B8860B] via-[#D4AF37] to-[#8B6508] bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]`}
              style={{
                filter: "drop-shadow(0px 2px 1px rgba(255,255,255,0.1))",
              }}
            >
              La Parfumerie
            </span>
            <span
              className={`block text-white text-base sm:text-xl md:text-2xl tracking-[0.8em] mt-1 md:mt-2 uppercase ${cinzel.className}`}
            >
              De Solange
            </span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Fragancias exclusivas que narran historias únicas. <br />
            Perfumería que vino a desbloquear el lujo en el corazón de Santa
            Rosa.
          </p>
          <div className="flex items-center justify-center gap-2 text-[#D4AF37] text-sm font-semibold mb-10 tracking-wider uppercase">
            <span>✦ Más de 25 años en el rubro ✦</span>
          </div>
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
              <h2 className="font-serif text-3xl md:text-4xl text-white">
                Novedades
              </h2>
            </div>
            <Link
              href="/productos?nuevo=true"
              className="hidden sm:flex items-center gap-1 text-[#888888] hover:text-[#D4AF37] text-sm transition-colors"
            >
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>
          <ProductoGrid productos={nuevos} />
        </section>
      )}

      {/* FAMILIAS OLFATIVAS */}
      <section className="bg-[#0D0D0D] border-y border-[#1A1A1A] pt-12 md:pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-3">
              Encontrá tu esencia
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-white">
              Familias Olfativas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {familias.map((familia) => (
              <Link
                key={familia.nombre}
                href={`/productos?familia=${familia.nombre}`}
                className="group bg-black border border-[#1A1A1A] p-12 text-center transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-black/60 flex flex-col items-center justify-center"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 block">
                  {familia.emoji}
                </div>
                <h3 className="text-white text-xl font-serif mb-3 tracking-wide">
                  {familia.nombre}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                  {familia.descripcion}
                </p>
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
              <h2 className="font-serif text-3xl md:text-4xl text-white">
                Destacados
              </h2>
            </div>
            <Link
              href="/productos?destacado=true"
              className="hidden sm:flex items-center gap-1 text-[#888888] hover:text-[#D4AF37] text-sm transition-colors"
            >
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>
          <ProductoGrid productos={destacados} />
        </section>
      )}
    </>
  );
}
