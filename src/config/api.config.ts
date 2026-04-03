export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000'

const prefix = '/api'
export const API_URL = {
	root: (url = '') => `${SERVER_URL}${url}`, // Исправлено: добавляем SERVER_URL

	register: () => API_URL.root('/register'),
	countries: () => API_URL.root(`${prefix}/countries`),
	schools: () => API_URL.root(`${prefix}/schools`),
	districts: () => API_URL.root(`${prefix}/districts`),
	cities: () => API_URL.root(`${prefix}/cities`),
	roles: () => API_URL.root(`${prefix}/roles`),
}
