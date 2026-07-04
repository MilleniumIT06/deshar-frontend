import Cookies from 'js-cookie' // Импортируем для чтения куки на клиенте

import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'
import type { ProfileResponse } from '@/entities/user/model/user.type'

class UserService {
	async getProfile() {
		const token = Cookies.get('jwt_token')

		const { data } = await axiosClassic<{data:ProfileResponse}>({
			url: API_URL.me(),
			method: 'GET',
			headers: {
				Authorization: token ? `Bearer ${token}` : '',
			},
		})
		console.log('dataprodsad',data.data.user)
		return data
	}
}

export const userService = new UserService()
