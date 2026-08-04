import { API_URL } from '@/config/api.config'
import { axiosClassic } from '@/config/api.helper'

class TokenService {
	async getTokens() {
		const { data } = await axiosClassic({
			url: API_URL.root(),
			method: 'GET',
		})
		return data
	}
}

export const tokenService = new TokenService()
