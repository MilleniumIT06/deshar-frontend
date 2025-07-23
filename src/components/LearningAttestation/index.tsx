'use client';
import { QuizContent } from '@/features/quiz/ui/QuizModal/QuizContent';
import { AttestationPaginator } from '../AttestationPaginator';

import styles from './styles.module.scss';

export const LearningAttestation = () => {
    return (
        <div className={styles.index}>
            <AttestationPaginator />

            <div className={styles.index__quiz_wrapper}>
                <QuizContent onClose={() => console.log('close')} />
            </div>
        </div>
    )
}