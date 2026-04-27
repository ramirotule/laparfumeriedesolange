"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Perfume } from "@/types";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
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
  user: { email?: string };
}

export default function DashboardClient({ perfumes: initialPerfumes, stats, user }: Props) {
  const [perfumes, setPerfumes] = useState<Perfume[]>(initialPerfumes);
  const [loading, setLoading] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function toggleActivo(id: string, activo: boolean) {
    setLoading(id);
    await supabase.from("perfumes").update({ activo: !activo }).eq("id", id);
    setPerfumes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, activo: !activo } : p))
    );
    setLoading(null);
  }

  async function eliminarPerfume(id: string, nombre: string) {
    if (!confirm(`¿Eliminar "${nombre}"? Esta acción no se puede deshacer.`)) return;
    setLoading(id);
    await supabase.from("perfumes").delete().eq("id", id);
    setPerfumes((prev) => prev.filter((p) => p.id !== id));
    setLoading(null);
  }

  const perfumesFiltrados = perfumes.filter(
    (p) =>
      !busqueda ||
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.marca.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header dashboard */}
      <header className="bg-black border-b border-[#1A1A1A] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="La Parfumerie de Solange"
              width={80}
              height={80}
              className="h-9 w-auto object-contain"
            />
          </Link>
          <span className="text-[#2D2D2D]">/</span>
          <span className="text-[#888888] text-sm">Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#444444] text-xs hidden sm:block">{user.email}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-[#2D2D2D] hover:border-red-500/50 text-[#888888] hover:text-red-400 hover:bg-red-500/5 text-xs px-3 py-2 transition-all duration-200"
          >
            <LogOut size={13} />
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
            <div className="flex items-center gap-2 text-[#888888] text-xs mb-2">
              <Package size={14} />
              TOTAL
            </div>
            <p className="text-white font-bold text-2xl">{stats.total}</p>
            <p className="text-[#555555] text-xs">perfumes</p>
          </div>
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs mb-2">
              <Eye size={14} />
              ACTIVOS
            </div>
            <p className="text-white font-bold text-2xl">{stats.activos}</p>
            <p className="text-[#555555] text-xs">publicados</p>
          </div>
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
            <div className="flex items-center gap-2 text-orange-400 text-xs mb-2">
              <AlertTriangle size={14} />
              SIN STOCK
            </div>
            <p className="text-white font-bold text-2xl">{stats.sinStock}</p>
            <p className="text-[#555555] text-xs">para reponer</p>
          </div>
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
            <div className="flex items-center gap-2 text-green-400 text-xs mb-2">
              <DollarSign size={14} />
              INVENTARIO
            </div>
            <p className="text-white font-bold text-2xl">
              ${stats.valorInventario.toLocaleString("es-AR")}
            </p>
            <p className="text-[#555555] text-xs">valor costo</p>
          </div>
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
            <div className="flex items-center gap-2 text-[#D4AF37] text-xs mb-2">
              <TrendingUp size={14} />
              MARGEN
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

        {/* Tabla de inventario */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1A1A1A] bg-black/30">
                  <th className="text-left text-[#555555] text-xs tracking-widest uppercase px-4 py-3">
                    Producto
                  </th>
                  <th className="text-left text-[#555555] text-xs tracking-widest uppercase px-4 py-3 hidden sm:table-cell">
                    Género
                  </th>
                  <th className="text-right text-[#555555] text-xs tracking-widest uppercase px-4 py-3">
                    Costo
                  </th>
                  <th className="text-right text-[#555555] text-xs tracking-widest uppercase px-4 py-3">
                    Venta
                  </th>
                  <th className="text-right text-[#555555] text-xs tracking-widest uppercase px-4 py-3 hidden md:table-cell">
                    Margen
                  </th>
                  <th className="text-center text-[#555555] text-xs tracking-widest uppercase px-4 py-3">
                    Stock
                  </th>
                  <th className="text-center text-[#555555] text-xs tracking-widest uppercase px-4 py-3">
                    Estado
                  </th>
                  <th className="text-center text-[#555555] text-xs tracking-widest uppercase px-4 py-3">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#111111]">
                {perfumesFiltrados.map((perfume) => {
                  const margen =
                    perfume.precio_costo && perfume.precio_costo > 0
                      ? Math.round(
                          ((perfume.precio_venta - perfume.precio_costo) /
                            perfume.precio_venta) *
                            100
                        )
                      : null;

                  return (
                    <tr
                      key={perfume.id}
                      className={`hover:bg-[#111111] transition-colors ${
                        !perfume.activo ? "opacity-50" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-white font-medium line-clamp-1">{perfume.nombre}</p>
                          <p className="text-[#555555] text-xs">{perfume.marca}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#888888] text-xs hidden sm:table-cell">
                        {perfume.genero}
                      </td>
                      <td className="px-4 py-3 text-right text-[#888888]">
                        {perfume.precio_costo
                          ? `$${perfume.precio_costo.toLocaleString("es-AR")}`
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-right text-[#D4AF37] font-semibold">
                        ${perfume.precio_venta.toLocaleString("es-AR")}
                      </td>
                      <td className="px-4 py-3 text-right hidden md:table-cell">
                        {margen !== null ? (
                          <span
                            className={`text-xs font-bold ${
                              margen >= 40
                                ? "text-green-400"
                                : margen >= 25
                                ? "text-yellow-400"
                                : "text-red-400"
                            }`}
                          >
                            {margen}%
                          </span>
                        ) : (
                          <span className="text-[#333333]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`text-xs font-bold ${
                            perfume.stock > 5
                              ? "text-green-400"
                              : perfume.stock > 0
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
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
                          <Link
                            href={`/perfumes/${perfume.slug}`}
                            target="_blank"
                            className="text-[#555555] hover:text-[#D4AF37] transition-colors"
                            title="Ver en tienda"
                          >
                            <Eye size={14} />
                          </Link>
                          <Link
                            href={`/dashboard/editar/${perfume.id}`}
                            className="text-[#555555] hover:text-[#D4AF37] transition-colors"
                            title="Editar"
                          >
                            <Edit2 size={14} />
                          </Link>
                          <button
                            onClick={() => eliminarPerfume(perfume.id, perfume.nombre)}
                            disabled={loading === perfume.id}
                            className="text-[#555555] hover:text-red-400 transition-colors"
                            title="Eliminar"
                          >
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
      </div>
    </div>
  );
}
