import cn from 'classnames';

import { SubjectCard } from "../SubjectCard";

import styles from './styles.module.scss';

export const OtherSubjects = () => {
    return (
        <section className={styles.otherSubjects}>
            <div className="container">
                <div className={styles.otherSubjects__inner}>
                    <h2 className="section__title">Другие дисциплины</h2>
                    <div className={styles.otherSubjects__top}>
                        <ul className={cn("list-reset", styles.otherSubjects__list, styles.subjectsList)} >
                        <SubjectCard className={styles.otherSubjectsItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                        <SubjectCard className={styles.otherSubjectsItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                        <SubjectCard className={styles.otherSubjectsItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                        <SubjectCard className={styles.otherSubjectsItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                        <SubjectCard className={styles.otherSubjectsItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                        <SubjectCard className={styles.otherSubjectsItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                        <SubjectCard className={styles.otherSubjectsItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                        </ul>
                    </div>
                </div>
            </div>
        </section>

    )
}