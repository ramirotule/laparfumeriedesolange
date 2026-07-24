import { createClient } from "@/lib/supabase/server";
import { Producto } from "@/types";
import ProductoCard from "./ProductoCard";

interface Props {
  productoId: string;
  lineaId?: string | number | null;
}

export default async function ProductosRelacionados({ productoId, lineaId }: Props) {
  if (!lineaId) return null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("linea_id", lineaId)
    .eq("activo", true)
    .neq("id", productoId)
    .order("destacado", { ascending: false })
    .limit(8);

  if (error || !data || data.length === 0) return null;

  const productos = data as Producto[];

  return (
    <div className="mb-16">
      <h2 className="font-serif text-2xl text-white mb-6">También te puede interesar</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
}
