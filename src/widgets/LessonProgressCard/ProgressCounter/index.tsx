import Image from 'next/image'
import styles from './styles.module.scss'
interface ProgressCounterProps {
	type: 'finished' | 'process' | 'left'
	count: number
}
export const ProgressCounter = ({ count = 1, type }: ProgressCounterProps) => {
	let title = null
	switch (type) {
		case 'finished':
			title = 'Модулей выполнено'
			break
		case 'process':
			title = 'Модулей в процессе'
			break
		case 'left':
			title = 'Модулей осталось'
			break

		default:
			title = 'Error'
			break
	}

	return (
		<li className={styles.ProgressCounter}>
			<div className={styles.ProgressCounter__info}>
				<div className={styles.ProgressCounter__icon}>
					<Image
						src={`/LessonProgressCard/${type}.svg`}
						alt="Progress counter icon"
						width={24}
						height={24}
					/>
				</div>
				<span className={styles.ProgressCounter__title}>{title}</span>
			</div>
			<span className={styles.ProgressCounter__count}>{count}</span>
		</li>
	)
}
