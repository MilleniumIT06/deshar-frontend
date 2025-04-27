import styles from './styles.module.scss';
import { LessonProgressCard } from '../../widgets/LessonProgressCard';
import Link from 'next/link';
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
                        <Link href="/completed-courses" className={styles.continue__link}>Открыть выполненые дисциплины</Link>
                    </div>
                </div>
            </div >
        </section >
    )
}