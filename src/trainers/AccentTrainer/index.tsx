import { useLetterClickTrainer } from '@/hooks/trainers/useLetterClickTrainer'
import { forwardRef } from 'react'

import './styles.scss'
import { AccentLetter } from './item'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import { type TrainerCommonProps } from '@/shared/types/types'

interface IVariant {
	id: number | string
	letter: string
}

interface AccentTrainerProps extends TrainerCommonProps {
	payload: {
		variants: IVariant[]
		correctVariantIds: (number | string)[]
	}
}
export const AccentTrainer = forwardRef(
	({ payload, title, subTitle, onSuccess, onError, changeStatus, currentTrainerIndex }: AccentTrainerProps, ref) => {
		const { selectedIds, handleSelect } = useLetterClickTrainer({
			ref,
			correctIds: payload.correctVariantIds,
			onSuccess,
			onError,
			changeStatus,
			isMulti: false,
		})

		const selectedId = selectedIds[0] || null

		return (
			<div className="accent-trainer">
				<div className="accent-trainer__container">
					<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
					<TrainerTitle title={title} className="accent-trainer__title" />

					{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}

					<div className="accent-trainer__letters">
						{payload.variants.map(variant => (
							<AccentLetter
								key={variant.id}
								letter={variant.letter}
								checked={selectedId === variant.id}
								onClick={() => handleSelect(variant.id)}
							/>
						))}
					</div>
				</div>
			</div>
		)
	},
)

AccentTrainer.displayName = 'AccentTrainer'
