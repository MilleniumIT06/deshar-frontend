import { useState, forwardRef, useImperativeHandle } from 'react'
import { AlphabeticalSlot } from './Slot'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { AlphabeticalSorterVariant } from './Variant'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import './styles.scss'

interface AlphabeticalSorterProps {
	title: string
	subTitle?: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (value: 'idle' | 'error' | 'success') => void
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

export interface AlphabeticalSorterRef {
	handleCheck: () => void
	handleReset: () => void
}

export const AlphabeticalSorter = forwardRef<AlphabeticalSorterRef, AlphabeticalSorterProps>(
	({ payload, onSuccess, onError, changeStatus, title }, ref) => {
		const [slots, setSlots] = useState(
			payload.slots.map(item => ({ ...item, currentValue: null as string | null })),
		)

		const handleDragEnd = (event: DragEndEvent) => {
			const { active, over } = event
			if (over) {
				setSlots(prev =>
					prev.map(slot =>
						slot.id === over.id ? { ...slot, currentValue: active.data.current?.value } : slot,
					),
				)
			}
		}

		const disableVariant = (variantValue: string) => {
			return slots.some(item => item.currentValue === variantValue)
		}

		useImperativeHandle(ref, () => ({
			handleCheck: () => {
				const isAllCorrect = slots.every(slot => slot.correctValue === slot.currentValue)
				if (isAllCorrect) {
					changeStatus('success')
					onSuccess()
				} else {
					changeStatus('error')
					onError()
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
					<TrainerTitle title={title} />

					<div className="alphabetical-sorter__grid">
						{slots.map((slot, index) => (
							<AlphabeticalSlot
								key={`slot-${slot.id}`}
								id={slot.id}
								orderNumber={index + 1}
								value={slot.currentValue}
							/>
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
