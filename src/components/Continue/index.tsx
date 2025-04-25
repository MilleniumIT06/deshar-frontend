import cn from 'classnames';
import styles from './styles.module.scss';
export const Continue = () => {
    return (
        <section className={styles.continue}>
            <div className="container">
                <div className={styles.continue__inner}>
                    <h2 className="section__title">Продолжим обучение</h2>
                    <div className={styles.continue__subjects}>
                        <div className={styles.continueSubject}>
                            <div className={styles.continueSubject__header}>
                                <h6 className={styles.continueSubject__title}>Ингушский язык</h6>
                                <div className={styles.continueSubject__module}>
                                    <span>21 модуль</span>
                                </div>

                            </div>
                            <div className={cn(styles.continueSubject__progress, styles.subjectProgress)}>
                                <ul className={cn("list-reset", styles.subjectProgress__list)}>
                                    <li className={cn(styles.subjectProgress__item, styles.progressItem)}>
                                        <span className={styles.progressItem__title}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 12.6413L10.6027 15L16 10" stroke="#1BAA7D" strokeWidth="2"
                                                    strokeLinecap="round" stroke-linejoin="round" />
                                                <circle cx="12" cy="12" r="8" stroke="#1BAA7D" strokeWidth="2" />
                                            </svg>
                                            Модулей выполнено</span>
                                        <span className={styles.progressItem__count}>7</span>
                                    </li>
                                    <li className={cn(styles.subjectProgress__item, styles.progressItem)}>
                                        <span className={styles.progressItem__title}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 12.6413L10.6027 15L16 10" stroke="#1BAA7D" strokeWidth="2"
                                                    strokeLinecap="round" stroke-linejoin="round" />
                                                <circle cx="12" cy="12" r="8" stroke="#1BAA7D" strokeWidth="2" />
                                            </svg>
                                            Модулей выполнено</span>
                                        <span className={styles.progressItem__count}>7</span>
                                    </li>
                                    <li className={cn(styles.subjectProgress__item, styles.progressItem)}>
                                        <span className={styles.progressItem__title}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 12.6413L10.6027 15L16 10" stroke="#1BAA7D" strokeWidth="2"
                                                    strokeLinecap="round" stroke-linejoin="round" />
                                                <circle cx="12" cy="12" r="8" stroke="#1BAA7D" strokeWidth="2" />
                                            </svg>
                                            Модулей выполнено</span>
                                        <span className={styles.progressItem__count}>7</span>
                                    </li>
                                </ul>
                                <div className={styles.subjectProgress__bar}></div>
                            </div>
                        </div>
                        <div className={styles.continueSubject}>
                            <div className={styles.continueSubject__header}>
                                <h6 className={styles.continueSubject__title}>Ингушский язык</h6>
                                <div className={styles.continueSubject__module}>
                                    <span>21 модуль</span>
                                </div>

                            </div>
                            <div className={cn(styles.continueSubject__progress, styles.subjectProgress)}>
                                <ul className={cn("list-reset", styles.subjectProgress__list)}>
                                    <li className={cn(styles.subjectProgress__item, styles.progressItem)}>
                                        <span className={styles.progressItem__title}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 12.6413L10.6027 15L16 10" stroke="#1BAA7D" strokeWidth="2"
                                                    strokeLinecap="round" stroke-linejoin="round" />
                                                <circle cx="12" cy="12" r="8" stroke="#1BAA7D" strokeWidth="2" />
                                            </svg>
                                            Модулей выполнено</span>
                                        <span className={styles.progressItem__count}>7</span>
                                    </li>
                                    <li className={cn(styles.subjectProgress__item, styles.progressItem)}>
                                        <span className={styles.progressItem__title}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 12.6413L10.6027 15L16 10" stroke="#1BAA7D" strokeWidth="2"
                                                    strokeLinecap="round" stroke-linejoin="round" />
                                                <circle cx="12" cy="12" r="8" stroke="#1BAA7D" strokeWidth="2" />
                                            </svg>
                                            Модулей выполнено</span>
                                        <span className={styles.progressItem__count}>7</span>
                                    </li>
                                    <li className={cn(styles.subjectProgress__item, styles.progressItem)}>
                                        <span className={styles.progressItem__title}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 12.6413L10.6027 15L16 10" stroke="#1BAA7D" strokeWidth="2"
                                                    strokeLinecap="round" stroke-linejoin="round" />
                                                <circle cx="12" cy="12" r="8" stroke="#1BAA7D" strokeWidth="2" />
                                            </svg>
                                            Модулей выполнено</span>
                                        <span className={styles.progressItem__count}>7</span>
                                    </li>
                                </ul>
                                <div className={styles.subjectProgress__bar}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.continue__footer}>
                        <a href="#" className={styles.continue__link}>Открыть выполненые дисциплины</a>
                    </div>
                </div>
            </div >
        </section >
    )
}