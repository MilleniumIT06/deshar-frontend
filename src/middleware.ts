import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const authedStatus = false
	if (!authedStatus) {
		return NextResponse.redirect(new URL('/sign-in', request.url))
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/authed', '/courses', '/courses/:path*', '/completed-courses', '/learning', '/learning/:path*'],
}
