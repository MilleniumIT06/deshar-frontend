/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useImperativeHandle, type ForwardedRef } from 'react'
import { type DragEndEvent } from '@dnd-kit/core'

interface TrainerItem {
	id: number | string
	correctVariantId: number | string
}

interface UseDndTrainerProps<T extends TrainerItem> {
	items: T[]
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: any) => void
	ref: ForwardedRef<any>
}

export const useDndTrainer = <T extends TrainerItem>({
	items,
	onSuccess,
	onError,
	changeStatus,
	ref,
}: UseDndTrainerProps<T>) => {
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [selections, setSelections] = useState<Record<number | string, number | string | null>>(
		Object.fromEntries(items.map(item => [item.id, null])),
	)

	useImperativeHandle(ref, () => ({
		handleCheck: () => {
			const allFilled = items.every(item => selections[item.id] !== null)
			if (!allFilled) return

			setIsSubmitted(true)
			const isCorrect = items.every(item => selections[item.id] === item.correctVariantId)

			if (isCorrect) {
				onSuccess()
				changeStatus('success')
			} else {
				onError()
				changeStatus('error')
			}
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
			const variantId = Number(active.id)
			const itemId = Number(over.id)

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
