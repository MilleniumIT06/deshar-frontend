import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
	const token = request.cookies.get('jwt_token')?.value
	const { pathname } = request.nextUrl

	const isAuthenticated = Boolean(token)
	const isAuthPage = pathname === '/sign-in'

	if (isAuthenticated && (pathname === '/' || isAuthPage)) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	if (!isAuthenticated && !isAuthPage) {
		const signInUrl = new URL('/sign-in', request.url)

		// signInUrl.searchParams.set('callbackUrl', pathname)

		return NextResponse.redirect(signInUrl)
	}

	// Если всё ок, пропускаем запрос
	return NextResponse.next()
}

export const config = {
	matcher: [
		'/',
		'/sign-in',
		'/dashboard/:path*',
		'/courses/:path*',
		'/completed-courses/:path*',
		'/learning/:path*',
	],
}
