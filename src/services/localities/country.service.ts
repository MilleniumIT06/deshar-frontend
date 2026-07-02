import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'
import { Country } from '@/shared/types/types'

class CountryService {
	async getAllCountries() {
		const { data } = await axiosClassic<{ data: Country[] }>({
			url: API_URL.countries(),
			method: 'GET',
		})
		return data
	}
}

export const countryService = new CountryService()
