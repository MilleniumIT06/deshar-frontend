'use client'
import { useState, forwardRef, useImperativeHandle, useCallback } from 'react'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'

import { Slot } from './slot'
import { Variant } from './variant'
import './styles.scss'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

interface ISequenceSlot {
	slotId: number | string
	content: string
	correctValue: string
}

interface ISequenceVariant {
	id: number | string
	content: string
}

interface SequenceBuilderProps {
	title: string
	subTitle?: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success' | 'finish') => void
	payload: {
		slots: ISequenceSlot[]
		variants: ISequenceVariant[]
	}
}

export const SequenceBuilder = forwardRef(
	({ payload, title, subTitle, onSuccess, onError, changeStatus }: SequenceBuilderProps, ref) => {
		const [currentValues, setCurrentValues] = useState<Record<string | number, string | null>>(
			Object.fromEntries(payload.slots.map(s => [s.slotId, null])),
		)
		const generateInitialState = useCallback(
			() => Object.fromEntries(payload.slots.map(s => [s.slotId, null])),
			[payload.slots],
		)
		const checkResult = () => {
			const isAllCorrect = payload.slots.every(slot => currentValues[slot.slotId] === slot.correctValue)

			if (isAllCorrect) {
				changeStatus('success')
				onSuccess()
			} else {
				changeStatus('error')
				onError()
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
						<span className="trainer-number-title">Тренажер 1</span>
						<TrainerTitle title={title} />

						{subTitle && <h2 className="sequence-builder__subtitle">{subTitle}</h2>}

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
