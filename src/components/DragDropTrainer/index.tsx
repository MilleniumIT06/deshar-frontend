'use client';
import { useState } from 'react';

import { DndContext, DragOverlay } from '@dnd-kit/core';
import cn from 'classnames';

import { MoveBox } from '../MoveBox';

import styles from './styles.module.scss';

export interface ISlot {
    id: string | number;
    correct: string;
    current: null | string;
}
export const DragDropTrainer = ({ render, setSlots, slots }: {
    slots: ISlot[];
    setSlots: (value: ISlot[]) => void;
    render: () => React.ReactNode;
}) => {

    const [letters] = useState([
        { id: 1, char: 'в' },
        { id: 2, char: 'о' },
        { id: 3, char: 'и' },
        { id: 4, char: 'а' },
    ]);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (over) {
            setSlots(slots.map(slot =>
                slot.id === over.id ? { ...slot, current: active.data.current.char } : slot
            ));
        }
    };
    return (
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
    )
}