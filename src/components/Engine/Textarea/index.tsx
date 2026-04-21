'use client'
import { forwardRef } from 'react'
import cn from 'classnames'
import './styles.scss'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	error?: boolean
	validationMessage?: string
	fullWidth?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, fullWidth, className, error = false, validationMessage, id, rows = 4, ...props }, ref) => {
		const textareaId = id || `textarea-${label?.replace(/\s+/g, '-').toLowerCase()}`

		const containerClasses = cn(
			'engine-textarea',
			{
				'engine-textarea--full-width': fullWidth,
				'engine-textarea--error': error || Boolean(validationMessage),
			},
			className,
		)

		return (
			<div className={containerClasses}>
				{label && (
					<label htmlFor={textareaId} className="engine-textarea__label">
						{label}
					</label>
				)}

				<div className="engine-textarea__field-wrapper">
					<textarea
						id={textareaId}
						ref={ref}
						rows={rows}
						className="engine-textarea__field"
						aria-invalid={Boolean(error || validationMessage)}
						{...props}
					/>
				</div>

				{validationMessage && <span className="engine-textarea__message">{validationMessage}</span>}
			</div>
		)
	},
)

Textarea.displayName = 'Textarea'
export { Textarea }
