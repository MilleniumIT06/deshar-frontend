'use client'

import { useDroppable } from '@dnd-kit/core'
import cn from 'classnames'
import './DropInput.scss'

interface DropInputProps {
	id: number | string
	current: string | null
	error?: boolean
}

export const DropInput = ({ id, current, error }: DropInputProps) => {
	const { setNodeRef, isOver } = useDroppable({ id })

	return (
		<span className="drop-input">
			<span
				ref={setNodeRef}
				className={cn('drop-input__box', {
					'is-over': isOver,
					'is-filled': current !== null,
					'is-error': error && current !== null,
				})}>
				{current || ''}
			</span>
		</span>
	)
}
