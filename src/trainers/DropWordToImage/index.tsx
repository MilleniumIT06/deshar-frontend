'use client'
import { Variant } from './variant'
import { DropItem } from './dropItem'
import { DndContext } from '@dnd-kit/core'
import { forwardRef } from 'react'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import { useDndTrainer } from '@/hooks/trainers/useDndTrainer'
import './styles.scss'
import { type TrainerCommonProps } from '@/shared/types/types'
import { type TrainerRef } from '@/widgets/trainers-engine'

interface DropWordToImageProps extends TrainerCommonProps {
	payload: {
		items: {
			id: number
			imageUrl: string
			correctVariantId: number
		}[]
		variants: {
			id: number
			value: string
		}[]
	}
}

export const DropWordToImage = forwardRef<TrainerRef, DropWordToImageProps>(
	({ payload, onSuccess, onError, changeStatus, title, subTitle, currentTrainerIndex }, ref) => {
		const { selections, isSubmitted, handleDragEnd, isVariantUsed } = useDndTrainer({
			items: payload.items,
			onSuccess,
			onError,
			changeStatus,
			ref,
		})

		const getSelectedValue = (itemId: number) => {
			const variantId = selections[itemId]
			return payload.variants.find(v => v.id === variantId)?.value || null
		}

		return (
			<DndContext onDragEnd={handleDragEnd}>
				<div className="trainer-dnd">
					<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
					<TrainerTitle title={title} />
					{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}

					<div className="trainer-dnd__drop-zone">
						{payload.items.map(item => (
							<DropItem
								key={item.id}
								id={item.id}
								imageUrl={item.imageUrl}
								currentValue={getSelectedValue(item.id)}
							/>
						))}
					</div>

					<div className="trainer-dnd__variants">
						{payload.variants.map(variant => {
							return (
								<Variant
									key={variant.id}
									id={variant.id}
									value={variant.value}
									isDisabled={isVariantUsed(variant.id) || isSubmitted}
								/>
							)
						})}
					</div>
				</div>
			</DndContext>
		)
	},
)

DropWordToImage.displayName = 'DropWordToImage'
