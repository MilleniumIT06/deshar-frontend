import styles from './styles.module.scss';

export const LearningSidebar = () => {
    return (
        <div className={styles.index}>
            <div className={styles.inner}>
                <h5 className={styles.title}>Уроки</h5>
                <div className={styles.content}>
                    <ul className={styles.list}>
                        <li className={styles.LessonItem}>
                            <span className={styles.LessonItem__number}>1</span>
                            <span className={styles.LessonItem__text}>
                                Морфемика как раздел лингвистики
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}