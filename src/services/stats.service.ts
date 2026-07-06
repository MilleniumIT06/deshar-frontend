import Cookies from 'js-cookie'
import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'

class StatsService {
	async getUserStats() {
        const token = Cookies.get('jwt_token')
		const { data } = await axiosClassic<{data:{stats:any}}>({
			url: API_URL.stats(),
			method: 'GET',
            headers: {
				Authorization: token ? `Bearer ${token}` : '',
			},
		})
		return data
	}
}

export const statsService = new StatsService()
