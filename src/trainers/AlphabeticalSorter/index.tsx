import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useState, forwardRef, useImperativeHandle } from 'react'

import { useCheckAnswer } from '@/hooks/trainers/useCheckAnswer'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import { AlphabeticalSlot } from './Slot'
import { AlphabeticalSorterVariant } from './Variant'

import './styles.scss'

import type { Id, TrainerCommonProps } from '@/shared/types/types'
import type { TrainerRef } from '@/widgets/trainers-engine/types/types'

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
	({ payload, onSuccess, onError, changeStatus, title, currentTrainerIndex, subTitle, audio }, ref) => {
		const [slots, setSlots] = useState(payload.slots.map(item => ({ ...item, currentValue: null as string | null })))
		const { checkAnswer } = useCheckAnswer({
			onSuccess: () => changeStatus('success'),
			onError: () => changeStatus('error'),
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
				if (!moduleId || !pieceId || !lessonId || !taskId) return
				const isAllCorrectClient = slots.every(slot => slot.correctValue === slot.currentValue)
				changeStatus(isAllCorrectClient ? 'success' : 'error')

				const formattedAnswers = slots.map(slot => ({
					[slot.id]: slot.currentValue,
				}))

				const data = await checkAnswer({
					moduleId,
					pieceId,
					lessonId,
					taskId,
					answer: formattedAnswers,
					timeSpent: timeSpent ?? 0,
				})

				if (data?.is_correct) {
					onSuccess()
				} else {
					onError()
				}

				if (isAllCorrectClient !== data?.is_correct) {
					// eslint-disable-next-line no-console
					console.warn('Client/server mismatch on answer check', {
						taskId,
						isAllCorrectClient,
						serverResult: data?.is_correct,
					})
				}
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
									isDisabled={disableVariant(variant.value)}
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
