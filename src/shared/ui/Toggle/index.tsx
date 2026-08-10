import type { InputHTMLAttributes } from 'react'

import './styles.scss'

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label?: string
}

export const Toggle = ({ label, ...props }: ToggleProps) => {
	return (
		<label className="CustomToggle">
			<input type="checkbox" {...props} className="CustomToggle__input" />
			<div className="CustomToggle__track">
				<div className="CustomToggle__thumb" />
			</div>
			{label && <span className="CustomToggle__label">{label}</span>}
		</label>
	)
}
