export const SERVER_URL = process.env.SERVER_URL
// console.log(SERVER_URL)
const prefix = '/api'
export const API_URL = {
	root: (url = '') => `${url ? url : ''}`,

	register: () => API_URL.root(`/register`),
	countries: () => API_URL.root(`${prefix}/countries`),
	schools: () => API_URL.root(`${prefix}/schools`),
	districts: () => API_URL.root(`${prefix}/districts`),
	cities: () => API_URL.root(`${prefix}/cities`),
	roles: () => API_URL.root(`${prefix}/roles`),
}
