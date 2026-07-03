import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'
import type { SchoolClass } from '@/shared/types/types'

class SchoolClassesService {
	async getAllSchoolClasses(schoolId?: number | null) {
		const { data } = await axiosClassic<SchoolClass[]>({
			url: API_URL.schoolClasses(),
			method: 'GET',
			params: schoolId && schoolId > -1 ? { school_id: schoolId } : {}
		})
		return data
	}
}

export const schoolClassesService = new SchoolClassesService()
