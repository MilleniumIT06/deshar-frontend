'use client'
import { useQuizLogic } from '@/hooks/trainers/useQuiz'
import { Variant } from './item'
import { forwardRef } from 'react'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import './styles.scss'

interface IVariant {
	id: number
	itemNumber: number
	title: string
}

export interface TrainerRef {
	handleCheck: () => void
	handleReset: () => void
}

interface MultiSelectProps {
	title: string
	subTitle?: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
	payload: {
		variants: IVariant[]
		correctVariantIds: number[]
	}
}

export const MultiSelectVariantsQuiz = forwardRef<TrainerRef, MultiSelectProps>(
	({ payload, changeStatus, onError, onSuccess, title, subTitle }, ref) => {
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
				<TrainerTitle title={title} />

				<h2 className="multi-select-quiz__subtitle">{subTitle}</h2>

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
