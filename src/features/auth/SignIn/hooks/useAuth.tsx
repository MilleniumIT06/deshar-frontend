import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { saveTokenToCookie } from '@/services/auth/auth-token.service'
import { loginService } from '@/services/auth/login.service'

import type { signInUserFormData } from '@/features/auth/SignIn/model/signIn.schema'
import type { AxiosError } from 'axios'

export function useAuth() {
	const router = useRouter()

	const {
		mutate: login,
		isPending,
		error,
		isSuccess,
	} = useMutation({
		mutationKey: ['auth user'],
		mutationFn: (data: signInUserFormData) => loginService.login(data),
		onSuccess: response => {
			if (response.token) saveTokenToCookie(response.token)
			toast.success('Авторизация прошла успешно!', { style: { backgroundColor: 'var(--neutral-white)' } })
			router.replace('/dashboard')
		},
		onError: (
			err: AxiosError<{
				message: string
				errors: Record<string, string[]>
			}>,
		) => {
			const status = err.response?.status || err.status
			if (status !== 422) {
				toast.error(err.message || 'Ошибка при авторизации')
			}
		},
	})

	return {
		login,
		isLoading: isPending,
		serverError: error?.message || null,
		isSuccess,
	}
}
