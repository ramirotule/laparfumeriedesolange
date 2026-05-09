import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Quiénes Somos | La Parfumerie de Solange — Santa Rosa, La Pampa",
  description:
    "Conocé la historia de Romina Solange Toulemonde y La Parfumerie de Solange. Desde 2002 conectando personas con su esencia en Santa Rosa, La Pampa.",
  alternates: { canonical: "/quienes-somos" },
};

const hitos = [
  {
    año: "2002",
    titulo: "El comienzo",
    desc: "Descubrí a través de Bagués mi verdadera vocación: conectar a las personas con su esencia.",
  },
  {
    año: "2021",
    titulo: "Nuestro local propio",
    desc: "En noviembre abrimos las puertas de La Parfumerie en Ayala 604, Santa Rosa. Un sueño hecho realidad.",
  },
  {
    año: "Hoy",
    titulo: "Seguimos creciendo",
    desc: "Cada día acompañando a más personas a encontrar esa fragancia que las representa.",
  },
];

export default function QuienesSomosPage() {
  return (
    <div className="w-full">

      {/* Hero — foto exterior del local */}
      <div className="relative h-[40vh] min-h-[280px] max-h-[480px] overflow-hidden">
        <Image
          src="/negocio/negocio-afuera.webp"
          alt="Exterior de La Parfumerie de Solange — Ayala 604, Santa Rosa La Pampa"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 max-w-4xl mx-auto">
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">
            La Parfumerie de Solange
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white">
            Quiénes Somos
          </h1>
        </div>
      </div>

      {/* Historia de la dueña */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Foto de Solange */}
          <div className="relative aspect-[3/4] max-h-[500px] bg-black border border-[#1A1A1A] overflow-hidden">
            <Image
              src="/empresarios%20/WhatsApp%20Image%202026-04-27%20at%2022.14.04.jpeg"
              alt="Romina Solange Toulemonde — La Parfumerie de Solange"
              fill
              className="object-cover object-top"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent px-4 pb-4 pt-8">
              <p className="text-white font-serif text-lg">Romina Solange Toulemonde</p>
              <p className="text-[#D4AF37] text-xs tracking-wider uppercase mt-0.5">
                Fundadora
              </p>
            </div>
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">
                Nuestra historia
              </p>
              <h2 className="font-serif text-3xl text-white mb-6 leading-snug">
                Una vocación que nació en 2002
              </h2>
            </div>

            <p className="text-[#888888] leading-relaxed text-base">
              ¡Hola! Soy{" "}
              <span className="text-white font-medium">Romina Solange Toulemonde</span>.
              Mi viaje emprendedor empezó hace tiempo, allá por el{" "}
              <span className="text-[#D4AF37]">2002</span>. Fue entonces cuando descubrí,
              a través de Bagués, mi verdadera vocación:{" "}
              <span className="text-white italic">conectar a las personas con su esencia</span>.
            </p>

            <p className="text-[#888888] leading-relaxed">
              A lo largo de estos años he aprendido, me he desafiado y, sobre todo,
              he crecido junto a cada persona que confió en mí. Hoy, mi compromiso es
              seguir brindándote calidad y calidez en cada paso.
            </p>

            <p className="text-[#D4AF37] font-serif text-lg italic leading-relaxed border-l-2 border-[#D4AF37]/40 pl-4">
              ¡Gracias por ser parte de este camino, quiero seguir creciendo con vos!
            </p>

            <div className="flex items-center gap-2 text-[#555555] text-sm pt-2">
              <MapPin size={14} className="text-[#D4AF37] shrink-0" />
              Ayala 604, Santa Rosa, La Pampa
            </div>
          </div>
        </div>
      </section>

      {/* Línea de tiempo */}
      <section className="bg-[#0D0D0D] border-y border-[#1A1A1A] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2 text-center">
            Nuestro recorrido
          </p>
          <h2 className="font-serif text-3xl text-white mb-12 text-center">
            Más de 20 años de historia
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hitos.map((h, i) => (
              <div key={i} className="relative pl-6 border-l border-[#D4AF37]/30">
                <span className="absolute -left-[9px] top-0 w-4 h-4 bg-[#D4AF37] rounded-full" />
                <p className="text-[#D4AF37] font-bold text-xl mb-1">{h.año}</p>
                <p className="text-white font-semibold text-sm mb-2">{h.titulo}</p>
                <p className="text-[#888888] text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fotos del local */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">
          Nuestro espacio
        </p>
        <h2 className="font-serif text-3xl text-white mb-8">
          El local — Inaugurado noviembre 2021
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Interior grande */}
          <div className="relative aspect-square overflow-hidden border border-[#1A1A1A] sm:row-span-2 sm:aspect-auto sm:h-full min-h-[280px]">
            <Image
              src="/negocio/negocio-adentro-02.webp"
              alt="Interior de La Parfumerie de Solange — Ayala 604"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Exterior */}
          <div className="relative aspect-square overflow-hidden border border-[#1A1A1A]">
            <Image
              src="/negocio/adentro2.jpeg"
              alt="La Parfumerie de Solange — Santa Rosa La Pampa"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Interior 2 */}
          <div className="relative aspect-square overflow-hidden border border-[#1A1A1A]">
            <Image
              src="/negocio/negocio-afuera.webp"
              alt="Frente de La Parfumerie de Solange — Ayala 604, Santa Rosa"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#0D0D0D] border-t border-[#1A1A1A] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Heart size={28} className="mx-auto mb-4 text-[#D4AF37]" />
          <h2 className="font-serif text-3xl text-white mb-4">
            Vení a conocernos
          </h2>
          <p className="text-[#888888] mb-8">
            Te esperamos en Ayala 604, Santa Rosa, La Pampa. O escribinos por WhatsApp y
            te ayudamos a encontrar tu fragancia perfecta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/perfumes"
              className="bg-[#D4AF37] text-black font-bold px-8 py-3.5 text-sm tracking-wider uppercase hover:bg-[#E8CC6B] transition-colors shadow-lg shadow-[#D4AF37]/20"
            >
              Ver catálogo
            </Link>
            <a
              href="https://wa.me/5492954808202"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#D4AF37]/40 text-[#D4AF37] font-semibold px-8 py-3.5 text-sm hover:bg-[#D4AF37]/10 transition-colors"
            >
              Escribinos por WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
