import cn from 'classnames'
import './item.scss'

interface VariantProps {
	numberItem: number
	title: string
	selected: boolean
	error: boolean
	onClick?: () => void
}

export const Variant = ({ numberItem, title, selected, error, onClick }: VariantProps) => {
	return (
		<li
			onClick={onClick}
			className={cn('ms-variant-item', {
				'is-selected': selected,
				'is-error': error,
			})}>
			<span className="ms-variant-item__number">{numberItem}</span>

			<span className="ms-variant-item__title">{title}</span>
		</li>
	)
}
