"use client";

import { Suspense } from "react";
import CuentaAuthForm from "@/components/cuenta/CuentaAuthForm";

export default function IngresarPage() {
  return (
    <Suspense>
      <CuentaAuthForm mode="login" />
    </Suspense>
  );
}
