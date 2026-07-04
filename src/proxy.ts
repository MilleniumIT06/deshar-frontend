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
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

	console.log('proxyTest')
    if (isAuthenticated) {
        try {
            const SERVER_URL = process.env.SERVER_URL || 'http://localhost:8000'
            const response = await fetch(`${SERVER_URL}/api/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            })
			// console.log('proxy',response)
            if (response.status === 401) {
                const res = NextResponse.redirect(new URL('/sign-in', request.url))
                res.cookies.delete('jwt_token')
                return res
            }

            if (response.ok) {
                const res = await response.json()
				const user = res.data.user;
				// console.log(user,"proxy")
				if(user.is_banned===true) {
					// console.log('isBanned')
					return NextResponse.redirect(new URL('/user-banned', request.url))
				}
                if (user.confirmed === false || user.data?.confirmed === false) {
                    if (pathname !== '/not-confirmed') {
                        return NextResponse.redirect(new URL('/not-confirmed', request.url))
                    }
                }
            }
        } catch (error) {
            console.error('Middleware Auth Error:', error)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/',
        '/sign-in',
        '/not-confirmed',
        '/dashboard/:path*',
        '/courses/:path*',
        '/completed-courses/:path*',
        '/learning/:path*',
		'/user-banned'
    ],
}
