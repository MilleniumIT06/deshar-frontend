/* eslint-disable no-console */
import { NextResponse } from 'next/server'

import { ADMIN_PANEL_ROLES, type User } from './shared/types/user.types'

import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl
	const correctPassword = process.env.SITE_PASSWORD

	if (pathname !== '/secure-login' && pathname !== '/api/auth') {
		const authCookie = request.cookies.get('site_auth')?.value

		if (correctPassword && (!authCookie || authCookie !== correctPassword)) {
			return NextResponse.redirect(new URL('/secure-login', request.url))
		}
	}

	if (pathname === '/secure-login' && request.cookies.get('site_auth')?.value === correctPassword) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (pathname === '/secure-login' || pathname === '/api/auth') {
		return NextResponse.next()
	}

	const token = request.cookies.get('jwt_token')?.value

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
		const SERVER_URL = process.env.SERVER_URL
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
		'/secure-login',
		'/api/auth',
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
