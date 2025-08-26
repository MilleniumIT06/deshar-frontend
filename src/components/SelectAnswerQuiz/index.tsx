'use state'
import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'

import { changeCompletedStatus } from '../LearningAttestation/attestation.slice'
import { TrainerWrapper } from '../TrainerWrapper'

import { SelectAnswerQuizContent } from './SelectAnswerQuizContent'
import { useSelectAnswerQuiz } from './useSelectAnswerQuiz'

export const SelectAnswerQuiz = () => {
	const [error, setError] = useState(false)
	const handleError = (value: boolean) => {
		setError(value)
	}
	const { currentTaskNumber } = useAppSelector(state => state.learningAttestationReducer)
	const dispatch = useAppDispatch()
	const { checkCorrect, checkSelected, data, onSelect, selected, disableButton } = useSelectAnswerQuiz(setError)
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
			title="Найдите однокоренные слова с чередующимися согласными в корне.">
			<SelectAnswerQuizContent
				setError={handleError}
				data={data}
				checkCorrect={checkCorrect}
				checkSelected={checkSelected}
				onSelect={onSelect}
				selected={selected}
			/>
		</TrainerWrapper>
	)
}
