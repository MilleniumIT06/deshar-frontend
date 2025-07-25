'use client';
import { QuizContent } from '@/features/quiz/ui/QuizModal/QuizContent';
import { exampleMissingData } from '@/mocks/data';
import { useMissedWord } from '@/shared/hooks/useMissedWord';

import { AttestationPaginator } from '../AttestationPaginator';
import { MissedLetterTrainer } from '../MissedLetterTrainer';
import { TrainerWrapper } from '../TrainerWrapper';

import styles from './styles.module.scss';
import MissingLetter from '../MissingLetter';

export const LearningAttestation = () => {
    const { hasError, renderSentence } = useMissedWord({ data: exampleMissingData, onError: () => console.log('eero'), onSuccess: () => console.log("succ") });
    return (
        <div className={styles.index}>
            <AttestationPaginator />

            {/* <div className={styles.index__quiz_wrapper}>
                <QuizContent onClose={() => console.log('close')} />
            </div> */}
            {/* <MissingLetter id={1} missingLetter='a' onComplete={() => console.log('test')} word='tast' key={1} /> */}
            <TrainerWrapper completed={true} title="Впишите пропущенные буквы в следующем предложении" >
                {/* <QuizContent onClose={() => console.log('close')} /> */}
                <MissedLetterTrainer render={renderSentence} />
            </TrainerWrapper>
        </div>
    )
}