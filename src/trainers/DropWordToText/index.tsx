'use client'
import { DndContext } from '@dnd-kit/core'
import { forwardRef } from 'react'

import { useDndTrainer } from '@/hooks/trainers/useDndTrainer'
import { type TrainerCommonProps } from '@/shared/types/types'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import './styles.scss'
import { type TrainerRef } from '@/widgets/trainers-engine'

import { DropWordToTextItem } from './item'
import { Variant } from './variant'

interface IVariant {
	id: number
	value: string
}

interface IPayloadItem {
	id: number
	content: string
	correctVariantId: number
}

interface DropWordToTextProps extends TrainerCommonProps {
	payload: {
		items: IPayloadItem[]
		variants: IVariant[]
	}
}

export const DropWordToText = forwardRef<TrainerRef, DropWordToTextProps>(
	({ title, subTitle, onSuccess, onError, changeStatus, payload, currentTrainerIndex }, ref) => {
		const { selections, isSubmitted, handleDragEnd, isVariantUsed } = useDndTrainer({
			items: payload.items,
			onSuccess,
			onError,
			changeStatus,
			ref,
		})

		const getVariantValueById = (id: number | string | null) => {
			return payload.variants.find(v => v.id === id)?.value || null
		}

		return (
			<DndContext onDragEnd={handleDragEnd}>
				<div className="drop-word-trainer">
					<div className="drop-word-trainer__header">
						<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
						<TrainerTitle title={title} />
						{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}
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
