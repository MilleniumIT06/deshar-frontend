import Cookies from 'js-cookie' // Импортируем для чтения куки на клиенте

import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'

class UserService {
	async getProfile() {
		const token = Cookies.get('jwt_token')

		const { data } = await axiosClassic({
			url: API_URL.profile(),
			method: 'GET',
			headers: {
				Authorization: token ? `Bearer ${token}` : '',
			},
		})
		return data
	}
}

export const userService = new UserService()
