import { type supportFormData } from '@/features/Support/model/support.schema'

class SupportService {
	// async login(data: signInUserFormData) {
	// 	const { data: response } = await axiosClassic<IAuthResponse>({
	// 		url: API_URL.login(),
	// 		method: 'POST',
	// 		data,
	// 	})
	// 	return response
	// }
	// async logout(): Promise<void> {
	// 	try {
	// 		await axiosWithAuth({
	// 			url: API_URL.logout(),
	// 			method: 'POST',
	// 		})
	// 	} catch (error) {
	// 		// eslint-disable-next-line no-console
	// 		console.error('Ошибка при отправке запроса logout на бэкенд:', error)
	// 	} finally {
	// 		removeTokenFromCookie()
	// 	}
	// }
	async send(data: supportFormData) {
		console.log('support.service.ts', data)
		return { ok: true }
	}
}
export const supportService = new SupportService()
