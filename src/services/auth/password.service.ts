// import { API_URL } from '@/config/api.config'
import { axiosClassic } from '@/config/api.helper'

import type { ForgotPasswordRequest } from '@/features/auth/ForgotPassword/model/ForgotPassword.request'

class PasswordService {
	async forgotPassword(data: ForgotPasswordRequest) {
		const { data: response } = await axiosClassic({
			url: 'testurl',
			method: 'POST',
			data,
		})
		return response
	}
}
export const passwordService = new PasswordService()
