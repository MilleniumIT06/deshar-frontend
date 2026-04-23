import { useDraggable } from '@dnd-kit/core'
import cn from 'classnames'

import './variant.scss'

interface VariantProps {
	id: number | string
	value: string
	isDisabled: boolean
}

export const Variant = ({ isDisabled, value, id }: VariantProps) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id,
		data: { value },
		disabled: isDisabled,
	})

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: undefined

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={cn('variant', {
				'is-disabled': isDisabled,
				'is-dragging': isDragging,
			})}
			{...listeners}
			{...attributes}>
			<span className="variant__text">{value}</span>
		</div>
	)
}
