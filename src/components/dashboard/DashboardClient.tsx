"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Producto } from "@/types";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Eye,
  FileSpreadsheet,
  ArrowDown,
  ArrowUp,
  X,
  RefreshCw,
} from "lucide-react";
import BulkImportModal from "./BulkImportModal";
import * as XLSX from "xlsx";
import CustomSelect from "@/components/ui/CustomSelect";
import toast from "react-hot-toast";
import { calculateListPrice, DEFAULT_RECARGO_LISTA } from "@/lib/price-utils";

interface Stats {
  total: number;
  activos: number;
  sinStock: number;
}

interface Props {
  productos: Producto[];
}

export default function DashboardClient({ productos: initialProductos }: Props) {
  const [productos, setProductos] = useState<Producto[]>(initialProductos);
  const [loading, setLoading] = useState<string | null>(null);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: "", nombre: "" });
  const [bulkDeleteModal, setBulkDeleteModal] = useState(false);
  
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [regeneratingSlug, setRegeneratingSlug] = useState(false);
  const [categoriaFiltrada, setCategoriaFiltrada] = useState<string>("");
  const [subcategoriaFiltrada, setSubcategoriaFiltrada] = useState<string>("");
  const [menuBulkAbierto, setMenuBulkAbierto] = useState<"categoria" | "genero" | "subcategoria" | null>(null);
  const [precioModal, setPrecioModal] = useState<{ open: boolean; venta: string; porcentajeRecargo: string }>({ open: false, venta: "", porcentajeRecargo: "" });
  const [categoriasDb, setCategoriasDb] = useState<{id: string, nombre: string}[]>([]);
  const [subcategoriasDb, setSubcategoriasDb] = useState<{id: string, nombre: string, slug: string, categoria_id: string}[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function fetchProductos() {
    try {
      setBulkLoading(true);
      // Cargamos categorías y productos en paralelo para máxima eficiencia
      const [{ data: cats }, { data: prods }] = await Promise.all([
        supabase.from("categorias").select("id, nombre"),
        supabase.from("productos").select("*, familia_olfativa:familias_olfativas(*)").order("created_at", { ascending: false })
      ]);

      if (!prods) return;

      const catMap = new Map(cats?.map(c => [c.id.toString(), c.nombre]) || []);

      const formattedData = (prods as any[]).map(p => ({
        ...p,
        categoria: p.categoria_id ? (catMap.get(p.categoria_id.toString()) || "Fragancias") : (p.categoria || "Fragancias")
      }));

      setProductos(formattedData as Producto[]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setBulkLoading(false);
    }
  }

  const fetchCategorias = async () => {
    const [{ data: cats }, { data: subs }] = await Promise.all([
      supabase.from("categorias").select("id, nombre"),
      supabase.from("subcategorias").select("id, nombre, slug, categoria_id").eq("activo", true).order("orden"),
    ]);
    if (cats) setCategoriasDb(cats);
    if (subs) setSubcategoriasDb(subs);
  };

  useEffect(() => {
    fetchCategorias();
    fetchProductos(); // Aseguramos que la data inicial esté bien mapeada
  }, []);

  // Cálculos de estadísticas en tiempo real
  const currentStats = {
    total: productos.length,
    activos: productos.filter((p) => p.activo).length,
    sinStock: productos.filter((p) => p.stock === 0).length,
  };

  // Multi-select logic
  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === productosFiltrados.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(productosFiltrados.map((p) => p.id)));
    }
  };

  async function toggleActivo(id: string, activo: boolean) {
    setLoading(id);
    await supabase.from("productos").update({ activo: !activo }).eq("id", id);
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, activo: !activo } : p))
    );
    setLoading(null);
  }

  async function bulkToggleActivo(activo: boolean) {
    setBulkLoading(true);
    const ids = Array.from(selectedIds);
    await supabase.from("productos").update({ activo }).in("id", ids);
    setProductos((prev) =>
      prev.map((p) => (selectedIds.has(p.id) ? { ...p, activo } : p))
    );
    setSelectedIds(new Set());
    setBulkLoading(false);
    toast.success(`Se actualizaron ${ids.length} productos.`);
  }
  
  async function bulkUpdateField(field: "categoria" | "genero", value: string) {
    setBulkLoading(true);
    const ids = Array.from(selectedIds);
    
    let updateData: any = { [field]: value };
    
    // Si es categoría, buscamos el ID correspondiente
    if (field === "categoria") {
      console.log("Categorías en DB:", categoriasDb);
      console.log("Buscando categoría:", value);
      
      const catEncontrada = categoriasDb.find(c => c.nombre.toLowerCase().trim() === value.toLowerCase().trim());
      
      if (catEncontrada) {
        console.log("Categoría encontrada!", catEncontrada);
        updateData = { 
          categoria_id: catEncontrada.id,
          categoria: catEncontrada.nombre
        };
      } else {
        console.error("No se encontró la categoría con nombre:", value);
        toast.error(`No se encontró la categoría '${value}' en la base de datos.`);
        setBulkLoading(false);
        return;
      }
    }

    // 2. Preparamos lo que se guarda en DB (solo columnas reales)
    const dbPayload = { ...updateData };
    delete (dbPayload as any).categoria; // No existe en DB

    const { error } = await supabase.from("productos").update(dbPayload).in("id", ids);
    
    if (error) {
      console.error("Error Supabase:", error);
      toast.error("Error al actualizar productos.");
    } else {
      setProductos((prev) =>
        prev.map((p) => (selectedIds.has(p.id) ? { ...p, ...updateData } : p))
      );
      setSelectedIds(new Set());
      toast.success("Productos actualizados correctamente.");
    }
    setBulkLoading(false);
  }

  async function bulkUpdateSubcategoria(subId: string, catId: string) {
    setBulkLoading(true);
    const ids = Array.from(selectedIds);
    const { error } = await supabase
      .from("productos")
      .update({ subcategoria_id: subId, categoria_id: catId })
      .in("id", ids);
    if (error) {
      toast.error("Error al actualizar subcategoría.");
    } else {
      setProductos((prev) =>
        prev.map((p) => selectedIds.has(p.id) ? { ...p, subcategoria_id: subId, categoria_id: catId } : p)
      );
      setSelectedIds(new Set());
      toast.success("Subcategoría actualizada correctamente.");
    }
    setBulkLoading(false);
  }

  async function bulkUpdatePrecios() {
    const { venta, porcentajeRecargo } = precioModal;
    if (!venta && !porcentajeRecargo) return;
    setBulkLoading(true);
    const ids = Array.from(selectedIds);
    const payload: Record<string, number> = {};
    if (venta) payload.precio_venta = Number(venta.replace(/\D/g, ""));
    if (porcentajeRecargo) payload.porcentaje_recargo_lista = parseFloat(porcentajeRecargo);
    const { error } = await supabase.from("productos").update(payload).in("id", ids);
    if (error) {
      toast.error("Error al actualizar precios.");
    } else {
      setProductos((prev) => prev.map((p) => selectedIds.has(p.id) ? { ...p, ...payload } : p));
      setSelectedIds(new Set());
      setPrecioModal({ open: false, venta: "", porcentajeRecargo: "" });
      toast.success(`Precios actualizados en ${ids.length} productos.`);
    }
    setBulkLoading(false);
  }

  async function ejecutarEliminarBulk() {
    setBulkLoading(true);
    const ids = Array.from(selectedIds);
    await supabase.from("productos").delete().in("id", ids);
    setProductos((prev) => prev.filter((p) => !selectedIds.has(p.id)));
    setSelectedIds(new Set());
    setBulkLoading(false);
    setBulkDeleteModal(false);
    toast.success("Productos eliminados correctamente.");
  }

  const regenerateSlugs = async () => {
    setRegeneratingSlug(true);
    try {
      const res = await fetch("/api/admin/regenerate-slugs", { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      const msg = `${json.updated} slug${json.updated !== 1 ? "s" : ""} corregido${json.updated !== 1 ? "s" : ""}${json.skipped ? ` · ${json.skipped} omitido${json.skipped !== 1 ? "s" : ""} por duplicado` : ""}.`;
      toast.success(msg);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Error al regenerar slugs");
    } finally {
      setRegeneratingSlug(false);
    }
  };

  const downloadExcel = (data?: Producto[]) => {
    const toExport = data || productos.filter((p) => selectedIds.has(p.id));
    if (toExport.length === 0) return;

    const exportData = toExport.map((p) => ({
      nombre: p.nombre,
      marca: p.marca,
      categoria: p.categoria || "Fragancias",
      precio_venta: p.precio_venta || 0,
      porcentaje_recargo_lista: p.porcentaje_recargo_lista || DEFAULT_RECARGO_LISTA,
      stock: p.stock || 0,
      genero: p.genero || "Unisex",
      concentracion: p.concentracion || "EDP",
      volumen_ml: p.volumen_ml || 0,
      familia: p.familia_olfativa?.nombre || "",
      inspired_in: p.inspired_in || "",
      imagen_url: p.imagen_url || "",
      activo: p.activo ? "SI" : "NO",
      destacado: p.destacado ? "SI" : "NO",
      nuevo: p.nuevo ? "SI" : "NO",
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Productos");
    XLSX.writeFile(wb, `export_productos_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  function confirmarEliminar(id: string, nombre: string) {
    setDeleteModal({ isOpen: true, id, nombre });
  }

  async function ejecutarEliminar() {
    if (!deleteModal.id) return;
    setLoading(deleteModal.id);
    await supabase.from("productos").delete().eq("id", deleteModal.id);
    setProductos((prev) => prev.filter((p) => p.id !== deleteModal.id));
    setLoading(null);
    setDeleteModal({ isOpen: false, id: "", nombre: "" });
    toast.success("Producto eliminado.");
  }

  const catSeleccionada = categoriasDb.find(c => c.nombre === categoriaFiltrada);
  const subcategoriasParaCategoria = catSeleccionada
    ? subcategoriasDb.filter(s => s.categoria_id === catSeleccionada.id)
    : [];
  const subcategoriaNombreMap = new Map(subcategoriasDb.map(s => [s.id, s.nombre]));

  const productosFiltrados = productos.filter((p) => {
    // 1. Filtro por búsqueda
    const matchesBusqueda = !busqueda ||
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
      (p.inspired_in || "").toLowerCase().includes(busqueda.toLowerCase());

    // 2. Filtro por categoría
    const cat = p.categoria || "Fragancias";
    const matchesCategoria = !categoriaFiltrada || cat === categoriaFiltrada;

    // 3. Filtro por subcategoría
    const matchesSubcategoria = !subcategoriaFiltrada || (p as any).subcategoria_id === subcategoriaFiltrada;

    return matchesBusqueda && matchesCategoria && matchesSubcategoria;
  }).sort((a, b) => {
    if (!sortConfig) return 0;
    
    let aValue: any = a[sortConfig.key as keyof Producto];
    let bValue: any = b[sortConfig.key as keyof Producto];

    // Casos especiales para campos virtuales o anidados
    if (sortConfig.key === "categoria") {
      aValue = a.categoria || "Fragancias";
      bValue = b.categoria || "Fragancias";
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
          <div className="flex items-center gap-2 text-[#888888] text-xs mb-2">
            <Package size={14} /> TOTAL
          </div>
          <p className="text-white font-bold text-2xl">{currentStats.total}</p>
          <p className="text-[#555555] text-xs">productos</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
          <div className="flex items-center gap-2 text-[#D4AF37] text-xs mb-2">
            <Eye size={14} /> ACTIVOS
          </div>
          <p className="text-white font-bold text-2xl">{currentStats.activos}</p>
          <p className="text-[#555555] text-xs">publicados</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-5">
          <div className="flex items-center gap-2 text-orange-400 text-xs mb-2">
            <AlertTriangle size={14} /> SIN STOCK
          </div>
          <p className="text-white font-bold text-2xl">{currentStats.sinStock}</p>
          <p className="text-[#555555] text-xs">para reponer</p>
        </div>
      </div>

      {/* Toolbar — fila 1: filtros + importar/exportar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-3 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o marca..."
            className="bg-[#0D0D0D] border border-[#2D2D2D] text-white placeholder-[#555555] px-4 py-2.5 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm w-full sm:w-72"
          />
          <div className="w-full sm:w-44">
            <CustomSelect
              value={categoriaFiltrada}
              onChange={(val) => { setCategoriaFiltrada(val); setSubcategoriaFiltrada(""); }}
              options={[
                { value: "", label: "Ver Todo" },
                ...categoriasDb.map(c => ({ value: c.nombre, label: c.nombre })),
              ]}
              placeholder="Categoría"
            />
          </div>
          {subcategoriasParaCategoria.length > 0 && (
            <div className="w-full sm:w-40">
              <CustomSelect
                value={subcategoriaFiltrada}
                onChange={(val) => setSubcategoriaFiltrada(val)}
                options={[
                  { value: "", label: "Todas" },
                  ...subcategoriasParaCategoria.map(s => ({ value: s.id, label: s.nombre })),
                ]}
                placeholder="Subcategoría"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/dashboard/nuevo"
            className="flex items-center gap-2 bg-[#D4AF37] text-black font-bold px-5 py-2.5 text-sm tracking-wider hover:bg-[#E8CC6B] transition-colors whitespace-nowrap"
          >
            <Plus size={16} />
            Nuevo
          </Link>
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 bg-[#1A1A1A] text-white border border-[#2D2D2D] font-bold px-4 py-2.5 text-sm tracking-wider hover:bg-[#252525] transition-colors whitespace-nowrap group"
          >
            <div className="relative flex items-center">
              <FileSpreadsheet size={16} className="text-[#D4AF37]" />
              <ArrowDown size={10} className="text-white absolute -right-1 -bottom-1 bg-[#1A1A1A] rounded-full group-hover:translate-y-0.5 transition-transform" />
            </div>
            Importar
          </button>
          <button
            onClick={() => downloadExcel(productosFiltrados)}
            className="flex items-center gap-2 bg-[#1A1A1A] text-white border border-[#2D2D2D] font-bold px-4 py-2.5 text-sm tracking-wider hover:bg-[#252525] transition-colors whitespace-nowrap group"
          >
            <div className="relative flex items-center">
              <FileSpreadsheet size={16} className="text-[#D4AF37]" />
              <ArrowUp size={10} className="text-white absolute -right-1 -bottom-1 bg-[#1A1A1A] rounded-full group-hover:-translate-y-0.5 transition-transform" />
            </div>
            Exportar
          </button>
          <button
            onClick={regenerateSlugs}
            disabled={regeneratingSlug}
            title="Regenerar slugs de todos los productos"
            className="flex items-center gap-2 bg-[#1A1A1A] text-white border border-[#2D2D2D] font-bold px-4 py-2.5 text-sm tracking-wider hover:bg-[#252525] transition-colors whitespace-nowrap disabled:opacity-50"
          >
            <RefreshCw size={16} className={`text-[#D4AF37] ${regeneratingSlug ? "animate-spin" : ""}`} />
            Slugs
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-[#0D0D0D] border border-[#1A1A1A] overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1A1A1A] bg-black/30">
                <th className="px-4 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === productosFiltrados.length && productosFiltrados.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-[#2D2D2D] bg-black text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                </th>
                <th 
                  className="text-left text-[#555555] text-xs tracking-widest uppercase px-4 py-3 cursor-pointer hover:text-white transition-colors group"
                  onClick={() => handleSort("nombre")}
                >
                  <div className="flex items-center gap-2">
                    Producto
                    <span className={`transition-all ${sortConfig?.key === "nombre" ? "opacity-100 text-[#D4AF37]" : "opacity-30 text-white"}`}>
                      {sortConfig?.key === "nombre" && sortConfig.direction === "desc" ? <ArrowDown size={12} /> : <ArrowUp size={12} />}
                    </span>
                  </div>
                </th>
                <th 
                  className="text-left text-[#555555] text-xs tracking-widest uppercase px-4 py-3 hidden lg:table-cell cursor-pointer hover:text-white transition-colors group"
                  onClick={() => handleSort("categoria")}
                >
                  <div className="flex items-center gap-2">
                    Categoría
                    <span className={`transition-all ${sortConfig?.key === "categoria" ? "opacity-100 text-[#D4AF37]" : "opacity-30 text-white"}`}>
                      {sortConfig?.key === "categoria" && sortConfig.direction === "desc" ? <ArrowDown size={12} /> : <ArrowUp size={12} />}
                    </span>
                  </div>
                </th>
                {(!categoriaFiltrada || categoriaFiltrada === "Fragancias") && (
                  <th className="text-left text-[#555555] text-xs tracking-widest uppercase px-4 py-3 hidden sm:table-cell">Género</th>
                )}
                <th
                  className="text-right text-[#555555] text-xs tracking-widest uppercase px-4 py-3 cursor-pointer hover:text-white transition-colors group"
                  onClick={() => handleSort("precio_venta")}
                >
                  <div className="flex items-center justify-end gap-2">
                    Contado
                    <span className={`transition-all ${sortConfig?.key === "precio_venta" ? "opacity-100 text-[#D4AF37]" : "opacity-30 text-white"}`}>
                      {sortConfig?.key === "precio_venta" && sortConfig.direction === "desc" ? <ArrowDown size={12} /> : <ArrowUp size={12} />}
                    </span>
                  </div>
                </th>
                <th className="text-right text-[#555555] text-xs tracking-widest uppercase px-4 py-3 hidden md:table-cell">Lista (3 cuotas)</th>
                <th 
                  className="text-center text-[#555555] text-xs tracking-widest uppercase px-4 py-3 cursor-pointer hover:text-white transition-colors group"
                  onClick={() => handleSort("stock")}
                >
                  <div className="flex items-center justify-center gap-2">
                    Stock
                    <span className={`transition-all ${sortConfig?.key === "stock" ? "opacity-100 text-[#D4AF37]" : "opacity-30 text-white"}`}>
                      {sortConfig?.key === "stock" && sortConfig.direction === "desc" ? <ArrowDown size={12} /> : <ArrowUp size={12} />}
                    </span>
                  </div>
                </th>
                <th 
                  className="text-center text-[#555555] text-xs tracking-widest uppercase px-4 py-3 cursor-pointer hover:text-white transition-colors group"
                  onClick={() => handleSort("activo")}
                >
                  <div className="flex items-center justify-center gap-2">
                    Estado
                    <span className={`transition-all ${sortConfig?.key === "activo" ? "opacity-100 text-[#D4AF37]" : "opacity-30 text-white"}`}>
                      {sortConfig?.key === "activo" && sortConfig.direction === "desc" ? <ArrowDown size={12} /> : <ArrowUp size={12} />}
                    </span>
                  </div>
                </th>
                <th className="text-center text-[#555555] text-xs tracking-widest uppercase px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111111]">
              {productosFiltrados.map((producto) => {
                const precioLista = calculateListPrice(producto.precio_venta, producto.porcentaje_recargo_lista);

                return (
                  <tr
                    key={producto.id}
                    className={`hover:bg-[#111111] transition-colors ${!producto.activo ? "opacity-50" : ""} ${selectedIds.has(producto.id) ? "bg-[#D4AF37]/5" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(producto.id)}
                        onChange={() => toggleSelect(producto.id)}
                        className="w-4 h-4 rounded border-[#2D2D2D] bg-black text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {(producto.imagen_url || producto.imagenes_adicionales?.[0]) && (
                          <Image
                            src={producto.imagen_url || producto.imagenes_adicionales![0]}
                            alt={producto.nombre}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover shrink-0 hidden sm:block"
                          />
                        )}
                        <div>
                          <p className="text-white font-medium line-clamp-1">{producto.nombre}</p>
                          <p className="text-[#555555] text-xs">{producto.marca}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#888888] text-xs hidden lg:table-cell">
                      {producto.categoria || "Fragancias"}
                      {producto.subcategoria_id && subcategoriaNombreMap.get(producto.subcategoria_id) && (
                        <p className="text-[#555555] text-[10px]">
                          {subcategoriaNombreMap.get(producto.subcategoria_id)}
                        </p>
                      )}
                    </td>
                    {(!categoriaFiltrada || categoriaFiltrada === "Fragancias") && (
                      <td className="px-4 py-3 text-[#888888] text-xs hidden sm:table-cell">
                        {(producto.categoria?.toLowerCase() === "fragancias" && producto.genero) ? producto.genero : "—"}
                      </td>
                    )}
                    <td className="px-4 py-3 text-right text-[#D4AF37] font-semibold">
                      ${producto.precio_venta.toLocaleString("es-AR")}
                    </td>
                    <td className="px-4 py-3 text-right text-[#888888] hidden md:table-cell">
                      ${Math.round(precioLista).toLocaleString("es-AR")}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs font-bold ${producto.stock > 5 ? "text-green-400" : producto.stock > 0 ? "text-yellow-400" : "text-red-400"}`}>
                        {producto.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleActivo(producto.id, producto.activo)}
                        disabled={loading === producto.id}
                        className={`text-xs px-2 py-1 border transition-colors ${
                          producto.activo
                            ? "border-green-400/30 text-green-400 hover:bg-green-400/10"
                            : "border-[#333333] text-[#555555] hover:border-[#555555]"
                        }`}
                      >
                        {producto.activo ? "Activo" : "Oculto"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/productos/${producto.slug}`} target="_blank"
                          className="text-[#555555] hover:text-[#D4AF37] transition-colors" title="Ver en tienda">
                          <Eye size={14} />
                        </Link>
                        <Link href={`/dashboard/editar/${producto.id}`}
                          className="text-[#555555] hover:text-[#D4AF37] transition-colors" title="Editar">
                          <Edit2 size={14} />
                        </Link>
                        <button
                          onClick={() => confirmarEliminar(producto.id, producto.nombre)}
                          disabled={loading === producto.id}
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

          {productosFiltrados.length === 0 && (
            <div className="text-center py-12 text-[#555555]">
              <Package size={32} className="mx-auto mb-3 opacity-30" />
              <p>No hay productos que mostrar.</p>
            </div>
          )}
        </div>
      </div>

      <p className="text-[#333333] text-xs mt-4 text-center">
        {productosFiltrados.length} de {productos.length} productos
      </p>

      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] bg-[#1A1A1A] border border-[#D4AF37]/30 shadow-2xl px-6 py-4 flex items-center gap-6 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold text-sm">{selectedIds.size} seleccionados</span>
            <button onClick={() => setSelectedIds(new Set())} className="text-[#D4AF37] text-[10px] uppercase tracking-wider hover:underline">Desmarcar todos</button>
          </div>
          <div className="h-8 w-px bg-[#2D2D2D]" />
          <div className="flex items-center gap-3">
            <button 
              onClick={() => downloadExcel()}
              className="px-3 py-1.5 text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/20 hover:bg-[#D4AF37]/10 transition-colors flex items-center gap-2 group"
            >
              <div className="relative flex items-center">
                <FileSpreadsheet size={14} className="text-[#D4AF37]" />
                <ArrowUp size={8} className="text-white absolute -right-0.5 -bottom-0.5 bg-[#1A1A1A] rounded-full group-hover:-translate-y-0.5 transition-transform" />
              </div>
              Exportar
            </button>
            <button 
              onClick={() => bulkToggleActivo(true)}
              disabled={bulkLoading}
              className="px-3 py-1.5 text-xs font-bold text-green-400 border border-green-400/20 hover:bg-green-400/10 transition-colors"
            >
              Mostrar
            </button>
            <button 
              onClick={() => bulkToggleActivo(false)}
              disabled={bulkLoading}
              className="px-3 py-1.5 text-xs font-bold text-gray-400 border border-gray-400/20 hover:bg-gray-400/10 transition-colors"
            >
              Ocultar
            </button>

            <div className="h-6 w-px bg-[#2D2D2D] mx-1" />

            {/* Categoría Masiva */}
            <div className="relative">
              <button 
                onClick={() => setMenuBulkAbierto(menuBulkAbierto === "categoria" ? null : "categoria")}
                className={`px-3 py-1.5 text-xs font-bold border transition-colors ${menuBulkAbierto === "categoria" ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "text-[#D4AF37] border-[#D4AF37]/20 hover:bg-[#D4AF37]/10"}`}
              >
                Categoría
              </button>
              {menuBulkAbierto === "categoria" && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setMenuBulkAbierto(null)} />
                  <div className="absolute bottom-full left-0 mb-2 bg-[#111111] border border-[#2D2D2D] shadow-2xl p-2 min-w-[160px] animate-fade-in-up">
                    {categoriasDb.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          bulkUpdateField("categoria", cat.nombre);
                          setMenuBulkAbierto(null);
                        }}
                        className="w-full text-left px-3 py-2 text-[10px] text-[#888888] hover:text-white hover:bg-[#1A1A1A] transition-colors"
                      >
                        {cat.nombre}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Subcategoría Masiva */}
            <div className="relative">
              <button
                onClick={() => setMenuBulkAbierto(menuBulkAbierto === "subcategoria" ? null : "subcategoria")}
                className={`px-3 py-1.5 text-xs font-bold border transition-colors ${menuBulkAbierto === "subcategoria" ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "text-[#D4AF37] border-[#D4AF37]/20 hover:bg-[#D4AF37]/10"}`}
              >
                Subcategoría
              </button>
              {menuBulkAbierto === "subcategoria" && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setMenuBulkAbierto(null)} />
                  <div className="absolute bottom-full left-0 mb-2 bg-[#111111] border border-[#2D2D2D] shadow-2xl p-2 min-w-[200px] animate-fade-in-up max-h-72 overflow-y-auto">
                    {categoriasDb.map(cat => {
                      const subs = subcategoriasDb.filter(s => s.categoria_id === cat.id);
                      if (!subs.length) return null;
                      return (
                        <div key={cat.id}>
                          <p className="px-3 py-1 text-[9px] text-[#555555] uppercase tracking-widest font-bold">{cat.nombre}</p>
                          {subs.map(sub => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                bulkUpdateSubcategoria(sub.id, sub.categoria_id);
                                setMenuBulkAbierto(null);
                              }}
                              className="w-full text-left px-3 py-2 text-[10px] text-[#888888] hover:text-white hover:bg-[#1A1A1A] transition-colors pl-5"
                            >
                              {sub.nombre}
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Género Masivo */}
            <div className="relative">
              <button 
                onClick={() => setMenuBulkAbierto(menuBulkAbierto === "genero" ? null : "genero")}
                className={`px-3 py-1.5 text-xs font-bold border transition-colors ${menuBulkAbierto === "genero" ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "text-[#D4AF37] border-[#D4AF37]/20 hover:bg-[#D4AF37]/10"}`}
              >
                Género
              </button>
              {menuBulkAbierto === "genero" && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setMenuBulkAbierto(null)} />
                  <div className="absolute bottom-full left-0 mb-2 bg-[#111111] border border-[#2D2D2D] shadow-2xl p-2 min-w-[120px] animate-fade-in-up">
                    {["Femenino", "Masculino", "Unisex", "No aplica"].map(gen => (
                      <button
                        key={gen}
                        onClick={() => {
                          bulkUpdateField("genero", gen);
                          setMenuBulkAbierto(null);
                        }}
                        className="w-full text-left px-3 py-2 text-[10px] text-[#888888] hover:text-white hover:bg-[#1A1A1A] transition-colors"
                      >
                        {gen}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setPrecioModal({ open: true, venta: "", porcentajeRecargo: "" })}
              className="px-3 py-1.5 text-xs font-bold text-blue-400 border border-blue-400/20 hover:bg-blue-400/10 transition-colors"
            >
              Precio
            </button>
            <button
              onClick={() => setBulkDeleteModal(true)}
              disabled={bulkLoading}
              className="px-3 py-1.5 text-xs font-bold text-red-400 border border-red-400/20 hover:bg-red-400/10 transition-colors flex items-center gap-2"
            >
              <Trash2 size={12} />
              Eliminar
            </button>
          </div>
          <div className="h-8 w-px bg-[#2D2D2D]" />
          <button
            onClick={() => setSelectedIds(new Set())}
            className="text-[#555555] hover:text-white transition-colors p-1"
            title="Cerrar"
          >
            <X size={16} />
          </button>
          {bulkLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[1px]">
              <div className="w-5 h-5 border-2 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin" />
            </div>
          )}
        </div>
      )}

      {/* Modal eliminación unitaria */}
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

      {/* Modal eliminación masiva */}
      {bulkDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0A0A] border border-[#2D2D2D] w-full max-w-md p-6 md:p-8">
            <div className="flex items-center gap-3 text-red-500 mb-4">
              <AlertTriangle size={24} />
              <h2 className="font-serif text-xl text-white">Eliminación Masiva</h2>
            </div>
            <p className="text-[#888888] text-sm mb-6 leading-relaxed">
              ¿Estás seguro que deseas eliminar <strong className="text-white">{selectedIds.size} productos</strong> seleccionados? Esta acción es permanente y afectará a todo el catálogo.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setBulkDeleteModal(false)}
                className="flex-1 px-4 py-2.5 text-sm text-[#888888] hover:text-white border border-[#2D2D2D] hover:bg-[#1A1A1A] transition-colors"
                disabled={bulkLoading}
              >
                Cancelar
              </button>
              <button
                onClick={ejecutarEliminarBulk}
                disabled={bulkLoading}
                className="flex-1 px-4 py-2.5 text-sm text-white bg-red-600/90 hover:bg-red-500 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {bulkLoading ? (
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
                Eliminar {selectedIds.size} {selectedIds.size === 1 ? 'producto' : 'productos'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Actualización Masiva de Precios */}
      {precioModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0A0A0A] border border-[#2D2D2D] w-full max-w-sm p-6 md:p-8">
            <h2 className="font-serif text-xl text-white mb-1">Actualizar precios</h2>
            <p className="text-[#555555] text-xs mb-6">
              {selectedIds.size} producto{selectedIds.size !== 1 ? "s" : ""} seleccionado{selectedIds.size !== 1 ? "s" : ""}. Dejá en blanco el campo que no querés modificar.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-[#888888] text-xs uppercase tracking-widest mb-1.5">Precio Contado (Efectivo/Transferencia)</label>
                <input
                  type="number"
                  value={precioModal.venta}
                  onChange={(e) => setPrecioModal(prev => ({ ...prev, venta: e.target.value }))}
                  placeholder="Precio nuevo..."
                  className="w-full bg-[#111] border border-[#2D2D2D] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[#888888] text-xs uppercase tracking-widest mb-1.5">Recargo 3 Cuotas (%)</label>
                <input
                  type="number"
                  value={precioModal.porcentajeRecargo}
                  onChange={(e) => setPrecioModal(prev => ({ ...prev, porcentajeRecargo: e.target.value }))}
                  placeholder={DEFAULT_RECARGO_LISTA.toString()}
                  className="w-full bg-[#111] border border-[#2D2D2D] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </div>
              {precioModal.venta && (
                <p className="text-[#D4AF37] text-xs">
                  Precio de lista: $
                  {Math.round(
                    calculateListPrice(
                      Number(precioModal.venta),
                      precioModal.porcentajeRecargo ? parseFloat(precioModal.porcentajeRecargo) : undefined
                    )
                  ).toLocaleString("es-AR")}
                </p>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setPrecioModal({ open: false, venta: "", porcentajeRecargo: "" })}
                className="flex-1 px-4 py-2.5 text-sm text-[#888888] hover:text-white border border-[#2D2D2D] hover:bg-[#1A1A1A] transition-colors"
                disabled={bulkLoading}
              >
                Cancelar
              </button>
              <button
                onClick={bulkUpdatePrecios}
                disabled={bulkLoading || (!precioModal.venta && !precioModal.porcentajeRecargo)}
                className="flex-1 px-4 py-2.5 text-sm font-bold bg-[#D4AF37] text-black hover:bg-[#E8CC6B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {bulkLoading ? <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> : null}
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Importación Excel */}
      <BulkImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSuccess={() => {
          fetchProductos();
          router.refresh();
        }}
      />
    </>
  );
}
