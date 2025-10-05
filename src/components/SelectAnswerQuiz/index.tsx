'use state'
import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'

import { changeCompletedStatus } from '../LearningAttestation/attestation.slice'
import { type IChoiceRightTask } from '../LearningContent'
import { TrainerWrapper } from '../TrainerWrapper'

import { SelectAnswerQuizContent } from './SelectAnswerQuizContent'
import { useSelectAnswerQuiz } from './useSelectAnswerQuiz'

export const SelectAnswerQuiz = ({ data }: { data: IChoiceRightTask }) => {
	const [error, setError] = useState(false)
	const handleError = (value: boolean) => {
		setError(value)
	}
	const { currentTaskNumber } = useAppSelector(state => state.learningAttestationReducer)
	const dispatch = useAppDispatch()
	const { checkCorrect, checkSelected, variants, onSelect, selected, disableButton } = useSelectAnswerQuiz({
		data,
		setError,
	})
	const handleCheck = () => {
		checkCorrect(selected)
		if (!error) {
			dispatch(changeCompletedStatus({ id: currentTaskNumber, value: true }))
		}
	}

	return (
		<TrainerWrapper
			handleCheckAnswers={handleCheck}
			hasError={error}
			isButtonDisabled={disableButton()}
			title={data.title}>
			<SelectAnswerQuizContent
				setError={handleError}
				data={variants}
				checkCorrect={checkCorrect}
				checkSelected={checkSelected}
				onSelect={onSelect}
				selected={selected}
			/>
		</TrainerWrapper>
	)
}
