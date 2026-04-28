"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { NotaAromatica } from "@/types";
import { Sparkles, Plus, Edit2, Trash2, X } from "lucide-react";

interface Props {
  notas: NotaAromatica[];
}

const CATEGORIAS = [
  { value: "salida", label: "Salida" },
  { value: "corazon", label: "Corazón" },
  { value: "fondo", label: "Fondo" },
] as const;

const EMPTY_FORM = { nombre: "", categoria: "salida" as NotaAromatica["categoria"], descripcion: "" };

export default function NotasClient({ notas: initial }: Props) {
  const [notas, setNotas] = useState<NotaAromatica[]>(initial);
  const [loading, setLoading] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const supabase = createClient();

  function openNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  }

  function openEdit(n: NotaAromatica) {
    setEditingId(n.id);
    setForm({ nombre: n.nombre, categoria: n.categoria, descripcion: n.descripcion || "" });
    setFormError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nombre.trim()) { setFormError("El nombre es obligatorio."); return; }
    setLoading(-1);
    const payload = {
      nombre: form.nombre.trim(),
      categoria: form.categoria,
      descripcion: form.descripcion.trim() || null,
    };

    if (editingId !== null) {
      const { data, error } = await supabase
        .from("notas_aromaticas").update(payload).eq("id", editingId).select().single();
      if (error) { setFormError(error.message); setLoading(null); return; }
      setNotas((prev) => prev.map((n) => (n.id === editingId ? (data as NotaAromatica) : n)));
    } else {
      const { data, error } = await supabase
        .from("notas_aromaticas").insert(payload).select().single();
      if (error) { setFormError(error.message); setLoading(null); return; }
      setNotas((prev) => [...prev, data as NotaAromatica].sort((a, b) =>
        a.categoria.localeCompare(b.categoria) || a.nombre.localeCompare(b.nombre)));
    }
    setLoading(null);
    closeForm();
  }

  async function eliminar(id: number, nombre: string) {
    if (!confirm(`¿Eliminar la nota "${nombre}"?`)) return;
    setLoading(id);
    await supabase.from("notas_aromaticas").delete().eq("id", id);
    setNotas((prev) => prev.filter((n) => n.id !== id));
    setLoading(null);
  }

  const porCategoria = CATEGORIAS.map((cat) => ({
    ...cat,
    items: notas.filter((n) => n.categoria === cat.value),
  }));

  const BADGE: Record<string, string> = {
    salida: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
    corazon: "text-pink-400 border-pink-400/30 bg-pink-400/5",
    fondo: "text-amber-600 border-amber-600/30 bg-amber-600/5",
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-1">Dashboard</p>
          <h1 className="text-white text-2xl font-serif">Notas Aromáticas</h1>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#D4AF37] text-black font-bold px-5 py-2.5 text-sm tracking-wider hover:bg-[#E8CC6B] transition-colors"
        >
          <Plus size={16} /> Nueva Nota
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {porCategoria.map((cat) => (
          <div key={cat.value} className="bg-[#0D0D0D] border border-[#1A1A1A]">
            <div className="px-4 py-3 border-b border-[#1A1A1A] flex items-center justify-between">
              <h2 className="text-white text-xs font-bold tracking-[0.2em] uppercase">
                Notas de {cat.label}
              </h2>
              <span className={`text-xs px-2 py-0.5 border ${BADGE[cat.value]}`}>
                {cat.items.length}
              </span>
            </div>
            <div className="divide-y divide-[#111111]">
              {cat.items.length === 0 && (
                <p className="text-[#333333] text-xs px-4 py-6 text-center">Sin notas</p>
              )}
              {cat.items.map((nota) => (
                <div key={nota.id} className="flex items-center justify-between px-4 py-3 hover:bg-[#111111] transition-colors">
                  <div>
                    <p className="text-white text-sm">{nota.nombre}</p>
                    {nota.descripcion && (
                      <p className="text-[#555555] text-xs mt-0.5 line-clamp-1">{nota.descripcion}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <button onClick={() => openEdit(nota)}
                      className="text-[#555555] hover:text-[#D4AF37] transition-colors">
                      <Edit2 size={13} />
                    </button>
                    <button onClick={() => eliminar(nota.id, nota.nombre)}
                      disabled={loading === nota.id}
                      className="text-[#555555] hover:text-red-400 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0D0D0D] border border-[#2D2D2D] w-full max-w-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]">
              <h2 className="text-white font-semibold text-sm tracking-wider uppercase">
                {editingId !== null ? "Editar Nota" : "Nueva Nota"}
              </h2>
              <button onClick={closeForm} className="text-[#555555] hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-[#888888] text-xs uppercase tracking-wider mb-1.5">Nombre *</label>
                <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full bg-black border border-[#2D2D2D] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Ej: Rosa, Vainilla, Cedro..." />
              </div>
              <div>
                <label className="block text-[#888888] text-xs uppercase tracking-wider mb-1.5">Categoría *</label>
                <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value as NotaAromatica["categoria"] })}
                  className="w-full bg-black border border-[#2D2D2D] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors">
                  {CATEGORIAS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#888888] text-xs uppercase tracking-wider mb-1.5">Descripción</label>
                <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  rows={2}
                  className="w-full bg-black border border-[#2D2D2D] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  placeholder="Descripción breve (opcional)" />
              </div>
              {formError && <p className="text-red-400 text-xs">{formError}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm}
                  className="flex-1 border border-[#2D2D2D] text-[#888888] hover:text-white hover:border-[#555555] px-4 py-2.5 text-sm transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={loading === -1}
                  className="flex-1 bg-[#D4AF37] text-black font-bold px-4 py-2.5 text-sm hover:bg-[#E8CC6B] transition-colors disabled:opacity-50">
                  {loading === -1 ? "Guardando..." : editingId !== null ? "Guardar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
