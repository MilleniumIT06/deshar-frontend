import { NextResponse } from 'next/server'

interface AuthRequestBody {
	password?: string
}

export async function POST(request: Request): Promise<NextResponse> {
	try {
		const { password }: AuthRequestBody = await request.json()
		const correctPassword = process.env.SITE_PASSWORD

		if (!correctPassword) {
			return NextResponse.json({ error: 'SITE_PASSWORD is not configured on server' }, { status: 500 })
		}

		if (password === correctPassword) {
			const response = NextResponse.json({ success: true })

			response.cookies.set('site_auth', password, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7, // 7 дней
				path: '/',
			})

			return response
		}

		return NextResponse.json({ success: false }, { status: 401 })
	} catch {
		return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
	}
}
