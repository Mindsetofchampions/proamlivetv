import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/shop",
    "/shop/(.*)",  // Make shop pages public
    "/api/shop/(.*)",  // Make shop API routes public
    "/login",
    "/register"
  ]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};