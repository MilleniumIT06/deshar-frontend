import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'

class CitiesService {
	async getAllCities() {
		const { data } = await axiosClassic({
			url: API_URL.cities(),
			method: 'GET',
		})
		return data
	}
}

export const citiesService = new CitiesService()
