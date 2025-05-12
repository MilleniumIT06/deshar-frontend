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
                <div className={styles.selector__body_inner}>
                    <ul className={cn("list-reset", styles.selector__list)}>
                        <li className={styles.selector__list_item}>
                            <span>Неделя</span>
                        </li>
                        <li className={styles.selector__list_item}>
                            <span>Месяц</span>
                        </li>
                        <li className={styles.selector__list_item}>
                            <span>Год</span>
                        </li>
                        <li className={styles.selector__list_item}>
                            <span>Неделя</span>
                        </li>
                        <li className={styles.selector__list_item}>
                            <span>Месяц</span>
                        </li>
                        <li className={styles.selector__list_item}>
                            <span>Год</span>
                        </li>
                        <li className={styles.selector__list_item}>
                            <span>Неделя</span>
                        </li>
                        <li className={styles.selector__list_item}>
                            <span>Месяц</span>
                        </li>
                        <li className={styles.selector__list_item}>
                            <span>Год</span>
                        </li>
                        <li className={styles.selector__list_item}>
                            <span>Неделя</span>
                        </li>
                        <li className={styles.selector__list_item}>
                            <span>Месяц</span>
                        </li>
                        <li className={styles.selector__list_item}>
                            <span>Год</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}