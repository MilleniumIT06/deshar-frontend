import { SubjectsItem } from '../SubjectsItem';
import cn from 'classnames';
import styles from './styles.module.scss';
export const Learn = () => {
    return (
        <section className={styles.index}>
            <div className="container">
                <div className={styles.inner}>
                    <h2 className="section__title">Учим шаг за&nbsp;шагом</h2>
                    <div className={styles.items}>
                        <ul className={cn("list-reset", styles.learnList)}>
                            <SubjectsItem title="Ингушский язык" text="85 модулей" anotherClass={styles.learnItem} />
                            <SubjectsItem title="Ингушский язык" text="85 модулей" anotherClass={styles.learnItem} />
                            <SubjectsItem title="Ингушский язык" text="85 модулей" anotherClass={styles.learnItem} />
                            <SubjectsItem title="Ингушский язык" text="85 модулей" anotherClass={styles.learnItem} />
                            <SubjectsItem title="Ингушский язык" text="85 модулей" anotherClass={styles.learnItem} />
                            <SubjectsItem title="Ингушский язык" text="85 модулей" anotherClass={styles.learnItem} />
                            <SubjectsItem title="Ингушский язык" text="85 модулей" anotherClass={styles.learnItem} />
                            <SubjectsItem title="Ингушский язык" text="85 модулей" anotherClass={styles.learnItem} />
                            <SubjectsItem title="Ингушский язык" text="85 модулей" anotherClass={styles.learnItem} />
                            <SubjectsItem title="Ингушский язык" text="85 модулей" anotherClass={styles.learnItem} />
                        </ul>
                    </div>
                </div>
            </div>
        </section>

    )
}