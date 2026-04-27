import { Perfume } from "@/types";
import PerfumeCard from "./PerfumeCard";

interface Props {
  perfumes: Perfume[];
  emptyMessage?: string;
}

export default function PerfumeGrid({
  perfumes,
  emptyMessage = "No se encontraron perfumes.",
}: Props) {
  if (perfumes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4 text-[#2D2D2D]">✦</div>
        <p className="text-[#888888]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {perfumes.map((perfume) => (
        <PerfumeCard key={perfume.id} perfume={perfume} />
      ))}
    </div>
  );
}
