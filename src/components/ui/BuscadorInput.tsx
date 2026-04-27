"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, Loader2 } from "lucide-react";

export default function BuscadorInput({ initialValue = "" }: { initialValue?: string }) {
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.trim()) {
      startTransition(() => {
        router.push(`/buscar?q=${encodeURIComponent(value.trim())}`);
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-0 max-w-2xl">
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar por marca, nombre o nota olfativa..."
        className="flex-1 bg-[#0D0D0D] border border-[#2D2D2D] border-r-0 text-white placeholder-[#555555] px-5 py-4 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
        autoFocus
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-[#D4AF37] text-black px-6 py-4 hover:bg-[#E8CC6B] transition-colors disabled:opacity-70 flex items-center gap-2"
      >
        {isPending ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Search size={18} />
        )}
      </button>
    </form>
  );
}
