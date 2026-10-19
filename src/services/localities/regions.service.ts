import { API_URL } from '@/shared/api'
import { axiosClassic } from '@/shared/api/api.helper'

class RegionService {
	async getAllRegions() {
		const { data } = await axiosClassic<{ id: number; name: string }[]>({
			url: API_URL.regions(),
			method: 'GET',
		})
		return data
	}
}

export const regionService = new RegionService()
