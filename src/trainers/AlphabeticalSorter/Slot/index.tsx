import { useDroppable } from '@dnd-kit/core'
import cn from 'classnames'
import './styles.scss'

export const AlphabeticalSlot = ({
	id,
	value,
	orderNumber = 1,
}: {
	id: number | string
	value: string | null
	orderNumber: number
}) => {
	const { setNodeRef } = useDroppable({ id })

	return (
		<li
			ref={setNodeRef}
			className={cn('alphabetical-slot', {
				'alphabetical-slot--filled': value,
			})}>
			<span className="alphabetical-slot__number">{orderNumber}</span>
			{value && <span className="alphabetical-slot__value">{value}</span>}
		</li>
	)
}
