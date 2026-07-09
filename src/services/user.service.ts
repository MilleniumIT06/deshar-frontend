import { axiosWithAuth } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'
import { UpdateUser, User, UserProfileResponse } from '@/shared/types/user.types'

class UserService {
	async getProfile() {
		const { data } = await axiosWithAuth<UserProfileResponse>({
			url: API_URL.me(),
			method: 'GET',
		})
		return data
	}
	async updateProfile(userData: UpdateUser) {
		const { data } = await axiosWithAuth<User>({
			url: API_URL.updateProfile(),
			method: 'PUT',
			data:userData
		})
		return data
	}
}

export const userService = new UserService()
