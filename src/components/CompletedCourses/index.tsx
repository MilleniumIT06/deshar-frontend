import { LessonProgressCard } from '@/widgets/LessonProgressCard';
import styles from './styles.module.scss';
export const CompletedCourses = () => {
    return (
        <section className={styles.completedCourses}>
            <div className="container">
               <div className={styles.inner}>
               <h1 className="section__title">Выполненные дисциплины</h1>
                <div className={styles.lessons}>
                <LessonProgressCard/>
                <LessonProgressCard/>
                <LessonProgressCard/>                
                </div>
               </div>
            </div>
        </section>
    )
}