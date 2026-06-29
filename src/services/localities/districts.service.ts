import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'
import { type District } from '@/shared/types/types'

class DistrictsService {
	async getAllDistricts() {
		const { data } = await axiosClassic<District[]>({
			url: API_URL.districts(),
			method: 'GET',
		})
		return data
	}
}

export const districtsService = new DistrictsService()
