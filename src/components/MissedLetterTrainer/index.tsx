'use client';

import { useMissedWord } from '@/shared/hooks/useMissedWord';

import { IMissingWordTask } from '../LearningContent';
import { TrainerWrapper } from '../TrainerWrapper';


export const MissedLetterTrainer = ({ data }: { data: IMissingWordTask }) => {
    const { hasError, renderSentence, completed, handleCheckAnswers, isButtonDisabled } = useMissedWord({ data: data, onError: () => console.log('eero'), onSuccess: () => console.log("succ") });
    return (
        <TrainerWrapper handleCheckAnswers={handleCheckAnswers} hasError={hasError} isButtonDisabled={isButtonDisabled} completed={completed} title="Впишите пропущенные буквы в следующем предложении" >
            {renderSentence()}
        </TrainerWrapper>
    )
}