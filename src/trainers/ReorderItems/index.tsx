'use client'
import { useState, useImperativeHandle, forwardRef } from 'react'
import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	closestCenter,
	type UniqueIdentifier,
} from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import { ReorderableItem } from './item'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import './styles.scss'
import { type TrainerRef } from '@/widgets/trainers-engine'
import { type TrainerCommonProps } from '@/shared/types/types'

export interface IOrderItem {
	id: UniqueIdentifier
	content: string
}

export interface IReorderPayload {
	data: IOrderItem[]
	correctOrderIds: UniqueIdentifier[]
}

interface ReorderItemsProps extends TrainerCommonProps {
	status: 'idle' | 'error' | 'success'
	payload: IReorderPayload
}

export const ReorderItems = forwardRef<TrainerRef, ReorderItemsProps>(
	({ status, changeStatus, payload, onSuccess, onError, title, currentTrainerIndex, subTitle }, ref) => {
		const [data, setData] = useState<IReorderPayload>(payload)

		const sensors = useSensors(
			useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
			useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
		)

		useImperativeHandle(ref, () => ({
			handleCheck: () => {
				const currentOrder = data.data.map(item => item.id)
				const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(data.correctOrderIds)

				if (isCorrect) {
					onSuccess?.()
					changeStatus('success')
				} else {
					onError?.()
					changeStatus('error')
				}
			},
			handleReset: () => {
				setData(payload)
				changeStatus('idle')
			},
		}))

		function handleDragEnd(event: DragEndEvent) {
			const { active, over } = event
			if (status !== 'idle') changeStatus('idle')

			if (over && active.id !== over.id) {
				const oldIndex = data.data.findIndex(item => item.id === active.id)
				const newIndex = data.data.findIndex(item => item.id === over.id)

				setData(prev => ({
					...prev,
					data: arrayMove(prev.data, oldIndex, newIndex),
				}))
			}
		}

		return (
			<div className="reorder-items">
				<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
				<TrainerTitle title={title} />
				{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
					modifiers={[restrictToHorizontalAxis]}>
					<SortableContext
						items={data.data.map(item => item.id)}
						strategy={horizontalListSortingStrategy}>
						<div style={{ display: 'flex', gap: '10px' }}>
							{data.data.map(item => (
								<ReorderableItem key={item.id} id={item.id} content={item.content} />
							))}
						</div>
					</SortableContext>
				</DndContext>
			</div>
		)
	},
)

ReorderItems.displayName = 'ReorderItems'
