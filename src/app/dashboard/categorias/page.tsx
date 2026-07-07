import { createClient } from "@/lib/supabase/server";
import CategoriasClient from "@/components/dashboard/CategoriasClient";

export default async function CategoriasPage() {
  const supabase = await createClient();

  const [{ data: categorias }, { data: subcategorias }, { data: familias }] = await Promise.all([
    supabase.from("categorias").select("id, nombre, slug, orden").order("orden"),
    supabase.from("subcategorias").select("id, nombre, slug, orden, activo, categoria_id").order("orden"),
    supabase.from("familias_olfativas").select("id, nombre, descripcion").order("nombre"),
  ]);

  return (
    <CategoriasClient
      categorias={categorias || []}
      subcategorias={subcategorias || []}
      familias={familias || []}
    />
  );
}
