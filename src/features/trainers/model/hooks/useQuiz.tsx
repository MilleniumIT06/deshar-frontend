/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useImperativeHandle, type Ref } from 'react'

import { type TrainerStatus } from '@/widgets/trainers-engine/types/types'

import { useTrainerCheck } from './useTrainerCheck'

import type { Id } from '@/shared/types/types'

interface UseQuizLogicProps<T> {
	ref: Ref<any>
	correctValue: T | T[]
	isCompleted?: boolean
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: TrainerStatus) => void
}

export function useQuizLogic<T>({ ref, correctValue, isCompleted = false, onSuccess, onError, changeStatus }: UseQuizLogicProps<T>) {
	const isMulti = Array.isArray(correctValue)
	const [isSubmitted, setIsSubmitted] = useState(false)

	const [selected, setSelected] = useState<T | T[]>(isMulti ? [] : (null as any))

	const { runCheck } = useTrainerCheck({
		isCompleted,
		onSuccess,
		onError,
		changeStatus,
	})

	useImperativeHandle(ref, () => ({
		handleCheck: async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
			const hasSelection = isMulti ? (selected as T[]).length > 0 : selected !== null
			if (!hasSelection) return

			setIsSubmitted(true)

			const formattedAnswer = isMulti ? (selected as T[]) : selected

			const isCorrectClient = isMulti
				? (selected as T[]).length === (correctValue as T[]).length && (selected as T[]).every(v => (correctValue as T[]).includes(v))
				: selected === correctValue

			await runCheck(isCorrectClient, {
				moduleId,
				pieceId,
				lessonId,
				taskId,
				answer: formattedAnswer,
				timeSpent,
			})
		},
		handleReset: () => {
			setIsSubmitted(false)
			setSelected(isMulti ? [] : (null as any))
			changeStatus('idle')
		},
	}))

	const handleSelect = (id: any) => {
		if (isSubmitted) {
			setIsSubmitted(false)
			changeStatus('idle')
		}

		setSelected(prev => {
			if (!isMulti) return id

			const arr = Array.isArray(prev) ? prev : []
			return arr.includes(id) ? arr.filter(v => v !== id) : [...arr, id]
		})
	}

	return {
		selected,
		isSubmitted,
		handleSelect,
	}
}
