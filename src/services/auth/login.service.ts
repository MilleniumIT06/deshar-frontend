import { axiosClassic, axiosWithAuth } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'
import { type signInUserFormData } from '@/features/auth/SignIn/model/signIn.schema'

import { getTokenFromCookie, removeTokenFromCookie } from './auth-token.service'

import type { IAuthResponse } from '@/shared/types/types'

class LoginService {
	async login(data: signInUserFormData) {
		const { data: response } = await axiosClassic<IAuthResponse>({
			url: API_URL.login(),
			method: 'POST',
			data,
		})
		return response
	}
	async logout(): Promise<void> {
		try {
				await axiosWithAuth({
					url: API_URL.logout(),
					method: 'POST',
				})

		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Ошибка при отправке запроса logout на бэкенд:', error)
		} finally {
			removeTokenFromCookie()
		}
	}
}
export const loginService = new LoginService()
