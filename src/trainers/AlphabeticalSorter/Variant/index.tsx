import { useDraggable } from '@dnd-kit/core'
import cn from 'classnames'

import './styles.scss'

export const Variant = ({ id, value, isDisabled }: { id: number | string; value: string; isDisabled: boolean }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
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
		<li
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className={cn('variant', {
				'variant--disabled': isDisabled,
			})}>
			{value}
		</li>
	)
}
