'use client';
import { QuizContent } from '@/features/quiz/ui/QuizModal/QuizContent';
import { exampleMissingData } from '@/mocks/data';
import { useMissedWord } from '@/shared/hooks/useMissedWord';

import { AttestationPaginator } from '../AttestationPaginator';
import { MissedLetterTrainer } from '../MissedLetterTrainer';
import { TrainerWrapper } from '../TrainerWrapper';

import styles from './styles.module.scss';

export const LearningAttestation = () => {
    const { completed, renderSentence } = useMissedWord(exampleMissingData);
    return (
        <div className={styles.index}>
            <AttestationPaginator />

            {/* <div className={styles.index__quiz_wrapper}>
                <QuizContent onClose={() => console.log('close')} />
            </div> */}
            <TrainerWrapper completed={completed} title="Впишите пропущенные буквы в следующем предложении" >
                {/* <QuizContent onClose={() => console.log('close')} /> */}
                <MissedLetterTrainer render={renderSentence} />
            </TrainerWrapper>
        </div>
    )
}