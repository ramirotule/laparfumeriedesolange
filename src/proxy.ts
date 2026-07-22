import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Supabase a veces redirige a "/?code=..." en lugar de "/auth/callback"
  const authCode = searchParams.get("code");
  if (authCode && pathname !== "/auth/callback") {
    const callbackUrl = new URL("/auth/callback", request.url);
    callbackUrl.searchParams.set("code", authCode);
    const next = searchParams.get("next");
    if (next) callbackUrl.searchParams.set("next", next);
    return NextResponse.redirect(callbackUrl);
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Proteger rutas de dashboard
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Checkout requiere sesión de cliente
  if (request.nextUrl.pathname === "/checkout") {
    if (!user) {
      const loginUrl = new URL("/cuenta/ingresar", request.url);
      loginUrl.searchParams.set("redirect", "/checkout");
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/login",
    "/checkout",
    "/cuenta/:path*",
    "/auth/callback",
  ],
};
