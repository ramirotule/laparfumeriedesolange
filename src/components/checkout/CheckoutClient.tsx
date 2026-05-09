"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Banknote,
  Building2,
  CreditCard,
  ChevronRight,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { calculateListPrice, formatPrice } from "@/lib/price-utils";

type MetodoPago = "efectivo" | "transferencia" | "mercadopago";

const METODOS = [
  {
    id: "efectivo" as MetodoPago,
    label: "Efectivo",
    desc: "Pagás en persona al retirar o al momento de la entrega",
    icon: Banknote,
  },
  {
    id: "transferencia" as MetodoPago,
    label: "Transferencia Bancaria",
    desc: "Te enviamos los datos bancarios para que realices la transferencia",
    icon: Building2,
  },
  {
    id: "mercadopago" as MetodoPago,
    label: "MercadoPago",
    desc: "Tarjeta de crédito, débito, cuenta MP o cuotas",
    icon: CreditCard,
  },
];

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [notas, setNotas] = useState("");
  const [metodo, setMetodo] = useState<MetodoPago>("efectivo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(errorParam === "pago_fallido" ? "El pago fue rechazado. Intentá nuevamente." : "");

  // Redirect to catalog if cart is empty
  useEffect(() => {
    if (items.length === 0 && !loading) {
      router.replace("/perfumes");
    }
  }, [items.length, loading, router]);

  const isMercadoPago = metodo === "mercadopago";
  
  const checkoutItems = items.map(item => ({
    ...item,
    precio_unidad: isMercadoPago ? calculateListPrice(item.precio_venta) : item.precio_venta
  }));

  const finalTotal = checkoutItems.reduce((acc, item) => acc + (item.precio_unidad * item.cantidad), 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre || !apellido || !telefono) {
      setError("Completá nombre, apellido y teléfono.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: checkoutItems.map(i => ({
            ...i,
            precio_venta: i.precio_unidad // Override with the calculated price for the method
          })),
          nombre,
          apellido,
          telefono,
          email,
          direccion,
          notas,
          metodo_pago: metodo,
          total: finalTotal
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Ocurrió un error. Intentá nuevamente.");
        setLoading(false);
        return;
      }

      clearCart();
      window.location.href = data.redirectUrl;
    } catch {
      setError("No se pudo conectar. Verificá tu conexión e intentá nuevamente.");
      setLoading(false);
    }
  }

  if (items.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-[#D4AF37] transition-colors">Inicio</Link>
        <ChevronRight size={12} />
        <Link href="/perfumes" className="hover:text-[#D4AF37] transition-colors">Catálogo</Link>
        <ChevronRight size={12} />
        <span className="text-gray-500">Checkout</span>
      </nav>

      <h1 className="font-serif text-3xl text-white mb-2">Finalizar compra</h1>
      <p className="text-gray-400 text-sm mb-10">Revisá tu pedido y completá tus datos</p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-8">
          {/* Datos personales */}
          <section>
            <h2 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4 pb-3 border-b border-[#1A1A1A]">
              Tus datos
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5">
                  Nombre *
                </label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full bg-black border border-[#1A1A1A] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="María"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5">
                  Apellido *
                </label>
                <input
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  className="w-full bg-black border border-[#1A1A1A] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="González"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5">
                  Teléfono / WhatsApp *
                </label>
                <input
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                  type="tel"
                  className="w-full bg-black border border-[#1A1A1A] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="2954 000000"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="w-full bg-black border border-[#1A1A1A] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="opcional"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5">
                Dirección / Barrio (para envío en Santa Rosa)
              </label>
                <input
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full bg-black border border-[#1A1A1A] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Calle 123, Barrio Norte — o 'Retiro en tienda'"
                />
            </div>
            <div className="mt-4">
              <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5">
                Notas del pedido
              </label>
                <textarea
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  rows={2}
                  className="w-full bg-black border border-[#1A1A1A] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  placeholder="Indicaciones especiales, horario preferido, etc."
                />
            </div>
          </section>

          {/* Método de pago */}
          <section>
            <h2 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4 pb-3 border-b border-[#1A1A1A]">
              Forma de pago
            </h2>
            <div className="space-y-3">
              {METODOS.map((m) => {
                const Icon = m.icon;
                const selected = metodo === m.id;
                return (
                  <label
                    key={m.id}
                    className={`flex items-start gap-4 p-4 border cursor-pointer transition-all duration-200 ${
                      selected
                        ? "border-[#D4AF37] bg-[#D4AF37]/5"
                        : "border-[#1A1A1A] hover:border-[#333333] bg-[#0D0D0D]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="metodo"
                      value={m.id}
                      checked={selected}
                      onChange={() => setMetodo(m.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        ? "border-[#D4AF37]" : "border-[#333333]"
                      }`}
                    >
                      {selected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                      )}
                    </div>
                    <Icon
                      size={18}
                      className={selected ? "text-[#D4AF37] shrink-0 mt-0.5" : "text-gray-400 shrink-0 mt-0.5"}
                    />
                    <div>
                      <p className={`text-sm font-semibold ${selected ? "text-[#D4AF37]" : "text-white"}`}>
                        {m.label}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">{m.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </section>

          {error && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] text-black font-bold py-4 text-sm tracking-wider uppercase hover:bg-[#E8CC6B] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Procesando...
              </>
            ) : metodo === "mercadopago" ? (
              <>
                <CreditCard size={16} />
                Pagar con MercadoPago
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                Confirmar pedido
              </>
            )}
          </button>
        </form>

        <aside className="lg:col-span-2">
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-6 sticky top-32 shadow-sm">
            <h2 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-6 pb-3 border-b border-[#1A1A1A]">
              Tu pedido
            </h2>
            <ul className="space-y-4 mb-6">
              {checkoutItems.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <div className="w-14 h-14 bg-[#1A1A1A] border border-[#2D2D2D] shrink-0 overflow-hidden">
                    {item.imagen_url ? (
                      <Image
                        src={item.imagen_url}
                        alt={item.nombre}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200 text-sm">
                        ✦
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium leading-snug">{item.nombre}</p>
                    <p className="text-gray-400 text-[10px] mt-0.5">{item.marca}</p>
                    <p className="text-gray-500 text-[10px] mt-1">
                      {item.cantidad} x {formatPrice(item.precio_unidad)}
                    </p>
                  </div>
                  <p className="text-[#D4AF37] text-sm font-semibold shrink-0">
                    {formatPrice(item.precio_unidad * item.cantidad)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="border-t border-[#1A1A1A] pt-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-white">{formatPrice(finalTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-500">Envío</span>
                  <span className="text-[#D4AF37] text-[10px] font-semibold">Santa Rosa, La Pampa</span>
                </div>
                <span className="text-green-600 text-xs font-bold uppercase tracking-wider">Gratis</span>
              </div>
              
              {!isMercadoPago && (
                <div className="bg-green-500/10 p-2 text-green-400 text-[10px] font-medium flex justify-between items-center border border-green-500/20">
                  <span>DESCUENTO POR CONTADO APLICADO</span>
                  <span className="font-bold">-22.36%</span>
                </div>
              )}

              <div className="flex justify-between items-end pt-4 border-t border-[#1A1A1A]">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm uppercase tracking-wider">Total</span>
                  <span className="text-gray-400 text-[10px]">
                    {isMercadoPago ? "Precio de lista" : "Precio efectivo / transf."}
                  </span>
                </div>
                <span className="text-[#D4AF37] text-3xl font-bold leading-none">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
