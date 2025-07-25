import { TrainerWrapper } from "../TrainerWrapper"

import { SelectAnswerQuizContent } from "./SelectAnswerQuizContent"

export const SelectAnswerQuiz = () => {
  return (
    <TrainerWrapper handleCheckAnswers={() => console.log('t')} hasError={false} isButtonDisabled={false} title="Найдите однокоренные слова с чередующимися согласными в корне." completed={false} >
      <SelectAnswerQuizContent />
    </TrainerWrapper>
  )
}