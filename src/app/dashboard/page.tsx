import { createClient } from "@/lib/supabase/server";
import { Producto, Vendedora } from "@/types";
import DashboardClient from "@/components/dashboard/DashboardClient";
import BirthdayAlert from "@/components/dashboard/BirthdayAlert";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { data: rawProductos },
    { data: categorias },
    { data: vendedoras }
  ] = await Promise.all([
    supabase.from("productos").select("*, familia_olfativa:familias_olfativas(*)").order("created_at", { ascending: false }),
    supabase.from("categorias").select("id, nombre"),
    supabase.from("vendedoras").select("*").eq("activo", true)
  ]);

  const catMap = new Map(categorias?.map(c => [c.id.toString(), c.nombre]) || []);
  
  const productos = (rawProductos as any[] || []).map(p => ({
    ...p,
    categoria: p.categoria_id ? (catMap.get(p.categoria_id.toString()) || "Fragancias") : (p.categoria || "Fragancias")
  }));

  return (
    <>
      <BirthdayAlert vendedoras={(vendedoras as Vendedora[]) || []} />
      <DashboardClient productos={productos as Producto[]} />
    </>
  );
}
