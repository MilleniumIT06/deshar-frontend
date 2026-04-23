'use client'
import { Variant } from './variant'
import { DndContext } from '@dnd-kit/core'
import { forwardRef } from 'react'
import { DropWordToTextItem } from './item'
import { useDndTrainer } from '@/hooks/trainers/useDndTrainer'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import './styles.scss'

interface IVariant {
	id: number
	value: string
}

interface IPayloadItem {
	id: number
	content: string
	correctVariantId: number
}

interface DropWordToTextProps {
	title: string
	subTitle?: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
	payload: {
		items: IPayloadItem[]
		variants: IVariant[]
	}
}

export interface DropWordRef {
	handleCheck: () => void
	handleReset: () => void
}

export const DropWordToText = forwardRef<DropWordRef, DropWordToTextProps>(
	({ title, subTitle, onSuccess, onError, changeStatus, payload }, ref) => {
		const { selections, isSubmitted, handleDragEnd, isVariantUsed } = useDndTrainer({
			items: payload.items,
			onSuccess,
			onError,
			changeStatus,
			ref,
		})

		const getVariantValueById = (id: number | null) => {
			return payload.variants.find(v => v.id === id)?.value || null
		}

		return (
			<DndContext onDragEnd={handleDragEnd}>
				<div className="drop-word-trainer">
					<div className="drop-word-trainer__header">
						<TrainerTitle title={title} />
						{subTitle && <p className="drop-word-trainer__subtitle">{subTitle}</p>}
					</div>

					<div className="drop-word-trainer__items-list">
						{payload.items.map(item => (
							<DropWordToTextItem
								key={item.id}
								id={item.id}
								content={item.content}
								currentValue={getVariantValueById(selections[item.id])}
							/>
						))}
					</div>

					<div className="drop-word-trainer__variants-pool">
						{payload.variants.map(variant => (
							<Variant
								key={variant.id}
								id={variant.id}
								value={variant.value}
								isDisabled={isVariantUsed(variant.id) || isSubmitted}
							/>
						))}
					</div>
				</div>
			</DndContext>
		)
	},
)

DropWordToText.displayName = 'DropWordToText'
