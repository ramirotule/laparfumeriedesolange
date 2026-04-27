import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Perfume } from "@/types";

export const dynamic = "force-dynamic";
import PerfumeForm from "@/components/dashboard/PerfumeForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarPerfumePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: perfume } = await supabase
    .from("perfumes")
    .select("*")
    .eq("id", id)
    .single();

  if (!perfume) notFound();

  return <PerfumeForm perfume={perfume as Perfume} isEdit />;
}
