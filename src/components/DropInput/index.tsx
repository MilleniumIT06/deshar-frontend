'use client';
import { useDroppable } from '@dnd-kit/core';

import styles from './styles.module.scss';

export const DropInput = ({ id, current, word, missingLetter }: { id: number | string; current: string | null; word: string; missingLetter: string; }) => {
    const { setNodeRef } = useDroppable({ id });
    const check = word && missingLetter;
    const letterIndex = word.indexOf(missingLetter);

    if (letterIndex === -1) {
        return <span key={id} className="error">[Ошибка в данных]</span>;
    }
    const before = check && letterIndex && word.substring(0, letterIndex);
    const after = check && letterIndex && word.substring(letterIndex + 1);
    return (
        <span className={styles.wrapper}>
            {before}
            <span ref={setNodeRef} className={styles.index}>
                {current || ""}
            </span>
            {after}
        </span>
    )
}