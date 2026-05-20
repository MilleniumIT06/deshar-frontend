import Image from 'next/image'
import './pocket.scss'
import { useDroppable } from '@dnd-kit/core'
import cn from 'classnames'

interface Props {
	id: number | string
	imageUrl: string
	currentValue: string | null
	removeItem: (id: number | string) => void
}
export const Pocket = ({ id, imageUrl, currentValue, removeItem }: Props) => {
	const { setNodeRef, isOver } = useDroppable({ id })
	return (
		<div className={cn('DropPocket', { 'DropPocket--over': isOver })} ref={setNodeRef}>
			{currentValue && (
				<div className="DropPocket__item">
					<span>{currentValue}</span>
					<button onClick={() => removeItem(id)}>
						<svg
							width="19"
							height="19"
							viewBox="0 0 19 19"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M11.2407 9.49994L18.6389 2.1015C19.1204 1.62026 19.1204 0.842166 18.6389 0.360928C18.1577 -0.120309 17.3796 -0.120309 16.8984 0.360928L9.4999 7.75937L2.10167 0.360928C1.62021 -0.120309 0.842337 -0.120309 0.361098 0.360928C-0.120366 0.842166 -0.120366 1.62026 0.361098 2.1015L7.75933 9.49994L0.361098 16.8984C-0.120366 17.3796 -0.120366 18.1577 0.361098 18.639C0.600929 18.879 0.91627 18.9996 1.23139 18.9996C1.5465 18.9996 1.86162 18.879 2.10167 18.639L9.4999 11.2405L16.8984 18.639C17.1384 18.879 17.4535 18.9996 17.7686 18.9996C18.0838 18.9996 18.3989 18.879 18.6389 18.639C19.1204 18.1577 19.1204 17.3796 18.6389 16.8984L11.2407 9.49994Z"
								fill="white"
							/>
						</svg>
					</button>
				</div>
			)}
			<div className="DropPocket__content">
				<Image width={124} height={127} src={imageUrl} alt="testpocket1da" />
			</div>
		</div>
	)
}
