"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

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
  const todas = [...new Set([imagenPrincipal, ...(imagenesAdicionales ?? [])].filter(Boolean))] as string[];
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + todas.length) % todas.length), [todas.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % todas.length), [todas.length]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prev, next]);

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
    <>
    <div className="flex flex-col gap-3">
      {/* Imagen principal */}
      <div
        className="relative aspect-square bg-[#0D0D0D] border border-[#1A1A1A] overflow-hidden group cursor-zoom-in"
        onClick={() => setLightbox(true)}
      >
        <Image
          src={todas[current]}
          alt={`${nombre} ${marca} — La Parfumerie Santa Rosa La Pampa`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4 transition-opacity duration-300"
          priority
        />
        <div className="absolute bottom-3 right-3 p-1.5 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn size={16} />
        </div>

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
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 text-white hover:text-[#D4AF37] transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
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

    {/* Lightbox */}
    {lightbox && (
      <div
        className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95"
        onClick={() => setLightbox(false)}
      >
        <button
          onClick={() => setLightbox(false)}
          className="absolute top-4 right-4 p-2 text-white hover:text-[#D4AF37] transition-colors z-10"
          aria-label="Cerrar"
        >
          <X size={28} />
        </button>

        {todas.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-[#D4AF37] transition-colors z-10"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:text-[#D4AF37] transition-colors z-10"
              aria-label="Imagen siguiente"
            >
              <ChevronRight size={36} />
            </button>
          </>
        )}

        <div
          className="relative w-full max-w-3xl max-h-[85vh] aspect-square px-16"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={todas[current]}
            alt={`${nombre} ${marca} — imagen ${current + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-contain"
            priority
          />
        </div>

        {todas.length > 1 && (
          <div className="absolute bottom-6 flex gap-2">
            {todas.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-[#D4AF37] scale-125" : "bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Ir a imagen ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )}
    </>
  );
}
