import cn from 'classnames';

import styles from './styles.module.scss';

export const Info = () => {
    return (
        <section className={styles.index}>
            <h2 className="is-hidden">info section</h2>
            <div className="container">
                <div className={styles.inner}>
                    <ul className={cn("list-reset", styles.list)}>
                        <li className={styles.item}>
                            <span>1268</span>
                            <p>обучающих уроков</p>
                        </li>
                        <li className={styles.item}>
                            <span>100+</span>
                            <p>квалифицированных учителей</p>
                        </li>
                        <li className={styles.item}>
                            <span>86%</span>
                            <p>учеников, прошедших аттестацию</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

    )
}