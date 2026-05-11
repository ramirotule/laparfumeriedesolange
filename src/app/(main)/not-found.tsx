import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[#D4AF37] text-xs tracking-[0.5em] uppercase mb-4">Error 404</p>
        <h1 className="font-serif text-5xl text-black mb-4">Página no encontrada</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          La fragancia que buscás no existe o fue movida. Explorá nuestro catálogo completo.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-[#D4AF37] text-black font-bold px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#E8CC6B] transition-colors"
          >
            Ir al Inicio
          </Link>
          <Link
            href="/productos"
            className="border border-[#D4AF37]/40 text-[#D4AF37] font-semibold px-8 py-3 text-sm hover:bg-[#D4AF37]/10 transition-colors"
          >
            Ver Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
