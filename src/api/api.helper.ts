import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { SERVER_URL } from '@/config/api.config'

const axiosClassic: AxiosInstance = axios.create({
	baseURL: SERVER_URL,
	withCredentials: true,
	withXSRFToken: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

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
	// const rawCookie = document.cookie
	const xsrfToken = getCookie('XSRF-TOKEN')

	// console.log('Все доступные куки:', rawCookie)
	// console.log('Найденный XSRF-TOKEN:', xsrfToken)

	if (xsrfToken && config.headers) {
		config.headers['X-XSRF-TOKEN'] = xsrfToken
	}
	return config
})
export { axiosClassic }
