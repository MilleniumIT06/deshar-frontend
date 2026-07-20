

import './styles.scss'
import { forwardRef } from 'react'

import { useQuizLogic } from '@/hooks/trainers/useQuiz'
import { type TrainerCommonProps } from '@/shared/types/types'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import { SingleSelectImageQuizVariant } from './variant'

import type { TrainerRef } from '@/widgets/trainers-engine/types/types'
import { API_URL } from '@/config/api.config'

interface IVariant {
	id: number
	imageUrl: string
}
interface SingleSelectImageQuizProps extends TrainerCommonProps {
	payload: {
		variants: IVariant[]
		correct_variant_id: number
	}
}
export const SingleSelectImageQuiz = forwardRef<TrainerRef, SingleSelectImageQuizProps>(
	({ changeStatus, onError, onSuccess, payload, title, currentTrainerIndex, subTitle,audio }, ref) => {
		const { selected, isSubmitted, handleSelect } = useQuizLogic<number>({
			ref,
			correctValue: payload.correct_variant_id,
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
								imageUrl={API_URL.taskFiles()+item.imageUrl}
								error={
									isSubmitted && selected === item.id && item.id !== payload.correct_variant_id
								}
								isCorrect={
									isSubmitted && selected === item.id && item.id === payload.correct_variant_id
								}
								isIncorrect={
									isSubmitted && selected !== item.id && item.id !== payload.correct_variant_id
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
