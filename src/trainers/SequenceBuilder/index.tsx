'use client'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useState, forwardRef, useImperativeHandle, useCallback } from 'react'

import { useCheckAnswer } from '@/hooks/trainers/useCheckAnswer'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import { Slot } from './slot'
import { Variant } from './variant'

import type { Id, TrainerCommonProps } from '@/shared/types/types'
import './styles.scss'


interface ISequenceSlot {
	slotId: number | string
	content: string
	correctValue: string
}

interface ISequenceVariant {
	id: number | string
	content: string
}

interface SequenceBuilderProps extends TrainerCommonProps {
	payload: {
		slots: ISequenceSlot[]
		variants: ISequenceVariant[]
	}
}

export const SequenceBuilder = forwardRef(
	(
		{
			payload,
			title,
			subTitle,
			onSuccess,
			onError,
			changeStatus,
			currentTrainerIndex,
			audio,
		}: SequenceBuilderProps,
		ref,
	) => {
		const [currentValues, setCurrentValues] = useState<Record<string | number, string | null>>(
			Object.fromEntries(payload.slots.map(s => [s.slotId, null])),
		)
		const generateInitialState = useCallback(
			() => Object.fromEntries(payload.slots.map(s => [s.slotId, null])),
			[payload.slots],
		)
		const { checkAnswer, isLoading } = useCheckAnswer()

		const checkResult = async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
			if (isLoading) return
			if (!moduleId || !pieceId || !lessonId || !taskId) return

			const isAllCorrectClient = payload.slots.every(slot => currentValues[slot.slotId] === slot.correctValue)

			if (isAllCorrectClient) {
				changeStatus('success')
			} else {
				changeStatus('error')
			}
			const data = await checkAnswer({
				moduleId,
				pieceId,
				lessonId,
				taskId,
				answer: currentValues,
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

			if (isAllCorrectClient !== data.is_correct) {
				// eslint-disable-next-line no-console
				console.warn('Client/server mismatch on answer check', {
					taskId,
					isAllCorrectClient,
					serverResult: data.is_correct,
				})
			}
		}

		useImperativeHandle(ref, () => ({
			handleCheck: checkResult,
			handleReset: () => {
				setCurrentValues(generateInitialState())
				changeStatus('idle')
			},
		}))

		const handleDragEnd = (event: DragEndEvent) => {
			const { active, over } = event
			if (isLoading) return

			if (over) {
				setCurrentValues(prev => ({
					...prev,
					[over.id]: active.data.current?.content,
				}))
				changeStatus('idle')
			}
		}

		const isVariantUsed = (content: string) => Object.values(currentValues).includes(content)

		return (
			<div className="sequence-builder">
				<DndContext onDragEnd={handleDragEnd}>
					<div className="sequence-builder__content">
						<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
						<TrainerTitle title={title} audio={audio} />

						{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}

						<div className="sequence-builder__columns">
							<div className="sequence-builder__column">
								{payload.slots.map(slot => (
									<Slot
										key={slot.slotId}
										id={slot.slotId}
										content={slot.content}
										value={currentValues[slot.slotId]}
									/>
								))}
							</div>

							<div className="sequence-builder__column">
								{payload.variants.map(variant => (
									<Variant
										key={variant.id}
										id={variant.id}
										content={variant.content}
										isDisabled={isVariantUsed(variant.content)}
									/>
								))}
							</div>
						</div>
					</div>
				</DndContext>
			</div>
		)
	},
)

SequenceBuilder.displayName = 'SequenceBuilder'
