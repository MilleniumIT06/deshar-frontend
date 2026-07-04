import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
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
if (isAuthenticated && pathname.startsWith('/learning')) {
		try {
			const SERVER_URL = process.env.API_URL
			const response = await fetch(`${SERVER_URL}/api/auth/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})

			if (response.ok) {
				const user = await response.json()

				if (user.confirmed === false) {
					return NextResponse.redirect(new URL('/not-confirmed', request.url))
				}
			}
		} catch (error) {
			console.error('Failed to fetch user profile:', error)
		}
	}
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
