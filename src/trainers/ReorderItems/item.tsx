import { type UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import cn from 'classnames'

import './item.scss'

interface ReorderableItemProps {
	id: UniqueIdentifier
	content: string
}

export const ReorderableItem = ({ id, content }: ReorderableItemProps) => {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn('reorder-item', {
				'is-dragging': isDragging,
			})}>
			<span className="reorder-item__text">{content}</span>
		</div>
	)
}
