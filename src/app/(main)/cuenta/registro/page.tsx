"use client";

import { Suspense } from "react";
import CuentaAuthForm from "@/components/cuenta/CuentaAuthForm";

export default function RegistroPage() {
  return (
    <Suspense>
      <CuentaAuthForm mode="register" />
    </Suspense>
  );
}
