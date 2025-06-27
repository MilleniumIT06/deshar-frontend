import cn from 'classnames';

import { SubjectCard } from '../SubjectCard';

import styles from './styles.module.scss';

export const Learn = () => {
    return (
        <section className={styles.index}>
            <div className="container">
                <div className={styles.inner}>
                    <h2 className="section__title">Учим шаг за&nbsp;шагом</h2>
                    <div className={styles.items}>
                        <ul className={cn("list-reset", styles.learnList)}>
                            {/* <SubjectCard type="long" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" /> */}
                            <SubjectCard className={styles.learnItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                            <SubjectCard className={styles.learnItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                            <SubjectCard className={styles.learnItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                            <SubjectCard className={styles.learnItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                            <SubjectCard className={styles.learnItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                            <SubjectCard className={styles.learnItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                            <SubjectCard className={styles.learnItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                            <SubjectCard className={styles.learnItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                            <SubjectCard className={styles.learnItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                            <SubjectCard className={styles.learnItem} type="short" title="Ингушский язык" description="test" modulesCount={85} imageUrl="subjectcardskeleton" />
                        </ul>
                    </div>
                </div>
            </div>
        </section>

    )
}