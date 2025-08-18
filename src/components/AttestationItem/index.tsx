

import cn from 'classnames';

import { ProgressBar } from '@/shared/ui/ProgressBar';

import styles from './styles.module.scss';

interface AttestationItemProps {
    max?: number;
    current?: number;
    active?: boolean;
}

export const AttestationItem = ({
    max = 5,
    current = 1,
    active = false,
}: AttestationItemProps) => {
    const normalizedMax = Math.max(1, max);
    const normalizedCurrent = Math.min(Math.max(current, 0), normalizedMax);

    return (
        <div
            className={cn(styles.index, active && styles.active)}
            aria-current={active ? 'step' : undefined}
        >
            <div className={styles.inner}>
                <div className={styles.index__top}>
                    <span className={styles.index__title}>Прогресс</span>
                    <div
                        className={styles.index__counter}
                        aria-label={`Текущий прогресс: ${normalizedCurrent} из ${normalizedMax}`}
                    >
                        <span>{normalizedCurrent}</span>/
                        <span>{normalizedMax}</span>
                    </div>
                </div>
                <ProgressBar
                    maxLessons={normalizedMax}
                    doneLessons={0}
                    processLessons={normalizedCurrent}
                    className={styles.index__bar}
                />
            </div>
        </div>
    );
};