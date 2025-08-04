'use client';
import { useState } from 'react';

import { attestationExampleData, exampleMissingData, } from '@/mocks/data';
import { useDragDropWord } from '@/shared/hooks/useDragDropWord';
// import { QuizContent } from '@/features/quiz/ui/QuizModal/QuizContent';
// import { useMissedWord } from '@/shared/hooks/useMissedWord';

import { AttestationPaginator } from '../AttestationPaginator';
import { DragDropTrainer, ISlot } from '../DragDropTrainer';
// import { MissedLetterTrainer } from '../MissedLetterTrainer';
import { Task } from '../LearningContent';
import { MissedLetterTrainer } from '../MissedLetterTrainer';
import { SelectAnswerQuiz } from '../SelectAnswerQuiz';
// import MissingLetter from '../MissingLetter';
import { TrainerWrapper } from '../TrainerWrapper';

import styles from './styles.module.scss';

export const LearningAttestation = () => {
    // const { hasError, renderSentence, completed, handleCheckAnswers, isButtonDisabled } = useMissedWord({ data: exampleMissingData[0], onError: () => console.log('eero'), onSuccess: () => console.log("succ") });
    const [slots, setSlots] = useState<ISlot[]>([
        { id: 1, correct: 'в', current: null },
        { id: 2, correct: 'и', current: null },
    ]);
    const [data, setData] = useState([...attestationExampleData]);
    const [currentTaskNumber, setCurrentTaskNumber] = useState(1);
    const currentTask = data[currentTaskNumber];
    const renderTask = () => {
        switch (currentTask.type) {
            case 'missing-word':
                return (
                    <MissedLetterTrainer data={currentTask} />
                )
            case 'missing-dnd':
                return (
                    <MissedLetterTrainer data={currentTask} />
                )
        }
    }
    return (
        <div className={styles.index}>
            <AttestationPaginator />

            {/* <div className={styles.index__quiz_wrapper}>
                <QuizContent onClose={() => console.log('close')} />
            </div> */}
            {/* <MissingLetter id={1} missingLetter='a' onComplete={() => console.log('test')} word='tast' key={1} /> */}
            {/* <QuizContent onClose={() => console.log('close')} /> */}

            { }

            {/* <SelectAnswerQuiz /> */}

            {/* <TrainerWrapper handleCheckAnswers={handleCheckAnswers} hasError={hasError} isButtonDisabled={isButtonDisabled} completed={completed} title="Перетащите пропущенные буквы в предложении из вариантов ниже" >
                <DragDropTrainer render={renderSentence} setSlots={setSlots} slots={slots} />
            </TrainerWrapper> */}
        </div>
    )
}
