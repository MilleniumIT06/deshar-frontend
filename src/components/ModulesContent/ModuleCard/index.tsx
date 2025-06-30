import { ProgressBar } from '@/shared/ui/ProgressBar';

import { AttestationBar } from '../AttestationBar';

import styles from './styles.module.scss';

export const ModuleCard = ({
    doneLessons,
    maxLessons,
    number,
    processLessons,
    title
}: {
    number: number;
    title: string;
    maxLessons: number;
    doneLessons: number;
    processLessons: number;
}) => {
    return (
        <div className={styles.ModuleCard}>
            <div className={styles.ModuleCard__inner}>
                <div className={styles.ModuleCard__top}>
                    <div className={styles.ModuleCard__header}>
                        <span className={styles.ModuleCard__suptitle}>Модуль {number}</span>
                    </div>
                    <div className={styles.ModuleCard__body}>
                        <h6 className={styles.ModuleCard__title}>{title}</h6>
                    </div>
                </div>
                <div className={styles.ModuleCard__footer}>

                    <ProgressBar maxLessons={maxLessons} doneLessons={doneLessons} processLessons={processLessons} counter/>
                    <AttestationBar points={100} status="checked" />
                </div>
            </div>
        </div>
    )
}