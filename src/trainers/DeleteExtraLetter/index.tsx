import { forwardRef } from 'react'
import cn from 'classnames'

import { useLetterClickTrainer } from '@/hooks/trainers/useLetterClickTrainer'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import './styles.scss'
import { type TrainerCommonProps } from '@/shared/types/types'

interface IVariant {
	id: number | string
	letter: string
}

interface DeleteExtraLetterProps extends TrainerCommonProps {
	payload: {
		variants: IVariant[]
		correctVariantIds: (number | string)[]
	}
}

export const DeleteExtraLetter = forwardRef(
	(
		{ payload, title, onSuccess, onError, changeStatus, currentTrainerIndex, subTitle }: DeleteExtraLetterProps,
		ref,
	) => {
		const { selectedIds, handleSelect } = useLetterClickTrainer({
			ref,
			correctIds: payload.correctVariantIds,
			onSuccess,
			onError,
			changeStatus,
			isMulti: true,
		})

		return (
			<div className="delete-extra-letter">
				<div className="delete-extra-letter__container">
					<span className="trainer-number-title">Тренажер {currentTrainerIndex}</span>
					<TrainerTitle title={title} />
					{subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}
					<div className="delete-extra-letter__list">
						{payload.variants.map(variant => {
							const isSelected = selectedIds.includes(variant.id)

							return (
								<div
									key={variant.id}
									className={cn('delete-extra-letter__item', {
										'is-selected': isSelected,
									})}>
									<button
										onClick={() => handleSelect(variant.id)}
										className={cn('delete-extra-letter__button', {
											'is-selected': isSelected,
										})}>
										{variant.letter}
									</button>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	},
)

DeleteExtraLetter.displayName = 'DeleteExtraLetter'
