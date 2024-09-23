import { NextResponse } from "next/server"
import { auth } from "auth"
import { CAREER_CALENDAR_ROUTE, HOME_ROUTE, PROFILE_ROUTE } from "configs/constants"

export default auth((req) => {
  const pathname = req.nextUrl.pathname
  // Define protected routes
  const protectedRoutes = [HOME_ROUTE, PROFILE_ROUTE, CAREER_CALENDAR_ROUTE]

  // Check if the user is authenticated. If auth is null then the user is not authenticated
  const isAuthenticated = !!req.auth

  // Redirect unauthenticated users trying to access protected routes
  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("auth/sign-in", req.url))
  }

  // Allow access to public routes
  return NextResponse.next()
})

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
