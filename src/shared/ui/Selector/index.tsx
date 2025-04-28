'use client';
import cn from 'classnames';
import { useState } from 'react';
import styles from './styles.module.scss';
export const Selector = () => {
    const [active, setActive] = useState(false);
    return (
        <div className={cn(styles.selector, active && styles.active)}>
            <div className={styles.selector__header}>
                <span>Неделя</span>
                <button className={cn("btn-reset", styles.selector__btn)} onClick={() => setActive(prev => !prev)}>
                    <svg width="14" height="9" viewBox="0 0 14 9" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 1L7 7L1 0.999999" stroke="#303030" strokeWidth="1.5" />
                    </svg>
                </button>
            </div>
            <div className={styles.selector__body}>
                <ul className={cn("list-reset", styles.selector__list)}>
                    <li className={styles.selector__list_item}>
                        <span>Test1</span>
                    </li>
                    <li className={styles.selector__list_item}>
                        <span>Test1</span>
                    </li>
                    <li className={styles.selector__list_item}>
                        <span>Test1</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}