"use client";

import { useState } from "react";
import { Perfume } from "@/types";
import PerfumeCard from "./PerfumeCard";
import { LayoutGrid, Grid3X3, Grid2X2 } from "lucide-react";

interface Props {
  perfumes: Perfume[];
  emptyMessage?: string;
}

type ViewMode = "large" | "standard" | "compact";

export default function PerfumeGrid({
  perfumes,
  emptyMessage = "No se encontraron perfumes.",
}: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("standard");

  if (perfumes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4 text-[#2D2D2D]">✦</div>
        <p className="text-[#888888]">{emptyMessage}</p>
      </div>
    );
  }

  const getGridClasses = () => {
    switch (viewMode) {
      case "large":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
      case "compact":
        return "grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3";
      case "standard":
      default:
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* View Toggle Bar */}
      <div className="flex justify-end items-center border-b border-[#1A1A1A] pb-4 mb-2">
        <div className="flex items-center bg-[#0D0D0D] p-1 rounded-lg border border-[#1A1A1A]">
          <button
            onClick={() => setViewMode("large")}
            className={`p-2 rounded-md transition-all ${
              viewMode === "large"
                ? "bg-black text-[#D4AF37] shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
            title="Vista Grande (3 por fila)"
          >
            <Grid2X2 size={18} />
          </button>
          <button
            onClick={() => setViewMode("standard")}
            className={`p-2 rounded-md transition-all ${
              viewMode === "standard"
                ? "bg-black text-[#D4AF37] shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
            title="Vista Estándar"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode("compact")}
            className={`p-2 rounded-md transition-all ${
              viewMode === "compact"
                ? "bg-black text-[#D4AF37] shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
            title="Vista Compacta (6 por fila)"
          >
            <Grid3X3 size={18} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className={`grid transition-all duration-300 ${getGridClasses()}`}>
        {perfumes.map((perfume) => (
          <PerfumeCard 
            key={perfume.id} 
            perfume={perfume} 
            isCompact={viewMode === "compact"} 
          />
        ))}
      </div>
    </div>
  );
}
