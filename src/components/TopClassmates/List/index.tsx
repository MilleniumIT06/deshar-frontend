import { TopClassmatesListItem } from '../ListItem'
import './styles.scss'
import { type TableData } from '../Table'

interface IList {
	data: TableData
}
export const List = ({ data }: IList) => {
	const { students, type } = data
	return (
		<ul className="TopClassmatesList">
			{students.map(student => {
				const { id, class: className, ...studentProps } = student
				return (
					<TopClassmatesListItem
						key={`student-${id}`}
						type={type}
						parallelClass={className}
						{...studentProps}
					/>
				)
			})}
		</ul>
	)
}
