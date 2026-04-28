import { createClient } from "@/lib/supabase/server";
import DatosBancariosClient from "@/components/dashboard/DatosBancariosClient";

export default async function DatosBancariosPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("configuracion")
    .select("clave, valor")
    .in("clave", ["cbu", "alias_cbu", "titular", "banco"]);

  const config: Record<string, string> = {};
  (data || []).forEach((row: { clave: string; valor: string }) => {
    config[row.clave] = row.valor;
  });

  return <DatosBancariosClient config={config} />;
}
