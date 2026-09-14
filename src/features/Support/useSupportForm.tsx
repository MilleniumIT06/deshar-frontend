import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { supportService } from '@/services/support/support.service'

import { type supportFormData } from './model/support.schema'

export function useSupportForm() {
	const {
		mutate: send,
		isPending,
		error,
		isSuccess,
	} = useMutation({
		mutationKey: ['supportForm'],
		mutationFn: (data: supportFormData) => supportService.send(data),
		onSuccess: () => {
			toast.success('Успешно отправлено!', { style: { backgroundColor: 'var(--neutral-white)' } })
		},
		onError: (err: { message: string }) => {
			alert(err.message || 'Ошибка при отправке')
		},
	})

	return {
		send,
		isLoading: isPending,
		serverError: error?.message || null,
		isSuccess,
	}
}
