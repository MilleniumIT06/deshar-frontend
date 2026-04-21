'use client'
import cn from 'classnames'
import { forwardRef, useCallback, useState } from 'react'
import './styles.scss'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label?: string
	error?: boolean
	validationMessage?: string
	startAdornment?: React.ReactNode
	endAdornment?: React.ReactNode
	fullWidth?: boolean
}

const EngineInput = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			fullWidth,
			className,
			type,
			error = false,
			startAdornment,
			endAdornment,
			validationMessage,
			id,
			...props
		},
		ref,
	) => {
		const [showPassword, setShowPassword] = useState(false)
		const togglePasswordVisibility = useCallback(() => setShowPassword(prev => !prev), [])

		const isPassword = type === 'password'
		const inputType = isPassword && showPassword ? 'text' : type
		const showVisibilityToggle = isPassword && !props.disabled
		const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`

		const containerClasses = cn(
			'engine-input',
			{
				'engine-input--full-width': fullWidth,
				'engine-input--error': error || Boolean(validationMessage),
			},
			className,
		)

		return (
			<div className={containerClasses}>
				{label && (
					<label htmlFor={inputId} className="engine-input__label">
						{label}
					</label>
				)}

				<div className="engine-input__field-wrapper">
					{startAdornment && (
						<span className="engine-input__adornment engine-input__adornment--start">
							{startAdornment}
						</span>
					)}

					<input
						id={inputId}
						className="engine-input__field"
						type={inputType}
						aria-invalid={Boolean(error || validationMessage)}
						ref={ref}
						{...props}
					/>

					{showVisibilityToggle && (
						<button type="button" className="engine-input__toggle" onClick={togglePasswordVisibility}>
							{showPassword ? (
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2">
									<path d="M22 12C20 16 16.4444 19 12 19C7.55556 19 4 16 2 12C4 8 7.55556 5 12 5C16.4444 5 20 8 22 12Z" />
									<circle cx="12" cy="12" r="3" />
								</svg>
							) : (
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2">
									<path d="M17.5 17.2931C15.8976 18.3663 14.0427 19 12 19C7.55556 19 4 16 2 12C3.10926 9.78147 4.69704 7.87056 6.6496 6.60849M9.5 5.3291C10.296 5.11468 11.131 5 12 5C16.4444 5 20 8 22 12C21.3987 13.2026 20.6568 14.3148 19.7924 15.2823" />
									<path d="M14.1213 14.1213C12.9497 15.2929 11.0502 15.2929 9.87866 14.1213C8.70709 12.9497 8.70709 11.0502 9.87866 9.87866" />
									<path d="M4 4L20 20" />
								</svg>
							)}
						</button>
					)}

					{!isPassword && endAdornment && (
						<span className="engine-input__adornment engine-input__adornment--end">
							{endAdornment}
						</span>
					)}
				</div>

				{validationMessage && <span className="engine-input__message">{validationMessage}</span>}
			</div>
		)
	},
)

EngineInput.displayName = 'EngineInput'
export { EngineInput }
