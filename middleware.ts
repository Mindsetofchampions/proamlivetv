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
    "/api/webhooks(.*)",
    "/creators",
    "/creators/(.*)",
    "/corporate",
    "/corporate/(.*)",
    "/sponsors",
    "/shop",
    "/advertise"
  ],
  
  // Routes that can always be accessed, and have
  // client-side authentication logic rendered in the page
  ignoredRoutes: [
    "/api/webhooks/(.*)"
  ],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};