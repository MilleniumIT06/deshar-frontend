import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'
import { type RegistrationCompleteData } from '@/features/auth/ProgramSelection/IngushetiaForm'

class RegisterService {
	async register(data: RegistrationCompleteData) {
		const { data: response } = await axiosClassic({
			url: API_URL.register(),
			method: 'POST',
			data,
		})
		return response
	}
}
export const registerService = new RegisterService()
