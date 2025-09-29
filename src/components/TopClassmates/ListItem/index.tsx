import './styles.scss'
import cn from 'classnames'

interface TopClassmatesListItemProps {
	placeNumber: number
	name: string
	time: number
	doneModules: number
	points: number
	parralelClass?: string
	type: 'parallel' | 'classmates'
}

export const TopClassmatesListItem = ({
	doneModules,
	name,
	placeNumber,
	points,
	time,
	type,
	parralelClass,
}: TopClassmatesListItemProps) => {
	const placeClasses = {
		1: 'TopClassmatesListItem__place_first',
		2: 'TopClassmatesListItem__place_second',
		3: 'TopClassmatesListItem__place_third',
	}
	const placeClass = placeClasses[placeNumber as keyof typeof placeClasses] || 'TopClassmatesListItem__place_other'

	return (
		<li className="TopClassmatesListItem">
			<span className="TopClassmatesListItem__name">
				<div className={cn('TopClassmatesListItem__place', placeClass)}>
					<span>{placeNumber}</span>
				</div>
				<h6>{name}</h6>
			</span>
			<ul className="TopClassmatesListItem__list">
				{type === 'parallel' && (
					<li className="TopClassmatesListItem__list_item">
						<span className="TopClassmatesListItem__list_item-key">Класс</span>
						<span className="TopClassmatesListItem__list_item-class">{parralelClass}</span>
					</li>
				)}
				<li className="TopClassmatesListItem__list_item">
					<span className="TopClassmatesListItem__list_item-key">Затрачено времени</span>
					<span className="TopClassmatesListItem__list_item-time">{time}</span>
				</li>
				<li className="TopClassmatesListItem__list_item">
					<span className="TopClassmatesListItem__list_item-key">Выполнено модулей</span>
					<span className="TopClassmatesListItem__list_item-modules">{doneModules}</span>
				</li>
				<li className="TopClassmatesListItem__list_item">
					<span className="TopClassmatesListItem__list_item-key">Баллы</span>
					<span className="TopClassmatesListItem__list_item-points">{points}</span>
				</li>
			</ul>
		</li>
	)
}
