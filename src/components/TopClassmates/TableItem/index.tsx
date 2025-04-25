import styles from './styles.module.scss';
export const TableItem = () => {
    return (
        <tr className={styles.tableItem}>
            <td className={styles.tableItem__place}>
                <div>
                    <span>1</span>
                </div>
            </td>
            <td className={styles.tableItem__name}>Дзауров Ахмед</td>
            <td className={styles.tableItem__time}>2ч 37м</td>
            <td className={styles.tableItem__done}>18</td>
            <td className={styles.tableItem__points}>128</td>
        </tr>
    )
}