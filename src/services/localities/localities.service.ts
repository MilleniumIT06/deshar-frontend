import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'
import type { Locality } from '@/shared/types/types'

class LocalitiesService {
	async getAllLocalities() {
		const { data } = await axiosClassic<{ data: Locality[] }>({
			url: API_URL.localities(),
			method: 'GET',
		})
		return data
	}
}

export const localitiesService = new LocalitiesService()
