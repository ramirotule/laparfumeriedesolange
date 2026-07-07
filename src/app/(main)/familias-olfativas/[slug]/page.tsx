import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getFamiliaContent, FAMILIAS_CONTENT } from "@/content/familias-olfativas-content";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = getFamiliaContent(slug);
  const nombre = content?.nombre ?? slug;
  return {
    title: `Familia Olfativa ${nombre} | La Parfumerie de Solange`,
    description: content?.descripcionCorta ?? `Conocé la familia olfativa ${nombre} en La Parfumerie de Solange, Santa Rosa La Pampa.`,
  };
}

export async function generateStaticParams() {
  return Object.keys(FAMILIAS_CONTENT).map((slug) => ({ slug }));
}

export default async function FamiliaDetallePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const content = getFamiliaContent(slug);
  if (!content) notFound();

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative border-b border-[#1A1A1A] py-12 md:py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)`, backgroundSize: "40px 40px" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <Link
            href="/familias-olfativas"
            className="inline-flex items-center gap-2 text-[#555555] hover:text-[#D4AF37] transition-colors text-[10px] tracking-[0.2em] uppercase mb-6 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Familias Olfativas
          </Link>
          <div className="text-6xl mb-4">{content.emoji}</div>
          <p className="text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-2">Familia Olfativa</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-3">{content.nombre}</h1>
          <p className="text-[#888888] text-sm md:text-base">{content.descripcionCorta}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Descripción principal */}
        <section>
          {content.intro.split("\n\n").map((para, i) => (
            <p key={i} className="text-[#aaaaaa] leading-relaxed text-sm md:text-base mb-3">
              {para}
            </p>
          ))}
        </section>

        {/* Notas comunes */}
        <section className="border-l-2 border-[#D4AF37]/30 pl-6">
          <h2 className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">Notas comunes</h2>
          <p className="text-[#888888] text-sm leading-relaxed">{content.notas}</p>
        </section>

        {/* Curiosidades */}
        <section className="bg-[#0D0D0D] border border-[#1A1A1A] p-5 md:p-6">
          <h2 className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">Curiosidades</h2>
          {content.curiosidades.split("\n\n").map((para, i) => (
            <p key={i} className="text-[#888888] text-sm leading-relaxed mb-3 last:mb-0">{para}</p>
          ))}
        </section>

        {/* Perfumes emblemáticos */}
        <section className="border-l-2 border-[#D4AF37]/30 pl-6">
          <h2 className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">Perfumes emblemáticos</h2>
          <p className="text-[#888888] text-sm leading-relaxed">{content.perfumesEmblematicos}</p>
        </section>
      </div>

      {/* CTA */}
      <section className="py-10 text-center px-4 border-t border-[#1A1A1A]">
        <p className="text-[#555555] text-xs tracking-[0.3em] uppercase mb-4">Explorá esta familia</p>
        <Link
          href={`/productos?familia=${content.nombre}`}
          className="inline-block bg-[#D4AF37] text-black font-bold px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-[#E8CC6B] transition-colors"
        >
          Ver perfumes {content.nombre}
        </Link>
      </section>
    </div>
  );
}
