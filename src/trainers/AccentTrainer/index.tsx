import { forwardRef } from 'react'

import { useLetterClickTrainer } from '@/hooks/trainers/useLetterClickTrainer'
import { type TrainerCommonProps } from '@/shared/types/types'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'

import { AccentLetter } from './item'
import './styles.scss'

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
	({ payload, title, subTitle, onSuccess, onError, changeStatus, currentTrainerIndex,audio }: AccentTrainerProps, ref) => {
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
					<TrainerTitle audio={audio} title={title} className="accent-trainer__title" />

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
