import cn from 'classnames'
import './styles.scss'

interface ITooltip {
	text?: string
	className?: string
}
export const Tooltip = ({ text = 'Учитель класса', className }: ITooltip) => {
	return (
		<div className={cn('Tooltip', className)}>
			<span className="Tooltip__content">{text}</span>
		</div>
	)
}
