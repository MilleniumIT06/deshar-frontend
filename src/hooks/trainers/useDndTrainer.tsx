/* eslint-disable @typescript-eslint/no-explicit-any */
import { type DragEndEvent } from '@dnd-kit/core'
import { useState, useImperativeHandle, type ForwardedRef } from 'react'

import { useCheckAnswer } from './useCheckAnswer'

import type { Id } from '@/shared/types/types'

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
	const { checkAnswer,isLoading } = useCheckAnswer()

	useImperativeHandle(ref, () => ({
   handleCheck: async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
    if (isLoading) {
		console.log('checking')
		changeStatus("checking")
		return
	}

    const allFilled = items.every(item => selections[item.id] !== null)
    if (!allFilled) return

    if (!moduleId || !pieceId || !lessonId || !taskId) return

    setIsSubmitted(true)

    const formattedAnswers = Object.fromEntries(
        items.map(item => [item.id, selections[item.id]])
    )

    try {
        const data = await checkAnswer({
            moduleId,
            pieceId,
            lessonId,
            taskId,
            answer: formattedAnswers,
            timeSpent: timeSpent ?? 0,
        })
        if (!data) {
            changeStatus('idle')
            setIsSubmitted(false)
            return
        }

        if (data.is_correct) {
            changeStatus('success')
            onSuccess()
        } else {
            changeStatus('error')
            onError()
        }
    } catch (e) {
        changeStatus('idle')
        setIsSubmitted(false)
        // eslint-disable-next-line no-console
        console.error(e)
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
