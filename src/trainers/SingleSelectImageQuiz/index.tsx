

import './styles.scss'
import { forwardRef } from 'react'

import { useQuizLogic } from '@/hooks/trainers/useQuiz'
import { type TrainerCommonProps } from '@/shared/types/types'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import { SingleSelectImageQuizVariant } from './variant'

import type { TrainerRef } from '@/widgets/trainers-engine/types/types'

interface IVariant {
	id: number
	imageUrl: string
}
interface SingleSelectImageQuizProps extends TrainerCommonProps {
	payload: {
		variants: IVariant[]
		correctVariantId: number
	}
}
export const SingleSelectImageQuiz = forwardRef<TrainerRef, SingleSelectImageQuizProps>(
	({ changeStatus, onError, onSuccess, payload, title, currentTrainerIndex, subTitle,audio }, ref) => {
		const { selected, isSubmitted, handleSelect } = useQuizLogic<number>({
			ref,
			correctValue: payload.correctVariantId,
			onSuccess,
			onError,
			changeStatus,
		})
		const handleVariantClick = (id: number) => {
			if (isSubmitted) {
				return
			}
			handleSelect(id)
		}
		return (
			<div className="SingleSelectImageQuiz">
				<div className="SingleSelectImageQuiz__inner">
					<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
					<TrainerTitle title={title} audio={audio}/>
					{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}
					<div className="SingleSelectImageQuiz__content">
						{payload.variants.map(item => (
							<SingleSelectImageQuizVariant
								key={`SingleSelectImageQuizVariant${item.id}`}
								imageUrl={item.imageUrl}
								error={
									isSubmitted && selected === item.id && item.id !== payload.correctVariantId
								}
								isCorrect={
									isSubmitted && selected === item.id && item.id === payload.correctVariantId
								}
								isIncorrect={
									isSubmitted && selected !== item.id && item.id !== payload.correctVariantId
								}
								selected={selected === item.id}
								onClick={() => handleVariantClick(item.id)}
							/>
						))}
					</div>
				</div>
			</div>
		)
	},
)

SingleSelectImageQuiz.displayName = 'SingleSelectImageQuiz'
