import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Получаем токен из cookies (так как в middleware нет доступа к localStorage)
export function middleware(request: NextRequest) {
	// Проверяем наличие токена в cookies
	// const token = request.cookies.get('auth_token')?.value

	// Если токена нет - пользователь не авторизован
	// const isAuthenticated = Boolean(token)

	const isAuthenticated = true
	// Если пользователь не авторизован, перенаправляем на страницу входа
	if (!isAuthenticated) {
		const signInUrl = new URL('/sign-in', request.url)
		// Сохраняем URL, на который пытался зайти пользователь, для редиректа после авторизации
		signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
		return NextResponse.redirect(signInUrl)
	}

	// Если пользователь авторизован, пропускаем запрос дальше
	return NextResponse.next()
}

// Конфигурация, к каким путям применять middleware
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
		// '/practice',
		// '/practice/:path*'
	],
}
