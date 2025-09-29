import './styles.scss'

interface TableItemProps {
	placeNumber: number
	name: string
	time: number
	doneModules: number
	points: number
	parralelClass?: string
	type: 'parallel' | 'classmates'
}
function minutesToHoursAndMinutes(totalMinutes: number) {
	const hours = Math.floor(totalMinutes / 60)
	const minutes = totalMinutes % 60
	return `${hours}ч ${minutes}м`
}
export const TableItem = ({ doneModules, name, placeNumber, points, time, type, parralelClass }: TableItemProps) => {
	const placeClasses = {
		1: 'tableItem__place_first',
		2: 'tableItem__place_second',
		3: 'tableItem__place_third',
	}

	const placeClass = placeClasses[placeNumber as keyof typeof placeClasses] || 'tableItem__place_other'

	if (type === 'parallel' && !parralelClass) {
		// eslint-disable-next-line no-console
		console.warn(`TableItem: parralelClass is required for type "parallel" (placeNumber: ${placeNumber})`)
	}
	const correctedTime = minutesToHoursAndMinutes(time)
	return (
		<tr className="tableItem">
			<td className="tableItem__place">
				<div className={placeClass}>
					<span>{placeNumber}</span>
				</div>
			</td>

			<td className="tableItem__name" title={name}>
				{name}
			</td>

			{type === 'parallel' && <td className="tableItem__parralelClass">{parralelClass || '—'}</td>}

			<td className="tableItem__time">{correctedTime}</td>
			<td className="tableItem__done">{doneModules}</td>
			<td className="tableItem__points">{points}</td>
		</tr>
	)
}
