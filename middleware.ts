import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/pricing",
    "/videos",
    "/videos/(.*)",
    "/sign-in",
    "/sign-up",
    "/api/webhooks/(.*)",
    "/creators",
    "/creators/(.*)",
    "/corporate",
    "/corporate/(.*)",
    "/sponsors",
    "/shop",
    "/advertise",
    "/shows",
    "/shows/(.*)",
    "/live"
  ],
  
  // Routes that can be accessed without authentication
  ignoredRoutes: [
    "/api/webhooks/(.*)"
  ],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};