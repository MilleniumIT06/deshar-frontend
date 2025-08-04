'use client';
import { useState } from 'react';

import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import cn from 'classnames';

import { useDragDropWord } from '@/shared/hooks/useDragDropWord';

import { IMissingWord } from '../LearningContent';
import { MoveBox } from '../MoveBox';
import { TrainerWrapper } from '../TrainerWrapper';

import styles from './styles.module.scss';

export interface ISlot {
    id: string | number;
    correct: string;
    current: null | string;
}
export const DragDropTrainer = ({ data }: {
    data: {
        id: number;
        sentence: string;
        type: string;
        missingWords: IMissingWord[];
        slots: ISlot[];
        letters: { id: number; char: string; }[];
        completed: boolean;
    }
}) => {

    const [letters] = useState(data.letters);
    const [slots, setSlots] = useState(data.slots);
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over) {
            setSlots(slots.map(slot =>
                slot.id === over.id ? { ...slot, current: active.data.current?.char } : slot
            ));
        }
    };
    const { } = useDragDropWord({ data: { id: data.id, missingWords: data.missingWords, sentence: data.sentence, type: data.type }, slots: slots });
    return (
        <TrainerWrapper handleCheckAnswers={handleCheckAnswers} hasError={hasError} isButtonDisabled={isButtonDisabled} completed={completed} title="Перетащите пропущенные буквы в предложении из вариантов ниже" >
            <div className={styles.index}>
                <DndContext onDragEnd={handleDragEnd}>
                    <div className={styles.index__inner}>
                        <div className={styles.index__content}>
                            {render()}
                        </div>

                        <div className={styles.index__variants}>
                            <ul className={cn('list-reset', styles.index__list)}>
                                {/* <MoveBox char='о' id={1} />
                            <MoveBox char='а' id={2} />
                            <MoveBox char='е' id={3} />
                            <MoveBox char='и' id={4} /> */}
                                {letters.map((value) => (
                                    <MoveBox key={`key-${value.id}+${value.char}`} char={value.char} id={value.id} />
                                ))}
                            </ul>
                            {/* <DropInput current={slots[0].current} id={slots[0].id} key={slots[0].id} /> */}
                        </div>
                    </div>
                </DndContext>
            </div>
        </TrainerWrapper>
    )
}