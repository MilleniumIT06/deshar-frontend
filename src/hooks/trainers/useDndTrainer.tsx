/* eslint-disable @typescript-eslint/no-explicit-any */
import { type DragEndEvent } from '@dnd-kit/core'
import { useState, useImperativeHandle, type ForwardedRef } from 'react'

import { useTrainerCheck } from './useTrainerCheck'

import type { Id } from '@/shared/types/types'

interface TrainerItem {
	id: number | string
	correctVariantId: number | string
}

interface UseDndTrainerProps<T extends TrainerItem> {
	items: T[]
	isCompleted?: boolean
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: any) => void
	ref: ForwardedRef<any>
}

export const useDndTrainer = <T extends TrainerItem>({
	items,
	isCompleted = false,
	onSuccess,
	onError,
	changeStatus,
	ref,
}: UseDndTrainerProps<T>) => {
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [selections, setSelections] = useState<Record<number | string, number | string | null>>(
		Object.fromEntries(items.map(item => [item.id, null])),
	)

	const { runCheck } = useTrainerCheck({
		isCompleted,
		onSuccess,
		onError,
		changeStatus,
	})

	useImperativeHandle(ref, () => ({
		handleCheck: async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
			const allFilled = items.every(item => selections[item.id] !== null)
			if (!allFilled) return

			setIsSubmitted(true)

			const formattedAnswers = Object.fromEntries(items.map(item => [item.id, selections[item.id]]))

			const isCorrectClient = items.every(item => selections[item.id] === item.correctVariantId)

			await runCheck(isCorrectClient, {
				moduleId,
				pieceId,
				lessonId,
				taskId,
				answer: formattedAnswers,
				timeSpent,
			})
		},
		handleReset: () => {
			setIsSubmitted(false)
			setSelections(Object.fromEntries(items.map(item => [item.id, null])))
			changeStatus('idle')
		},
	}))

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (over && !isSubmitted) {
			const variantId = active.id
			const itemId = over.id

			setSelections(prev => ({
				...prev,
				[itemId]: variantId,
			}))
		}
	}

	const isVariantUsed = (variantId: number | string) => Object.values(selections).includes(variantId)

	return {
		selections,
		isSubmitted,
		handleDragEnd,
		isVariantUsed,
		setSelections,
	}
}
