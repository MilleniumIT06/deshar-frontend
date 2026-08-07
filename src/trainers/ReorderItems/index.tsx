'use client'
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
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState, useImperativeHandle, forwardRef } from 'react'

import { useCheckAnswer } from '@/hooks/trainers/useCheckAnswer'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import './styles.scss'

import { ReorderableItem } from './item'

import type { Id, TrainerCommonProps } from '@/shared/types/types'
import type { TrainerRef } from '@/widgets/trainers-engine/types/types'

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
	({ status, changeStatus, payload, onSuccess, onError, title, currentTrainerIndex, subTitle, audio }, ref) => {
		const [data, setData] = useState<IReorderPayload>(payload)

		const sensors = useSensors(
			useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
			useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
		)
		const { checkAnswer, isLoading } = useCheckAnswer()

		useImperativeHandle(ref, () => ({
			handleCheck: async (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => {
				if (isLoading) return

				if (!moduleId || !pieceId || !lessonId || !taskId) return

				const currentOrder = data.data.map(item => item.id)

				const isCorrectClient = JSON.stringify(currentOrder) === JSON.stringify(data.correctOrderIds)

				if (isCorrectClient) {
					changeStatus('success')
				} else {
					changeStatus('error')
				}

				const serverData = await checkAnswer({
					moduleId,
					pieceId,
					lessonId,
					taskId,
					answer: currentOrder,
					timeSpent: timeSpent ?? 0,
				})

				if (!serverData) return

				if (serverData.is_correct) {
					changeStatus('success')
					onSuccess?.()
				} else {
					changeStatus('error')
					onError?.()
				}

				if (isCorrectClient !== serverData.is_correct) {
					// eslint-disable-next-line no-console
					console.warn('Client/server mismatch on answer check', {
						taskId,
						isCorrectClient,
						serverResult: serverData.is_correct,
					})
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
				<TrainerTitle title={title} audio={audio} />
				{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}
				<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToHorizontalAxis]}>
					<SortableContext items={data.data.map(item => item.id)} strategy={horizontalListSortingStrategy}>
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
