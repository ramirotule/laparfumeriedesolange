import { createClient } from "@/lib/supabase/server";
import MisDatosClient from "@/components/dashboard/MisDatosClient";

export default async function MisDatosPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("configuracion")
    .select("clave, valor")
    .in("clave", ["nombre_completo", "telefono", "instagram", "whatsapp", "facebook", "tiktok"]);

  const config: Record<string, string> = {};
  (data || []).forEach((row: { clave: string; valor: string }) => {
    config[row.clave] = row.valor;
  });

  return <MisDatosClient config={config} />;
}
