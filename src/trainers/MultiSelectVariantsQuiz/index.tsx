'use client'
import { useQuizLogic } from '@/hooks/trainers/useQuiz'
import { Variant } from './item'
import { forwardRef } from 'react'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import './styles.scss'
import { type TrainerCommonProps } from '@/shared/types/types'
import { type TrainerRef } from '@/widgets/trainers-engine'

interface IVariant {
	id: number
	itemNumber: number
	title: string
}

interface MultiSelectProps extends TrainerCommonProps {
	payload: {
		variants: IVariant[]
		correctVariantIds: number[]
	}
}

export const MultiSelectVariantsQuiz = forwardRef<TrainerRef, MultiSelectProps>(
	({ payload, changeStatus, onError, onSuccess, title, subTitle, currentTrainerIndex }, ref) => {
		const { selected, isSubmitted, handleSelect } = useQuizLogic<number>({
			ref,
			correctValue: payload.correctVariantIds,
			onSuccess,
			onError,
			changeStatus,
		})

		const selectedIds = Array.isArray(selected) ? selected : []

		return (
			<div className="multi-select-quiz">
				<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
				<TrainerTitle title={title} />

				{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}

				<div className="multi-select-quiz__wrapper">
					<ul className="multi-select-quiz__list">
						{payload.variants.map(item => (
							<Variant
								key={item.id}
								numberItem={item.itemNumber}
								title={item.title}
								selected={selectedIds.includes(item.id)}
								error={
									isSubmitted &&
									selectedIds.includes(item.id) &&
									!payload.correctVariantIds.includes(item.id)
								}
								onClick={() => handleSelect(item.id)}
							/>
						))}
					</ul>
				</div>
			</div>
		)
	},
)

MultiSelectVariantsQuiz.displayName = 'MultiSelectVariantsQuiz'
