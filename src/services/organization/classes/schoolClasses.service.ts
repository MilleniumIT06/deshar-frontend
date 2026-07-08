import Cookies from 'js-cookie'
import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'

import type { Id, SchoolClass } from '@/shared/types/types'
interface SchoolClassStatistic {
			 statistics: {
		total_students: number;
		total_xp: number;
		average_xp: number;
		average_level: number;
		active_students: number;
		active_percentage: number;
	}
		class: {id:Id,name:string;};
		success: boolean
	}
class SchoolClassesService {
	async getAllSchoolClasses(schoolId?: number | null) {
		const { data } = await axiosClassic<SchoolClass[]>({
			url: API_URL.schoolClasses(),
			method: 'GET',
			params: schoolId && schoolId > -1 ? { school_id: schoolId } : {}
		})
		return data
	}

	async getAllSchoolClassesAdmin() {
		const token = Cookies.get('jwt_token')
		const { data } = await axiosClassic<{ data: {
			id:Id;
			name: string;
			students_count: number;
			class_type_id: number;
			class_type_name: string;
			teacher_id: Id | null;
			teacher_name: string;
		}[]; meta: any; success: boolean }>({
			url: API_URL.adminClasses(),
			method: 'GET',
			headers: {
				Authorization: token ? `Bearer ${token}` : '',
			},
		})
		return data
	}

	async getUniqueClassStatisticAdmin(id:Id) {
		const token = Cookies.get('jwt_token')
		const { data } = await axiosClassic<SchoolClassStatistic>({
			url: API_URL.adminClassStatistics(id),
			method: 'GET',
			headers: {
				Authorization: token ? `Bearer ${token}` : '',
			},
		})
		return data
	}
}

export const schoolClassesService = new SchoolClassesService()
