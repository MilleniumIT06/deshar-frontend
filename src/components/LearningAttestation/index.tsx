'use client';
// import { QuizContent } from '@/features/quiz/ui/QuizModal/QuizContent';
// import { exampleMissingData } from '@/mocks/data';
// import { useMissedWord } from '@/shared/hooks/useMissedWord';

import { AttestationPaginator } from '../AttestationPaginator';
import { SelectAnswerQuiz } from '../SelectAnswerQuiz';
// import { MissedLetterTrainer } from '../MissedLetterTrainer';
// import MissingLetter from '../MissingLetter';
// import { TrainerWrapper } from '../TrainerWrapper';

import styles from './styles.module.scss';

export const LearningAttestation = () => {
    // const { hasError, renderSentence, completed, handleCheckAnswers, isButtonDisabled } = useMissedWord({ data: exampleMissingData[0], onError: () => console.log('eero'), onSuccess: () => console.log("succ") });
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

            <SelectAnswerQuiz />

        </div>
    )
}