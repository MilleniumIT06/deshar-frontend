import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'

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
