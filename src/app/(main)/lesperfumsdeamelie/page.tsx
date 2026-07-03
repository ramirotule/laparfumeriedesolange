import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Les Parfums de Amelie | La Parfumerie de Solange",
  description:
    "Una historia de amor convertida en esencia. Les Parfums de Amelie es una colección inspirada en la elegancia, la sensibilidad y la autenticidad, creada como homenaje a una hija muy amada.",
  alternates: { canonical: "/lesperfumsdeamelie" },
  openGraph: {
    title: "Les Parfums de Amelie | La Parfumerie de Solange",
    description: "Una historia de amor convertida en esencia.",
    type: "website",
  },
};

export default function LesPerfumsDeAmeliePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-6 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_70%)] pointer-events-none" />

        {/* Decorative lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#D4AF37]/30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-transparent to-[#D4AF37]/30" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Eyebrow */}
          <p className="text-[#D4AF37]/60 text-xs tracking-[0.4em] uppercase mb-8 font-light">
            La Parfumerie de Solange presenta
          </p>

          {/* Main title */}
          <h1
            className="text-6xl sm:text-7xl md:text-8xl text-[#D4AF37] mb-6 leading-none"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Les Parfums
          </h1>
          <h2
            className="text-5xl sm:text-6xl md:text-7xl text-white mb-10 leading-none"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            de Amelie
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-[#D4AF37]/40" />
            <span className="text-[#D4AF37] text-lg">✦</span>
            <div className="h-px w-16 bg-[#D4AF37]/40" />
          </div>

          <p
            className="text-xl sm:text-2xl text-[#cccccc] leading-relaxed italic"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            &ldquo;Una historia de amor convertida en esencia.&rdquo;
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        {/* Opening */}
        <div className="text-center mb-20">
          <h3
            className="text-3xl sm:text-4xl text-[#D4AF37] mb-8 leading-relaxed"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            El origen de &ldquo;Les Parfums de Amelie&rdquo;
          </h3>
          <p className="text-[#aaaaaa] text-lg leading-relaxed mb-4">
            Hay nombres que se eligen. Y hay nombres que se sueñan.
          </p>
          <p className="text-[#888888] leading-relaxed">
            Amelie fue soñada mucho antes de llegar a nuestras vidas. Fue una
            niña profundamente deseada, imaginada con amor y esperada con una
            ilusión inmensa. Antes incluso de conocer su rostro, su nombre ya
            habitaba nuestros corazones.
          </p>
        </div>

        {/* Quote block */}
        <div className="relative border-l-2 border-[#D4AF37]/50 pl-8 mb-20 ml-4">
          <div className="absolute -left-3 top-0 w-5 h-5 rounded-full bg-black border border-[#D4AF37]/50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]/70" />
          </div>
          <p
            className="text-2xl sm:text-3xl text-white leading-relaxed italic"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Junto a su papá, supimos desde el primer momento que sería una
            niña. Y sabíamos también cómo se llamaría.
          </p>
          <p
            className="text-4xl sm:text-5xl text-[#D4AF37] mt-4"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Amelie.
          </p>
        </div>

        {/* Name meaning */}
        <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-8 sm:p-12 mb-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

          <p
            className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-6 text-center"
          >
            El significado de un nombre
          </p>
          <p className="text-[#aaaaaa] leading-relaxed text-center mb-6">
            Un nombre de origen francés que evoca{" "}
            <span className="text-white font-medium">dulzura</span>,{" "}
            <span className="text-white font-medium">fortaleza</span>,{" "}
            <span className="text-white font-medium">sensibilidad</span> y{" "}
            <span className="text-white font-medium">valentía</span>.
          </p>
          <p className="text-[#666666] leading-relaxed text-center text-sm">
            Un nombre asociado a personas creativas, generosas, serviciales,
            empáticas y capaces de iluminar la vida de quienes las rodean con
            su forma única de ser.
          </p>
        </div>

        {/* Arrival paragraph */}
        <div className="mb-20 text-center">
          <div className="text-[#D4AF37]/30 text-5xl mb-8 leading-none select-none">✦</div>
          <p className="text-[#aaaaaa] leading-relaxed mb-6">
            Cuando Amelie llegó al mundo, llenó nuestra vida de amor, magia e
            ilusiones. Nos enseñó el verdadero significado del compromiso, nos
            impulsó a crecer como padres y nos recordó cada día la importancia
            de creer en los sueños.
          </p>
          <p className="text-[#888888] leading-relaxed mb-6">
            Por eso, cuando llegó el momento de dar vida a una nueva propuesta
            dentro de LA PARFUMERIE de Solange, no hubo dudas.
          </p>
          <p
            className="text-3xl sm:text-4xl text-white italic"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Quise que llevara su nombre.
          </p>
        </div>

        {/* Birth of the brand */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-[#1A1A1A]" />
            <p
              className="text-[#D4AF37] text-xl"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Así nacieron
            </p>
            <div className="h-px flex-1 bg-[#1A1A1A]" />
          </div>

          <div className="text-center mb-10">
            <p
              className="text-4xl sm:text-5xl text-[#D4AF37] mb-4 leading-relaxed"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              &ldquo;Les Parfums de Amelie&rdquo;
            </p>
            <p className="text-[#888888] leading-relaxed max-w-xl mx-auto">
              Una colección inspirada en la elegancia, la sensibilidad y la
              autenticidad. Fragancias creadas para acompañar momentos,
              despertar emociones y dejar huellas inolvidables.
            </p>
          </div>

          <p className="text-[#666666] leading-relaxed text-sm text-center max-w-2xl mx-auto">
            Esta marca nació también de un deseo muy especial: poder ofrecer
            más opciones, más estilos y más posibilidades para que cada persona
            encuentre ese aroma que realmente la represente. Porque entendemos
            que cada historia es única, cada personalidad tiene su esencia y
            cada cliente merece descubrir una fragancia con la que se
            identifique plenamente.
          </p>
        </div>

        {/* Philosophy */}
        <div className="bg-[#050505] border border-[#D4AF37]/20 p-8 sm:p-12 mb-20 text-center relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4">
            <span className="text-[#D4AF37]/60 text-xs tracking-[0.3em] uppercase">Nuestra creencia</span>
          </div>
          <p
            className="text-2xl sm:text-3xl text-white italic leading-relaxed mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            &ldquo;Elegir un perfume es mucho más que elegir un aroma.
            Es encontrar una emoción, un recuerdo, una sensación.&rdquo;
          </p>
          <p className="text-[#666666] text-sm leading-relaxed">
            En LA PARFUMERIE de Solange buscamos ampliar constantemente nuestro
            universo de fragancias, para acompañar los gustos, deseos y
            expectativas de quienes confían en nosotros.
          </p>
        </div>

        {/* Legacy */}
        <div className="mb-20 text-center">
          <p className="text-[#aaaaaa] leading-relaxed mb-8">
            Esta marca representa mucho más que un proyecto comercial.{" "}
            <span className="text-white">Representa un legado de amor.</span>{" "}
            Un homenaje a la persona que me inspira cada día a ser mejor, a
            crecer, a crear y a seguir soñando.
          </p>

          <div className="inline-block relative py-6 px-8">
            <div className="absolute inset-0 border border-[#D4AF37]/20 rounded-sm" />
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#D4AF37]/40" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#D4AF37]/40" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#D4AF37]/40" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#D4AF37]/40" />
            <p
              className="text-3xl sm:text-4xl text-[#D4AF37] leading-relaxed"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Amelie es mi luz, mis ojos,
              <br />
              mi motor y mi mayor orgullo.
            </p>
          </div>
        </div>

        {/* Wish for Amelie */}
        <div className="mb-20">
          <div className="flex items-start gap-6">
            <div className="shrink-0 mt-1">
              <div className="w-px h-full min-h-[200px] bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/10 to-transparent ml-2" />
            </div>
            <div>
              <p className="text-[#888888] leading-relaxed mb-6">
                Y así como deseo que cada una de estas fragancias encuentre un
                lugar especial en quien la elija, deseo también que Amelie
                recorra su propio camino siendo feliz, confiando en sí misma,
                desarrollando sus fortalezas, abrazando sus virtudes y
                aprendiendo de cada desafío que la vida le presente.
              </p>
              <p className="text-[#aaaaaa] leading-relaxed">
                Como mamá, mi mayor anhelo es acompañarla siempre, ayudándola
                a crecer con amor, seguridad y libertad para convertirse en la
                mujer que sueñe ser.
              </p>
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className="text-center mb-20">
          <p
            className="text-2xl text-white italic mb-4"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Porque los sueños merecen ser perseguidos.
          </p>
          <p
            className="text-xl text-[#aaaaaa] italic"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Y porque algunos sueños, como Amelie, terminan convirtiéndose
            en la inspiración más hermosa de una vida.
          </p>
        </div>

        {/* Final signature */}
        <div className="text-center border-t border-[#1A1A1A] pt-16">
          <p
            className="text-5xl sm:text-6xl text-[#D4AF37] mb-4 leading-relaxed"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Les Parfums de Amelie
          </p>
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px w-12 bg-[#D4AF37]/30" />
            <span className="text-[#D4AF37]/60 text-sm">✦</span>
            <div className="h-px w-12 bg-[#D4AF37]/30" />
          </div>
          <p
            className="text-lg text-[#888888] italic"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Una historia de amor convertida en esencia.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-24 px-6">
        <Link
          href="/productos?marca=Amelie"
          className="inline-flex items-center gap-3 border border-[#D4AF37]/50 text-[#D4AF37] px-10 py-4 text-xs tracking-[0.3em] uppercase font-bold hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
        >
          Explorar la colección
        </Link>
      </section>
    </div>
  );
}
