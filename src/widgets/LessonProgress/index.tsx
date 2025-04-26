import cn from 'classnames';
import styles from './styles.module.scss';
import { ProgressItem } from './ProgressItem';
export const LessonProgress = () => {
    return (
        <div className={styles.lessonProgress}>
                            <div className={styles.lessonProgress__header}>
                                <h6 className={styles.lessonProgress__title}>Ингушский язык</h6>
                                <div className={styles.lessonProgress__module}>
                                    <span>21 модуль</span>
                                </div>

                            </div>
                            <div className={styles.lessonProgress__body}>
                                <ul className={cn("list-reset", styles.lessonProgress__list)}>
                                   <ProgressItem/>
                                   <ProgressItem/>
                                   <ProgressItem/>
                                </ul>
                                <div className={styles.lessonProgress__bar}></div>
                            </div>
                        </div>
    )
}