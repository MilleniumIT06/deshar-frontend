import { API_URL, axiosClassic } from '@/shared/api'

class RolesService {
	async getAllRoles() {
		const { data } = await axiosClassic({
			url: API_URL.roles(),
			method: 'GET',
		})
		return data
	}
}

export const rolesService = new RolesService()
