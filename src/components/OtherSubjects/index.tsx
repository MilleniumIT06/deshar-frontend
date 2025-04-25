import { SubjectsItem } from "../SubjectsItem"
import cn from 'classnames';
import styles from './styles.module.scss';

export const OtherSubjects = () => {
    return (
        <section className={styles.otherSubjects}>
            <div className="container">
                <div className={styles.otherSubjects__inner}>
                    <h2 className="section__title">Другие дисциплины</h2>
                    <div className={styles.otherSubjects__top}>
                        <ul className={cn("list-reset", styles.otherSubjects__list, styles.subjectsList)} >
                            <SubjectsItem title="ИЗО" text="85 модулей" anotherClass={styles.otherSubjects__item} />
                            <SubjectsItem title="ИЗО" text="85 модулей" anotherClass={styles.otherSubjects__item} />
                            <SubjectsItem title="ИЗО" text="85 модулей" anotherClass={styles.otherSubjects__item} />
                            <SubjectsItem title="ИЗО" text="85 модулей" anotherClass={styles.otherSubjects__item} />
                            <SubjectsItem title="ИЗО" text="85 модулей" anotherClass={styles.otherSubjects__item} />
                            <SubjectsItem title="ИЗО" text="85 модулей" anotherClass={styles.otherSubjects__item} />
                            <SubjectsItem title="ИЗО" text="85 модулей" anotherClass={styles.otherSubjects__item} />
                        </ul>
                    </div>
                </div>
            </div>
        </section>

    )
}