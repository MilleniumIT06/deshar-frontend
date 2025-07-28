'use client';
import { useDroppable } from '@dnd-kit/core';
import styles from './styles.module.scss';
export const DropInput = ({ id, current }: { id: number | string; current: string | null; }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
        <span ref={setNodeRef} className={styles.index}>
            {current || ""}
        </span>
    )
}