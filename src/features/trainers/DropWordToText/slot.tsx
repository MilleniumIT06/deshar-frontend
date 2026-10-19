'use client'
import { useDroppable } from '@dnd-kit/core'
import cn from 'classnames'

// Импорт стилей
import './slot.scss'

interface SlotProps {
	id: string | number
	value: string | null
}

export const Slot = ({ value, id }: SlotProps) => {
	const { setNodeRef, isOver } = useDroppable({ id })

	return (
		<div
			ref={setNodeRef}
			className={cn('slot', {
				'is-over': isOver,
			})}>
			{value && <span className="slot__text">{value}</span>}
		</div>
	)
}
