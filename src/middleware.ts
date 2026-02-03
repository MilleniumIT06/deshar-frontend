import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const authedStatus = false

	// Запрещаем доступ к /admin всем пользователям
	if (request.nextUrl.pathname.startsWith('/admin')) {
		return NextResponse.redirect(new URL('/', request.url))
		// или можно вернуть 404
		// return new NextResponse('Not Found', { status: 404 })
	}

	// Проверка авторизации для остальных защищенных роутов
	if (!authedStatus) {
		return NextResponse.redirect(new URL('/sign-in', request.url))
	}
}

export const config = {
	matcher: [
		'/dashboard',
		'/courses',
		'/courses/:path*',
		'/completed-courses',
		'/learning',
		'/learning/:path*',
		'/admin',
		'/admin/:path*',
	],
}
