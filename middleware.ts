import {NextResponse} from "next/server";
import {verifyJwtToken} from "@/lib/auth";

const AUTH_PAGES = ["/login"]
const isAuthPages = (url: any) => AUTH_PAGES.some(page => page.startsWith(url))

export async function middleware(request: any) {
    const {url, nextUrl, cookies} = request
    const token = cookies.get("token") ?? {value: null}

    const hasVerifiedToken = token && (await verifyJwtToken(token))
    const isAuthPageRequested = isAuthPages(nextUrl.pathname)
    if (isAuthPageRequested) {
        if (!hasVerifiedToken) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL("/product", url))
    }

    if (!hasVerifiedToken) {
        const searchParams = new URLSearchParams(nextUrl.searchParams)
        searchParams.set("next", nextUrl.pathname)
        return NextResponse.redirect(new URL("/login", url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/Login",
        "/",
        "/product"
    ]
}