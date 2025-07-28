'use client';
import cn from 'classnames';
import styles from './styles.module.scss';
import { MoveBox } from '../MoveBox';
import { DropInput } from '../DropInput';
import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';

export interface ISlot {
    id: string;
    correct: string;
    current: null | string;
}
export const DragDropTrainer = ({ render, setSlots, slots }: {
    slots: ISlot[];
    setSlots: (value: any) => void;
    render: () => React.ReactNode;
}) => {

    const [letters] = useState([
        { id: 'letter1', char: 'о' },
        { id: 'letter2', char: 'а' },
        { id: 'letter3', char: 'и' },
        { id: 'letter3', char: 'е' },
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
            <div className={styles.index__inner}>
                <div className={styles.index__content}>
                    {render()}
                </div>
                <DndContext onDragEnd={handleDragEnd}>

                    <div className={styles.index__variants}>
                        <ul className={cn('list-reset', styles.index__list)}>
                            <MoveBox char='о' id={1} />
                            <MoveBox char='а' id={2} />
                            <MoveBox char='е' id={3} />
                            <MoveBox char='и' id={4} />
                        </ul>
                        <DropInput current={slots[0].current} id="slot1" key={1} />
                    </div>
                </DndContext>
            </div>
        </div>
    )
}