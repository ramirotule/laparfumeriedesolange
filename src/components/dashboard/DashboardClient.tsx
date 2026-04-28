"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Perfume } from "@/types";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Eye,
} from "lucide-react";

interface Stats {
  total: number;
  activos: number;
  sinStock: number;
  valorInventario: number;
  margenPromedio: number;
}

interface Props {
  perfumes: Perfume[];
  stats: Stats;
}

export default function DashboardClient({ perfumes: initialPerfumes, stats }: Props) {
  const [perfumes, setPerfumes] = useState<Perfume[]>(initialPerfumes);
  const [loading, setLoading] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", nombre: "" });
  const supabase = createClient();

  async function toggleActivo(id: string, activo: boolean) {
    setLoading(id);
    await supabase.from("perfumes").update({ activo: !activo }).eq("id", id);
    setPerfumes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, activo: !activo } : p))
    );
    setLoading(null);
  }

  function confirmarEliminar(id: string, nombre: string) {
    setDeleteModal({ isOpen: true, id, nombre });
  }

  async function ejecutarEliminar() {
    if (!deleteModal.id) return;
    setLoading(deleteModal.id);
    await supabase.from("perfumes").delete().eq("id", deleteModal.id);
    setPerfumes((prev) => prev.filter((p) => p.id !== deleteModal.id));
    setLoading(null);
    setDeleteModal({ isOpen: false, id: "", nombre: "" });
  }

  const perfumesFiltrados = perfumes.filter(
    (p) =>
      !busqueda ||
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.marca.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
          <div className="flex items-center gap-2 text-[#888888] text-xs mb-2">
            <Package size={14} /> TOTAL
          </div>
          <p className="text-white font-bold text-2xl">{stats.total}</p>
          <p className="text-[#555555] text-xs">perfumes</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
          <div className="flex items-center gap-2 text-[#D4AF37] text-xs mb-2">
            <Eye size={14} /> ACTIVOS
          </div>
          <p className="text-white font-bold text-2xl">{stats.activos}</p>
          <p className="text-[#555555] text-xs">publicados</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
          <div className="flex items-center gap-2 text-orange-400 text-xs mb-2">
            <AlertTriangle size={14} /> SIN STOCK
          </div>
          <p className="text-white font-bold text-2xl">{stats.sinStock}</p>
          <p className="text-[#555555] text-xs">para reponer</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
          <div className="flex items-center gap-2 text-green-400 text-xs mb-2">
            <DollarSign size={14} /> INVENTARIO
          </div>
          <p className="text-white font-bold text-2xl">
            ${stats.valorInventario.toLocaleString("es-AR")}
          </p>
          <p className="text-[#555555] text-xs">valor costo</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
          <div className="flex items-center gap-2 text-[#D4AF37] text-xs mb-2">
            <TrendingUp size={14} /> MARGEN
          </div>
          <p className="text-white font-bold text-2xl">{stats.margenPromedio}%</p>
          <p className="text-[#555555] text-xs">promedio</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre o marca..."
          className="bg-[#0D0D0D] border border-[#2D2D2D] text-white placeholder-[#555555] px-4 py-2.5 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm w-full sm:w-80"
        />
        <Link
          href="/dashboard/nuevo"
          className="flex items-center gap-2 bg-[#D4AF37] text-black font-bold px-5 py-2.5 text-sm tracking-wider hover:bg-[#E8CC6B] transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          Nuevo Perfume
        </Link>
      </div>

      {/* Tabla */}
      <div className="bg-[#0D0D0D] border border-[#1A1A1A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1A1A1A] bg-black/30">
                <th className="text-left text-[#555555] text-xs tracking-widest uppercase px-4 py-3">Producto</th>
                <th className="text-left text-[#555555] text-xs tracking-widest uppercase px-4 py-3 hidden sm:table-cell">Género</th>
                <th className="text-right text-[#555555] text-xs tracking-widest uppercase px-4 py-3">Costo</th>
                <th className="text-right text-[#555555] text-xs tracking-widest uppercase px-4 py-3">Venta</th>
                <th className="text-right text-[#555555] text-xs tracking-widest uppercase px-4 py-3 hidden md:table-cell">Margen</th>
                <th className="text-center text-[#555555] text-xs tracking-widest uppercase px-4 py-3">Stock</th>
                <th className="text-center text-[#555555] text-xs tracking-widest uppercase px-4 py-3">Estado</th>
                <th className="text-center text-[#555555] text-xs tracking-widest uppercase px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111111]">
              {perfumesFiltrados.map((perfume) => {
                const margen =
                  perfume.precio_costo && perfume.precio_costo > 0
                    ? Math.round(
                        ((perfume.precio_venta - perfume.precio_costo) / perfume.precio_venta) * 100
                      )
                    : null;

                return (
                  <tr
                    key={perfume.id}
                    className={`hover:bg-[#111111] transition-colors ${!perfume.activo ? "opacity-50" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {perfume.imagen_url && (
                          <Image
                            src={perfume.imagen_url}
                            alt={perfume.nombre}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover shrink-0 hidden sm:block"
                          />
                        )}
                        <div>
                          <p className="text-white font-medium line-clamp-1">{perfume.nombre}</p>
                          <p className="text-[#555555] text-xs">{perfume.marca}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#888888] text-xs hidden sm:table-cell">{perfume.genero}</td>
                    <td className="px-4 py-3 text-right text-[#888888]">
                      {perfume.precio_costo ? `$${perfume.precio_costo.toLocaleString("es-AR")}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right text-[#D4AF37] font-semibold">
                      ${perfume.precio_venta.toLocaleString("es-AR")}
                    </td>
                    <td className="px-4 py-3 text-right hidden md:table-cell">
                      {margen !== null ? (
                        <span className={`text-xs font-bold ${margen >= 40 ? "text-green-400" : margen >= 25 ? "text-yellow-400" : "text-red-400"}`}>
                          {margen}%
                        </span>
                      ) : (
                        <span className="text-[#333333]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-bold ${perfume.stock > 5 ? "text-green-400" : perfume.stock > 0 ? "text-yellow-400" : "text-red-400"}`}>
                        {perfume.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleActivo(perfume.id, perfume.activo)}
                        disabled={loading === perfume.id}
                        className={`text-xs px-2 py-1 border transition-colors ${
                          perfume.activo
                            ? "border-green-400/30 text-green-400 hover:bg-green-400/10"
                            : "border-[#333333] text-[#555555] hover:border-[#555555]"
                        }`}
                      >
                        {perfume.activo ? "Activo" : "Oculto"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/perfumes/${perfume.slug}`} target="_blank"
                          className="text-[#555555] hover:text-[#D4AF37] transition-colors" title="Ver en tienda">
                          <Eye size={14} />
                        </Link>
                        <Link href={`/dashboard/editar/${perfume.id}`}
                          className="text-[#555555] hover:text-[#D4AF37] transition-colors" title="Editar">
                          <Edit2 size={14} />
                        </Link>
                        <button
                          onClick={() => confirmarEliminar(perfume.id, perfume.nombre)}
                          disabled={loading === perfume.id}
                          className="text-[#555555] hover:text-red-400 transition-colors" title="Eliminar">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {perfumesFiltrados.length === 0 && (
            <div className="text-center py-12 text-[#555555]">
              <Package size={32} className="mx-auto mb-3 opacity-30" />
              <p>No hay perfumes que mostrar.</p>
            </div>
          )}
        </div>
      </div>

      <p className="text-[#333333] text-xs mt-4 text-center">
        {perfumesFiltrados.length} de {perfumes.length} perfumes
      </p>

      {/* Modal eliminación */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0A0A] border border-[#2D2D2D] w-full max-w-md p-6 md:p-8">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <AlertTriangle size={24} />
              <h2 className="font-serif text-xl text-white">Confirmar eliminación</h2>
            </div>
            <p className="text-[#888888] text-sm mb-6 leading-relaxed">
              ¿Estás seguro que deseas eliminar{" "}
              <strong className="text-[#D4AF37]">{deleteModal.nombre}</strong>? Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, id: "", nombre: "" })}
                className="flex-1 px-4 py-2.5 text-sm text-[#888888] hover:text-white border border-[#2D2D2D] hover:bg-[#1A1A1A] transition-colors"
                disabled={loading === deleteModal.id}
              >
                Cancelar
              </button>
              <button
                onClick={ejecutarEliminar}
                disabled={loading === deleteModal.id}
                className="flex-1 px-4 py-2.5 text-sm text-white bg-red-600/90 hover:bg-red-500 transition-colors flex items-center justify-center gap-2"
              >
                {loading === deleteModal.id ? (
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
