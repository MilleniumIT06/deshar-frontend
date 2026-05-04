import { useState, useMemo, useCallback, useImperativeHandle, forwardRef } from 'react'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { ConclusionVariant } from './variant'
import { SlotInput } from './slot'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import cn from 'classnames'
import './styles.scss'
import { type TrainerCommonProps } from '@/shared/types/types'

type Slot = {
	id: number
	correct: string
	current: string | null
}

type Variant = {
	id: number
	value: string
}

type ConclusionItem = {
	id: number
	value: string
	slots: Slot[]
	variants: Variant[]
	completed: boolean
}

interface ConclusionProps extends TrainerCommonProps {
	payload: {
		data: ConclusionItem[]
	}
}

export const Conclusion = forwardRef(
	(
		{
			payload: { data },
			onSuccess,
			onError,
			changeStatus,
			title,
			subTitle,
			currentTrainerIndex,
		}: ConclusionProps,
		ref,
	) => {
		const [content, setContent] = useState<ConclusionItem[]>([...data])
		const [currentItemIndex, setCurrentItemIndex] = useState(0)
		const [isError] = useState(false)

		const currentItem = content[currentItemIndex]

		useImperativeHandle(ref, () => ({
			handleCheck: () => {
				const allFilled = currentItem.slots.every(s => s.current !== null)
				if (!allFilled) return

				const isCorrect = currentItem.slots.every(s => s.current === s.correct)

				if (isCorrect) {
					setContent(prev =>
						prev.map(item => (item.id === currentItem.id ? { ...item, completed: true } : item)),
					)
					if (currentItemIndex === content.length - 1) {
						changeStatus('success')
						onSuccess()
						return
					}
					if (currentItemIndex < content.length - 1) {
						setTimeout(() => {
							setCurrentItemIndex(prev => prev + 1)
							changeStatus('idle')
						}, 500)
					}
				} else {
					changeStatus('error')
					onError()
				}
			},
			handleReset: () => {
				changeStatus('idle')
				setContent(prev =>
					prev.map(item =>
						item.id === currentItem.id
							? { ...item, slots: item.slots.map(s => ({ ...s, current: null })) }
							: item,
					),
				)
			},
		}))
		const handleDragEnd = useCallback(
			(event: DragEndEvent) => {
				const { active, over } = event
				if (!over) return

				const slotId = Number(over.id)
				const draggedValue = active.data.current?.value
				if (!draggedValue) return

				changeStatus('idle')

				setContent(prev =>
					prev.map(item =>
						item.id === currentItem.id
							? {
									...item,
									slots: item.slots.map(slot =>
										slot.id === slotId ? { ...slot, current: draggedValue } : slot,
									),
								}
							: item,
					),
				)
			},
			[currentItem.id, changeStatus],
		)

		const renderContent = (sentence: string) => {
			const parts = sentence.split(/\{\{([^{}]+)\}\}/g)
			return parts.map((part, index) => {
				const match = currentItem.slots.find(slot => slot.correct === part)
				if (match) {
					return (
						<SlotInput key={`slot-input${match.id}`} id={match.id.toString()} value={match.current} />
					)
				}
				return (
					<span key={index} className="conclusion-trainer__text-part">
						{part}
					</span>
				)
			})
		}

		const getRowClassName = useCallback(
			(item: ConclusionItem) => {
				const isActive = item.id === currentItem.id || item.completed

				return cn('conclusion-trainer__row', {
					'conclusion-trainer__row--visible': isActive,
					'conclusion-trainer__row--hidden': !isActive,
				})
			},
			[currentItem.id],
		)
		const usedVariants = useMemo(() => {
			const used = new Set<string>()
			currentItem.slots.forEach(slot => {
				if (slot.current) used.add(slot.current)
			})
			return used
		}, [currentItem.slots])
		return (
			<div className="conclusion-trainer">
				<DndContext onDragEnd={handleDragEnd}>
					<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
					<TrainerTitle title={title} />

					{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}

					<div className="conclusion-trainer__container">
						<div
							className={cn(
								'conclusion-trainer__workspace',
								isError && 'conclusion-trainer__workspace--error',
							)}>
							{content.map(item => (
								<div
									key={`content-${item.id}`}
									className={cn('conclusion-trainer__row', getRowClassName(item))}>
									{renderContent(item.value)}
								</div>
							))}
						</div>

						<div className="conclusion-trainer__variants">
							{currentItem.variants.map(variant => (
								<ConclusionVariant
									key={`variant-${variant.id}`}
									id={variant.id.toString()}
									value={variant.value}
									isDisabled={usedVariants.has(variant.value)}
								/>
							))}
						</div>
					</div>
				</DndContext>
			</div>
		)
	},
)

Conclusion.displayName = 'Conclusion'
