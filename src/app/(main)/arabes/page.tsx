import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Perfume } from "@/types";
import PerfumeGrid from "@/components/perfumes/PerfumeGrid";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Perfumería Árabe en Santa Rosa La Pampa | Oud, Bagues y Fragancias Orientales",
  description:
    "La mejor selección de perfumes árabes en Argentina. Oud, ámbar, rosas árabes y bagues exclusivos disponibles en Santa Rosa, La Pampa. Perfumería árabe con envío gratis.",
  keywords: [
    "perfumería árabe argentina",
    "perfumes árabes santa rosa la pampa",
    "oud santa rosa",
    "bagues perfumes argentina",
    "perfumes orientales argentina",
    "comprar perfumes arabes argentina",
  ],
  alternates: { canonical: "/arabes" },
};

async function getPerfumesArabes(): Promise<Perfume[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("perfumes")
      .select("*, familia_olfativa:familias_olfativas(*)")
      .eq("activo", true)
      .eq("genero", "Árabe")
      .order("destacado", { ascending: false })
      .order("created_at", { ascending: false });
    return (data as Perfume[]) || [];
  } catch {
    return [];
  }
}

const caracteristicas = [
  {
    titulo: "Oud Auténtico",
    descripcion:
      "Madera de oud de las mejores procedencias. Profundo, terroso y absolutamente único.",
    icono: "🌿",
  },
  {
    titulo: "Larga Duración",
    descripcion:
      "Fragancias de alta concentración que perduran 12 a 24 horas en piel y telas.",
    icono: "⏳",
  },
  {
    titulo: "Bagues Exclusivos",
    descripcion:
      "Bagues dorados importados, la forma tradicional árabe de aplicar fragancia.",
    icono: "✦",
  },
  {
    titulo: "Rosas de Arabia",
    descripcion:
      "La rosa de Taif, la más valiosa del mundo, disponible en nuestra colección.",
    icono: "🌹",
  },
];

export default async function ArabesPage() {
  const perfumes = await getPerfumesArabes();

  // JSON-LD específico para búsquedas locales de perfumería árabe
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Perfumes Árabes - La Parfumerie de Solange",
    description:
      "Colección de perfumes árabes: Oud, Bagues y fragancias orientales disponibles en Santa Rosa, La Pampa, Argentina.",
    numberOfItems: perfumes.length,
    itemListElement: perfumes.slice(0, 10).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: `${p.nombre} - ${p.marca}`,
        description: p.descripcion_corta || p.descripcion,
        offers: {
          "@type": "Offer",
          price: p.precio_venta,
          priceCurrency: "ARS",
          availability:
            p.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />

      {/* Hero árabe */}
      <section className="relative overflow-hidden bg-black py-24 px-4 border-b border-[#1A1A1A]">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37'%3E%3Cpath d='M40 0 L80 40 L40 80 L0 40 Z' fill-opacity='0.5'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-[#D4AF37] text-xs tracking-[0.6em] uppercase mb-6">
            La Parfumerie de Solange
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white mb-6 leading-none">
            Perfumería
            <span className="block text-[#D4AF37]">Árabe</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mb-3 leading-relaxed">
            El arte milenario de Oriente Medio llega a Santa Rosa, La Pampa.
            Fragancias de oud, ámbar y rosas árabes que perduran en el tiempo.
          </p>
          <p className="text-[#D4AF37] text-sm font-semibold mb-10">
            Perfumería Árabe disponible en Argentina · Santa Rosa, La Pampa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#catalogo-arabes"
              className="bg-[#D4AF37] text-black font-bold px-8 py-4 tracking-widest text-sm uppercase hover:bg-[#E8CC6B] transition-colors shadow-lg shadow-[#D4AF37]/20"
            >
              Ver Colección
            </a>
            <a
              href="https://wa.me/5492954808202?text=Hola!%20Me%20interesan%20los%20perfumes%20%C3%A1rabes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-[#D4AF37]/60 text-[#D4AF37] font-semibold px-8 py-4 text-sm hover:bg-[#D4AF37]/10 transition-colors"
            >
              <img src="/whatsapp.png" alt="WhatsApp" className="w-4 h-4 rounded-full object-cover" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="bg-[#0D0D0D] border-y border-[#1A1A1A] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {caracteristicas.map((c) => (
              <div
                key={c.titulo}
                className="text-center p-6 border border-[#1A1A1A] bg-black/40 shadow-sm"
              >
                <div className="text-4xl mb-4">{c.icono}</div>
                <h3 className="font-serif text-lg text-[#D4AF37] mb-2">{c.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catálogo */}
      <section
        id="catalogo-arabes"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center mb-12">
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">
            Colección exclusiva
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Nuestros Perfumes Árabes
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Todos los perfumes disponibles en tienda física en Ayala 604, Santa Rosa, La Pampa.
            Consultas por WhatsApp.
          </p>
        </div>

        <PerfumeGrid
          perfumes={perfumes}
          emptyMessage="Pronto tendremos nuevas fragancias árabes disponibles. Consultanos por WhatsApp."
        />

        {perfumes.length === 0 && (
          <div className="text-center mt-8">
            <a
              href="https://wa.me/5492954808202?text=Hola!%20Me%20interesan%20los%20perfumes%20%C3%A1rabes.%20%C2%BFQu%C3%A9%20tienen%20disponible?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D4AF37] text-black font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-[#E8CC6B] transition-colors"
            >
              <img src="/whatsapp.png" alt="WhatsApp" className="w-4 h-4 rounded-full object-cover" />
              Consultar disponibilidad
            </a>
          </div>
        )}
      </section>

      {/* Artículo SEO */}
      <section className="bg-[#0D0D0D] border-t border-[#1A1A1A] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl text-white mb-6">
            La Perfumería Árabe en Argentina: Una Experiencia Única
          </h2>
          <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
            <p>
              La perfumería árabe tiene una tradición de más de 5.000 años. El <strong className="text-[#cccccc]">oud</strong>,
              conocido como el &quot;oro negro&quot; de la perfumería, es una de las materias primas más valiosas del mundo.
              En La Parfumerie de Solange, traemos lo mejor de la perfumería árabe directamente a{" "}
              <strong className="text-[#cccccc]">Santa Rosa, La Pampa</strong>.
            </p>
            <p>
              Nuestros <strong className="text-[#cccccc]">bagues árabes</strong> son piezas doradas que
              contienen aceites puros de oud, almizcle y resinas orientales. A diferencia de los
              perfumes occidentales, los aceites árabes no contienen alcohol, lo que los hace más
              persistentes y adecuados para todo tipo de pieles.
            </p>
            <p>
              Somos una de las pocas perfumerías en <strong className="text-[#cccccc]">La Pampa</strong>{" "}
              que ofrece una selección curada de fragancias árabes auténticas. Visitanos en{" "}
              <strong className="text-white">Ayala 604, Santa Rosa</strong>, o consultá por WhatsApp
              para conocer toda la disponibilidad de stock.
            </p>
          </div>
          <div className="mt-8">
            <Link
              href="/perfumes"
              className="text-[#D4AF37] text-sm hover:text-[#E8CC6B] transition-colors"
            >
              Ver todo el catálogo de perfumes →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
