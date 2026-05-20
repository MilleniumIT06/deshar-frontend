'use client'
import { useDraggable } from '@dnd-kit/core'
import cn from 'classnames'
import './MoveBox.scss'

interface MoveBoxImageProps {
	id: number | string
	char: string
	isDisabled: boolean
}

export const MoveBoxImage = ({ id, char = 'a', isDisabled }: MoveBoxImageProps) => {
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
		<li className="move-box">
			<span
				ref={setNodeRef}
				style={style}
				{...listeners}
				{...attributes}
				className={cn('move-box__item', {
					'is-dragging': isDragging,
					'is-disabled': isDisabled,
				})}>
				{char}
			</span>

			{isDragging && <span className="move-box__placeholder">{char}</span>}
		</li>
	)
}
