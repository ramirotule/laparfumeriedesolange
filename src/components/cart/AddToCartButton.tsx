"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart, CartItem } from "@/context/CartContext";
import { SITE_CONFIG } from "@/constants/site";

interface Props {
  item: Omit<CartItem, "cantidad">;
  inStock: boolean;
  variant?: "card" | "page";
}

const WA_BASE = `https://wa.me/${SITE_CONFIG.contact.phone}`;

function buildPedidoUrl(nombre: string, marca: string) {
  const msg = `¡Hola! Me interesaría encargar por pedido el siguiente producto:\n\n*${nombre}* de *${marca}*.\n\n¿Me podés indicar disponibilidad y tiempo de entrega? ¡Gracias!`;
  return `${WA_BASE}?text=${encodeURIComponent(msg)}`;
}

export default function AddToCartButton({ item, inStock, variant = "card" }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (!inStock || added) return;
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const pedidoUrl = buildPedidoUrl(item.nombre, item.marca);

  if (variant === "page") {
    if (!inStock) {
      return (
        <a
          href={pedidoUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="pedido-whatsapp"
          data-umami-event-producto={item.nombre}
          className="flex items-center justify-center gap-2 font-bold px-4 py-3.5 tracking-wider text-sm uppercase transition-all duration-200 flex-1 whitespace-nowrap bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50 hover:bg-[#D4AF37]/30"
        >
          <ShoppingBag size={18} />
          Por pedido
        </a>
      );
    }

    return (
      <button
        onClick={handleAdd}
        data-umami-event="agregar-al-carrito"
        data-umami-event-producto={item.nombre}
        className={`flex items-center justify-center gap-2 font-bold px-4 py-3.5 tracking-wider text-sm uppercase transition-all duration-200 flex-1 whitespace-nowrap cursor-pointer ${
          added ? "bg-green-600 text-white" : "bg-[#D4AF37] text-black hover:bg-[#E8CC6B]"
        }`}
      >
        {added ? (
          <><Check size={18} />Agregado</>
        ) : (
          <><ShoppingBag size={18} />Agregar al carrito</>
        )}
      </button>
    );
  }

  // Card variant — compact
  if (!inStock) {
    return (
      <a
        href={pedidoUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-umami-event="pedido-whatsapp"
        data-umami-event-producto={item.nombre}
        title="Se trae por pedido — consultá por WhatsApp"
        className="flex flex-1 items-center justify-center gap-1.5 text-xs px-2 py-2 border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all duration-200 whitespace-nowrap"
      >
        <span>Por pedido</span>
      </a>
    );
  }

  return (
    <button
      onClick={handleAdd}
      data-umami-event="agregar-al-carrito"
      data-umami-event-producto={item.nombre}
      title="Agregar al carrito"
      className={`flex flex-1 items-center justify-center gap-1.5 text-xs px-2 py-2 border transition-all duration-200 whitespace-nowrap cursor-pointer ${
        added
          ? "border-green-500/50 bg-green-500/10 text-green-400"
          : "bg-[#D4AF37] border-[#D4AF37] text-black hover:bg-[#E8CC6B] hover:border-[#E8CC6B]"
      }`}
    >
      {added ? (
        <><Check size={13} /><span className="hidden sm:inline">Listo</span></>
      ) : (
        <><ShoppingBag size={13} /><span className="hidden sm:inline">Agregar al carrito</span></>
      )}
    </button>
  );
}
