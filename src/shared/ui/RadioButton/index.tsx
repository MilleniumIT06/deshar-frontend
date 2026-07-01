import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

import './styles.scss'

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	register: UseFormRegisterReturn
}

export const RadioButton = ({ label, register, ...props }: RadioButtonProps) => {
	return (
		<label className="CustomRadio">
			<input type="radio" {...register} {...props} className="CustomRadio__input" />
			<div className="CustomRadio__box">
				<div className="CustomRadio__circle" />
			</div>
			<span className="CustomRadio__label">{label}</span>
		</label>
	)
}
