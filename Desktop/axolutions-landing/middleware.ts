import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Se estiver tentando acessar páginas do dashboard (exceto login-simple e register) sem estar logado
  if (
    !session &&
    req.nextUrl.pathname.startsWith("/dashboard") &&
    !req.nextUrl.pathname.includes("/login-simple") &&
    !req.nextUrl.pathname.includes("/register")
  ) {
    return NextResponse.redirect(new URL("/dashboard/login-simple", req.url))
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
