import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CuentaClient from "@/components/cuenta/CuentaClient";

export const dynamic = "force-dynamic";

export default async function CuentaPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/cuenta/ingresar?redirect=/cuenta");
  }

  const { data: perfil } = await supabase
    .from("perfiles")
    .select("nombre, apellido, telefono, direccion, localidad, provincia, rol")
    .eq("id", user.id)
    .single();

  if (perfil?.rol === "admin") {
    redirect("/dashboard");
  }

  const { data: pedidos } = await supabase
    .from("pedidos")
    .select("id, numero_pedido, total, estado, tipo_entrega, created_at")
    .eq("cliente_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <CuentaClient
      email={user.email || ""}
      perfil={perfil}
      pedidos={pedidos || []}
    />
  );
}
