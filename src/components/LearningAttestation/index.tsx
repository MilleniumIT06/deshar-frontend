'use client';
import { useAppSelector } from '@/app/_store/hooks';

import { AttestationPaginator } from '../AttestationPaginator';
import { DragDropTrainer } from '../DragDropTrainer';
import { Task } from '../LearningContent';
import { MissedLetterTrainer } from '../MissedLetterTrainer';
import { SelectAnswerQuiz } from '../SelectAnswerQuiz';

import styles from './styles.module.scss';


export const LearningAttestation = () => {
    // const { hasError, renderSentence, completed, handleCheckAnswers, isButtonDisabled } = useMissedWord({ data: exampleMissingData[0], onError: () => console.log('eero'), onSuccess: () => console.log("succ") });
    // const [data, setData] = useState<Task[]>(attestationExampleData as Task[]);
    // const [currentTaskNumber, setCurrentTaskNumber] = useState(1);
    const { data, currentTaskNumber } = useAppSelector(state => state.learningAttestationReducer)

    const currentTask: Task | undefined = data[currentTaskNumber - 1];
    const renderTask = () => {
        if (!currentTask) return <div>Task not found</div>;
        switch (currentTask.type) {
            case "missing-word":
                return (
                    <MissedLetterTrainer data={{ id: currentTask.id, missingWords: currentTask.missingWords, sentence: currentTask.sentence, type: currentTask.type }} />
                )
            case "missing-dnd":
                return <DragDropTrainer data={{ id: currentTask.id, letters: currentTask.letters, missingWords: currentTask.missingWords, sentence: currentTask.sentence, slots: currentTask.slots, type: currentTask.type }} />
            case "choice-right":
                return <SelectAnswerQuiz />
            default:
                return <div>Error</div>
        }
    }

    return (
        <div className={styles.index}>
            <AttestationPaginator />


            {renderTask()}

            {/* <SelectAnswerQuiz /> */}

            {/* <TrainerWrapper handleCheckAnswers={handleCheckAnswers} hasError={hasError} isButtonDisabled={isButtonDisabled} completed={completed} title="Перетащите пропущенные буквы в предложении из вариантов ниже" >
                <DragDropTrainer render={renderSentence} setSlots={setSlots} slots={slots} />
            </TrainerWrapper> */}
        </div>
    )
}
