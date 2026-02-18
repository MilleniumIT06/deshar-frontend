import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'

import { registerService } from '@/services/auth/register.service'

import { type RegistrationCompleteData } from '../ProgramSelection/IngushetiaForm'

export function useSignUp() {
	const router = useRouter()
	const { mutate, isPending } = useMutation({
		mutationKey: ['create user'],
		mutationFn: (data: RegistrationCompleteData) => registerService.register(data),
		onSuccess: () => {
			// console.log(data)
			router.replace('/')
		},
		onError(error) {
			if (error.message) {
				// console.log(error.message)
				alert('error')
			} else {
				alert('Ошибка при регистрации')
			}
		},
	})
	return { mutate, isPending }
}

// avatar
// :
// "defaultAvatar.png"
// birth_date
// :
// "2000-01-01"
// country_id
// :
// 1
// district_id
// :
// 1
// email
// :
// "islamparchev006@gmail.com"
// name
// :
// "Ислам Парчиев"
// password
// :
// "12345678"
// password_confirmation
// :
// "12345678"
// region_id
// :
// 1
// role_id
// :
// 1
// user_type
// :
// "student"
