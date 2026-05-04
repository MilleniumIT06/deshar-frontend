'use client'

import { forwardRef } from 'react'
import { Variant } from '../MultiSelectVariantsQuiz/item'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import { useQuizLogic } from '@/hooks/trainers/useQuiz'
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

interface SingleSelectProps {
	title: string
	subTitle?: string
	onSuccess: () => void
	onError: () => void
	// status: "idle" | "error" | "success";
	changeStatus: (status: 'idle' | 'error' | 'success') => void
	payload: {
		variants: IVariant[]
		correctVariantId: number
	}
}

export const SingleSelectVariantQuiz = forwardRef<TrainerRef, SingleSelectProps>(
	({ payload, changeStatus, onError, onSuccess, title, subTitle }, ref) => {
		const { selected, isSubmitted, handleSelect } = useQuizLogic<number>({
			ref,
			correctValue: payload.correctVariantId,
			onSuccess,
			onError,
			changeStatus,
		})
		return (
			<div className="single-select-quiz">
				<span className="trainer-number-title">Тренажер 1</span>
				<TrainerTitle title={title} />

				{subTitle && <h2 className="single-select-quiz__subtitle">{subTitle}</h2>}

				<div className="single-select-quiz__container">
					<ul className="single-select-quiz__list">
						{payload.variants.map(item => (
							<Variant
								key={item.id}
								numberItem={item.itemNumber}
								title={item.title}
								selected={selected === item.id}
								error={
									isSubmitted && selected === item.id && item.id !== payload.correctVariantId
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

SingleSelectVariantQuiz.displayName = 'SingleSelectVariantQuiz'
