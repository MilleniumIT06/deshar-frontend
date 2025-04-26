import { LessonProgress } from '@/widgets/LessonProgress';
import styles from './styles.module.scss';
export const CompletedCourses = () => {
    return (
        <section className={styles.completedCourses}>
            <div className="container">
               <div className={styles.inner}>
               <h2 className="section__title">Выполненные дисциплины</h2>
                <div className={styles.lessons}>
                <LessonProgress/>
                <LessonProgress/>
                <LessonProgress/>                
                </div>
               </div>
            </div>
        </section>
    )
}