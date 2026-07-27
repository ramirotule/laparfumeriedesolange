"use client";

import { useState, useMemo } from "react";
import { X, Check, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Producto } from "@/types";
import PriceInput from "@/components/ui/PriceInput";
import { calculateListPrice, DEFAULT_RECARGO_LISTA } from "@/lib/price-utils";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  productos: Producto[];
  onSuccess: () => void;
}

interface Edicion {
  nombre?: string;
  precio_venta?: string;
  precio_lista?: string;
  stock?: string;
}

type Campo = keyof Edicion;

export default function EdicionRapidaModal({ isOpen, onClose, productos, onSuccess }: Props) {
  const [busqueda, setBusqueda] = useState("");
  const [ediciones, setEdiciones] = useState<Record<string, Edicion>>({});
  const [guardando, setGuardando] = useState(false);
  const supabase = createClient();

  const filtrados = useMemo(() => {
    if (!busqueda.trim()) return productos;
    const q = busqueda.toLowerCase();
    return productos.filter(
      (p) => p.nombre.toLowerCase().includes(q) || p.marca.toLowerCase().includes(q)
    );
  }, [productos, busqueda]);

  if (!isOpen) return null;

  const valorActual = (p: Producto, campo: Campo): string => {
    const editado = ediciones[p.id]?.[campo];
    if (editado !== undefined) return editado;
    switch (campo) {
      case "nombre":
        return p.nombre;
      case "precio_venta":
        return String(p.precio_venta || 0);
      case "precio_lista":
        return String(
          Math.round(calculateListPrice(p.precio_venta || 0, p.porcentaje_recargo_lista || DEFAULT_RECARGO_LISTA))
        );
      case "stock":
        return String(p.stock ?? 0);
    }
  };

  const setValor = (id: string, campo: Campo, valor: string) => {
    setEdiciones((prev) => ({ ...prev, [id]: { ...prev[id], [campo]: valor } }));
  };

  const cantidadCambios = Object.keys(ediciones).length;

  const descartar = () => setEdiciones({});

  const guardarCambios = async () => {
    const ids = Object.keys(ediciones);
    if (ids.length === 0) return;
    setGuardando(true);

    try {
      const operaciones = ids
        .map((id) => {
          const producto = productos.find((p) => p.id === id);
          const edit = ediciones[id];
          if (!producto) return null;

          const payload: Record<string, unknown> = {};

          if (edit.nombre !== undefined && edit.nombre !== producto.nombre) {
            payload.nombre = edit.nombre;
          }
          if (edit.stock !== undefined) {
            payload.stock = Number(edit.stock) || 0;
          }

          const precioContado =
            edit.precio_venta !== undefined ? Number(edit.precio_venta) || 0 : producto.precio_venta || 0;
          if (edit.precio_venta !== undefined) {
            payload.precio_venta = precioContado;
          }
          if (edit.precio_lista !== undefined) {
            const precioLista = Number(edit.precio_lista) || 0;
            payload.porcentaje_recargo_lista =
              precioContado > 0 && precioLista > 0
                ? (precioLista / precioContado - 1) * 100
                : producto.porcentaje_recargo_lista || DEFAULT_RECARGO_LISTA;
          }

          return Object.keys(payload).length > 0 ? { id, payload } : null;
        })
        .filter((op): op is { id: string; payload: Record<string, unknown> } => op !== null);

      const batchSize = 10;
      for (let i = 0; i < operaciones.length; i += batchSize) {
        const batch = operaciones.slice(i, i + batchSize);
        const resultados = await Promise.all(
          batch.map(({ id, payload }) => supabase.from("productos").update(payload).eq("id", id))
        );
        const conError = resultados.find((r) => r.error);
        if (conError?.error) throw conError.error;
      }

      toast.success(`Se actualizaron ${operaciones.length} productos.`);
      setEdiciones({});
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Error en edición rápida:", err);
      toast.error("Hubo un error al guardar los cambios.");
    } finally {
      setGuardando(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border border-transparent hover:border-[#2D2D2D] focus:border-[#D4AF37]/50 focus:bg-[#0D0D0D] px-2 py-1 text-white text-sm focus:outline-none";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0A0A0A] border border-[#2D2D2D] w-full max-w-5xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif text-white">Edición Rápida</h2>
            <p className="text-[#888888] text-xs">
              {productos.length} productos
              {cantidadCambios > 0 ? ` — ${cantidadCambios} con cambios sin guardar` : ""}
            </p>
          </div>
          <button onClick={onClose} className="text-[#555555] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Buscador */}
        <div className="px-6 pt-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" />
            <input
              type="search"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Filtrar por nombre o marca..."
              className="w-full bg-[#0D0D0D] border border-[#1A1A1A] pl-9 pr-3 py-2 text-sm text-white placeholder:text-[#555555] focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>
        </div>

        {/* Grilla editable */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-[#0A0A0A] z-10">
              <tr className="border-b border-[#1A1A1A] text-[#555555] text-xs uppercase tracking-wider">
                <th className="text-left py-2 pr-2">Nombre</th>
                <th className="text-right py-2 px-2 w-32">Contado</th>
                <th className="text-right py-2 px-2 w-32">Lista</th>
                <th className="text-right py-2 pl-2 w-24">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]">
              {filtrados.map((p) => {
                const editado = !!ediciones[p.id];
                return (
                  <tr key={p.id} className={editado ? "bg-[#D4AF37]/5" : ""}>
                    <td className="py-1">
                      <input
                        type="text"
                        value={valorActual(p, "nombre")}
                        onChange={(e) => setValor(p.id, "nombre", e.target.value)}
                        className={inputClass}
                      />
                    </td>
                    <td className="py-1 px-2">
                      <PriceInput
                        value={valorActual(p, "precio_venta")}
                        onChange={(v) => setValor(p.id, "precio_venta", v)}
                        className={`${inputClass} text-right px-2`}
                      />
                    </td>
                    <td className="py-1 px-2">
                      <PriceInput
                        value={valorActual(p, "precio_lista")}
                        onChange={(v) => setValor(p.id, "precio_lista", v)}
                        className={`${inputClass} text-right px-2`}
                      />
                    </td>
                    <td className="py-1 pl-2">
                      <input
                        type="number"
                        value={valorActual(p, "stock")}
                        onChange={(e) => setValor(p.id, "stock", e.target.value)}
                        className={`${inputClass} text-right`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#1A1A1A] flex gap-3">
          <button
            onClick={cantidadCambios > 0 ? descartar : onClose}
            disabled={guardando}
            className="flex-1 px-4 py-2.5 text-sm text-[#888888] hover:text-white border border-[#2D2D2D] transition-colors disabled:opacity-50"
          >
            {cantidadCambios > 0 ? "Descartar cambios" : "Cerrar"}
          </button>
          <button
            onClick={guardarCambios}
            disabled={guardando || cantidadCambios === 0}
            className="flex-1 bg-[#D4AF37] disabled:bg-gray-800 disabled:text-gray-500 text-black font-bold px-4 py-2.5 text-sm tracking-wider transition-all flex items-center justify-center gap-2"
          >
            {guardando ? (
              <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <Check size={16} />
            )}
            Guardar cambios {cantidadCambios > 0 ? `(${cantidadCambios})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
