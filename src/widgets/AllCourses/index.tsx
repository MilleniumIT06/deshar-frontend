import { SubjectCard } from '@/components/SubjectCard';
import { coursesB } from '@/mocks/data';

import { CoursesBlock } from './CoursesBlock';
import styles from './styles.module.scss';

export const AllCourses = () => {
    return (
        <section className={styles.AllCourses}>
            <div className="container">
                <div className={styles.inner}>
                    <h1 className="section__title">Все дисциплины</h1>
                    <CoursesBlock title='1-4 класс'>
                        {coursesB.map(item => <SubjectCard
                            key={item.id + 'key'}
                            modulesCount={item.modulesCount}
                            title={item.title}
                            description={item.description}
                            id={item.id}
                            imageUrl={item.imageUrl}
                            type="long"
                        />)}
                    </CoursesBlock>
                    <CoursesBlock title='5-9 класс'>
                        {coursesB.map(item => <SubjectCard
                            key={item.id + 'key'}
                            modulesCount={item.modulesCount}
                            title={item.title}
                            description={item.description}
                            id={item.id}
                            type="long"
                        />)}
                    </CoursesBlock>
                </div>
            </div>
        </section>
    )
}