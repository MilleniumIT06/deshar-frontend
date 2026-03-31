'use client'

// Создаем интерфейсы вместо использования any
interface User {
	id: number
	name: string
	email: string
	[key: string]: unknown // если есть дополнительные поля
}

export const auth = {
	getToken(): string | null {
		if (typeof window === 'undefined') return null
		return localStorage.getItem('auth_token')
	},

	setToken(token: string): void {
		if (typeof window === 'undefined') return

		// Сохраняем в localStorage
		localStorage.setItem('auth_token', token)

		// Устанавливаем cookie для middleware
		document.cookie = `auth_token=${token}; path=/; max-age=604800; SameSite=Lax`
	},

	removeToken(): void {
		if (typeof window === 'undefined') return

		localStorage.removeItem('auth_token')
		document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
	},

	getUser(): User | null {
		if (typeof window === 'undefined') return null
		const userStr = localStorage.getItem('user')
		if (!userStr) return null
		try {
			return JSON.parse(userStr) as User
		} catch {
			return null
		}
	},

	setUser(user: User): void {
		if (typeof window === 'undefined') return
		localStorage.setItem('user', JSON.stringify(user))
	},

	removeUser(): void {
		if (typeof window === 'undefined') return
		localStorage.removeItem('user')
	},

	isAuthenticated(): boolean {
		return Boolean(this.getToken())
	},

	async logout(): Promise<void> {
		try {
			const token = this.getToken()
			if (token) {
				await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				})
			}
		} finally {
			this.removeToken()
			this.removeUser()
		}
	},
}
