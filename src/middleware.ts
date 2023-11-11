import { authMiddleware } from "@kinde-oss/kinde-auth-nextjs/server";

export const config = {
  matcher: ["/dashboard/:path*", "/auth-callback"],
  // these are secured routes
};

export default authMiddleware;
