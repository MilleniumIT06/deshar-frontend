import { ModuleCard } from './ModuleCard';
import styles from './styles.module.scss';

export const ModulesContent = () => {
    return (
        <section className={styles.ModulesContent}>
            <div className="container">
                <div className={styles.inner}>
                    <h1 className="section__title">Английский язык</h1>
                    <div className={styles.cards}>
                        <ModuleCard number={1} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard number={1} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard number={1} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard number={1} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard number={1} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard number={1} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard number={1} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard number={1} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                    </div>
                </div>
            </div>
        </section>
    )
}