import { CoursesBlock } from './CoursesBlock';
import styles from './styles.module.scss';
export const AllCourses = () => {
    return (
        <section className={styles.AllCourses}>
            <div className="container">
            <div className={styles.inner}>
            <h1 className="section__title">Все дисциплины</h1>
                <CoursesBlock/>
            </div>
            </div>
        </section>
    )
}