import Cookies from 'js-cookie'

const TOKEN_KEY = 'jwt_token'

export const saveTokenToCookie = (token: string): void => {
	if (typeof window !== 'undefined') {
		Cookies.set(TOKEN_KEY, token, {
			expires: 7,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		})
	}
}

export const getTokenFromCookie = (): string | null => {
	if (typeof window !== 'undefined') {
		return Cookies.get(TOKEN_KEY) || null
	}
	return null
}

export const removeTokenFromCookie = (): void => {
	if (typeof window !== 'undefined') {
		Cookies.remove(TOKEN_KEY)
	}
}
