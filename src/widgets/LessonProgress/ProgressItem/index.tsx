import styles from './styles.module.scss';
export const ProgressItem = () => {
    return (
        <li className={styles.ProgressItem}>
        <span className={styles.ProgressItem__title}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12.6413L10.6027 15L16 10" stroke="#1BAA7D" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="8" stroke="#1BAA7D" strokeWidth="2" />
            </svg>
            Модулей выполнено</span>
        <span className={styles.ProgressItem__count}>7</span>
    </li>
    )
}