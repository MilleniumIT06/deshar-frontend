import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'

class DistrictsService {
	async getAllDistricts() {
		const { data } = await axiosClassic({
			url: API_URL.districts(),
			method: 'GET',
		})
		return data
	}
}

export const districtsService = new DistrictsService()
