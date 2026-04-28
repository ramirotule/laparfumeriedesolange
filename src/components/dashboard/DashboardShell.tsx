"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Package,
  Users,
  Sparkles,
  Building2,
  UserCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const NAV = [
  {
    href: "/dashboard",
    label: "Productos",
    icon: Package,
    match: (p: string) =>
      p === "/dashboard" ||
      p.startsWith("/dashboard/nuevo") ||
      p.startsWith("/dashboard/editar"),
  },
  {
    href: "/dashboard/vendedoras",
    label: "Vendedoras",
    icon: Users,
    match: (p: string) => p.startsWith("/dashboard/vendedoras"),
  },
  {
    href: "/dashboard/notas",
    label: "Notas Aromáticas",
    icon: Sparkles,
    match: (p: string) => p.startsWith("/dashboard/notas"),
  },
  {
    href: "/dashboard/datos-bancarios",
    label: "Datos Bancarios",
    icon: Building2,
    match: (p: string) => p.startsWith("/dashboard/datos-bancarios"),
  },
  {
    href: "/dashboard/mis-datos",
    label: "Mis Datos",
    icon: UserCircle,
    match: (p: string) => p.startsWith("/dashboard/mis-datos"),
  },
];

interface Props {
  user: { email?: string };
  nombreCompleto: string;
  children: React.ReactNode;
}

export default function DashboardShell({ user, nombreCompleto, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  // Nombre a mostrar: nombre_completo o primer parte del email
  const displayName = nombreCompleto || user.email?.split("@")[0] || "Admin";

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo (sin link) */}
      <div className="px-5 pt-5 pb-4 border-b border-[#1A1A1A]">
        <Image
          src="/logo.png"
          alt="La Parfumerie de Solange"
          width={80}
          height={80}
          className="h-9 w-auto object-contain mb-4"
        />

        {/* Bienvenida */}
        <p className="text-[#555555] text-[10px] tracking-[0.2em] uppercase">
          Bienvenida
        </p>
        <p className="text-[#D4AF37] text-sm font-semibold mt-0.5 leading-tight truncate">
          {displayName}
        </p>
        <p className="text-[#2D2D2D] text-[10px] tracking-widest uppercase mt-1">
          Dashboard
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-150 ${
                active
                  ? "bg-[#D4AF37]/10 border-l-2 border-[#D4AF37] text-[#D4AF37] pl-2.5"
                  : "text-[#888888] hover:text-white hover:bg-[#111111] border-l-2 border-transparent"
              }`}
            >
              <Icon size={15} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Email al pie */}
      <div className="px-5 py-4 border-t border-[#1A1A1A]">
        <p className="text-[#333333] text-xs truncate">{user.email}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-56 shrink-0 bg-black border-r border-[#1A1A1A] fixed top-0 left-0 h-full z-30">
        {sidebarContent}
      </aside>

      {/* Sidebar mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar mobile panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-black border-r border-[#1A1A1A] z-50 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-[#555555] hover:text-white"
        >
          <X size={18} />
        </button>
        {sidebarContent}
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-56">
        {/* Top bar (desktop + mobile) */}
        <header className="bg-black border-b border-[#1A1A1A] px-4 py-3 flex items-center justify-between">
          {/* Mobile: hamburger + logo */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-[#888888] hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
            <Image
              src="/logo.png"
              alt="La Parfumerie"
              width={60}
              height={60}
              className="h-7 w-auto object-contain"
            />
          </div>

          {/* Desktop: nombre a la izquierda */}
          <p className="hidden md:block text-[#555555] text-xs truncate">
            {displayName}
          </p>

          {/* Logout — siempre a la derecha */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-[#2D2D2D] hover:border-red-500/50 text-[#888888] hover:text-red-400 hover:bg-red-500/5 text-xs px-3 py-2 transition-all duration-200 ml-auto md:ml-0"
          >
            <LogOut size={13} />
            Cerrar sesión
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
