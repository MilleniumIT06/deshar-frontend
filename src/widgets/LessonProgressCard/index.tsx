import cn from 'classnames';

import { ProgressBar } from '@/shared/ui/ProgressBar';

import { ProgressCounter } from './ProgressCounter';
import styles from './styles.module.scss';

interface ILessonProgressCard {
    title: string;
    countOfModules: number;
    countOfFinishedModules: number;
    countOfLeftModules: number;
    countOfProcessModules: number;
}
export const LessonProgressCard = ({
    countOfFinishedModules = 7,
    countOfLeftModules = 7,
    countOfModules = 21,
    countOfProcessModules = 7,
    title = "Ингушский язык",
}: ILessonProgressCard) => {
    return (
        <div className={styles.LessonProgressCard}>
            <div className={styles.LessonProgressCard__header}>
                <h6 className={styles.LessonProgressCard__title}>{title}</h6>
                <div className={styles.LessonProgressCard__module}>
                    <span>{countOfModules} модуль</span>
                </div>

            </div>
            <div className={styles.LessonProgressCard__body}>
                <ul className={cn("list-reset", styles.LessonProgressCard__list)}>
                    <ProgressCounter type="finished" count={countOfFinishedModules} />
                    <ProgressCounter type="left" count={countOfLeftModules} />
                    <ProgressCounter type="process" count={countOfProcessModules} />
                </ul>
                <ProgressBar
                    counter={false}
                    doneLessons={countOfFinishedModules}
                    maxLessons={countOfModules}
                    processLessons={countOfProcessModules} />
            </div>
        </div>
    )
}