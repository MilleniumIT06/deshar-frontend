import { axiosClassic } from '@/config/api.helper'
import { API_URL } from '@/config/api.config'

import type { Country } from '@/shared/types/types'

class CountryService {
	async getAllCountries() {
		const { data } = await axiosClassic<Country[]>({
			url: API_URL.countries(),
			method: 'GET',
		})
		return data
	}
}

export const countryService = new CountryService()
