export const SERVER_URL = process.env.SERVER_URL

export const API_URL = {
	root: (url = '') => `${url ? url : ''}`,

	register: () => API_URL.root(`/register`),
	countries: () => API_URL.root(`/countries`),
	schools: () => API_URL.root(`/schools`),
	districts: () => API_URL.root(`/districts`),
	cities: () => API_URL.root(`/cities`),
	roles: () => API_URL.root(`/roles`),
}
