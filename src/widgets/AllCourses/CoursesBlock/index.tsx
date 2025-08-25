import styles from './styles.module.scss';

export const CoursesBlock = ({ children, title }: { children: React.ReactNode; title: string; }) => {
    return (
        <div className={styles.CoursesBlock}>
            <h3 className={styles.title}>
                {title}
            </h3>
            <ul className={styles.Cards}>
                {children}
            </ul>
        </div>
    )
}