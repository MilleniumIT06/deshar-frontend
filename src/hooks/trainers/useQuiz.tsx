/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useImperativeHandle, type Ref } from 'react'

import { useCheckAnswer } from './useCheckAnswer'

import type { Id } from '@/shared/types/types'

interface UseQuizLogicProps<T> {
	ref: Ref<any>
	correctValue: T | T[]
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success' | 'checking') => void
}

export function useQuizLogic<T>({ ref, correctValue, onSuccess, onError, changeStatus }: UseQuizLogicProps<T>) {
	// Автоматически определяем, мульти-выбор это или нет
	const isMulti = Array.isArray(correctValue)
	const { checkAnswer, isLoading } = useCheckAnswer()
	const [isSubmitted, setIsSubmitted] = useState(false)

	const [selected, setSelected] = useState<T | T[]>(isMulti ? [] : (null as any))

	useImperativeHandle(ref, () => ({
		handleCheck: async (moduleId: Id, pieceId: Id, lessonId: Id, taskId: Id, timeSpent?: number) => {
			if (isLoading) {
				return
			}

			const hasSelection = isMulti ? (selected as T[]).length > 0 : selected !== null

			if (!hasSelection) return

			setIsSubmitted(true)
			changeStatus('checking')
			const formattedAnswer = isMulti ? (selected as T[]) : selected

			const data = await checkAnswer({
				moduleId,
				pieceId,
				lessonId,
				taskId,
				answer: formattedAnswer,
				timeSpent: timeSpent ?? 0,
			})

			if (!data) return

			if (data.is_correct) {
				changeStatus('success')
				onSuccess()
			} else {
				changeStatus('error')
				onError()
			}
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
