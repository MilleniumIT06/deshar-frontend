import cn from 'classnames'
import './item.scss'

export const AccentLetter = ({
	checked = false,
	letter = 'Д',
	onClick,
}: {
	onClick: () => void
	checked: boolean
	letter: string
}) => {
	return (
		<div onClick={onClick} className={cn('accent-letter', { 'accent-letter--checked': checked })}>
			<span className="accent-letter__text">
				<span className="accent-letter__mark">&apos;</span>
				{letter}
			</span>
		</div>
	)
}
