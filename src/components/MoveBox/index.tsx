'use client';
import styles from './styles.module.scss';
import { useDraggable } from '@dnd-kit/core';
export const MoveBox = ({
    id,
    char = "a"
}: {
    id: number | string;
    char: string;
}) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id, data: { char } });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    return (
        <li
            className={styles.index}
            style={style}
            {...listeners}
            {...attributes}
            ref={setNodeRef}
        >
            {char}
        </li>
    )
}