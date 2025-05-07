import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export default clerkMiddleware(async (auth, req) => {
    const { pathname } = req.nextUrl;
  
    // Exclude `/auth` from authentication checks
    if (pathname.startsWith("/auth")) {
      return NextResponse.next();
    }
  
    const { userId } = await auth();
  
    if (!userId) {
      const signInUrl = new URL("/auth", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  
    return NextResponse.next();
  });

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
