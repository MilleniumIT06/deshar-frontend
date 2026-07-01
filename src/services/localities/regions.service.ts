import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'

class RegionService {
	async getAllRegions() {
		const { data } = await axiosClassic<{ data: { id: number; name: string }[] }>({
			url: API_URL.regions(),
			method: 'GET',
		})
		return data
	}
}

export const regionService = new RegionService()
