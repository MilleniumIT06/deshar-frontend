import cn from 'classnames'
import './styles.scss'

interface StateChipProps {
	state: 'accepted' | 'rejected' | 'checking' | 'notCompleted'
}
const STATE_CONFIG = {
	accepted: {
		title: 'Принято',
		className: 'StateChip-accepted',
	},
	rejected: {
		title: 'Отклонено',
		className: 'StateChip-rejected',
	},
	notCompleted: {
		title: 'Не завершено',
		className: 'StateChip-notCompleted',
	},
	checking: {
		title: 'Ожидает принятия',
		className: 'StateChip-checking',
	},
}
export const StateChip = ({ state }: StateChipProps) => {
	const stateValue = STATE_CONFIG[state]

	return (
		<div className={cn('StateChip', stateValue.className)}>
			<span className="StateChip__text">{stateValue.title}</span>
		</div>
	)
}
