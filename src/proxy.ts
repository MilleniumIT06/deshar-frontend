/* eslint-disable no-console */
import { NextResponse } from 'next/server'

import { ADMIN_PANEL_ROLES, type User } from './shared/types/user.types'

import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
	const token = request.cookies.get('jwt_token')?.value
	const { pathname } = request.nextUrl

	const isAuthenticated = Boolean(token)
	const isAuthPage = pathname === '/sign-in'
	const isHomePage = pathname === '/home'

	if (!isAuthenticated) {
		if (pathname === '/') {
			return NextResponse.redirect(new URL('/home', request.url))
		}
		const isSupportPage = pathname.startsWith('/support')

		if (isHomePage || isAuthPage || isSupportPage) {
			return NextResponse.next()
		}
		return NextResponse.redirect(new URL('/sign-in', request.url))
	}

	if (pathname === '/' || isAuthPage) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}

	try {
		const SERVER_URL = process.env.SERVER_URL || 'http://localhost:8000'
		const response = await fetch(`${SERVER_URL}/api/auth/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
			},
		})

		if (response.status === 401) {
			const res = NextResponse.redirect(new URL('/sign-in', request.url))
			res.cookies.delete('jwt_token')
			return res
		}

		if (response.ok) {
			const res = await response.json()
			const user: User = res.data.user

			if (user.is_banned === true) {
				if (pathname !== '/user-banned') {
					return NextResponse.redirect(new URL('/user-banned', request.url))
				}
				return NextResponse.next()
			}

			if (user.is_banned === false && pathname === '/user-banned') {
				return NextResponse.redirect(new URL('/dashboard', request.url))
			}
			const hasAdminAccess = ADMIN_PANEL_ROLES.includes(user.role.name)

			if (hasAdminAccess) {
				if (!pathname.startsWith('/admin') && pathname !== '/user-banned') {
					return NextResponse.redirect(new URL('/admin', request.url))
				}
			} else if (pathname.startsWith('/admin')) {
				return NextResponse.redirect(new URL('/dashboard', request.url))
			}
		}
	} catch (error) {
		console.error('Middleware Auth Error:', error)
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/',
		'/home',
		'/sign-in',
		'/not-confirmed',
		'/dashboard/:path*',
		'/courses/:path*',
		'/completed-courses/:path*',
		'/learning/:path*',
		'/user-banned',
		'/attestation/:path*',
		'/attestation-result/:path*',
		'/practice/:path*',
		'/profile/:path*',
		'/admin/:path*',
		'/admin',
		'/ing-modules/:path*',
		'/support/:path*',
	],
}
