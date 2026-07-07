"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, Check, X, Layers, Tag, ChevronRight, Flower, AlertTriangle } from "lucide-react";

interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  orden: number;
}

interface Subcategoria {
  id: string;
  nombre: string;
  slug: string;
  orden: number;
  activo: boolean;
  categoria_id: string;
}

interface FamiliaOlfativa {
  id: number;
  nombre: string;
  descripcion: string | null;
}

interface Props {
  categorias: Categoria[];
  subcategorias: Subcategoria[];
  familias: FamiliaOlfativa[];
}

const supabase = createClient();

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function CategoriasClient({ categorias: initialCats, subcategorias: initialSubs, familias: initialFamilias }: Props) {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>(initialCats);
  const [subcategorias, setSubcategorias] = useState<Subcategoria[]>(initialSubs);
  const [familias, setFamilias] = useState<FamiliaOlfativa[]>(initialFamilias);
  const [selectedCatId, setSelectedCatId] = useState<string | null>(initialCats[0]?.id ?? null);

  const [newCatName, setNewCatName] = useState("");
  const [savingCat, setSavingCat] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editCatName, setEditCatName] = useState("");

  const [newSubName, setNewSubName] = useState("");
  const [savingSub, setSavingSub] = useState(false);
  const [editingSubId, setEditingSubId] = useState<string | null>(null);
  const [editSubName, setEditSubName] = useState("");

  const [newFamNombre, setNewFamNombre] = useState("");
  const [newFamDesc, setNewFamDesc] = useState("");
  const [savingFam, setSavingFam] = useState(false);
  const [editingFamId, setEditingFamId] = useState<number | null>(null);
  const [editFamNombre, setEditFamNombre] = useState("");
  const [editFamDesc, setEditFamDesc] = useState("");

  const [error, setError] = useState("");
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    message: string;
    onConfirm: () => void;
  }>({ open: false, message: "", onConfirm: () => {} });

  function closeConfirm() {
    setConfirmModal((prev) => ({ ...prev, open: false }));
  }

  const subsForSelected = subcategorias.filter((s) => s.categoria_id === selectedCatId);
  const selectedCat = categorias.find((c) => c.id === selectedCatId);

  // ===================== CATEGORÍAS =====================

  async function handleAddCat() {
    const nombre = newCatName.trim();
    if (!nombre) return;
    setSavingCat(true);
    setError("");
    const slug = slugify(nombre);
    const orden = categorias.length + 1;
    const { data, error: err } = await supabase
      .from("categorias")
      .insert({ nombre, slug, orden })
      .select()
      .single();
    if (err) { setError(err.message); setSavingCat(false); return; }
    setCategorias((prev) => [...prev, data]);
    setSelectedCatId(data.id);
    setNewCatName("");
    setSavingCat(false);
    router.refresh();
  }

  async function handleSaveCat(id: string) {
    const nombre = editCatName.trim();
    if (!nombre) return;
    const slug = slugify(nombre);
    const { error: err } = await supabase.from("categorias").update({ nombre, slug }).eq("id", id);
    if (err) { setError(err.message); return; }
    setCategorias((prev) => prev.map((c) => c.id === id ? { ...c, nombre, slug } : c));
    setEditingCatId(null);
    router.refresh();
  }

  function handleDeleteCat(id: string) {
    setConfirmModal({
      open: true,
      message: "¿Eliminar esta categoría? También se eliminarán sus subcategorías.",
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, open: false }));
        const { error: err } = await supabase.from("categorias").delete().eq("id", id);
        if (err) { setError(err.message); return; }
        setCategorias((prev) => prev.filter((c) => c.id !== id));
        setSubcategorias((prev) => prev.filter((s) => s.categoria_id !== id));
        if (selectedCatId === id) {
          const remaining = categorias.filter((c) => c.id !== id);
          setSelectedCatId(remaining[0]?.id ?? null);
        }
        router.refresh();
      },
    });
  }

  // ===================== SUBCATEGORÍAS =====================

  async function handleAddSub() {
    const nombre = newSubName.trim();
    if (!nombre || !selectedCatId) return;
    setSavingSub(true);
    setError("");
    const slug = slugify(nombre);
    const orden = subsForSelected.length + 1;
    const { data, error: err } = await supabase
      .from("subcategorias")
      .insert({ nombre, slug, orden, categoria_id: selectedCatId, activo: true })
      .select()
      .single();
    if (err) { setError(err.message); setSavingSub(false); return; }
    setSubcategorias((prev) => [...prev, data]);
    setNewSubName("");
    setSavingSub(false);
    router.refresh();
  }

  async function handleSaveSub(id: string) {
    const nombre = editSubName.trim();
    if (!nombre) return;
    const slug = slugify(nombre);
    const { error: err } = await supabase.from("subcategorias").update({ nombre, slug }).eq("id", id);
    if (err) { setError(err.message); return; }
    setSubcategorias((prev) => prev.map((s) => s.id === id ? { ...s, nombre, slug } : s));
    setEditingSubId(null);
    router.refresh();
  }

  function handleDeleteSub(id: string) {
    setConfirmModal({
      open: true,
      message: "¿Eliminar esta subcategoría?",
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, open: false }));
        const { error: err } = await supabase.from("subcategorias").delete().eq("id", id);
        if (err) { setError(err.message); return; }
        setSubcategorias((prev) => prev.filter((s) => s.id !== id));
        router.refresh();
      },
    });
  }

  async function handleToggleSubActivo(sub: Subcategoria) {
    const { error: err } = await supabase.from("subcategorias").update({ activo: !sub.activo }).eq("id", sub.id);
    if (err) { setError(err.message); return; }
    setSubcategorias((prev) => prev.map((s) => s.id === sub.id ? { ...s, activo: !s.activo } : s));
  }

  // ===================== FAMILIAS OLFATIVAS =====================

  async function handleAddFam() {
    const nombre = newFamNombre.trim();
    if (!nombre) return;
    setSavingFam(true);
    setError("");
    const { data, error: err } = await supabase
      .from("familias_olfativas")
      .insert({ nombre, descripcion: newFamDesc.trim() || null })
      .select()
      .single();
    if (err) { setError(err.message); setSavingFam(false); return; }
    setFamilias((prev) => [...prev, data].sort((a, b) => a.nombre.localeCompare(b.nombre)));
    setNewFamNombre("");
    setNewFamDesc("");
    setSavingFam(false);
    router.refresh();
  }

  async function handleSaveFam(id: number) {
    const nombre = editFamNombre.trim();
    if (!nombre) return;
    const { error: err } = await supabase
      .from("familias_olfativas")
      .update({ nombre, descripcion: editFamDesc.trim() || null })
      .eq("id", id);
    if (err) { setError(err.message); return; }
    setFamilias((prev) => prev.map((f) => f.id === id ? { ...f, nombre, descripcion: editFamDesc.trim() || null } : f));
    setEditingFamId(null);
    router.refresh();
  }

  function handleDeleteFam(id: number) {
    setConfirmModal({
      open: true,
      message: "¿Eliminar esta familia olfativa? Los productos que la usen quedarán sin familia asignada.",
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, open: false }));
        const { error: err } = await supabase.from("familias_olfativas").delete().eq("id", id);
        if (err) { setError(err.message); return; }
        setFamilias((prev) => prev.filter((f) => f.id !== id));
        router.refresh();
      },
    });
  }

  return (
    <>
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-white">Categorías & Familias</h1>
        <p className="text-[#555555] text-xs tracking-widest uppercase mt-1">
          Gestioná las categorías, subcategorías y familias olfativas del catálogo
        </p>
      </div>

      {error && (
        <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 px-4 py-3">
          {error}
        </div>
      )}

      {/* ===== FILA 1: Categorías + Subcategorías ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Panel Categorías */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A]">
          <div className="px-5 py-4 border-b border-[#1A1A1A] flex items-center gap-2">
            <Layers size={14} className="text-[#D4AF37]" />
            <h2 className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase">Categorías</h2>
          </div>

          <div className="px-5 py-4 border-b border-[#1A1A1A]">
            <div className="flex gap-2">
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCat()}
                placeholder="Nueva categoría..."
                className="flex-1 bg-[#1A1A1A] border border-[#2D2D2D] text-white placeholder-[#444] px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button
                onClick={handleAddCat}
                disabled={savingCat || !newCatName.trim()}
                className="px-3 py-2 bg-[#D4AF37] text-black hover:bg-[#E8CC6B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <ul className="divide-y divide-[#1A1A1A]">
            {categorias.length === 0 && (
              <li className="px-5 py-6 text-[#333] text-xs italic text-center">No hay categorías todavía.</li>
            )}
            {categorias.map((cat) => {
              const subCount = subcategorias.filter((s) => s.categoria_id === cat.id).length;
              const isSelected = cat.id === selectedCatId;
              const isEditing = editingCatId === cat.id;
              return (
                <li
                  key={cat.id}
                  onClick={() => !isEditing && setSelectedCatId(cat.id)}
                  className={`px-5 py-3 flex items-center gap-3 cursor-pointer transition-colors group ${
                    isSelected ? "bg-[#D4AF37]/5 border-l-2 border-[#D4AF37]" : "hover:bg-[#111] border-l-2 border-transparent"
                  }`}
                >
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        autoFocus
                        type="text"
                        value={editCatName}
                        onChange={(e) => setEditCatName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveCat(cat.id);
                          if (e.key === "Escape") setEditingCatId(null);
                        }}
                        className="flex-1 bg-[#1A1A1A] border border-[#D4AF37] text-white px-2 py-1 text-sm focus:outline-none"
                      />
                      <button onClick={() => handleSaveCat(cat.id)} className="text-green-400 hover:text-green-300 p-1"><Check size={14} /></button>
                      <button onClick={() => setEditingCatId(null)} className="text-[#555] hover:text-white p-1"><X size={14} /></button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${isSelected ? "text-[#D4AF37]" : "text-white"}`}>{cat.nombre}</p>
                        <p className="text-[#444] text-[10px] mt-0.5">{subCount} subcategoría{subCount !== 1 ? "s" : ""}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => { setEditingCatId(cat.id); setEditCatName(cat.nombre); }} className="p-1.5 text-[#555] hover:text-[#D4AF37] transition-colors"><Pencil size={13} /></button>
                        <button onClick={() => handleDeleteCat(cat.id)} className="p-1.5 text-[#555] hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                      </div>
                      {isSelected && <ChevronRight size={14} className="text-[#D4AF37] shrink-0" />}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Panel Subcategorías */}
        <div className="bg-[#0D0D0D] border border-[#1A1A1A]">
          <div className="px-5 py-4 border-b border-[#1A1A1A] flex items-center gap-2">
            <Tag size={14} className="text-[#D4AF37]" />
            <h2 className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase">
              Subcategorías
              {selectedCat && <span className="ml-2 text-[#555] normal-case font-normal">— {selectedCat.nombre}</span>}
            </h2>
          </div>

          <div className="px-5 py-4 border-b border-[#1A1A1A]">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSubName}
                onChange={(e) => setNewSubName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddSub()}
                placeholder={selectedCat ? `Nueva subcategoría en ${selectedCat.nombre}...` : "Seleccioná una categoría primero"}
                disabled={!selectedCatId}
                className="flex-1 bg-[#1A1A1A] border border-[#2D2D2D] text-white placeholder-[#444] px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleAddSub}
                disabled={savingSub || !newSubName.trim() || !selectedCatId}
                className="px-3 py-2 bg-[#D4AF37] text-black hover:bg-[#E8CC6B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <ul className="divide-y divide-[#1A1A1A]">
            {!selectedCatId && (
              <li className="px-5 py-6 text-[#333] text-xs italic text-center">Seleccioná una categoría para ver sus subcategorías.</li>
            )}
            {selectedCatId && subsForSelected.length === 0 && (
              <li className="px-5 py-6 text-[#333] text-xs italic text-center">No hay subcategorías para esta categoría.</li>
            )}
            {subsForSelected.map((sub) => {
              const isEditing = editingSubId === sub.id;
              return (
                <li key={sub.id} className="px-5 py-3 flex items-center gap-3 group hover:bg-[#111] transition-colors">
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        autoFocus
                        type="text"
                        value={editSubName}
                        onChange={(e) => setEditSubName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveSub(sub.id);
                          if (e.key === "Escape") setEditingSubId(null);
                        }}
                        className="flex-1 bg-[#1A1A1A] border border-[#D4AF37] text-white px-2 py-1 text-sm focus:outline-none"
                      />
                      <button onClick={() => handleSaveSub(sub.id)} className="text-green-400 hover:text-green-300 p-1"><Check size={14} /></button>
                      <button onClick={() => setEditingSubId(null)} className="text-[#555] hover:text-white p-1"><X size={14} /></button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate ${sub.activo ? "text-white" : "text-[#444] line-through"}`}>{sub.nombre}</p>
                        <p className="text-[#444] text-[10px] mt-0.5">{sub.slug}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleToggleSubActivo(sub)}
                          className={`px-2 py-1 text-[10px] uppercase tracking-widest font-bold border transition-colors ${
                            sub.activo ? "border-green-500/30 text-green-500 hover:bg-green-500/10" : "border-[#333] text-[#555] hover:text-white"
                          }`}
                        >
                          {sub.activo ? "ON" : "OFF"}
                        </button>
                        <button onClick={() => { setEditingSubId(sub.id); setEditSubName(sub.nombre); }} className="p-1.5 text-[#555] hover:text-[#D4AF37] transition-colors"><Pencil size={13} /></button>
                        <button onClick={() => handleDeleteSub(sub.id)} className="p-1.5 text-[#555] hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ===== FILA 2: Familias Olfativas ===== */}
      <div className="bg-[#0D0D0D] border border-[#1A1A1A]">
        <div className="px-5 py-4 border-b border-[#1A1A1A] flex items-center gap-2">
          <Flower size={14} className="text-[#D4AF37]" />
          <h2 className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase">Familias Olfativas</h2>
        </div>

        {/* Formulario nueva familia */}
        <div className="px-5 py-4 border-b border-[#1A1A1A]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              value={newFamNombre}
              onChange={(e) => setNewFamNombre(e.target.value)}
              placeholder="Nombre (ej: Floral)"
              className="bg-[#1A1A1A] border border-[#2D2D2D] text-white placeholder-[#444] px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <input
              type="text"
              value={newFamDesc}
              onChange={(e) => setNewFamDesc(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddFam()}
              placeholder="Descripción (ej: Rosas, jazmines, flores del jardín)"
              className="sm:col-span-1 bg-[#1A1A1A] border border-[#2D2D2D] text-white placeholder-[#444] px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <button
              onClick={handleAddFam}
              disabled={savingFam || !newFamNombre.trim()}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#D4AF37] text-black text-sm font-bold hover:bg-[#E8CC6B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Plus size={15} /> Agregar
            </button>
          </div>
        </div>

        {/* Lista */}
        <div className="divide-y divide-[#1A1A1A]">
          {familias.length === 0 && (
            <p className="px-5 py-6 text-[#333] text-xs italic text-center">No hay familias olfativas todavía.</p>
          )}
          {familias.map((fam) => {
            const isEditing = editingFamId === fam.id;
            return (
              <div key={fam.id} className="px-5 py-3 flex items-start gap-4 group hover:bg-[#111] transition-colors">
                {isEditing ? (
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      autoFocus
                      type="text"
                      value={editFamNombre}
                      onChange={(e) => setEditFamNombre(e.target.value)}
                      placeholder="Nombre"
                      className="bg-[#1A1A1A] border border-[#D4AF37] text-white px-2 py-1.5 text-sm focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editFamDesc}
                        onChange={(e) => setEditFamDesc(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveFam(fam.id);
                          if (e.key === "Escape") setEditingFamId(null);
                        }}
                        placeholder="Descripción"
                        className="flex-1 bg-[#1A1A1A] border border-[#D4AF37] text-white px-2 py-1.5 text-sm focus:outline-none"
                      />
                      <button onClick={() => handleSaveFam(fam.id)} className="text-green-400 hover:text-green-300 p-1.5"><Check size={14} /></button>
                      <button onClick={() => setEditingFamId(null)} className="text-[#555] hover:text-white p-1.5"><X size={14} /></button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{fam.nombre}</p>
                      {fam.descripcion && (
                        <p className="text-[#555] text-xs mt-0.5 truncate">{fam.descripcion}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={() => { setEditingFamId(fam.id); setEditFamNombre(fam.nombre); setEditFamDesc(fam.descripcion ?? ""); }}
                        className="p-1.5 text-[#555] hover:text-[#D4AF37] transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => handleDeleteFam(fam.id)} className="p-1.5 text-[#555] hover:text-red-400 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* Modal de confirmación */}
    {confirmModal.open && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div className="bg-[#0A0A0A] border border-[#2D2D2D] w-full max-w-md p-6 md:p-8">
          <div className="flex items-center gap-3 text-red-500 mb-4">
            <AlertTriangle size={22} />
            <h2 className="font-serif text-xl text-white">Confirmar eliminación</h2>
          </div>
          <p className="text-[#888888] text-sm mb-6 leading-relaxed">{confirmModal.message}</p>
          <div className="flex gap-3">
            <button
              onClick={closeConfirm}
              className="flex-1 px-4 py-2.5 text-sm text-[#888888] hover:text-white border border-[#2D2D2D] hover:bg-[#1A1A1A] transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={confirmModal.onConfirm}
              className="flex-1 px-4 py-2.5 text-sm text-white bg-red-600/90 hover:bg-red-500 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={14} />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
