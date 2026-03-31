const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

class ApiClient {
	private baseURL: string

	constructor(baseURL: string) {
		this.baseURL = baseURL
	}

	private getHeaders() {
		const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

		return {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			...(token && { Authorization: `Bearer ${token}` }),
		}
	}

	async login(email: string, password: string) {
		const response = await fetch(`${this.baseURL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({ email, password }),
		})

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message || 'Ошибка авторизации')
		}

		// Сохраняем токен и пользователя
		if (data.token) {
			localStorage.setItem('auth_token', data.token)
			localStorage.setItem('user', JSON.stringify(data.user))
		}

		return data
	}

	async logout() {
		const token = localStorage.getItem('auth_token')

		if (!token) return

		const response = await fetch(`${this.baseURL}/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})

		if (response.ok) {
			localStorage.removeItem('auth_token')
			localStorage.removeItem('user')
		}

		return response
	}

	async getUser() {
		const token = localStorage.getItem('auth_token')

		if (!token) {
			throw new Error('No token found')
		}

		const response = await fetch(`${this.baseURL}/user`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error('Unauthorized')
		}

		return response.json()
	}

	// Метод для защищенных запросов
	async fetchProtected(url: string, options: RequestInit = {}) {
		const response = await fetch(`${this.baseURL}${url}`, {
			...options,
			headers: {
				...this.getHeaders(),
				...options.headers,
			},
		})

		if (response.status === 401) {
			// Токен истек, перенаправляем на логин
			if (typeof window !== 'undefined') {
				localStorage.removeItem('auth_token')
				localStorage.removeItem('user')
				window.location.href = '/sign-in'
			}
			throw new Error('Unauthorized')
		}

		return response
	}
}

export const apiClient = new ApiClient(API_URL)
