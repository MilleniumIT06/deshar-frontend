'use client';
import cn from 'classnames'
import styles from './styles.module.scss'

export const LessonItem = ({
	id = 1,
	text = 'test',
	number = 1,
	completed = true,
	active = false,
	fullWidth,
	handleClick,
	disabled = false
}: {
	id: number | string
	text: string
	number: number | string
	completed: boolean
	active: boolean
	fullWidth?: boolean
	handleClick: () => void;
	disabled?: boolean;
}) => {
	return (
		<li
			key={id}
			className={cn(
				styles.index,
				completed && styles.completed,
				active && styles.active,
				fullWidth && styles.fullWidth,
				disabled && styles.disabled
			)}
			onClick={disabled ? undefined : handleClick}
		>
			<span className={styles.index__number}>{number}</span>
			<span className={styles.index__text}>{text}</span>
		</li>
	)
}