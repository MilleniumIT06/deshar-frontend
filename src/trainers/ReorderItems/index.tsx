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

export interface IOrderItem {
	id: UniqueIdentifier
	content: string
}

export interface IReorderPayload {
	data: IOrderItem[]
	correctOrderIds: UniqueIdentifier[]
}

export interface ReorderItemsRef {
	handleCheck: () => void
	handleReset: () => void
}

interface ReorderItemsProps {
	status: 'idle' | 'error' | 'success'
	title: string
	changeStatus: (value: 'idle' | 'error' | 'success') => void
	payload: IReorderPayload
	onSuccess?: () => void
	onError?: () => void
}

export const ReorderItems = forwardRef<ReorderItemsRef, ReorderItemsProps>(
	({ status, changeStatus, payload, onSuccess, onError, title }, ref) => {
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
				<span className="trainer-number-title">Тренажер 1</span>
				<TrainerTitle title={title} />
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
