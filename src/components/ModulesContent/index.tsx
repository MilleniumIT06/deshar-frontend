import { ModuleCard } from './ModuleCard';
import styles from './styles.module.scss';

export const ModulesContent = () => {
    return (
        <section className={styles.ModulesContent}>
            <div className="container">
                <div className={styles.inner}>
                    <h1 className="section__title">Английский язык</h1>
                    <div className={styles.cards}>
                        <ModuleCard id={1} number={1} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard id={2} number={2} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard id={3} number={3} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard id={4} number={4} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard id={5} number={5} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard id={6} number={6} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard id={7} number={7} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                        <ModuleCard id={8} number={8} title="Алфавит" maxLessons={12} doneLessons={12} processLessons={0} />
                    </div>
                </div>
            </div>
        </section>
    )
}