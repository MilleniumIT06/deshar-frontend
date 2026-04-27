import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import { SingleSelectImageQuizVariant } from './variant'
import './styles.scss'
import { useQuizLogic } from '@/hooks/trainers/useQuiz'
import { forwardRef } from 'react'

export interface TrainerRef {
	handleCheck: () => void
	handleReset: () => void
}
interface IVariant {
	id: number
	imageUrl: string
}
interface SingleSelectImageQuizProps {
	title: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
	payload: {
		variants: IVariant[]
		correctVariantId: number
	}
}
export const SingleSelectImageQuiz = forwardRef<TrainerRef, SingleSelectImageQuizProps>(
	({ changeStatus, onError, onSuccess, payload, title }, ref) => {
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
					<TrainerTitle title={title} />

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
