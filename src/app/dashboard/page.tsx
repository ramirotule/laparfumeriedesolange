import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Perfume } from "@/types";
import DashboardClient from "@/components/dashboard/DashboardClient";

async function getDashboardData() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Verificar que sea admin
  const { data: perfil } = await supabase
    .from("perfiles")
    .select("rol")
    .eq("id", user.id)
    .single();

  if (!perfil || perfil.rol !== "admin") {
    // Cerrar sesión y mandar al login para evitar loop
    await supabase.auth.signOut();
    redirect("/login");
  }

  const { data: perfumes } = await supabase
    .from("perfumes")
    .select("*, familia_olfativa:familias_olfativas(*)")
    .order("created_at", { ascending: false });

  const { data: statsData } = await supabase
    .from("perfumes")
    .select("activo, stock, precio_venta, precio_costo");

  const stats = {
    total: statsData?.length || 0,
    activos: statsData?.filter((p) => p.activo).length || 0,
    sinStock: statsData?.filter((p) => p.stock === 0).length || 0,
    valorInventario:
      statsData?.reduce((sum, p) => sum + (p.precio_costo || 0) * p.stock, 0) || 0,
    margenPromedio: (() => {
      const conCosto = statsData?.filter((p) => p.precio_costo && p.precio_costo > 0) || [];
      if (conCosto.length === 0) return 0;
      const totalMargen = conCosto.reduce(
        (sum, p) => sum + ((p.precio_venta - p.precio_costo) / p.precio_venta) * 100,
        0
      );
      return Math.round(totalMargen / conCosto.length);
    })(),
  };

  return { perfumes: (perfumes as Perfume[]) || [], stats, user };
}

export default async function DashboardPage() {
  const { perfumes, stats, user } = await getDashboardData();

  return <DashboardClient perfumes={perfumes} stats={stats} user={user} />;
}
