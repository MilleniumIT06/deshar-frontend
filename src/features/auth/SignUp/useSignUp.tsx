import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'

import { registerService } from '@/services/auth/register.service'

import { type RegistrationCompleteData } from '../ProgramSelection/IngushetiaForm'

export function useSignUp() {
	const router = useRouter()
	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ['create user'],
		mutationFn: (data: RegistrationCompleteData) => registerService.register(data),
		onSuccess: (data) => {
			console.log('useSignUp data:', data)
			router.replace('/')
		},
		onError(error) {
			// console.log(error)
			if (error.message) {
				console.log('useSignUp error:', error.message)
				alert('error')
			} else {
				alert('Ошибка при регистрации')
			}
		},
	})
	return { mutate, isPending, isSuccess }
}
