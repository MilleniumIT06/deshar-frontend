import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'
import type { SchoolClass } from '@/shared/types/types'

class SchoolClassesService {
	async getAllSchoolClasses() {
		const { data } = await axiosClassic<SchoolClass[]>({
			url: API_URL.schoolClasses(),
			method: 'GET',
		})
		return data
	}
}

export const schoolClassesService = new SchoolClassesService()
