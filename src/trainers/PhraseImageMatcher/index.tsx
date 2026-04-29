import { forwardRef } from 'react'
import { DndContext } from '@dnd-kit/core'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import { Variant } from '../DragWordToPocket/variant'
import { PhraseImageMatcherItem } from './item'
import './styles.scss'
import { useDndTrainer } from '@/hooks/trainers/useDndTrainer'

interface Props {
	title: string
	subTitle?: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
	payload: {
		items: {
			id: number | string
			correctVariantId: number | string
			imageUrl: string
		}[]
		variants: {
			id: number | string
			value: string
		}[]
	}
}
export const PhraseImageMatcher = forwardRef(
	({ changeStatus, onError, onSuccess, payload, title, subTitle }: Props, ref) => {
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
			<div className="PhraseImageMatcher">
				<DndContext onDragEnd={handleDragEnd}>
					<TrainerTitle title={title} />
					{subTitle && <p className="PhraseImageMatcher__subtitle">{subTitle}</p>}
					<div className="PhraseImageMatcher__items">
						{payload.items.map(item => (
							<PhraseImageMatcherItem
								key={item.id}
								id={item.id}
								imageUrl={item.imageUrl}
								currentValue={getVariantValueById(selections[item.id])}
							/>
						))}
					</div>

					<div className="PhraseImageMatcher__variants">
						{payload.variants.map(variant => (
							<Variant
								key={variant.id}
								id={String(variant.id)}
								value={variant.value}
								isDisabled={isVariantUsed(variant.id) || isSubmitted}
							/>
						))}
					</div>
				</DndContext>
			</div>
		)
	},
)

PhraseImageMatcher.displayName = 'PhraseImageMatcher'
