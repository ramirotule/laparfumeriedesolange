import { NextRequest, NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  calculateShipping,
  isTipoEntrega,
  type TipoEntrega,
} from "@/lib/shipping";

interface CartItem {
  id: string;
  nombre: string;
  marca: string;
  slug: string;
  precio_venta: number;
  imagen_url?: string;
  cantidad: number;
}

interface CheckoutBody {
  items: CartItem[];
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string;
  direccion?: string;
  localidad?: string;
  provincia?: string;
  tipo_entrega: TipoEntrega;
  notas?: string;
  metodo_pago: "efectivo" | "transferencia" | "mercadopago";
  subtotal?: number;
}

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars faltantes");
  return createSupabaseClient(url, key, { auth: { persistSession: false } });
}

async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    }
  );
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

function generarNumeroPedido(): string {
  const d = new Date();
  const fecha = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `LP-${fecha}-${rand}`;
}

function buildDireccionCompleta(
  body: CheckoutBody
): string | null {
  const base = body.direccion?.trim();
  if (!base) return null;

  if (body.tipo_entrega === "domicilio_interior") {
    const parts = [base, body.localidad?.trim(), body.provincia?.trim()].filter(Boolean);
    return parts.join(", ");
  }

  return base;
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: "Debés iniciar sesión para comprar." }, { status: 401 });
    }

    const supabase = getServiceSupabase();

    const { data: perfilActual } = await supabase
      .from("perfiles")
      .select("rol")
      .eq("id", user.id)
      .single();

    if (perfilActual?.rol === "admin") {
      return NextResponse.json(
        { error: "Las cuentas de administrador no pueden realizar compras." },
        { status: 403 }
      );
    }

    const body: CheckoutBody = await req.json();
    const {
      items,
      nombre,
      apellido,
      telefono,
      email,
      direccion,
      notas,
      metodo_pago,
      tipo_entrega,
    } = body;

    if (
      !items?.length ||
      !nombre?.trim() ||
      !apellido?.trim() ||
      !telefono?.trim() ||
      !metodo_pago ||
      !tipo_entrega ||
      !isTipoEntrega(tipo_entrega)
    ) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const needsAddress =
      tipo_entrega === "domicilio_santa_rosa" ||
      tipo_entrega === "domicilio_toay" ||
      tipo_entrega === "domicilio_interior";

    if (needsAddress && !direccion?.trim()) {
      return NextResponse.json({ error: "La dirección es obligatoria." }, { status: 400 });
    }

    if (
      tipo_entrega === "domicilio_interior" &&
      (!body.localidad?.trim() || !body.provincia?.trim())
    ) {
      return NextResponse.json(
        { error: "Localidad y provincia son obligatorias para envíos al interior." },
        { status: 400 }
      );
    }

    const subtotal = items.reduce((s, i) => s + i.precio_venta * i.cantidad, 0);
    const shipping = calculateShipping(subtotal, tipo_entrega);
    const costoEnvio = shipping.costo;
    const total = subtotal + (costoEnvio ?? 0);

    const direccionCompleta = buildDireccionCompleta(body);

    const { data: pedido, error } = await supabase
      .from("pedidos")
      .insert({
        numero_pedido: generarNumeroPedido(),
        cliente_id: user.id,
        cliente_nombre: nombre.trim(),
        cliente_apellido: apellido.trim(),
        cliente_telefono: telefono.trim(),
        cliente_email: email?.trim() || user.email || null,
        cliente_direccion: direccionCompleta,
        cliente_notas: notas?.trim() || null,
        tipo_entrega,
        costo_envio: costoEnvio,
        envio_pendiente_cotizacion: shipping.pendienteCotizacion,
        items: items.map((i) => ({
          id: i.id,
          nombre: i.nombre,
          marca: i.marca,
          slug: i.slug,
          precio_venta: i.precio_venta,
          imagen_url: i.imagen_url || null,
          cantidad: i.cantidad,
        })),
        subtotal,
        total,
        metodo_pago,
        estado: "pendiente",
      })
      .select()
      .single();

    if (error) {
      console.error("[checkout] Supabase error:", JSON.stringify(error));
      return NextResponse.json(
        { error: `Error al guardar el pedido: ${error.message}` },
        { status: 500 }
      );
    }
    if (!pedido) {
      return NextResponse.json({ error: "No se pudo crear el pedido" }, { status: 500 });
    }

    // Actualizar perfil del cliente con datos del checkout. Nunca pisa el
    // rol de un perfil existente — solo lo setea en "cliente" al crearlo.
    await supabase.from("perfiles").upsert({
      id: user.id,
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      telefono: telefono.trim(),
      direccion: needsAddress ? direccion?.trim() || null : null,
      localidad: body.localidad?.trim() || null,
      provincia: body.provincia?.trim() || null,
      ...(perfilActual ? {} : { rol: "cliente" }),
    });

    const orderId = pedido.id as string;
    const baseUrl = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    if (metodo_pago === "mercadopago") {
      const mpToken = process.env.MP_ACCESS_TOKEN;
      if (!mpToken) {
        return NextResponse.json({ error: "MercadoPago no está configurado aún." }, { status: 500 });
      }

      const mpItems = items.map((i) => ({
        id: i.id,
        title: `${i.nombre} — ${i.marca}`,
        quantity: i.cantidad,
        unit_price: i.precio_venta,
        currency_id: "ARS",
      }));

      if (costoEnvio && costoEnvio > 0) {
        mpItems.push({
          id: "envio",
          title: "Envío a domicilio",
          quantity: 1,
          unit_price: costoEnvio,
          currency_id: "ARS",
        });
      }

      const mpRes = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mpToken}`,
        },
        body: JSON.stringify({
          items: mpItems,
          payer: {
            name: nombre,
            surname: apellido,
            email: email || user.email || "comprador@laparfumerie.com.ar",
          },
          back_urls: {
            success: `${baseUrl}/checkout/confirmacion?id=${orderId}&mp=success`,
            failure: `${baseUrl}/checkout?error=pago_fallido`,
            pending: `${baseUrl}/checkout/confirmacion?id=${orderId}&mp=pending`,
          },
          auto_return: "approved",
          external_reference: orderId,
          statement_descriptor: "La Parfumerie de Solange",
          notification_url: `${baseUrl}/api/webhooks/mercadopago`,
        }),
      });

      if (!mpRes.ok) {
        const errText = await mpRes.text();
        console.error("[checkout] MP error:", errText);
        return NextResponse.json({ error: "Error al crear el pago en MercadoPago" }, { status: 502 });
      }

      const mpData = await mpRes.json();
      const initPoint: string =
        process.env.NODE_ENV === "production" ? mpData.init_point : mpData.sandbox_init_point;

      await supabase.from("pedidos").update({ mp_preference_id: mpData.id }).eq("id", orderId);

      return NextResponse.json({ orderId, redirectUrl: initPoint });
    }

    return NextResponse.json({
      orderId,
      redirectUrl: `${baseUrl}/checkout/confirmacion?id=${orderId}`,
    });
  } catch (err) {
    console.error("[checkout] Error inesperado:", err);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
