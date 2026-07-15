import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'


import { registerService } from '@/services/auth/register.service'

import { type RegistrationCompleteData } from '../ProgramSelection/IngushetiaForm'

export function useSignUp() {
	const router = useRouter()
	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ['create user'],
		mutationFn: (data: RegistrationCompleteData) => registerService.register(data),
		onSuccess: () => {
			router.replace('/')
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
