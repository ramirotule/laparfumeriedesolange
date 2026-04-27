"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Perfume } from "@/types";

interface Props {
  perfume?: Partial<Perfume>;
  isEdit?: boolean;
}

const generos = ["Femenino", "Masculino", "Unisex", "Árabe"];
const concentraciones = ["EDP", "EDT", "Extrait de Parfum", "Parfum", "EDC", "Aceite puro"];

export default function PerfumeForm({ perfume = {}, isEdit = false }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    nombre: perfume.nombre || "",
    marca: perfume.marca || "",
    descripcion: perfume.descripcion || "",
    descripcion_corta: perfume.descripcion_corta || "",
    precio_costo: perfume.precio_costo?.toString() || "",
    precio_venta: perfume.precio_venta?.toString() || "",
    stock: perfume.stock?.toString() || "0",
    imagen_url: perfume.imagen_url || "",
    genero: perfume.genero || "Unisex",
    concentracion: perfume.concentracion || "EDP",
    volumen_ml: perfume.volumen_ml?.toString() || "",
    activo: perfume.activo !== undefined ? perfume.activo : true,
    destacado: perfume.destacado || false,
    nuevo: perfume.nuevo || false,
    meta_titulo: perfume.meta_titulo || "",
    meta_descripcion: perfume.meta_descripcion || "",
  });

  function update(key: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      descripcion: form.descripcion.trim(),
      descripcion_corta: form.descripcion_corta.trim() || null,
      precio_costo: form.precio_costo ? parseFloat(form.precio_costo) : null,
      precio_venta: parseFloat(form.precio_venta),
      stock: parseInt(form.stock) || 0,
      imagen_url: form.imagen_url.trim() || null,
      genero: form.genero,
      concentracion: form.concentracion || null,
      volumen_ml: form.volumen_ml ? parseInt(form.volumen_ml) : null,
      activo: form.activo,
      destacado: form.destacado,
      nuevo: form.nuevo,
      meta_titulo: form.meta_titulo.trim() || null,
      meta_descripcion: form.meta_descripcion.trim() || null,
    };

    let result;
    if (isEdit && perfume.id) {
      result = await supabase.from("perfumes").update(payload).eq("id", perfume.id);
    } else {
      result = await supabase.from("perfumes").insert(payload);
    }

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
      return;
    }

    setSuccess(isEdit ? "Perfume actualizado correctamente." : "Perfume creado correctamente.");
    setTimeout(() => router.push("/dashboard"), 1500);
  }

  const margen =
    form.precio_costo && form.precio_venta
      ? Math.round(
          ((parseFloat(form.precio_venta) - parseFloat(form.precio_costo)) /
            parseFloat(form.precio_venta)) *
            100
        )
      : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-white">
          {isEdit ? "Editar Perfume" : "Nuevo Perfume"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos básicos */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-6 space-y-4">
          <h2 className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
            Información del Producto
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
                Nombre *
              </label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => update("nombre", e.target.value)}
                required
                className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
              />
            </div>
            <div>
              <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
                Marca *
              </label>
              <input
                type="text"
                value={form.marca}
                onChange={(e) => update("marca", e.target.value)}
                required
                className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
              Descripción *
            </label>
            <textarea
              value={form.descripcion}
              onChange={(e) => update("descripcion", e.target.value)}
              required
              rows={4}
              className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
              Descripción Corta
            </label>
            <input
              type="text"
              value={form.descripcion_corta}
              onChange={(e) => update("descripcion_corta", e.target.value)}
              maxLength={500}
              className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
                Género *
              </label>
              <select
                value={form.genero}
                onChange={(e) => update("genero", e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
              >
                {generos.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
                Concentración
              </label>
              <select
                value={form.concentracion}
                onChange={(e) => update("concentracion", e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
              >
                {concentraciones.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
                Volumen (ml)
              </label>
              <input
                type="number"
                value={form.volumen_ml}
                onChange={(e) => update("volumen_ml", e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                placeholder="100"
              />
            </div>
          </div>

          <div>
            <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
              URL de Imagen
            </label>
            <input
              type="url"
              value={form.imagen_url}
              onChange={(e) => update("imagen_url", e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
              placeholder="https://..."
            />
          </div>
        </div>

        {/* Precios */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-6 space-y-4">
          <h2 className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
            Precios & Stock
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
                Precio Costo ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={form.precio_costo}
                onChange={(e) => update("precio_costo", e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
                Precio Venta ($) *
              </label>
              <input
                type="number"
                step="0.01"
                value={form.precio_venta}
                onChange={(e) => update("precio_venta", e.target.value)}
                required
                className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
                Stock *
              </label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => update("stock", e.target.value)}
                required
                min="0"
                className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
              />
            </div>
          </div>

          {margen !== null && (
            <div
              className={`text-sm px-4 py-2.5 border ${
                margen >= 40
                  ? "border-green-400/30 text-green-400 bg-green-400/5"
                  : margen >= 25
                  ? "border-yellow-400/30 text-yellow-400 bg-yellow-400/5"
                  : "border-red-400/30 text-red-400 bg-red-400/5"
              }`}
            >
              Margen de ganancia: <strong>{margen}%</strong>
              {margen < 25 && " — ¡Revisar precio!"}
              {margen >= 40 && " — Excelente margen"}
            </div>
          )}
        </div>

        {/* Opciones */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-6">
          <h2 className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
            Visibilidad
          </h2>
          <div className="flex flex-wrap gap-6">
            {[
              { key: "activo", label: "Activo (visible en tienda)" },
              { key: "destacado", label: "Destacado en Home" },
              { key: "nuevo", label: "Marcar como Nuevo" },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form[key as keyof typeof form] as boolean}
                  onChange={(e) => update(key, e.target.checked)}
                  className="accent-[#D4AF37] w-4 h-4"
                />
                <span className="text-[#cccccc] text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SEO */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-6 space-y-4">
          <h2 className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4">
            SEO (opcional — se genera automáticamente)
          </h2>
          <div>
            <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
              Meta Título ({form.meta_titulo.length}/160)
            </label>
            <input
              type="text"
              value={form.meta_titulo}
              onChange={(e) => update("meta_titulo", e.target.value)}
              maxLength={160}
              className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors"
            />
          </div>
          <div>
            <label className="text-[#888888] text-xs uppercase tracking-widest block mb-1.5">
              Meta Descripción ({form.meta_descripcion.length}/320)
            </label>
            <textarea
              value={form.meta_descripcion}
              onChange={(e) => update("meta_descripcion", e.target.value)}
              maxLength={320}
              rows={3}
              className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] text-sm transition-colors resize-none"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3">
            {error}
          </div>
        )}
        {success && (
          <div className="text-green-400 text-sm bg-green-400/10 border border-green-400/20 px-4 py-3">
            {success}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#D4AF37] text-black font-bold py-4 tracking-widest text-sm uppercase hover:bg-[#E8CC6B] transition-colors disabled:opacity-70"
          >
            {loading ? "Guardando..." : isEdit ? "Guardar Cambios" : "Crear Perfume"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="px-6 border border-[#2D2D2D] text-[#888888] hover:text-white hover:border-[#555555] transition-colors text-sm"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
