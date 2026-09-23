import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useState, forwardRef, useImperativeHandle } from 'react'

import { useTrainerCheck } from '@/hooks/trainers/useTrainerCheck'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import { AlphabeticalSlot } from './Slot'
import { AlphabeticalSorterVariant } from './Variant'

import './styles.scss'

import type { Id } from '@/shared/types/types'
import type { TrainerCommonProps, TrainerRef } from '@/widgets/trainers-engine/types/types'

interface AlphabeticalSorterProps extends TrainerCommonProps {
	payload: {
		slots: {
			id: number
			correctValue: string
			slotTitle: string | null
		}[]
		variants: {
			id: number
			value: string
		}[]
	}
}

export const AlphabeticalSorter = forwardRef<TrainerRef, AlphabeticalSorterProps>(
	({ payload, onSuccess, onError, changeStatus, title, currentTrainerIndex, subTitle, audio, isAlreadyCompleted }, ref) => {
		const [slots, setSlots] = useState(payload.slots.map(item => ({ ...item, currentValue: null as string | null })))

		const { runCheck, isCheckingRef } = useTrainerCheck({
			isCompleted: isAlreadyCompleted ?? false,
			onSuccess,
			onError,
			changeStatus,
		})

		const handleDragEnd = (event: DragEndEvent) => {
			const { active, over } = event
			if (over) {
				setSlots(prev => prev.map(slot => (slot.id === over.id ? { ...slot, currentValue: active.data.current?.value } : slot)))
			}
		}

		const disableVariant = (variantValue: string) => {
			return slots.some(item => item.currentValue === variantValue)
		}

		useImperativeHandle(ref, () => ({
			handleCheck: async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
				const isAllCorrectClient = slots.every(slot => slot.correctValue === slot.currentValue)

				const formattedAnswers = slots.map(slot => ({
					[slot.id]: slot.currentValue,
				}))

				await runCheck(isAllCorrectClient, {
					moduleId,
					pieceId,
					lessonId,
					taskId,
					answer: formattedAnswers,
					timeSpent,
				})
			},
			handleReset: () => {
				setSlots(prev => prev.map(item => ({ ...item, currentValue: null })))
				changeStatus('idle')
			},
		}))

		return (
			<div className="alphabetical-sorter">
				<DndContext onDragEnd={handleDragEnd}>
					<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
					<TrainerTitle audio={audio} title={title} />
					{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}
					<div className="alphabetical-sorter__grid">
						{slots.map((slot, index) => (
							<AlphabeticalSlot key={`slot-${slot.id}`} id={slot.id} orderNumber={index + 1} value={slot.currentValue} />
						))}
					</div>

					<div className="alphabetical-sorter__variants-container">
						<ul className="alphabetical-sorter__list">
							{payload.variants.map(variant => (
								<AlphabeticalSorterVariant
									key={variant.id}
									id={variant.id}
									isDisabled={disableVariant(variant.value) || isCheckingRef.current}
									value={variant.value}
								/>
							))}
						</ul>
					</div>
				</DndContext>
			</div>
		)
	},
)

AlphabeticalSorter.displayName = 'AlphabeticalSorter'
