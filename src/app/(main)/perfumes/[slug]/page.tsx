import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Perfume } from "@/types";
import { ChevronRight, MapPin } from "lucide-react";
import InstagramIcon from "@/components/ui/InstagramIcon";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { calculateListPrice, calculateInstallment, formatPrice } from "@/lib/price-utils";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPerfume(slug: string): Promise<Perfume | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("perfumes")
      .select(
        `*, familia_olfativa:familias_olfativas(*), notas:perfume_notas(nota:notas_aromaticas(*))`
      )
      .eq("slug", slug)
      .eq("activo", true)
      .single();

    if (!data) return null;

    // Flatten notas
    const perfume = {
      ...data,
      notas: data.notas?.map((n: { nota: unknown }) => n.nota) || [],
    };
    return perfume as Perfume;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const perfume = await getPerfume(slug);

  if (!perfume) {
    return { title: "Perfume no encontrado" };
  }

  const titulo =
    perfume.meta_titulo ||
    `Perfume ${perfume.nombre} ${perfume.marca} en Santa Rosa | La Parfumerie`;
  const descripcion =
    perfume.meta_descripcion ||
    `Comprá ${perfume.nombre} de ${perfume.marca} en La Parfumerie, Santa Rosa La Pampa. ${perfume.descripcion_corta || ""} Envío gratis.`;

  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: `/perfumes/${slug}` },
    openGraph: {
      title: titulo,
      description: descripcion,
      images: perfume.imagen_url ? [{ url: perfume.imagen_url }] : [],
      type: "website",
    },
  };
}

