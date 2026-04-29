import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import './styles.scss'
import { Pocket } from './pocket'
import { Variant } from './variant'
import { DndContext } from '@dnd-kit/core'
import { forwardRef } from 'react'
import { useDndTrainer } from '@/hooks/trainers/useDndTrainer'
import { type TrainerRef } from '@/widgets/trainers-engine'

interface DragWordToPocketProps {
	title: string
	subTitle: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
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
export const DragWordToPocket = forwardRef<TrainerRef, DragWordToPocketProps>(
	({ changeStatus, onError, onSuccess, payload, title }, ref) => {
		const { selections, handleDragEnd, isVariantUsed } = useDndTrainer({
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
				<div className="DragWordToPocket">
					<TrainerTitle title={title} />
					<div className="DragWordToPocket__variants">
						{payload.variants.map(variant => (
							<Variant
								key={variant.id}
								id={variant.id}
								value={variant.value}
								isDisabled={isVariantUsed(variant.id)}
							/>
						))}
					</div>
					<div className="DragWordToPocket__pockets">
						{payload.items.map(item => (
							<Pocket
								key={item.id}
								id={item.id}
								imageUrl={item.imageUrl}
								currentValue={getSelectedValue(item.id)}
								// isError={isSubmitted && selections[item.id] !== item.correctVariantId}
							/>
						))}
					</div>
				</div>
			</DndContext>
		)
	},
)
DragWordToPocket.displayName = 'DragWordToPocket'
