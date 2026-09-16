/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { educationService } from '@/services/education/education.service'

import type { Id } from '@/shared/types/types'

type TaskProgress = {
	task: Record<string, any>
	lesson: Record<string, any>
	piece: Record<string, any>
	module: Record<string, any>
}

type CheckAnswerResponse = {
	success: boolean
	is_correct: boolean
	message: string
	task: { id: Id; title: string; xp_reward: number }
	task_type: { id: Id; name: string; slug: string }
	progress?: TaskProgress
	xp_earned?: number
	attempts?: number
	attempts_left?: number
	hint?: string | null
}

type CheckAnswerParams = {
	moduleId: Id
	pieceId: Id
	lessonId: Id
	taskId: Id
	answer: unknown
	timeSpent: number
}

type UseCheckAnswerOptions = {
	onSuccess?: (data: CheckAnswerResponse) => void
	onError?: (data: CheckAnswerResponse) => void
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

		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: ['ing-module-by-id', Number(variables.moduleId)],
			})
			console.log('vedartest', data)
			console.log(data?.is_correct || data?.is_completed)
			if (data?.is_correct || data?.is_completed) {
				options.onSuccess?.(data)
			} else {
				options.onError?.(data)
			}
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
