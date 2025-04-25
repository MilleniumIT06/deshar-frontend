import cn from 'classnames';
import styles from './styles.module.scss';

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
                    <table className={cn(styles.topClassmates__table, styles.classmatesTable)}>
                        <tr className={cn(styles.classmatesTable__header)}>
                            <th>Место</th>
                            <th>Ученик</th>
                            <th>Затрачено времени</th>
                            <th>Выполнено модулей</th>
                            <th>Баллы</th>
                        </tr>
                        <tr className={cn(styles.classmatesTable__item, styles.tableItem)}>
                            <td className={styles.tableItem__place}>
                                <div>
                                    <span>1</span>
                                </div>
                            </td>
                            <td className={styles.tableItem__name}>Дзауров Ахмед</td>
                            <td className={styles.tableItem__time}>2ч 37м</td>
                            <td className="tableItem__done">18</td>
                            <td className="tableItem__points">128</td>
                        </tr>
                        <tr className="classmatesTable__item tableItem">
                            <td className="tableItem__place">
                                <div>

                                    <span>1</span>
                                </div>
                            </td>
                            <td className="tableItem__name">Дзауров Ахмед</td>
                            <td className="tableItem__time">2ч 37м</td>
                            <td className="tableItem__done">18</td>
                            <td className="tableItem__points">128</td>
                        </tr>
                        <tr className="classmatesTable__item tableItem">
                            <td className="tableItem__place">
                                <div>
                                    <span>1</span>
                                </div>
                            </td>
                            <td className="tableItem__name">Дзауров Ахмед</td>
                            <td className="tableItem__time">2ч 37м</td>
                            <td className="tableItem__done">18</td>
                            <td className="tableItem__points">128</td>
                        </tr>
                    </table>
                </div>
            </div>
        </section >
    )
}