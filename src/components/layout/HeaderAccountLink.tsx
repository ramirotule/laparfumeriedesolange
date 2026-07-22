"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function HeaderAccountLink() {
  const [loggedIn, setLoggedIn] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setLoggedIn(!!data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session?.user);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  return (
    <Link
      href={loggedIn ? "/cuenta" : "/cuenta/ingresar"}
      className="flex items-center gap-1.5 text-[11px] tracking-[0.2em] text-[#888888] hover:text-[#D4AF37] transition-colors font-bold uppercase"
      title={loggedIn ? "Mi cuenta" : "Ingresar"}
    >
      <User size={14} />
      <span className="hidden xl:inline">{loggedIn ? "Mi cuenta" : "Ingresar"}</span>
    </Link>
  );
}
