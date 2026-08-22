import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/cuenta/ingresar?redirect=/checkout");
  }

  const { data: perfil } = await supabase
    .from("perfiles")
    .select("nombre, apellido, telefono, direccion, localidad, provincia, rol")
    .eq("id", user.id)
    .single();

  return (
    <Suspense>
      <CheckoutClient
        userEmail={user.email || ""}
        perfil={perfil}
      />
    </Suspense>
  );
}
