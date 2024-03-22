import type { NextRequest } from "next/server";
import { fetchClient } from "./lib/fetch-instance";

export async function middleware(request: NextRequest) {
	const response = await fetchClient("/api/auth/profile");
	const user = await response.json();

	if (!user.status && !request.nextUrl.pathname.startsWith("/login")) {
		return Response.redirect(new URL("/login", request.url));
	}

	if (user?.status && request.nextUrl.pathname.startsWith("/login")) {
		return Response.redirect(new URL("/", request.url));
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
