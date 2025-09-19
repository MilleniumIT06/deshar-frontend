import { TableItem } from '../TableItem'

import './styles.scss'

interface Student {
	id: number
	class: string
	name: string
	doneModules: number
	placeNumber: number
	points: number
	time: string
}

export interface TableData {
	id: number
	type: 'parallel' | 'classmates'
	students: Student[]
}

interface TableProps {
	data: TableData
}

export const Table = ({ data }: TableProps) => {
	const { type, students } = data

	if (!students || students.length === 0) {
		return <div className="emptyTable">Данные для отображения отсутствуют</div>
	}

	return (
		<table className="Table">
			<thead>
				<tr className="Table__header">
					<th>Место</th>
					<th>Ученик</th>
					{type === 'parallel' && <th>Класс</th>}
					<th>Затрачено времени</th>
					<th>Выполнено модулей</th>
					<th>Баллы</th>
				</tr>
			</thead>

			<tbody>
				{students.map(student => {
					const { id, class: className, ...studentProps } = student

					return (
						<TableItem
							key={`student-${id}`}
							type={type}
							parralelClass={className}
							{...studentProps}
						/>
					)
				})}
			</tbody>
		</table>
	)
}
