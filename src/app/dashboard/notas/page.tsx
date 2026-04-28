import { createClient } from "@/lib/supabase/server";
import { NotaAromatica } from "@/types";
import NotasClient from "@/components/dashboard/NotasClient";

export default async function NotasPage() {
  const supabase = await createClient();
  const { data: notas } = await supabase
    .from("notas_aromaticas")
    .select("*")
    .order("categoria")
    .order("nombre");

  return <NotasClient notas={(notas as NotaAromatica[]) || []} />;
}
