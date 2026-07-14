import axios, { CreateAxiosDefaults, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'

import { SERVER_URL } from '@/config/api.config'
const options: CreateAxiosDefaults = {
	baseURL: SERVER_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
		withXSRFToken: true,
}
const axiosClassic: AxiosInstance = axios.create(options)
const axiosWithAuth: AxiosInstance = axios.create(options)

const getCookie = (name: string): string | null => {
	if (typeof document === 'undefined') return null
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) {
		const cookieValue = parts.pop()?.split(';').shift()
		return cookieValue ? decodeURIComponent(cookieValue) : null
	}
	return null
}

axiosClassic.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const xsrfToken = getCookie('XSRF-TOKEN')
	if (xsrfToken && config.headers) {
		config.headers['X-XSRF-TOKEN'] = xsrfToken
	}
	return config
})

axiosWithAuth.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	const xsrfToken = getCookie('XSRF-TOKEN')
	const jwtToken = getCookie('jwt_token')

	if (config.headers) {
		// Добавляем CSRF токен
		if (xsrfToken) {
			config.headers['X-XSRF-TOKEN'] = xsrfToken
		}

		// Добавляем JWT токен авторизации
		if (jwtToken) {
			config.headers.Authorization = `Bearer ${jwtToken}`
		}
	}

	return config
})
export { axiosClassic,axiosWithAuth }
