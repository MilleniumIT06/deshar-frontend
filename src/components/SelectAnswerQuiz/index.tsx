'use state';
import { useState } from "react"
import { TrainerWrapper } from "../TrainerWrapper"

import { SelectAnswerQuizContent } from "./SelectAnswerQuizContent"
import { useSelectAnswerQuiz } from "./useSelectAnswerQuiz";

export const SelectAnswerQuiz = () => {
  const [error, setError] = useState(false);
  const handleError = (value: boolean) => {
    setError(value);
  }
  const { checkCorrect, checkSelected, data, onSelect, selected, disableButton } = useSelectAnswerQuiz(setError);
  return (
    <TrainerWrapper handleCheckAnswers={() => checkCorrect(selected)} hasError={error} isButtonDisabled={disableButton()} title="Найдите однокоренные слова с чередующимися согласными в корне." completed={false} >
      <SelectAnswerQuizContent setError={handleError} data={data} checkCorrect={checkCorrect} checkSelected={checkSelected} onSelect={onSelect} selected={selected} />
    </TrainerWrapper>
  )
}