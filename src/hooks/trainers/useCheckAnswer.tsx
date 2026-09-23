import { useMutation, useQueryClient } from '@tanstack/react-query'

import { educationService } from '@/services/education/education.service'

import type { Id } from '@/shared/types/types'

type CheckAnswerParams = {
	moduleId: Id
	pieceId: Id
	lessonId: Id
	taskId: Id
	answer: unknown
	timeSpent: number
}

type UseCheckAnswerOptions = {
	onRequestError?: (error: unknown) => void
}

export const useCheckAnswer = (options: UseCheckAnswerOptions = {}) => {
	const queryClient = useQueryClient()

	const mutation = useMutation({
		mutationFn: ({ moduleId, pieceId, lessonId, taskId, answer, timeSpent }: CheckAnswerParams) =>
			educationService.checkTask(moduleId, pieceId, lessonId, taskId, {
				answer,
				time_spent: timeSpent,
			}),

		onSuccess: (_data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['ing-module-by-id', Number(variables.moduleId)],
			})
		},
		onError: error => {
			options.onRequestError?.(error)
		},
	})

	return {
		checkAnswer: mutation.mutateAsync,
		isLoading: mutation.isPending,
		error: mutation.error,
		result: mutation.data ?? null,
	}
}
