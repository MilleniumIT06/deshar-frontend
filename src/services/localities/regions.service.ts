import { API_URL } from '@/config/api.config'
import { axiosClassic } from '@/config/api.helper'

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
