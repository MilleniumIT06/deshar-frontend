'use client'
import cn from 'classnames'

import './styles.scss'

export const LessonItem = ({
	id = 1,
	text = 'test',
	number = 1,
	completed = true,
	active = false,
	fullWidth,
	handleClick,
	disabled = false,
}: {
	id: number | string
	text: string
	number: number | string
	completed: boolean
	active: boolean
	fullWidth?: boolean
	handleClick: () => void
	disabled?: boolean
}) => {
	return (
		<li
			key={id}
			className={cn(
				'LessonItem',
				completed && 'completed',
				active && 'active',
				fullWidth && 'fullWidth',
				disabled && 'disabled',
			)}
			onClick={disabled ? undefined : handleClick}>
			<span className="LessonItem__number">{number}</span>
			<span className="LessonItem__text">{text}</span>
		</li>
	)
}