export default async function PerfumePage({ params }: Props) {
  const { slug } = await params;
  const perfume = await getPerfume(slug);

  if (!perfume) notFound();

  const whatsappMsg = encodeURIComponent(
    `Hola! Me interesa el perfume *${perfume.nombre}* de *${perfume.marca}*. ¿Tienen stock disponible?`
  );
  const whatsappUrl = `https://wa.me/5492954808202?text=${whatsappMsg}`;

  const notasSalida = perfume.notas?.filter((n) => n.categoria === "salida") || [];
  const notasCorazon = perfume.notas?.filter((n) => n.categoria === "corazon") || [];
  const notasFondo = perfume.notas?.filter((n) => n.categoria === "fondo") || [];

  // JSON-LD Product schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${perfume.nombre} - ${perfume.marca}`,
    description: perfume.descripcion,
    image: perfume.imagen_url || undefined,
    brand: {
      "@type": "Brand",
      name: perfume.marca,
    },
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://laparfumerie.com.ar"}/perfumes/${slug}`,
      priceCurrency: "ARS",
      price: perfume.precio_venta.toString(),
      availability:
        perfume.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "LocalBusiness",
        name: "La Parfumerie de Solange",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Ayala 604",
          addressLocality: "Santa Rosa",
          addressRegion: "La Pampa",
          addressCountry: "AR",
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors">Inicio</Link>
          <ChevronRight size={12} />
          <Link href="/perfumes" className="hover:text-[#D4AF37] transition-colors">Catálogo</Link>
          <ChevronRight size={12} />
          <span className="text-gray-500 truncate max-w-[200px]">{perfume.nombre}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Imagen */}
          <div className="relative aspect-square bg-[#0D0D0D] border border-[#1A1A1A]">
            {perfume.imagen_url ? (
              <Image
                src={perfume.imagen_url}
                alt={`Perfume ${perfume.nombre} ${perfume.marca} - ${perfume.genero} - La Parfumerie Santa Rosa La Pampa`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl text-gray-50 mb-4">✦</div>
                  <p className="text-gray-300 text-sm tracking-wider uppercase">{perfume.marca}</p>
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {perfume.nuevo && (
                <span className="bg-[#D4AF37] text-black text-xs font-bold tracking-wider px-3 py-1 uppercase">
                  Nuevo
                </span>
              )}
              {perfume.genero === "Árabe" && (
                <span className="bg-black/90 border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-bold tracking-wider px-3 py-1 uppercase">
                  Árabe
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2">
              {perfume.marca}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-white mb-1 leading-tight">
              {perfume.nombre}
            </h1>
            {perfume.inspired_in && (
              <p className="text-gray-400 italic text-sm mb-4">
                Inspirado en: <span className="font-medium">{perfume.inspired_in}</span>
              </p>
            )}

            {(perfume.volumen_ml || perfume.concentracion) && (
              <p className="text-gray-500 text-sm mb-4">
                {perfume.volumen_ml && `${perfume.volumen_ml}ml`}
                {perfume.volumen_ml && perfume.concentracion && " · "}
                {perfume.concentracion}
                {perfume.genero && ` · ${perfume.genero}`}
              </p>
            )}

            {perfume.familia_olfativa && (
              <Link
                href={`/perfumes?familia=${perfume.familia_olfativa.nombre}`}
                className="inline-flex w-fit items-center gap-1.5 border border-[#D4AF37]/30 text-[#D4AF37] text-xs px-3 py-1 mb-6 hover:bg-[#D4AF37]/10 transition-colors"
              >
                {perfume.familia_olfativa.nombre}
              </Link>
            )}

            <div className="mb-8 p-6 bg-[#141414] border-l-4 border-[#D4AF37] flex flex-col gap-1">
              <div className="flex flex-col">
                <span className="text-[#888888] text-xs uppercase tracking-widest mb-1">
                  Precio de lista
                </span>
                <span className="text-[#cccccc] font-medium text-2xl">
                  {formatPrice(calculateListPrice(perfume.precio_venta))}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-[#888888] mt-1">
                <span className="font-semibold text-lg">
                  3 cuotas sin interés de {formatPrice(calculateInstallment(perfume.precio_venta))}
                </span>
              </div>

              <div className="mt-6 pt-6 border-t border-[#2D2D2D]">
                <span className="text-[#888888] text-xs uppercase tracking-widest block mb-2">Precio Especial Contado / Transferencia</span>
                <span className="text-white font-bold text-5xl block">
                  {formatPrice(perfume.precio_venta)}
                </span>
              </div>
            </div>

            {/* Stock */}
            <div className="mb-6">
              {perfume.stock > 0 ? (
                <span className="flex items-center gap-1.5 text-green-600 text-sm">
                  <span className="w-2 h-2 bg-green-600 rounded-full" />
                  En stock ({perfume.stock} disponibles)
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                  <span className="w-2 h-2 bg-gray-400 rounded-full" />
                  Sin stock — consultá disponibilidad
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <AddToCartButton
                item={{
                  id: perfume.id,
                  nombre: perfume.nombre,
                  marca: perfume.marca,
                  slug: perfume.slug,
                  precio_venta: perfume.precio_venta,
                  imagen_url: perfume.imagen_url,
                }}
                inStock={perfume.stock > 0}
                variant="page"
              />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="compra-whatsapp"
                data-umami-event-perfume={perfume.nombre}
                className="flex items-center justify-center gap-2 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold px-4 py-3.5 text-sm hover:bg-[#D4AF37]/10 transition-colors flex-1 whitespace-nowrap"
              >
                <img src="/whatsapp.png" alt="WhatsApp" className="w-5 h-5 rounded-full object-cover" />
                Consultar
              </a>
            </div>

            {/* Local info */}
            <div className="border-t border-gray-100 pt-4 flex items-start gap-2 text-gray-400 text-xs">
              <MapPin size={12} className="mt-0.5 text-[#D4AF37] shrink-0" />
              <span>
                Disponible en tienda física: <span className="text-gray-500">Ayala 604, Santa Rosa, La Pampa</span>
                {" · "}
                <span className="text-[#D4AF37]">Envío gratis en Santa Rosa</span>
              </span>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-serif text-2xl text-white mb-4">Descripción</h2>
            <p className="text-[#888888] leading-relaxed">{perfume.descripcion}</p>
          </div>

          {/* Pirámide olfativa */}
          {(notasSalida.length > 0 || notasCorazon.length > 0 || notasFondo.length > 0) && (
            <div>
              <h2 className="font-serif text-2xl text-white mb-4">Pirámide Olfativa</h2>
              <div className="space-y-4">
                {notasSalida.length > 0 && (
                  <div>
                    <p className="text-[#D4AF37] text-xs tracking-widest uppercase mb-2">Notas de Salida</p>
                    <div className="flex flex-wrap gap-2">
                      {notasSalida.map((nota) => (
                        <span
                          key={nota.id}
                          className="bg-[#141414] border border-[#1A1A1A] text-[#888888] text-xs px-3 py-1"
                        >
                          {nota.nombre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {notasCorazon.length > 0 && (
                  <div>
                    <p className="text-[#D4AF37] text-xs tracking-widest uppercase mb-2">Notas de Corazón</p>
                    <div className="flex flex-wrap gap-2">
                      {notasCorazon.map((nota) => (
                        <span
                          key={nota.id}
                          className="bg-[#141414] border border-[#1A1A1A] text-[#888888] text-xs px-3 py-1"
                        >
                          {nota.nombre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {notasFondo.length > 0 && (
                  <div>
                    <p className="text-[#D4AF37] text-xs tracking-widest uppercase mb-2">Notas de Fondo</p>
                    <div className="flex flex-wrap gap-2">
                      {notasFondo.map((nota) => (
                        <span
                          key={nota.id}
                          className="bg-[#141414] border border-[#1A1A1A] text-[#888888] text-xs px-3 py-1"
                        >
                          {nota.nombre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
