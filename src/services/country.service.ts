import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'

class CountryService {
	async getAllCountries() {
		const { data } = await axiosClassic({
			url: API_URL.countries(),
			method: 'GET',
		})
		return data
	}
}

export const countryService = new CountryService()
