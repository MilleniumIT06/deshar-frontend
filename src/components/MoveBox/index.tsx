'use client'
import { useDraggable } from '@dnd-kit/core'
import cn from 'classnames'

import styles from './styles.module.scss'

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
		<li className={styles.wrapper}>
			<span
				className={cn(styles.index, isDisabled && styles.disabled, isDragging && styles.dragging)}
				style={style}
				{...listeners}
				{...attributes}
				ref={setNodeRef}>
				{char}
			</span>
			{isDragging && <span className={cn(styles.index, styles.disabled)}>{char}</span>}
		</li>
	)
}
