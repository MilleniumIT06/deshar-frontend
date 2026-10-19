// widgets/trainers-engine/hooks/useTrainerCheck.ts
import { useRef } from 'react'

import { type TrainerStatus } from '@/widgets/trainers-engine/types/types'

import { useCheckAnswer } from './useCheckAnswer'

import type { Id } from '@/shared/types/types'

interface CheckParams {
	moduleId?: Id
	pieceId?: Id
	lessonId?: Id
	taskId?: Id
	answer: unknown
	timeSpent?: number
}

interface UseTrainerCheckProps {
	isCompleted: boolean
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: TrainerStatus) => void
}

export function useTrainerCheck({ isCompleted, onSuccess, onError, changeStatus }: UseTrainerCheckProps) {
	const { checkAnswer } = useCheckAnswer()
	const isCheckingRef = useRef(false)

	const runCheck = async (isCorrectClient: boolean, params: CheckParams) => {
		if (isCheckingRef.current) return
		isCheckingRef.current = true
		changeStatus('checking')

		try {
			if (isCompleted) {
				isCorrectClient ? (changeStatus('success'), onSuccess()) : (changeStatus('error'), onError())
				return
			}

			const { moduleId, pieceId, lessonId, taskId, answer, timeSpent } = params
			if (!moduleId || !pieceId || !lessonId || !taskId) return

			const data = await checkAnswer({ moduleId, pieceId, lessonId, taskId, answer, timeSpent: timeSpent ?? 0 })
			if (!data) return

			const isTaskSuccessful =
				data.is_correct ||
				(data.is_completed && isCorrectClient) ||
				(data.is_completed === true && data.message === 'Задание уже выполнено')

			if (isTaskSuccessful) {
				changeStatus('success')
				onSuccess()
				return
			}

			if (data.attempts_left === 0) {
				changeStatus('attempts-left')
				return
			}

			if (data.is_correct === false) {
				changeStatus('error')
				onError()
				return
			}

			if (isCorrectClient !== data.is_correct) {
				// eslint-disable-next-line no-console
				console.warn('Client/server mismatch on answer check', { taskId, isCorrectClient, serverResult: data.is_correct })
			}
		} finally {
			isCheckingRef.current = false
		}
	}

	return { runCheck, isCheckingRef }
}
