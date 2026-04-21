import { type ComponentPropsWithoutRef } from 'react'
import './styles.scss'

interface EngineButtonProps extends ComponentPropsWithoutRef<'button'> {
	variant: 'primary' | 'secondary' | 'third'
}

export const EngineButton = ({ children, variant, className = '', ...props }: EngineButtonProps) => {
	const buttonClasses = `engine-button engine-button--${variant} ${className}`.trim()

	return (
		<button {...props} className={buttonClasses}>
			<span className="engine-button__content">{children}</span>
		</button>
	)
}
