'use client'
import { useDraggable } from '@dnd-kit/core'
import cn from 'classnames'

import './styles.scss'

export const MoveBox = ({ id, char = 'a', isDisabled }: { id: number | string; char: string; isDisabled: boolean }) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id,
		data: { char },
		disabled: isDisabled,
	})

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: undefined
	return (
		<li className="MoveBox__wrapper">
			<span
				className={cn('MoveBox', isDisabled && 'disabled', isDragging && 'dragging')}
				style={style}
				{...listeners}
				{...attributes}
				ref={setNodeRef}>
				{char}
			</span>
			{isDragging && <span className="MoveBox disabled">{char}</span>}
		</li>
	)
}
