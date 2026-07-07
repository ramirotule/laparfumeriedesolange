import Link from "next/link";
import type { Metadata } from "next";
import { FAMILIAS_CONTENT } from "@/content/familias-olfativas-content";

export const metadata: Metadata = {
  title: "Familias Olfativas | La Parfumerie de Solange",
  description:
    "Descubrí las familias olfativas y encontrá tu esencia. Floral, Oriental, Amaderado, Fresco, Chipre y Gourmand. La Parfumerie de Solange, Santa Rosa La Pampa.",
};

// Display order for the grid
const SLUG_ORDER = ["fresco", "floral", "amaderado", "fougere", "chipre", "oriental", "gourmand"];

export default function FamiliasOlfativasPage() {
  const familias = SLUG_ORDER.map((slug) => FAMILIAS_CONTENT[slug]).filter(Boolean);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative border-b border-[#1A1A1A] py-8 md:py-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-3">Encontrá tu esencia</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Familias Olfativas</h1>
          <p className="text-[#888888] text-sm md:text-base leading-relaxed">
            Cada fragancia pertenece a una familia olfativa — un universo de sensaciones que define su
            carácter. Conocer la tuya es el primer paso para encontrar el perfume que te representa.
          </p>
        </div>
      </section>

      {/* Texto introductorio */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        <p className="text-[#aaaaaa] leading-relaxed text-sm md:text-base">
          Aunque la idea de definir olores se remonta a Aristóteles, las clasificaciones de perfumes
          proliferaron a finales del siglo XX, cuando la industria y los perfumistas sintieron la
          necesidad de establecer familias para poder agrupar aquellos perfumes con estructura y
          características similares. No obstante, hoy en día no existe una clasificación
          universalmente aceptada, pues es un hecho que cada persona aprecia las fragancias de forma
          distinta y que algunas creaciones no tienen líneas claramente delimitadas.
        </p>
        <p className="text-[#aaaaaa] leading-relaxed text-sm md:text-base">
          Algunas fragancias son un cóctel de notas olfativas que podrían encajar en varias familias
          al mismo tiempo y, en otros casos, hay propuestas que prefieren directamente no etiquetarse.
          Diferentes comunidades internacionales del perfume proponen distintas clasificaciones.
        </p>
        <p className="text-[#aaaaaa] leading-relaxed text-sm md:text-base">
          En La Parfumerie proponemos una clasificación con siete familias olfativas, seis que son
          comúnmente aceptadas: <span className="text-white">Cítrica o Hespéride, Floral, Amaderada, Fougère, Chipre</span> y{" "}
          <span className="text-white">Ambarada u Oriental</span>, a las que incorporamos{" "}
          <span className="text-white">Gourmand</span>, una familia en alza muy apreciada en nuestra
          cultura. De ellas, las tres primeras pueden considerarse familias «realistas» y las cuatro
          siguientes «familias de fantasía».
        </p>
        <p className="text-[#888888] leading-relaxed text-sm">
          En cualquier caso, la realidad siempre es más compleja y hay otras familias fluctuantes que
          no queremos dejar de mencionar: Aromática, Acuática, Afrutada, Cuero, y cada una de las
          categorías puede dividirse a su vez en subfamilias con mayor detalle de matices.
        </p>
      </section>

      {/* Grid de familias */}
      <section className="bg-[#0D0D0D] border-y border-[#1A1A1A] py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase mb-2">Explorá cada familia</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">¿Cuál es la tuya?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {familias.map((content) => (
              <Link
                key={content.slug}
                href={`/familias-olfativas/${content.slug}`}
                className="group bg-black border border-[#1A1A1A] p-12 text-center transition-all duration-300 hover:border-[#D4AF37]/50 hover:bg-black/60 flex flex-col items-center justify-center"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300 block">
                  {content.emoji}
                </div>
                <h2 className="text-white text-xl font-serif mb-3 tracking-wide">
                  {content.nombre}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                  {content.descripcionCorta}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 text-center px-4">
        <p className="text-[#555555] text-xs tracking-[0.3em] uppercase mb-4">¿Ya sabés qué buscás?</p>
        <Link
          href="/productos"
          className="inline-block bg-[#D4AF37] text-black font-bold px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-[#E8CC6B] transition-colors"
        >
          Ver Catálogo Completo
        </Link>
      </section>
    </div>
  );
}
