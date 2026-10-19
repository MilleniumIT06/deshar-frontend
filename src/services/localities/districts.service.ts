import { API_URL } from '@/shared/api'
import { axiosClassic } from '@/shared/api/api.helper'
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
