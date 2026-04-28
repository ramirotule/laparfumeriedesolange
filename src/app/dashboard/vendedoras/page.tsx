import { createClient } from "@/lib/supabase/server";
import { Vendedora } from "@/types";
import VendedorasClient from "@/components/dashboard/VendedorasClient";

export default async function VendedorasPage() {
  const supabase = await createClient();
  const { data: vendedoras } = await supabase
    .from("vendedoras")
    .select("*")
    .order("created_at", { ascending: false });

  return <VendedorasClient vendedoras={(vendedoras as Vendedora[]) || []} />;
}
