import { API_URL } from '@/shared/api'
import { axiosClassic } from '@/shared/api/api.helper'

class CitiesService {
	async getAllCities() {
		const { data } = await axiosClassic<{ id: number; name: string }[]>({
			url: API_URL.cities(),
			method: 'GET',
		})
		return data
	}
}

export const citiesService = new CitiesService()
