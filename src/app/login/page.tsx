"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Credenciales incorrectas. Verificá tu email y contraseña.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#555555] hover:text-[#D4AF37] transition-colors text-[10px] tracking-[0.2em] uppercase mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Volver a la tienda
        </Link>

        <div className="text-center mb-10">
          <span className="text-[#D4AF37] font-serif text-2xl tracking-[0.15em] font-bold">
            LA PARFUMERIE
          </span>
          <p className="text-[#555555] text-xs tracking-[0.3em] uppercase mt-1">Panel Admin</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-[#0D0D0D] border border-[#1A1A1A] p-8 space-y-5"
        >
          <h1 className="text-white font-serif text-xl mb-6">Acceso Administrativo</h1>

          <div>
            <label className="text-[#888888] text-xs tracking-widest uppercase block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white placeholder-[#555555] px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
              placeholder="admin@laparfumerie.com"
            />
          </div>

          <div>
            <label className="text-[#888888] text-xs tracking-widest uppercase block mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white placeholder-[#555555] px-4 py-3 pr-11 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555] hover:text-[#D4AF37] transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-400/10 border border-red-400/20 px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black font-bold py-3 tracking-widest text-sm uppercase hover:bg-[#E8CC6B] transition-colors disabled:opacity-70"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
