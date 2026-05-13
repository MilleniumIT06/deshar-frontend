import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import './styles.scss'
import { Pocket } from './pocket'
import { Variant } from './variant'
import { DndContext } from '@dnd-kit/core'
import { forwardRef } from 'react'
import { useDndTrainer } from '@/hooks/trainers/useDndTrainer'
import { type TrainerRef } from '@/widgets/trainers-engine'
import { type TrainerCommonProps } from '@/shared/types/types'

interface DragWordToPocketProps extends TrainerCommonProps {
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
	({ changeStatus, onError, onSuccess, payload, title, currentTrainerIndex, subTitle }, ref) => {
		const { selections, handleDragEnd, isVariantUsed, setSelections } = useDndTrainer({
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

		const removeItemFromSelections = (itemId: number | string) => {
			setSelections(prev => ({
				...prev,
				[itemId]: null,
			}))
		}
		return (
			<DndContext onDragEnd={handleDragEnd}>
				<div className="DragWordToPocket">
					<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
					<TrainerTitle title={title} />
					{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}
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
								removeItem={removeItemFromSelections}
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
