import { API_URL } from '@/config/api.config'
import { axiosClassic } from '@/config/api.helper'

class SchoolsService {
	async getAllSchools(localityId?: number | null) {
		const { data } = await axiosClassic<{ id: number; name: string }[]>({
			url: API_URL.schools(),
			method: 'GET',
			params: localityId && localityId > -1 ? { locality_id: localityId } : {}
		})
		return data
	}
}

export const schoolsService = new SchoolsService()
