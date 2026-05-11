import { createClient } from "@/lib/supabase/server";
import { Producto, Vendedora } from "@/types";
import DashboardClient from "@/components/dashboard/DashboardClient";
import BirthdayAlert from "@/components/dashboard/BirthdayAlert";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: productos } = await supabase
    .from("productos")
    .select("*, familia_olfativa:familias_olfativas(*)")
    .order("created_at", { ascending: false });

  const { data: vendedoras } = await supabase
    .from("vendedoras")
    .select("*")
    .eq("activo", true);

  return (
    <>
      <BirthdayAlert vendedoras={(vendedoras as Vendedora[]) || []} />
      <DashboardClient productos={(productos as Producto[]) || []} />
    </>
  );
}
