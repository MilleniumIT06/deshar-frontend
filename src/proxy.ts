import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
	// Получаем токен из cookies (в proxy/middleware нет доступа к localStorage)
	const token = request.cookies.get('auth_token')?.value

	// Для теста оставим true, но логика проверки токена ниже:
	const isAuthenticated = Boolean(token) || true

	// Если пользователь не авторизован, перенаправляем на страницу входа
	if (!isAuthenticated) {
		const signInUrl = new URL('/sign-in', request.url)
		// Сохраняем URL для возврата после логина
		signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
		return NextResponse.redirect(signInUrl)
	}

	// Если всё ок, пропускаем запрос
	return NextResponse.next()
}

// Конфигурация путей остается прежней
export const config = {
	matcher: [
		'/dashboard',
		'/dashboard/:path*',
		'/courses',
		'/courses/:path*',
		'/completed-courses',
		'/completed-courses/:path*',
		'/learning',
		'/learning/:path*',
	],
}
