'use client';

import { useAppSelector, useAppDispatch } from '@/app/_store/hooks';
import { useMissedWord } from '@/shared/hooks/useMissedWord';

import { changeCurrentTask, changeCompletedStatus } from '../LearningAttestation/attestation.slice';
import { IMissingWordTask } from '../LearningContent';
import { TrainerWrapper } from '../TrainerWrapper';

import styles from './index.module.scss';

export const MissedLetterTrainer = ({ data }: { data: IMissingWordTask }) => {
    const dispatch = useAppDispatch();
    const { currentTaskNumber } = useAppSelector(state => state.learningAttestationReducer)

    const handleSuccess = () => {
        dispatch(changeCurrentTask(currentTaskNumber + 1));
        dispatch(changeCompletedStatus({ id: currentTaskNumber, value: true }))
    }
    const { hasError, renderSentence, completed, handleCheckAnswers, isButtonDisabled } = useMissedWord({ data: data, onSuccess: handleSuccess, onError: () => 'error' });
    return (
        <TrainerWrapper handleCheckAnswers={handleCheckAnswers} hasError={hasError} isButtonDisabled={isButtonDisabled} completed={completed} title="Впишите пропущенные буквы в следующем предложении" >
            <div className={styles.index}>

                {renderSentence()}
            </div>
        </TrainerWrapper>
    )
}