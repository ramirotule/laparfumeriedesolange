"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Vendedora } from "@/types";
import { Users, Plus, Edit2, Trash2, X, Check, Phone, Mail } from "lucide-react";

interface Props {
  vendedoras: Vendedora[];
}

const EMPTY_FORM = {
  nombre: "",
  apellido: "",
  telefono: "",
  email: "",
  notas: "",
};

export default function VendedorasClient({ vendedoras: initial }: Props) {
  const [vendedoras, setVendedoras] = useState<Vendedora[]>(initial);
  const [loading, setLoading] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const supabase = createClient();

  function openNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  }

  function openEdit(v: Vendedora) {
    setEditingId(v.id);
    setForm({
      nombre: v.nombre,
      apellido: v.apellido,
      telefono: v.telefono || "",
      email: v.email || "",
      notas: v.notas || "",
    });
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
    if (!form.nombre.trim() || !form.apellido.trim()) {
      setFormError("Nombre y apellido son obligatorios.");
      return;
    }
    setLoading("form");
    const payload = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      telefono: form.telefono.trim() || null,
      email: form.email.trim() || null,
      notas: form.notas.trim() || null,
    };

    if (editingId) {
      const { data, error } = await supabase
        .from("vendedoras")
        .update(payload)
        .eq("id", editingId)
        .select()
        .single();
      if (error) { setFormError(error.message); setLoading(null); return; }
      setVendedoras((prev) => prev.map((v) => (v.id === editingId ? (data as Vendedora) : v)));
    } else {
      const { data, error } = await supabase
        .from("vendedoras")
        .insert(payload)
        .select()
        .single();
      if (error) { setFormError(error.message); setLoading(null); return; }
      setVendedoras((prev) => [data as Vendedora, ...prev]);
    }
    setLoading(null);
    closeForm();
  }

  async function toggleActivo(id: string, activo: boolean) {
    setLoading(id);
    const { data } = await supabase
      .from("vendedoras")
      .update({ activo: !activo })
      .eq("id", id)
      .select()
      .single();
    if (data) setVendedoras((prev) => prev.map((v) => (v.id === id ? (data as Vendedora) : v)));
    setLoading(null);
  }

  async function eliminar(id: string, nombre: string) {
    if (!confirm(`¿Eliminar a "${nombre}"? Esta acción no se puede deshacer.`)) return;
    setLoading(id);
    await supabase.from("vendedoras").delete().eq("id", id);
    setVendedoras((prev) => prev.filter((v) => v.id !== id));
    setLoading(null);
  }

  const filtradas = vendedoras.filter(
    (v) =>
      !busqueda ||
      v.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      v.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      (v.telefono || "").includes(busqueda) ||
      (v.email || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
          <div className="flex items-center gap-2 text-[#888888] text-xs mb-2">
            <Users size={14} /> TOTAL
          </div>
          <p className="text-white font-bold text-2xl">{vendedoras.length}</p>
          <p className="text-[#555555] text-xs">vendedoras</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
          <div className="flex items-center gap-2 text-[#D4AF37] text-xs mb-2">
            <Check size={14} /> ACTIVAS
          </div>
          <p className="text-white font-bold text-2xl">{vendedoras.filter((v) => v.activo).length}</p>
          <p className="text-[#555555] text-xs">habilitadas</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre, teléfono o email..."
          className="bg-[#0D0D0D] border border-[#2D2D2D] text-white placeholder-[#555555] px-4 py-2.5 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm w-full sm:w-80"
        />
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#D4AF37] text-black font-bold px-5 py-2.5 text-sm tracking-wider hover:bg-[#E8CC6B] transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          Nueva Vendedora
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-[#0D0D0D] border border-[#1A1A1A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1A1A1A] bg-black/30">
                <th className="text-left text-[#555555] text-xs tracking-widest uppercase px-4 py-3">Nombre</th>
                <th className="text-left text-[#555555] text-xs tracking-widest uppercase px-4 py-3 hidden sm:table-cell">Contacto</th>
                <th className="text-left text-[#555555] text-xs tracking-widest uppercase px-4 py-3 hidden lg:table-cell">Notas</th>
                <th className="text-center text-[#555555] text-xs tracking-widest uppercase px-4 py-3">Estado</th>
                <th className="text-center text-[#555555] text-xs tracking-widest uppercase px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111111]">
              {filtradas.map((v) => (
                <tr key={v.id} className={`hover:bg-[#111111] transition-colors ${!v.activo ? "opacity-50" : ""}`}>
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{v.nombre} {v.apellido}</p>
                    <p className="text-[#555555] text-xs sm:hidden">{v.telefono || v.email || "—"}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="space-y-0.5">
                      {v.telefono && (
                        <div className="flex items-center gap-1.5 text-[#888888] text-xs">
                          <Phone size={11} />{v.telefono}
                        </div>
                      )}
                      {v.email && (
                        <div className="flex items-center gap-1.5 text-[#888888] text-xs">
                          <Mail size={11} />{v.email}
                        </div>
                      )}
                      {!v.telefono && !v.email && <span className="text-[#333333] text-xs">—</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-[#555555] text-xs max-w-xs truncate">
                    {v.notas || "—"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleActivo(v.id, v.activo)}
                      disabled={loading === v.id}
                      className={`text-xs px-2 py-1 border transition-colors ${
                        v.activo
                          ? "border-green-400/30 text-green-400 hover:bg-green-400/10"
                          : "border-[#333333] text-[#555555] hover:border-[#555555]"
                      }`}
                    >
                      {v.activo ? "Activa" : "Inactiva"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(v)} className="text-[#555555] hover:text-[#D4AF37] transition-colors">
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => eliminar(v.id, `${v.nombre} ${v.apellido}`)}
                        disabled={loading === v.id}
                        className="text-[#555555] hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtradas.length === 0 && (
            <div className="text-center py-12 text-[#555555]">
              <Users size={32} className="mx-auto mb-3 opacity-30" />
              <p>No hay vendedoras registradas.</p>
            </div>
          )}
        </div>
      </div>
      <p className="text-[#333333] text-xs mt-4 text-center">{filtradas.length} de {vendedoras.length} vendedoras</p>

      {/* Modal formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0D0D0D] border border-[#2D2D2D] w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]">
              <h2 className="text-white font-semibold text-sm tracking-wider uppercase">
                {editingId ? "Editar Vendedora" : "Nueva Vendedora"}
              </h2>
              <button onClick={closeForm} className="text-[#555555] hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#888888] text-xs uppercase tracking-wider mb-1.5">Nombre *</label>
                  <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full bg-black border border-[#2D2D2D] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="María" />
                </div>
                <div>
                  <label className="block text-[#888888] text-xs uppercase tracking-wider mb-1.5">Apellido *</label>
                  <input value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                    className="w-full bg-black border border-[#2D2D2D] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="González" />
                </div>
              </div>
              <div>
                <label className="block text-[#888888] text-xs uppercase tracking-wider mb-1.5">Teléfono</label>
                <input value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full bg-black border border-[#2D2D2D] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="2954 000000" />
              </div>
              <div>
                <label className="block text-[#888888] text-xs uppercase tracking-wider mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-black border border-[#2D2D2D] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="mail@ejemplo.com" />
              </div>
              <div>
                <label className="block text-[#888888] text-xs uppercase tracking-wider mb-1.5">Notas</label>
                <textarea value={form.notas} onChange={(e) => setForm({ ...form, notas: e.target.value })}
                  rows={3}
                  className="w-full bg-black border border-[#2D2D2D] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  placeholder="Zona de ventas, comisión, etc." />
              </div>
              {formError && <p className="text-red-400 text-xs">{formError}</p>}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm}
                  className="flex-1 border border-[#2D2D2D] text-[#888888] hover:text-white hover:border-[#555555] px-4 py-2.5 text-sm transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={loading === "form"}
                  className="flex-1 bg-[#D4AF37] text-black font-bold px-4 py-2.5 text-sm tracking-wider hover:bg-[#E8CC6B] transition-colors disabled:opacity-50">
                  {loading === "form" ? "Guardando..." : editingId ? "Guardar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
