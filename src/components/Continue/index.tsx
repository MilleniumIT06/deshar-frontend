import styles from './styles.module.scss';
import { LessonProgressCard } from '../../widgets/LessonProgressCard';
export const Continue = () => {
    return (
        <section className={styles.continue}>
            <div className="container">
                <div className={styles.continue__inner}>
                    <h2 className="section__title">Продолжим обучение</h2>
                    <div className={styles.continue__subjects}>
                       <LessonProgressCard/>
                       <LessonProgressCard/>
                       
                    </div>
                    <div className={styles.continue__footer}>
                        <a href="#" className={styles.continue__link}>Открыть выполненые дисциплины</a>
                    </div>
                </div>
            </div >
        </section >
    )
}