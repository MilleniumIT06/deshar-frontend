export const SERVER_URL = process.env.SERVER_URL

const prefix = '/api'
export const API_URL = {
	root: (url = '') => `${SERVER_URL}${url}`, // Исправлено: добавляем SERVER_URL

	register: () => API_URL.root(`${prefix}/auth/register`),
	login: () => API_URL.root(`${prefix}/auth/login`),
	logout: () => API_URL.root(`${prefix}/auth/logout`),
	profile: () => API_URL.root(`${prefix}/auth/me`),
	countries: () => API_URL.root(`${prefix}/countries`),
	schools: () => API_URL.root(`${prefix}/schools`),
	districts: () => API_URL.root(`${prefix}/districts`),
	cities: () => API_URL.root(`${prefix}/cities`),
	localities: () => API_URL.root(`${prefix}/localities`),
	roles: () => API_URL.root(`${prefix}/roles`),
}
