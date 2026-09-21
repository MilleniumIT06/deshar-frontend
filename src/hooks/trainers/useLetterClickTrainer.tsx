/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useImperativeHandle, type Ref } from 'react'

import { type TrainerStatus } from '@/widgets/trainers-engine/types/types'

import { useTrainerCheck } from './useTrainerCheck'

import type { Id } from '@/shared/types/types'

interface UseLetterClickTrainerProps {
	ref: Ref<any>
	correctIds: (number | string)[]
	isCompleted?: boolean
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: TrainerStatus) => void
	isMulti?: boolean
}

export function useLetterClickTrainer({
	ref,
	correctIds = [],
	isCompleted = false,
	onSuccess,
	onError,
	changeStatus,
	isMulti = false,
}: UseLetterClickTrainerProps) {
	const [selectedIds, setSelectedIds] = useState<(number | string)[]>([])

	const { runCheck } = useTrainerCheck({
		isCompleted,
		onSuccess,
		onError,
		changeStatus,
	})

	useImperativeHandle(ref, () => ({
		handleCheck: async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
			if (selectedIds.length === 0) return

			const isCorrectClient = isMulti
				? selectedIds.length === correctIds.length && selectedIds.every(id => correctIds.includes(id))
				: selectedIds.length === 1 && correctIds.includes(selectedIds[0])

			await runCheck(isCorrectClient, {
				moduleId,
				pieceId,
				lessonId,
				taskId,
				answer: selectedIds,
				timeSpent,
			})
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
