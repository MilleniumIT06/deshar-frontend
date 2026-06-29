import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'

class SchoolsService {
	async getAllSchools() {
		const { data } = await axiosClassic({
			url: API_URL.schools(),
			method: 'GET',
		})
		return data
	}
}

export const schoolsService = new SchoolsService()
