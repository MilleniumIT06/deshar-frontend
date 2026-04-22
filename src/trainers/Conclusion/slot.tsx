import cn from 'classnames'
import { useDroppable } from '@dnd-kit/core'
import './styles.scss'

export const SlotInput = ({ id, value }: { id: number | string; value: string | null }) => {
	const { setNodeRef } = useDroppable({ id })

	return (
		<span
			ref={setNodeRef}
			className={cn('slot-input', {
				'slot-input--filled': value,
			})}>
			{value || ''}
		</span>
	)
}
