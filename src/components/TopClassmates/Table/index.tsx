import { TableItem } from '../TableItem';

import styles from './styles.module.scss';

interface TableProps {
    data: {
        id: number;
        type: "parallel" | "classmates";
        students: { id: number; class: string; name: string; doneModules: number; placeNumber: number; points: number; time: string; }[]
    }
}
export const Table = ({ data }: TableProps) => {
    return (
        <table className={styles.Table}>
            <tbody>
                <tr className={styles.Table__header}>
                    <th>Место</th>
                    <th>Ученик</th>
                    {data.type === "parallel" && <th>Класс</th>}
                    <th>Затрачено времени</th>
                    <th>Выполнено модулей</th>
                    <th>Баллы</th>
                </tr>
                {
                    data.students.map((student) => (
                        <TableItem key={student.id} type={data.type} parralelClass={student.class} name={student.name} doneModules={student.doneModules} placeNumber={student.placeNumber} points={student.points} time={student.time} />
                    ))
                }
            </tbody>
        </table>
    )
}