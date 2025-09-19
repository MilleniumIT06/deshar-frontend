import Image from 'next/image'

import './styles.scss'

type ProgressType = 'finished' | 'process' | 'left'

const PROGRESS_CONFIG: Record<ProgressType, { title: string; icon: string }> = {
	finished: {
		title: 'Модулей выполнено',
		icon: '/images/LessonProgressCard/finished.svg',
	},
	process: {
		title: 'Модулей в процессе',
		icon: '/images/LessonProgressCard/process.svg',
	},
	left: {
		title: 'Модулей осталось',
		icon: '/images/LessonProgressCard/left.svg',
	},
}

interface ProgressCounterProps {
	type: ProgressType
	count: number
}

export const ProgressCounter = ({ count = 1, type }: ProgressCounterProps) => {
	const config = PROGRESS_CONFIG[type]

	return (
		<li className="ProgressCounter" aria-label={`${config.title}: ${count}`}>
			<div className="ProgressCounter__info">
				<div className="ProgressCounter__icon">
					<Image src={config.icon} alt={`Иконка: ${config.title}`} fill aria-hidden="true" />
				</div>
				<span className="ProgressCounter__title">{config.title}</span>
			</div>
			<span className="ProgressCounter__count" aria-live="polite">
				{count}
			</span>
		</li>
	)
}
