import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/shop",
    "/shop/(.*)",  // Make shop pages public
    "/api/shop/(.*)",  // Make shop API routes public
    "/login",
    "/register",
    "/videos",
    "/videos/(.*)",
    "/categories",
    "/categories/(.*)",
    "/shows",
    "/shows/(.*)",
    "/live",
    "/live/(.*)",
    "/corporate",
    "/corporate/(.*)",
    "/sponsors",
    "/sponsors/(.*)",
    "/advertise",
    "/advertise/(.*)",
    "/ppv",
    "/ppv/(.*)",
    "/api/videos/(.*)",
    "/api/live-events/(.*)",
    "/api/partners",
    "/api/sponsors"
  ]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};