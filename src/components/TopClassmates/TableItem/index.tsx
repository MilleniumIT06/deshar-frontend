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
    const placeClass = placeNumber === 1 ? styles.first : placeNumber === 2 ? styles.second : placeNumber === 3 ? styles.third : styles.other;
    return (
        <tr className={styles.tableItem}>
            <td className={styles.tableItem__place}>
                <div className={placeClass}>
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