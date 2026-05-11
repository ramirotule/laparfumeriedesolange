"use client";

import { useState, useEffect } from "react";
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
  ShoppingBag,
  Bell,
  Cake,
  Trash2,
  ChevronRight,
  Info
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
    href: "/dashboard/pedidos",
    label: "Pedidos",
    icon: ShoppingBag,
    match: (p: string) => p.startsWith("/dashboard/pedidos"),
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
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [birthdays, setBirthdays] = useState<any[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  // Cargar notificaciones descartadas del localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dismissed_notifications");
    if (saved) setDismissedIds(JSON.parse(saved));
  }, []);

  const dismissNotification = (id: string) => {
    const updated = [...dismissedIds, id];
    setDismissedIds(updated);
    localStorage.setItem("dismissed_notifications", JSON.stringify(updated));
  };

  // Fetch pending orders and birthdays
  useEffect(() => {
    const fetchPending = async () => {
      const { data } = await supabase
        .from("pedidos")
        .select("*")
        .eq("estado", "pendiente")
        .order("created_at", { ascending: false });
      setPendingOrders(data || []);
    };

    const fetchBirthdays = async () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      
      const { data } = await supabase
        .from("vendedoras")
        .select("id, nombre, apellido, fecha_nacimiento")
        .eq("activo", true);
      
      if (data) {
        const todayBirthdays = data.filter(v => {
          if (!v.fecha_nacimiento) return false;
          const bday = new Date(v.fecha_nacimiento);
          return (bday.getUTCMonth() + 1) === month && bday.getUTCDate() === day;
        });
        setBirthdays(todayBirthdays);
      }
    };

    fetchPending();
    fetchBirthdays();

    // Subscribe to changes
    const channel = supabase
      .channel("dashboard_notifications")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "pedidos" },
        () => fetchPending()
      )
      .subscribe();

    // Escuchar evento manual de refresco
    const handleManualRefresh = () => {
      fetchPending();
      fetchBirthdays();
    };
    window.addEventListener('refresh-orders-count', handleManualRefresh);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('refresh-orders-count', handleManualRefresh);
    };
  }, [supabase]);

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

          <div className="flex items-center gap-4 ml-auto md:ml-0">
            {/* Campanita de Notificaciones */}
            <button
              onClick={() => setNotificationsOpen(true)}
              className="relative p-2 text-[#888888] hover:text-[#D4AF37] transition-colors group"
            >
              <Bell size={20} className={(pendingOrders.length + birthdays.length) > 0 ? "animate-pulse" : ""} />
              {(pendingOrders.filter(o => !dismissedIds.includes(o.id)).length + 
                birthdays.filter(b => !dismissedIds.includes(`bday-${b.id}`)).length) > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-black">
                  {pendingOrders.filter(o => !dismissedIds.includes(o.id)).length + 
                   birthdays.filter(b => !dismissedIds.includes(`bday-${b.id}`)).length}
                </span>
              )}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-[#2D2D2D] hover:border-red-500/50 text-[#888888] hover:text-red-400 hover:bg-red-500/5 text-xs px-3 py-2 transition-all duration-200"
            >
              <LogOut size={13} />
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        {/* CENTRO DE NOTIFICACIONES (Slide-over) */}
        {notificationsOpen && (
          <div className="fixed inset-0 z-[100] overflow-hidden">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
              onClick={() => setNotificationsOpen(false)} 
            />
            
            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <div className="w-screen max-w-md transform transition-transform duration-300 ease-in-out bg-[#0D0D0D] border-l border-[#1A1A1A] shadow-2xl flex flex-col">
                {/* Header */}
                <div className="px-6 py-5 border-b border-[#1A1A1A] flex items-center justify-between bg-black">
                  <div>
                    <h2 className="text-white font-bold text-base tracking-widest uppercase flex items-center gap-2">
                      <Bell size={18} className="text-[#D4AF37]" />
                      Centro de Novedades
                    </h2>
                    <p className="text-[#555555] text-[10px] uppercase tracking-widest mt-0.5">
                      Panel de control administrativo
                    </p>
                  </div>
                  <button 
                    onClick={() => setNotificationsOpen(false)}
                    className="p-2 text-[#555555] hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Cumpleaños */}
                  {birthdays.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                        <Cake size={12} /> Cumpleaños de hoy
                      </h3>
                      <div className="space-y-2">
                        {birthdays.map(b => (
                          !dismissedIds.includes(`bday-${b.id}`) && (
                            <div key={`bday-${b.id}`} className="bg-black/40 border border-[#2D2D2D] p-4 rounded group relative">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex gap-3">
                                  <div className="mt-1 w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500">
                                    <Cake size={16} />
                                  </div>
                                  <div>
                                    <p className="text-white text-sm font-medium">¡Hoy cumple {b.nombre}!</p>
                                    <p className="text-[#888888] text-xs mt-0.5">No olvides saludar a {b.nombre} {b.apellido} en su día.</p>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => dismissNotification(`bday-${b.id}`)}
                                  className="text-[#333333] hover:text-white transition-colors"
                                  title="Ocultar"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pedidos */}
                  <div className="space-y-3">
                    <h3 className="text-[#555555] text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
                      <ShoppingBag size={12} /> Pedidos Pendientes
                    </h3>
                    <div className="space-y-2">
                      {pendingOrders.length === 0 ? (
                        <div className="bg-[#111111]/30 border border-dashed border-[#2D2D2D] p-8 text-center rounded">
                          <ShoppingBag size={24} className="mx-auto mb-2 text-[#2D2D2D]" />
                          <p className="text-[#555555] text-xs">No hay pedidos pendientes por procesar.</p>
                        </div>
                      ) : (
                        pendingOrders.map(order => (
                          !dismissedIds.includes(order.id) && (
                            <div key={order.id} className="bg-black/40 border border-[#2D2D2D] p-4 rounded hover:border-[#D4AF37]/30 transition-all group relative">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex gap-3">
                                  <div className="mt-1 w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                                    <ShoppingBag size={16} />
                                  </div>
                                  <div>
                                    <p className="text-white text-sm font-medium">Pedido #{order.numero_pedido}</p>
                                    <p className="text-[#888888] text-xs mt-0.5">Monto total: <span className="text-[#D4AF37]">${order.total.toLocaleString()}</span></p>
                                    <p className="text-[#555555] text-[10px] mt-2 italic">Hacé clic para gestionar</p>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <button 
                                    onClick={() => dismissNotification(order.id)}
                                    className="text-[#333333] hover:text-white transition-colors"
                                    title="Descartar aviso"
                                  >
                                    <X size={14} />
                                  </button>
                                  <Link 
                                    href="/dashboard/pedidos"
                                    onClick={() => setNotificationsOpen(false)}
                                    className="text-[#555555] hover:text-[#D4AF37] transition-colors"
                                  >
                                    <ChevronRight size={18} />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          )
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[#1A1A1A] bg-black">
                  <button 
                    onClick={() => {
                      const allIds = [
                        ...pendingOrders.map(o => o.id),
                        ...birthdays.map(b => `bday-${b.id}`)
                      ];
                      setDismissedIds(allIds);
                      localStorage.setItem("dismissed_notifications", JSON.stringify(allIds));
                    }}
                    className="w-full py-3 border border-[#2D2D2D] text-[#888888] hover:text-white hover:border-[#D4AF37] transition-all text-xs uppercase tracking-[0.2em] font-bold"
                  >
                    Marcar todas como leídas
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
