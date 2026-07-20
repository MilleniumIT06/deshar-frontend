import { Id } from "@/shared/types/types"

export const SERVER_URL = process.env.SERVER_URL

const prefix = '/api'
export const API_URL = {
	root: (url = '') => `${url}`,

	register: () => API_URL.root(`${prefix}/auth/register`),
	login: () => API_URL.root(`${prefix}/auth/login`),
	logout: () => API_URL.root(`${prefix}/auth/logout`),
	me: () => API_URL.root(`${prefix}/auth/me`),
	updateProfile:()=>API_URL.root(`${prefix}/auth/profile`),
	countries: () => API_URL.root(`${prefix}/countries`),
	schools: () => API_URL.root(`${prefix}/schools`),
	districts: () => API_URL.root(`${prefix}/districts`),
	cities: () => API_URL.root(`${prefix}/cities`),
	localities: () => API_URL.root(`${prefix}/localities`),
	regions: () => API_URL.root(`${prefix}/regions`),
	roles: () => API_URL.root(`${prefix}/roles`),
	schoolClasses: () => API_URL.root(`${prefix}/school-classes`),

	// stats
	userStats:()=> API_URL.root(`${prefix}/auth/stats`),

	// files
	files:()=>API_URL.root(`${SERVER_URL}/storage/`),
	taskFiles:()=>API_URL.root(`${SERVER_URL}`),
	// education
	ingModules:()=> API_URL.root(`${prefix}/modules`),
	// organization for admin
	adminClasses:()=> API_URL.root(`${prefix}/school/classes`),
	adminClassStatistics:(id:Id)=> API_URL.root(`${prefix}/school/classes/${id}/statistics`),
	adminTeachers:()=> API_URL.root(`${prefix}/school/teachers`),
	adminExportSchoolCsv:()=> API_URL.root(`${prefix}/school/export`),
	adminSchoolStats:()=> API_URL.root(`${prefix}/school/statistics`),
	adminGetAllSchoolStudents:()=> API_URL.root(`${prefix}/school/students`),
	adminMinistryRepublicStats:()=> API_URL.root(`${prefix}/ministry/republic/stats`),
}
