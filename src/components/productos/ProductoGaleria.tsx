"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  imagenPrincipal?: string;
  imagenesAdicionales?: string[];
  nombre: string;
  marca: string;
  genero: string;
  nuevo: boolean;
}

export default function ProductoGaleria({
  imagenPrincipal,
  imagenesAdicionales = [],
  nombre,
  marca,
  genero,
  nuevo,
}: Props) {
  const todas = [imagenPrincipal, ...imagenesAdicionales].filter(Boolean) as string[];
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + todas.length) % todas.length);
  const next = () => setCurrent((i) => (i + 1) % todas.length);

  if (todas.length === 0) {
    return (
      <div className="relative aspect-square bg-[#0D0D0D] border border-[#1A1A1A] flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl text-gray-50 mb-4">✦</div>
          <p className="text-gray-300 text-sm tracking-wider uppercase">{marca}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Imagen principal */}
      <div className="relative aspect-square bg-[#0D0D0D] border border-[#1A1A1A] overflow-hidden group">
        <Image
          src={todas[current]}
          alt={`${nombre} ${marca} — La Parfumerie Santa Rosa La Pampa`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4 transition-opacity duration-300"
          priority
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {nuevo && (
            <span className="bg-[#D4AF37] text-black text-xs font-bold tracking-wider px-3 py-1 uppercase">
              Nuevo
            </span>
          )}
          {genero === "Árabe" && (
            <span className="bg-black/90 border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-bold tracking-wider px-3 py-1 uppercase">
              Árabe
            </span>
          )}
        </div>

        {/* Flechas — solo si hay más de una imagen */}
        {todas.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 text-white hover:text-[#D4AF37] transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 text-white hover:text-[#D4AF37] transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {todas.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {todas.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`shrink-0 w-16 h-16 border transition-all overflow-hidden bg-[#0D0D0D] ${
                i === current
                  ? "border-[#D4AF37]"
                  : "border-[#1A1A1A] hover:border-[#555]"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img}
                  alt={`${nombre} — imagen ${i + 1}`}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
