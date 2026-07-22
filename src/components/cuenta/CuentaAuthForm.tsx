"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

interface Props {
  mode: "login" | "register";
}

export default function CuentaAuthForm({ mode }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/cuenta";
  const authError = searchParams.get("error") === "auth";

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(authError ? "No se pudo completar el inicio con Google. Intentá nuevamente." : "");
  const [success, setSuccess] = useState("");

  const supabase = createClient();
  const isRegister = mode === "register";

  async function handleGoogleAuth() {
    setGoogleLoading(true);
    setError("");

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirect)}`,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
      setGoogleLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (isRegister) {
      if (!nombre.trim() || !apellido.trim()) {
        setError("Completá nombre y apellido.");
        setLoading(false);
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${nombre.trim()} ${apellido.trim()}`,
            nombre: nombre.trim(),
            apellido: apellido.trim(),
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirect)}`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data.user && !data.session) {
        setSuccess("Te enviamos un email para confirmar tu cuenta. Revisá tu bandeja de entrada.");
        setLoading(false);
        return;
      }

      if (data.user) {
        await supabase.from("perfiles").upsert({
          id: data.user.id,
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          rol: "cliente",
        });
      }

      router.push(redirect);
      router.refresh();
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Email o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
  }

  return (
    <div className="min-h-[70vh] bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#555555] hover:text-[#D4AF37] transition-colors text-[10px] tracking-[0.2em] uppercase mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Volver a la tienda
        </Link>

        <div className="text-center mb-8">
          <span className="text-[#D4AF37] font-serif text-2xl tracking-[0.15em] font-bold">
            LA PARFUMERIE
          </span>
          <p className="text-[#555555] text-xs tracking-[0.3em] uppercase mt-1">
            {isRegister ? "Crear cuenta" : "Mi cuenta"}
          </p>
        </div>

        <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-8 space-y-5">
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-3 text-sm hover:bg-gray-100 transition-colors disabled:opacity-60"
          >
            {googleLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Continuar con Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#1A1A1A]" />
            <span className="text-[#555555] text-[10px] uppercase tracking-widest">o</span>
            <div className="flex-1 h-px bg-[#1A1A1A]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#888888] text-xs tracking-widest uppercase block mb-2">
                    Nombre
                  </label>
                  <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="text-[#888888] text-xs tracking-widest uppercase block mb-2">
                    Apellido
                  </label>
                  <input
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                    className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[#888888] text-xs tracking-widest uppercase block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
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
                  minLength={6}
                  className="w-full bg-[#1A1A1A] border border-[#2D2D2D] text-white px-4 py-3 pr-11 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm"
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

            {success && (
              <p className="text-green-400 text-xs bg-green-400/10 border border-green-400/20 px-3 py-2">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-[#D4AF37] text-black font-bold py-3 tracking-widest text-sm uppercase hover:bg-[#E8CC6B] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {isRegister ? "Crear cuenta" : "Ingresar"}
            </button>
          </form>

          <p className="text-center text-[#555555] text-xs">
            {isRegister ? (
              <>
                ¿Ya tenés cuenta?{" "}
                <Link
                  href={`/cuenta/ingresar?redirect=${encodeURIComponent(redirect)}`}
                  className="text-[#D4AF37] hover:underline"
                >
                  Ingresá acá
                </Link>
              </>
            ) : (
              <>
                ¿No tenés cuenta?{" "}
                <Link
                  href={`/cuenta/registro?redirect=${encodeURIComponent(redirect)}`}
                  className="text-[#D4AF37] hover:underline"
                >
                  Registrate
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
