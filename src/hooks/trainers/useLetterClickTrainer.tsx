/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useImperativeHandle, type Ref } from 'react'

import { useCheckAnswer } from './useCheckAnswer'

import type { Id } from '@/shared/types/types'

interface UseLetterClickTrainerProps {
	ref: Ref<any>
	correctIds: (number | string)[]
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
	isMulti?: boolean
}

export function useLetterClickTrainer({
	ref,
	correctIds = [],
	onSuccess,
	onError,
	changeStatus,
	isMulti = false,
}: UseLetterClickTrainerProps) {
	const [selectedIds, setSelectedIds] = useState<(number | string)[]>([])
	const { checkAnswer } = useCheckAnswer({
		onSuccess: () => changeStatus('success'),
		onError: () => changeStatus('error'),
	})
	useImperativeHandle(ref, () => ({
		handleCheck: async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
			if (selectedIds.length === 0) return
			if (!moduleId || !pieceId || !lessonId || !taskId) return

			let isCorrectClient = false

			if (isMulti) {
				isCorrectClient =
					selectedIds.length === correctIds.length && selectedIds.every(id => correctIds.includes(id))
			} else {
				isCorrectClient = selectedIds.length === 1 && correctIds.includes(selectedIds[0])
			}

			changeStatus(isCorrectClient ? 'success' : 'error')

			const data = await checkAnswer({
				moduleId,
				pieceId,
				lessonId,
				taskId,
				answer: selectedIds,
				timeSpent: timeSpent ?? 0,
			})

			if (data?.is_correct) {
				onSuccess()
			} else {
				onError()
			}
			if (isCorrectClient !== data?.is_correct) {
  // eslint-disable-next-line no-console
  console.warn('Client/server mismatch on answer check', {
    taskId, isCorrectClient, serverResult: data?.is_correct,
  })
}
		},
		handleReset: () => {
			setSelectedIds([])
			changeStatus('idle')
		},
	}))

	const handleSelect = (id: number | string) => {
		changeStatus('idle')

		setSelectedIds(prev => {
			if (!isMulti) return [id]

			return prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
		})
	}

	return {
		selectedIds,
		handleSelect,
	}
}
