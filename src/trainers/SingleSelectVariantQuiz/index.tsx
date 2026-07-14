'use client'

import { forwardRef } from 'react'


import { useQuizLogic } from '@/hooks/trainers/useQuiz'
import './styles.scss'
import { type TrainerCommonProps } from '@/shared/types/types'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import { Variant } from '../MultiSelectVariantsQuiz/item'

import type { TrainerRef } from '@/widgets/trainers-engine/types/types'

interface IVariant {
	id: number
	itemNumber: number
	title: string
}


interface SingleSelectProps extends TrainerCommonProps {
	payload: {
		variants: IVariant[]
		correctVariantId: number
	}
}

export const SingleSelectVariantQuiz = forwardRef<TrainerRef, SingleSelectProps>(
	({ payload, changeStatus, onError, onSuccess, title, subTitle, currentTrainerIndex,audio }, ref) => {
		const { selected, isSubmitted, handleSelect } = useQuizLogic<number>({
			ref,
			correctValue: payload.correctVariantId,
			onSuccess,
			onError,
			changeStatus,
		})
		return (
			<div className="single-select-quiz">
				<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
				<TrainerTitle title={title} audio={audio}/>

				{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}

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
