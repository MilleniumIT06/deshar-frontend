'use client'
import cn from 'classnames'

import './styles.scss'

export const StepCounter = ({
	active = false,
	completed = false,
	content = 1,
	handleClick,
}: {
	id: number
	content: number
	completed: boolean | undefined
	active: boolean
	handleClick: () => void
}) => {
	return (
		<li className={cn('StepCounter', active && 'active', completed && 'completed')} onClick={handleClick}>
			{content}
		</li>
	)
}
