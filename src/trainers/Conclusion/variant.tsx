import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import cn from 'classnames'

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

	const style = {
		transform: CSS.Translate.toString(transform),
		zIndex: isDragging ? 100 : undefined,
	}

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
