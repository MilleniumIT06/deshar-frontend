'use client'
import cn from 'classnames';

import styles from './styles.module.scss';

export const StepCounter = ({
    active = false,
    completed = false,
    content = 1,
    handleClick,
}: {
    id: number;
    content: number;
    completed: boolean;
    active: boolean;
    handleClick: () => void;
}) => {
    return (
        <li className={cn(styles.index, active && styles.active, completed && styles.completed)} onClick={handleClick}>
            {content}
        </li>
    )
}