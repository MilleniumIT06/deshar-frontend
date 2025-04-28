import styles from './styles.module.scss';
interface TableItemProps {
    placeNumber: number;
    name: string;
    time: string;
    doneModules: number;
    points: number;
    parralelClass?: string;
    type: "parallel" | "classmates";
}
export const TableItem = ({ doneModules, name, placeNumber, points, time, type, parralelClass }: TableItemProps) => {
    return (
        <tr className={styles.tableItem}>
            <td className={styles.tableItem__place}>
                <div>
                    <span>{placeNumber}</span>
                </div>
            </td>
            <td className={styles.tableItem__name}>{name}</td>
            {type === "parallel" && <td className={styles.tableItem__parralelClass}>{parralelClass}</td>}
            <td className={styles.tableItem__time}>{time}</td>
            <td className={styles.tableItem__done}>{doneModules}</td>
            <td className={styles.tableItem__points}>{points}</td>
        </tr>
    )
}