import cn from 'classnames';
import styles from './styles.module.scss';
import { TableItem } from './TableItem';

export const TopClassmates = () => {
    return (
        <section className={styles.topClassmates}>
            <div className="container">
                <div className={styles.topClassmates__inner}>
                    <h2 className="section__title">Самые активные одноклассники</h2>
                    <div className={styles.topClassmates__tabs}>
                        <div className={cn(styles.topClassmates__tab, styles.active)}>
                            <span>Одноклассники</span>
                        </div>
                        <div className={styles.topClassmates__tab}>
                            <span>Вся параллель</span>
                        </div>
                    </div>
                    <table className={styles.classmatesTable}>
                        <tbody>
                            <tr className={cn(styles.classmatesTable__header)}>
                                <th>Место</th>
                                <th>Ученик</th>
                                <th>Затрачено времени</th>
                                <th>Выполнено модулей</th>
                                <th>Баллы</th>
                            </tr>
                            <TableItem />
                            <TableItem />
                            <TableItem />

                        </tbody>
                    </table>
                </div>
            </div>
        </section >
    )
}