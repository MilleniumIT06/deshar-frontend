/* eslint-disable @next/next/no-img-element */
import { useDroppable } from '@dnd-kit/core'
import cn from 'classnames'
import './dropItem.scss'

interface DropItemProps {
	id: number | string
	imageUrl: string
	currentValue: string | null
}

export const DropItem = ({ id, imageUrl, currentValue }: DropItemProps) => {
	const { setNodeRef, isOver } = useDroppable({ id })
	return (
		<div ref={setNodeRef} className={cn('drop-item', { 'is-over': isOver })}>
			<div className="drop-item__image-container">
				<img src={imageUrl} alt="Drop item" className="drop-item__image" style={{ width: 186, height: 172 }} />
			</div>

			{currentValue && (
				<div className="drop-item__badge">
					<span className="drop-item__value">{currentValue}</span>
				</div>
			)}
		</div>
	)
}
