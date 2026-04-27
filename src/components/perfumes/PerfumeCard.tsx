import Link from "next/link";
import Image from "next/image";
import { Perfume } from "@/types";
import { MessageCircle } from "lucide-react";

interface Props {
  perfume: Perfume;
}

export default function PerfumeCard({ perfume }: Props) {
  const whatsappMsg = encodeURIComponent(
    `Hola! Me interesa el perfume *${perfume.nombre}* de *${perfume.marca}*. ¿Tienen stock disponible?`
  );
  const whatsappUrl = `https://wa.me/2954808202?text=${whatsappMsg}`;

  return (
    <article className="group bg-[#0D0D0D] border border-[#1A1A1A] hover:border-[#D4AF37]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#D4AF37]/5 flex flex-col">
      {/* Image */}
      <Link href={`/perfumes/${perfume.slug}`} className="block relative overflow-hidden aspect-square bg-[#111111]">
        {perfume.imagen_url ? (
          <Image
            src={perfume.imagen_url}
            alt={`Perfume ${perfume.nombre} ${perfume.marca} - ${perfume.genero} - La Parfumerie Santa Rosa La Pampa`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">✦</div>
              <p className="text-[#555555] text-xs tracking-wider">
                {perfume.marca}
              </p>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {perfume.nuevo && (
            <span className="bg-[#D4AF37] text-black text-[9px] font-bold tracking-wider px-2 py-0.5 uppercase">
              Nuevo
            </span>
          )}
          {perfume.destacado && !perfume.nuevo && (
            <span className="bg-black/80 border border-[#D4AF37]/50 text-[#D4AF37] text-[9px] font-bold tracking-wider px-2 py-0.5 uppercase">
              Destacado
            </span>
          )}
          {perfume.stock === 0 && (
            <span className="bg-black/80 border border-[#888888]/50 text-[#888888] text-[9px] font-bold tracking-wider px-2 py-0.5 uppercase">
              Sin stock
            </span>
          )}
        </div>

        {/* Género badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-black/70 text-[#888888] text-[9px] tracking-wider px-2 py-0.5 uppercase">
            {perfume.genero}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/perfumes/${perfume.slug}`}>
          <p className="text-[#888888] text-xs tracking-[0.2em] uppercase mb-1">
            {perfume.marca}
          </p>
          <h3 className="text-white font-serif text-base leading-snug group-hover:text-[#D4AF37] transition-colors line-clamp-2">
            {perfume.nombre}
          </h3>
        </Link>

        {perfume.volumen_ml && perfume.concentracion && (
          <p className="text-[#555555] text-xs mt-1">
            {perfume.volumen_ml}ml · {perfume.concentracion}
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
          <div>
            <span className="text-[#D4AF37] font-bold text-lg">
              ${perfume.precio_venta.toLocaleString("es-AR")}
            </span>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-umami-event="whatsapp-consulta"
            data-umami-event-perfume={perfume.nombre}
            className="flex items-center gap-1.5 bg-[#1A1A1A] border border-[#2D2D2D] hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 text-white hover:text-[#D4AF37] text-xs px-3 py-2 transition-all duration-200"
            aria-label={`Consultar ${perfume.nombre} por WhatsApp`}
          >
            <MessageCircle size={13} />
            <span className="hidden sm:inline">Consultar</span>
          </a>
        </div>
      </div>
    </article>
  );
}
