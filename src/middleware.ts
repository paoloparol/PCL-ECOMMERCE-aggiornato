import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteggi le rotte admin
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    // Verifica che l'utente sia autenticato e sia un admin
    if (!token || token.role !== "ADMIN") {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }

  // Verifica autenticazione per rotte account
  if (pathname.startsWith("/account")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    });

    if (!token) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Configura le rotte a cui applicare il middleware
export const config = {
  matcher: ['/admin/:path*', '/account/:path*']
};
