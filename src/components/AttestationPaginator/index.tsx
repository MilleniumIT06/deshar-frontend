'use client';
import { useState } from 'react';

import { StepCounter } from './StepCounter';
import styles from './styles.module.scss';

export const AttestationPaginator = ({
    onClick
}: {
    onClick: (value: number) => void;
}) => {
    const [activeP, setActiveP] = useState(1);
    const stepCounterTestData = [
        {
            id: 1,
            completed: false,
            content: 1
        },
        {
            id: 2,
            completed: true,
            content: 2
        },
        {
            id: 3,
            completed: false,
            content: 3
        },
        {
            id: 4,
            completed: true,
            content: 4
        }
    ];
    const handleClickD = (id: number) => {
        setActiveP(id);
        onClick(id);
    }
    return (
        <div className={styles.index}>
            <div className={styles.index__wrapper}>

                <ul className={styles.index__list}>
                    {stepCounterTestData.map((item) => (
                        <StepCounter key={item.id} active={item.id === activeP} completed={item.completed} content={item.content} id={item.id} handleClick={() => handleClickD(item.id)} />
                    ))}
                </ul>
            </div>
        </div>
    )
}