import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars faltantes");
  return createClient(url, key, { auth: { persistSession: false } });
}

const ESTADO_POR_STATUS: Record<string, "pagado" | "cancelado" | "pendiente"> = {
  approved: "pagado",
  rejected: "cancelado",
  cancelled: "cancelado",
  refunded: "cancelado",
  charged_back: "cancelado",
  pending: "pendiente",
  in_process: "pendiente",
  authorized: "pendiente",
};

// Mercado Pago manda la notificación por query params (IPN clásico) o en el
// body (webhooks v2). Nunca confiamos en el status que venga ahí: siempre
// re-consultamos el pago real contra la API con nuestro propio token.
export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const body = await req.json().catch(() => null);

    const topic = url.searchParams.get("type") || url.searchParams.get("topic") || body?.type || body?.topic;
    const paymentId = url.searchParams.get("data.id") || url.searchParams.get("id") || body?.data?.id || body?.resource;

    if (topic !== "payment" || !paymentId) {
      // Ignoramos otros tópicos (merchant_order, etc.)
      return NextResponse.json({ received: true });
    }

    const mpToken = process.env.MP_ACCESS_TOKEN;
    if (!mpToken) {
      console.error("[mp-webhook] Falta MP_ACCESS_TOKEN");
      return NextResponse.json({ error: "MercadoPago no configurado" }, { status: 500 });
    }

    const paymentRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${mpToken}` },
    });

    if (!paymentRes.ok) {
      console.error("[mp-webhook] Error consultando pago:", await paymentRes.text());
      return NextResponse.json({ error: "No se pudo verificar el pago" }, { status: 502 });
    }

    const payment = await paymentRes.json();
    const orderId: string | undefined = payment.external_reference;
    const status: string = payment.status;

    if (!orderId) {
      console.error("[mp-webhook] Pago sin external_reference:", payment.id);
      return NextResponse.json({ received: true });
    }

    const nuevoEstado = ESTADO_POR_STATUS[status] ?? "pendiente";

    const supabase = getServiceSupabase();
    const { error } = await supabase
      .from("pedidos")
      .update({ estado: nuevoEstado, mp_payment_id: String(payment.id) })
      .eq("id", orderId);

    if (error) {
      console.error("[mp-webhook] Error actualizando pedido:", error);
      return NextResponse.json({ error: "Error actualizando pedido" }, { status: 500 });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[mp-webhook] Error inesperado:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// Mercado Pago a veces prueba el webhook con un GET desde el panel.
export async function GET() {
  return NextResponse.json({ ok: true });
}
