import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { passwordService } from '@/services/auth/password.service'

import { type ForgotPasswordRequest } from '../model/ForgotPassword.request'

export function useForgotPassword() {
	const router = useRouter()
	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ['forgot password'],
		mutationFn: (data: ForgotPasswordRequest) => passwordService.forgotPassword(data),
		onSuccess: () => {
			router.replace('/sign-in')
		},
		onError(error) {
			if (error.message) {
				alert('error')
			} else {
				alert('Ошибка при регистрации')
			}
		},
	})
	return { mutate, isPending, isSuccess }
}
