import { DndContext } from '@dnd-kit/core'
import { forwardRef } from 'react'

import { useDndTrainer } from '@/hooks/trainers/useDndTrainer'
import { type TrainerCommonProps } from '@/shared/types/types'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import { PhraseImageMatcherItem } from './item'
import { Variant } from '../DragWordToPocket/variant'

import './styles.scss'

interface Props extends TrainerCommonProps {
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
	({ changeStatus, onError, onSuccess, payload, title, subTitle, currentTrainerIndex }: Props, ref) => {
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
					<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
					<TrainerTitle title={title} />
					{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}
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
