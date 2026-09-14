/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useImperativeHandle, type Ref } from 'react'

import { type TrainerStatus } from '@/widgets/trainers-engine/types/types'

import { useCheckAnswer } from './useCheckAnswer'

import type { Id } from '@/shared/types/types'

interface UseLetterClickTrainerProps {
	ref: Ref<any>
	correctIds: (number | string)[]
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: TrainerStatus) => void
	isMulti?: boolean
}

export function useLetterClickTrainer({ ref, correctIds = [], onSuccess, onError, changeStatus, isMulti = false }: UseLetterClickTrainerProps) {
	const [selectedIds, setSelectedIds] = useState<(number | string)[]>([])
	const { checkAnswer } = useCheckAnswer()
	const isCheckingRef = useRef(false)

	useImperativeHandle(ref, () => ({
		handleCheck: async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
			if (isCheckingRef.current) return
			if (selectedIds.length === 0) return
			if (!moduleId || !pieceId || !lessonId || !taskId) return

			isCheckingRef.current = true
			changeStatus('checking')

			try {
				const isCorrectClient = isMulti
					? selectedIds.length === correctIds.length && selectedIds.every(id => correctIds.includes(id))
					: selectedIds.length === 1 && correctIds.includes(selectedIds[0])

				const data = await checkAnswer({
					moduleId,
					pieceId,
					lessonId,
					taskId,
					answer: selectedIds,
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

				if (isCorrectClient !== data.is_correct) {
					// eslint-disable-next-line no-console
					console.warn('Client/server mismatch on answer check', {
						taskId,
						isCorrectClient,
						serverResult: data.is_correct,
					})
				}
			} finally {
				isCheckingRef.current = false
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
