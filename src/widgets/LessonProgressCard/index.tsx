import cn from 'classnames';
import styles from './styles.module.scss';
import { ProgressCounter } from './ProgressCounter';
import { ProgressBar } from '@/shared/ui/ProgressBar';
export const LessonProgressCard= () => {
    return (
        <div className={styles.LessonProgressCard}>
                            <div className={styles.LessonProgressCard__header}>
                                <h6 className={styles.LessonProgressCard__title}>Ингушский язык</h6>
                                <div className={styles.LessonProgressCard__module}>
                                    <span>21 модуль</span>
                                </div>

                            </div>
                            <div className={styles.LessonProgressCard__body}>
                                <ul className={cn("list-reset", styles.LessonProgressCard__list)}>
                                   <ProgressCounter type="finished" count={7}/>
                                   <ProgressCounter type="left" count={7}/>
                                   <ProgressCounter type="process" count={7}/>
                                </ul>
                                <ProgressBar counter={false} doneLessons={7} maxLessons={21} processLessons={7}/>
                            </div>
                        </div>
    )
}