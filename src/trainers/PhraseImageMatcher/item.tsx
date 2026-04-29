import { useDroppable } from '@dnd-kit/core'
import Image from 'next/image'

export const PhraseImageMatcherItem = ({
	currentValue,
	imageUrl,
	id,
}: {
	currentValue: string | null
	imageUrl: string
	id: string | number
}) => {
	const { setNodeRef, isOver } = useDroppable({
		id: id,
	})

	return (
		<div className="PhraseImageMatcherItem">
			<div className="PhraseImageMatcherItem__image">
				<Image src={imageUrl} alt="Test" width={740} height={400} />
			</div>
			<div className="PhraseImageMatcherItem__slot_wrapper">
				<div className={`PhraseImageMatcherItem__slot ${isOver ? 'is-over' : ''}`} ref={setNodeRef}>
					{currentValue && <span>{currentValue}</span>}
				</div>
			</div>
		</div>
	)
}
