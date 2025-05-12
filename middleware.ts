import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // These routes are accessible without authentication
  publicRoutes: [
    "/",
    "/pricing",
    "/videos",
    "/videos/(.*)",
    "/sign-in",
    "/sign-up",
    "/api/webhooks(.*)"
  ],
  
  // Routes that can always be accessed, and have
  // client-side authentication logic rendered in the page
  ignoredRoutes: [
    "/api/webhooks/(.*)"
  ],
});
 
export const config = {
  // Protects all routes, including api/trpc.
  // Keep this in sync with middleware.ts
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};