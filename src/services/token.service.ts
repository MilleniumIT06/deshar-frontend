import { API_URL } from '@/shared/api'
import { axiosClassic } from '@/shared/api/api.helper'

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
