import Image from 'next/image'

import styles from './styles.module.scss'

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
		<li className={styles.ProgressCounter} aria-label={`${config.title}: ${count}`}>
			<div className={styles.ProgressCounter__info}>
				<div className={styles.ProgressCounter__icon}>
					<Image
						src={config.icon}
						alt={`Иконка: ${config.title}`}
						width={24}
						height={24}
						aria-hidden="true"
					/>
				</div>
				<span className={styles.ProgressCounter__title}>{config.title}</span>
			</div>
			<span className={styles.ProgressCounter__count} aria-live="polite">
				{count}
			</span>
		</li>
	)
}
