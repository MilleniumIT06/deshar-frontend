'use client'
import { Variant } from './variant'
import { DropItem } from './dropItem'
import { DndContext } from '@dnd-kit/core'
import { forwardRef } from 'react'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import { useDndTrainer } from '@/hooks/trainers/useDndTrainer'
import './styles.scss'

interface DropWordToImageProps {
	title: string
	subTitle: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success' | 'finish') => void
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
export interface DropWordToImageRef {
	handleCheck: () => void
	handleReset: () => void
}

export const DropWordToImage = forwardRef<DropWordToImageRef, DropWordToImageProps>(
	({ payload, onSuccess, onError, changeStatus, title, subTitle }, ref) => {
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
					<TrainerTitle title={title} />
					{subTitle && <p className="trainer-dnd__subtitle">{subTitle}</p>}

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
