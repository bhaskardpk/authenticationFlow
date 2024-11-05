// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";
import { paths } from "./utils/routes";
import { envValues } from "./utils/envConfig";

const secret = envValues.NEXT_PUBLIC_JWT_KEY;
let protectedPaths: string[] = [];
let publicPaths: string[] = [];
let token: JWT | null = null;

// export const getTokenInfo = () => {
//   return token || null;
// };

export async function middleware(req: NextRequest) {
  token = await getToken({ req, secret });
  protectedPaths = Object.values(paths.private || {});
  publicPaths = Object.values(paths.public || {});

  const url: any = req.nextUrl.clone();

  if (token && publicPaths.includes(url?.pathname)) {
    url.pathname = paths.private.dashboard;
    return NextResponse.redirect(url);
  }

  if (!token && protectedPaths.includes(url.pathname)) {
    url.pathname = paths.public.signIn;
    return NextResponse.redirect(url);
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Define the paths where the middleware should be applied
export const config = {
  matcher: [...protectedPaths, ...publicPaths],
};
