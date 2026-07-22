"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Phone, MapPin, LogOut, Save, Loader2, ShoppingBag } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { TIPO_ENTREGA_LABELS, type TipoEntrega } from "@/lib/shipping";

interface Perfil {
  nombre: string | null;
  apellido: string | null;
  telefono: string | null;
  direccion: string | null;
  localidad: string | null;
  provincia: string | null;
}

interface PedidoResumen {
  id: string;
  numero_pedido: string;
  total: number;
  estado: string;
  tipo_entrega: TipoEntrega | null;
  created_at: string;
}

interface Props {
  email: string;
  perfil: Perfil | null;
  pedidos: PedidoResumen[];
}

export default function CuentaClient({ email, perfil, pedidos }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    nombre: perfil?.nombre || "",
    apellido: perfil?.apellido || "",
    telefono: perfil?.telefono || "",
    direccion: perfil?.direccion || "",
    localidad: perfil?.localidad || "",
    provincia: perfil?.provincia || "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSaved(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/cuenta/ingresar");
      return;
    }

    const { error: updateError } = await supabase.from("perfiles").upsert({
      id: user.id,
      nombre: form.nombre.trim() || null,
      apellido: form.apellido.trim() || null,
      telefono: form.telefono.trim() || null,
      direccion: form.direccion.trim() || null,
      localidad: form.localidad.trim() || null,
      provincia: form.provincia.trim() || null,
      rol: "cliente",
    });

    setLoading(false);
    if (updateError) {
      setError("No se pudieron guardar los datos.");
      return;
    }
    setSaved(true);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-white mb-1">Mi cuenta</h1>
          <p className="text-[#888888] text-sm">{email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[#888888] hover:text-red-400 text-xs uppercase tracking-wider transition-colors"
        >
          <LogOut size={14} />
          Salir
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-[#0D0D0D] border border-[#1A1A1A] p-6 mb-8 space-y-4">
        <h2 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
          <User size={14} className="text-[#D4AF37]" />
          Mis datos
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5">Nombre</label>
            <input
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full bg-black border border-[#1A1A1A] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5">Apellido</label>
            <input
              value={form.apellido}
              onChange={(e) => setForm({ ...form, apellido: e.target.value })}
              className="w-full bg-black border border-[#1A1A1A] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Phone size={12} /> Teléfono / WhatsApp
          </label>
          <input
            value={form.telefono}
            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            className="w-full bg-black border border-[#1A1A1A] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <MapPin size={12} /> Dirección habitual
          </label>
          <input
            value={form.direccion}
            onChange={(e) => setForm({ ...form, direccion: e.target.value })}
            className="w-full bg-black border border-[#1A1A1A] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5">Localidad</label>
            <input
              value={form.localidad}
              onChange={(e) => setForm({ ...form, localidad: e.target.value })}
              className="w-full bg-black border border-[#1A1A1A] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
          <div>
            <label className="block text-gray-500 text-xs uppercase tracking-wider mb-1.5">Provincia</label>
            <input
              value={form.provincia}
              onChange={(e) => setForm({ ...form, provincia: e.target.value })}
              className="w-full bg-black border border-[#1A1A1A] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        {error && <p className="text-red-400 text-xs">{error}</p>}
        {saved && <p className="text-green-400 text-xs">Datos guardados correctamente.</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-[#D4AF37] text-black font-bold px-6 py-2.5 text-xs uppercase tracking-wider hover:bg-[#E8CC6B] transition-colors disabled:opacity-60"
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Guardar cambios
        </button>
      </form>

      <section>
        <h2 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
          <ShoppingBag size={14} className="text-[#D4AF37]" />
          Mis pedidos
        </h2>

        {pedidos.length === 0 ? (
          <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-8 text-center">
            <p className="text-[#555555] text-sm mb-4">Todavía no hiciste ningún pedido.</p>
            <Link
              href="/productos"
              className="text-[#D4AF37] text-xs uppercase tracking-wider hover:underline"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {pedidos.map((pedido) => (
              <li key={pedido.id} className="bg-[#0D0D0D] border border-[#1A1A1A] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-white font-mono text-sm">#{pedido.numero_pedido}</p>
                  <p className="text-[#555555] text-xs mt-1">
                    {new Date(pedido.created_at).toLocaleDateString("es-AR")}
                    {pedido.tipo_entrega && (
                      <> · {TIPO_ENTREGA_LABELS[pedido.tipo_entrega]}</>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#D4AF37] font-bold">
                    ${pedido.total.toLocaleString("es-AR")}
                  </span>
                  <Link
                    href={`/checkout/confirmacion?id=${pedido.id}`}
                    className="text-[#888888] hover:text-white text-xs uppercase tracking-wider"
                  >
                    Ver detalle
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
