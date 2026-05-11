"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart, CartItem } from "@/context/CartContext";

interface Props {
  item: Omit<CartItem, "cantidad">;
  inStock: boolean;
  variant?: "card" | "page";
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

  if (variant === "page") {
    return (
      <button
        onClick={handleAdd}
        disabled={!inStock}
        data-umami-event="agregar-al-carrito"
        data-umami-event-producto={item.nombre}
        className={`flex items-center justify-center gap-2 font-bold px-4 py-3.5 tracking-wider text-sm uppercase transition-all duration-200 flex-1 whitespace-nowrap ${
          !inStock
            ? "bg-[#1A1A1A] text-[#555555] cursor-not-allowed border border-[#2D2D2D]"
            : added
            ? "bg-green-600 text-white"
            : "bg-[#D4AF37] text-black hover:bg-[#E8CC6B]"
        }`}
      >
        {added ? (
          <>
            <Check size={18} />
            Agregado
          </>
        ) : (
          <>
            <ShoppingBag size={18} />
            {inStock ? "Agregar al carrito" : "Sin stock"}
          </>
        )}
      </button>
    );
  }

  // Card variant — compact
  return (
    <button
      onClick={handleAdd}
      disabled={!inStock}
      data-umami-event="agregar-al-carrito"
      data-umami-event-producto={item.nombre}
      title={inStock ? "Agregar al carrito" : "Sin stock"}
      className={`flex flex-1 items-center justify-center gap-1.5 text-xs px-2 py-2 border transition-all duration-200 whitespace-nowrap ${
        !inStock
          ? "border-[#2D2D2D] text-[#444444] cursor-not-allowed"
          : added
          ? "border-green-500/50 bg-green-500/10 text-green-400"
          : "bg-[#D4AF37] border-[#D4AF37] text-black hover:bg-[#E8CC6B] hover:border-[#E8CC6B]"
      }`}
    >
      {added ? <Check size={13} /> : <ShoppingBag size={13} />}
      <span className="hidden sm:inline">{added ? "Listo" : "Agregar al carrito"}</span>
    </button>
  );
}
