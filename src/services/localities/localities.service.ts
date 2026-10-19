import { API_URL } from '@/shared/api'
import { axiosClassic } from '@/shared/api/api.helper'

import type { Locality } from '@/shared/types/types'

class LocalitiesService {
	async getAllLocalities(districtId?: number | null) {
		const { data } = await axiosClassic<Locality[]>({
			url: API_URL.localities(),
			method: 'GET',
			params: districtId && districtId > -1 ? { district_id: districtId } : {},
		})
		return data
	}
}

export const localitiesService = new LocalitiesService()
