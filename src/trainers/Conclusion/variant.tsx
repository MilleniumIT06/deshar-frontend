import { useDraggable } from '@dnd-kit/core'
import cn from 'classnames'

import './variant.scss'

export const ConclusionVariant = ({
	id,
	isDisabled,
	value,
}: {
	id: string | number
	value: string
	isDisabled: boolean
}) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id,
		data: { value },
		disabled: isDisabled,
	})

	// const style = {
	// transform: CSS.Translate.toString(transform),
	// zIndex: isDragging ? 100 : undefined,
	// }
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			}
		: undefined
	return (
		<button
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			disabled={isDisabled}
			className={cn('conclusion-variant', {
				'conclusion-variant--dragging': isDragging,
				'conclusion-variant--disabled': isDisabled,
			})}>
			{value}
		</button>
	)
}
