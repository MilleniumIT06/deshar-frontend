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

export const TableItem = ({
    doneModules,
    name,
    placeNumber,
    points,
    time,
    type,
    parralelClass
}: TableItemProps) => {
    const placeClasses = {
        1: styles.first,
        2: styles.second,
        3: styles.third
    };

    const placeClass = placeClasses[placeNumber as keyof typeof placeClasses] || styles.other;

    if (type === "parallel" && !parralelClass) {
        console.warn(`TableItem: parralelClass is required for type "parallel" (placeNumber: ${placeNumber})`);
    }

    return (
        <tr className={styles.tableItem}>
            <td className={styles.tableItem__place}>
                <div className={placeClass}>
                    <span>{placeNumber}</span>
                </div>
            </td>

            <td className={styles.tableItem__name} title={name}>
                {name}
            </td>

            {type === "parallel" && (
                <td className={styles.tableItem__parralelClass}>
                    {parralelClass || '—'}
                </td>
            )}

            <td className={styles.tableItem__time}>{time}</td>
            <td className={styles.tableItem__done}>{doneModules}</td>
            <td className={styles.tableItem__points}>{points}</td>
        </tr>
    )
}