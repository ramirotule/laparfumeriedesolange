import { createClient } from "@/lib/supabase/server";
import { Perfume, Vendedora } from "@/types";
import DashboardClient from "@/components/dashboard/DashboardClient";
import BirthdayAlert from "@/components/dashboard/BirthdayAlert";

export default async function DashboardPage() {
  const supabase = await createClient();

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
      const total = conCosto.reduce(
        (sum, p) => sum + ((p.precio_venta - p.precio_costo) / p.precio_venta) * 100,
        0
      );
      return Math.round(total / conCosto.length);
    })(),
  };

  const { data: vendedoras } = await supabase
    .from("vendedoras")
    .select("*")
    .eq("activo", true);

  return (
    <>
      <BirthdayAlert vendedoras={(vendedoras as Vendedora[]) || []} />
      <DashboardClient perfumes={(perfumes as Perfume[]) || []} stats={stats} />
    </>
  );
}
