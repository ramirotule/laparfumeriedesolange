"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Building2, Save, CheckCircle } from "lucide-react";

interface Props {
  config: Record<string, string>;
}

export default function DatosBancariosClient({ config: initial }: Props) {
  const [form, setForm] = useState({
    cbu: initial.cbu || "",
    alias_cbu: initial.alias_cbu || "",
    titular: initial.titular || "",
    banco: initial.banco || "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const entries = Object.entries(form).map(([clave, valor]) => ({
      clave,
      valor,
      updated_at: new Date().toISOString(),
    }));

    const { error: err } = await supabase
      .from("configuracion")
      .upsert(entries, { onConflict: "clave" });

    setLoading(false);
    if (err) { setError(err.message); return; }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const field = (key: keyof typeof form, label: string, placeholder: string) => (
    <div>
      <label className="block text-[#888888] text-xs uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full bg-[#0D0D0D] border border-[#2D2D2D] text-white px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <>
      <div className="mb-8">
        <p className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-1">Dashboard</p>
        <h1 className="text-white text-2xl font-serif">Datos Bancarios</h1>
        <p className="text-[#555555] text-sm mt-1">
          Estos datos se muestran al cliente cuando elige pagar por transferencia.
        </p>
      </div>

      <div className="max-w-lg">
        <form onSubmit={handleSubmit} className="bg-[#0D0D0D] border border-[#1A1A1A] p-6 space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-[#1A1A1A]">
            <Building2 size={18} className="text-[#D4AF37]" />
            <h2 className="text-white text-sm font-semibold tracking-wider uppercase">Cuenta bancaria</h2>
          </div>

          {field("titular", "Titular de la cuenta", "Nombre completo o razón social")}
          {field("banco", "Banco", "Ej: Banco Nación, Brubank, Mercado Pago...")}
          {field("cbu", "CBU", "22 dígitos")}
          {field("alias_cbu", "Alias CBU", "Ej: LAPARFUMERIE.SOLANGE")}

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-[#D4AF37] text-black font-bold px-6 py-3 text-sm tracking-wider hover:bg-[#E8CC6B] transition-colors disabled:opacity-50 w-full justify-center"
          >
            {saved ? (
              <><CheckCircle size={16} /> Guardado</>
            ) : loading ? (
              <><span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" /> Guardando...</>
            ) : (
              <><Save size={16} /> Guardar datos</>
            )}
          </button>
        </form>

        <div className="mt-4 bg-[#0D0D0D] border border-[#1A1A1A] p-4">
          <p className="text-[#555555] text-xs mb-3 uppercase tracking-wider">Vista previa — Confirmación de pedido</p>
          <div className="space-y-2 text-sm">
            {[
              ["Titular", form.titular || "—"],
              ["Banco", form.banco || "—"],
              ["CBU", form.cbu || "—"],
              ["Alias", form.alias_cbu || "—"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-[#111111] pb-2">
                <span className="text-[#888888]">{k}</span>
                <span className="text-white font-mono text-xs">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
