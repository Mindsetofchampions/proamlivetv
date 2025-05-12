import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
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
  
  ignoredRoutes: [
    "/api/webhooks/(.*)"
  ],
});
 
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
};