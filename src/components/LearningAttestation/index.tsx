'use client';
import { useState } from 'react';

import { exampleMissingData } from '@/mocks/data';
import { useDragDropWord } from '@/shared/hooks/useDragDropWord';
// import { QuizContent } from '@/features/quiz/ui/QuizModal/QuizContent';
// import { exampleMissingData } from '@/mocks/data';
// import { useMissedWord } from '@/shared/hooks/useMissedWord';

import { AttestationPaginator } from '../AttestationPaginator';
import { DragDropTrainer, ISlot } from '../DragDropTrainer';
import { SelectAnswerQuiz } from '../SelectAnswerQuiz';
// import { MissedLetterTrainer } from '../MissedLetterTrainer';
// import MissingLetter from '../MissingLetter';
import { TrainerWrapper } from '../TrainerWrapper';

import styles from './styles.module.scss';

export const LearningAttestation = () => {
    // const { hasError, renderSentence, completed, handleCheckAnswers, isButtonDisabled } = useMissedWord({ data: exampleMissingData[0], onError: () => console.log('eero'), onSuccess: () => console.log("succ") });
    const [slots, setSlots] = useState<ISlot[]>([
        { id: 1, correct: 'в', current: null },
        { id: 2, correct: 'и', current: null },
    ]);
    const { renderSentence, completed, handleCheckAnswers, hasError, isButtonDisabled } = useDragDropWord({ slots: slots, data: exampleMissingData[0], onError: () => console.log('eero'), onSuccess: () => console.log("succ") });
    return (
        <div className={styles.index}>
            <AttestationPaginator />

            {/* <div className={styles.index__quiz_wrapper}>
                <QuizContent onClose={() => console.log('close')} />
            </div> */}
            {/* <MissingLetter id={1} missingLetter='a' onComplete={() => console.log('test')} word='tast' key={1} /> */}
            {/* <QuizContent onClose={() => console.log('close')} /> */}

            {/* missed letter trainer */}
            {/* <TrainerWrapper handleCheckAnswers={handleCheckAnswers} hasError={hasError} isButtonDisabled={isButtonDisabled} completed={completed} title="Впишите пропущенные буквы в следующем предложении" >
                <MissedLetterTrainer render={renderSentence} />
            </TrainerWrapper> */}

            {/* <SelectAnswerQuiz /> */}

            <TrainerWrapper handleCheckAnswers={handleCheckAnswers} hasError={hasError} isButtonDisabled={isButtonDisabled} completed={completed} title="Перетащите пропущенные буквы в предложении из вариантов ниже" >
                <DragDropTrainer render={renderSentence} setSlots={setSlots} slots={slots} />
            </TrainerWrapper>
        </div>
    )
}
