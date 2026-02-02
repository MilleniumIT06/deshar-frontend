import { type ReactNode, useState } from 'react'

import cn from 'classnames'
import './styles.scss'

interface MenuAccordionProps {
	title: string
	children: ReactNode
	icon?: ReactNode
	toggleIcon?: ReactNode // Иконка для стрелки
}

const DefaultToggleIcon = () => (
	<svg width="14" height="9" viewBox="0 0 14 9" fill="none">
		<path d="M13 1L7 7L1 0.999999" stroke="#7D7979" strokeWidth="1.5" />
	</svg>
)
const DefaultIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="3" y="3" width="5" height="5" rx="2" strokeWidth="2" />
		<rect x="3" y="12" width="5" height="5" rx="2" strokeWidth="2" />
		<rect x="12" y="3" width="5" height="5" rx="2" strokeWidth="2" />
		<rect x="12" y="12" width="5" height="5" rx="2" strokeWidth="2" />
	</svg>
)
export const MenuAccordion = ({ children, title = 'Мои классы', icon, toggleIcon }: MenuAccordionProps) => {
	const [open, setOpen] = useState(false)

	return (
		<div className={cn('MenuAccordion', open && 'MenuAccordion_open')}>
			<div className="MenuAccordion__header" onClick={() => setOpen(prev => !prev)}>
				<div className="MenuAccordion__header_left">
					{icon || <DefaultIcon />}
					<span>{title}</span>
				</div>
				<button className="btn-reset MenuAccordion__toggle">{toggleIcon || <DefaultToggleIcon />}</button>
			</div>
			{open && <div className="MenuAccordion__content">{children}</div>}
		</div>
	)
}
