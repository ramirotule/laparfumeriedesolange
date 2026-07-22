import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function generateSlug(nombre: string, marca: string) {
  return `${nombre}-${marca}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function POST() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: productos, error } = await supabase
    .from("productos")
    .select("id, nombre, marca, slug");

  if (error || !productos) {
    return NextResponse.json({ error: error?.message ?? "Error fetching products" }, { status: 500 });
  }

  const updates = productos.map((p) => ({
    id: p.id,
    slug: generateSlug(p.nombre, p.marca),
  }));

  const changed = updates.filter((u) => {
    const original = productos.find((p) => p.id === u.id);
    return original?.slug !== u.slug;
  });

  if (changed.length === 0) {
    return NextResponse.json({ updated: 0, message: "All slugs are already correct." });
  }

  const existingSlugs = new Set(productos.map((p) => p.slug));

  let updated = 0;
  let skipped = 0;

  for (const { id, slug } of changed) {
    // If the target slug is already taken by another product, skip
    const takenByOther = productos.some((p) => p.slug === slug && p.id !== id);
    if (takenByOther) {
      skipped++;
      continue;
    }
    const { error: updateError } = await supabase
      .from("productos")
      .update({ slug })
      .eq("id", id);
    if (!updateError) {
      existingSlugs.add(slug);
      updated++;
    }
  }

  return NextResponse.json({ updated, skipped });
}
