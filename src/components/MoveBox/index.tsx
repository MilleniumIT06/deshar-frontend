'use client';
import { useDraggable } from '@dnd-kit/core';
import cn from 'classnames'

import styles from './styles.module.scss';

export const MoveBox = ({
    id,
    char = "a",
    isDisabled
}: {
    id: number | string;
    char: string;
    isDisabled: boolean;
}) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id, data: { char }, disabled: isDisabled });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    return (
        <div className={styles.wrapper}>

            <li
                className={cn(styles.index, isDisabled && styles.disabled, isDragging && styles.dragging)}
                style={style}
                {...listeners}
                {...attributes}
                ref={setNodeRef}
            >
                {char}

            </li>
            {isDragging && <li
                className={cn(styles.index, styles.disabled)}
            >
                {char}

            </li>
            }
        </div>
    )
}