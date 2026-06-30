import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { loginService } from '@/services/auth/login.service'
import type { signInUserFormData } from '@/features/auth/SignIn/model/signIn.schema'
import { saveTokenToCookie } from '@/services/auth/auth-token.service'

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

			router.replace('/dashboard')
		},
		onError: (err: { message: string }) => {
			// console.error(err.message || 'Ошибка при авторизации');
			alert(err.message || 'Ошибка при авторизации')
		},
	})

	return {
		login,
		isLoading: isPending,
		serverError: error?.message || null,
		isSuccess,
	}
}
