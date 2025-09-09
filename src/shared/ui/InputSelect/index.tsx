'use client'
import { useState } from 'react'

import cn from 'classnames'
import { motion, AnimatePresence } from 'motion/react'

import './styles.scss'

export interface InputSelectProps {
	className?: string
	placeholderValue: string
	options?: { value: string | number; label: string }[]
	value: number | string
	setValue: (value: number | string) => void
}

const InputSelect = ({
	className,
	placeholderValue = 'example',
	options = [
		{ value: 1, label: 'Option 1' },
		{ value: 2, label: 'Option 2' },
		{ value: 3, label: 'Option 3' },
	],
	setValue,
	value,
}: InputSelectProps) => {
	const [open, setOpen] = useState(false)

	const handleChange = (selectedValue: string | number) => {
		setValue(selectedValue)
		setOpen(false)
	}

	const selectedLabel = options.find(option => option.value === value)?.label || ''

	return (
		<div className={className} data-testid="input-select">
			<input
				placeholder={placeholderValue}
				className={cn('input-reset', 'InputSelect__input')}
				value={selectedLabel}
				type="text"
				readOnly
			/>

			<button
				type="button"
				className={cn('btn-reset', 'InputSelect__openBtn')}
				onClick={() => setOpen(!open)}
				aria-expanded={open}
				aria-label="Toggle dropdown">
				<motion.svg
					width="14"
					height="9"
					viewBox="0 0 14 9"
					fill="none"
					animate={{ rotate: open ? 180 : 0 }}
					transition={{ duration: 0.2 }}>
					<path d="M13 1.5L7 7.5L1 1.5" stroke="#7D7979" strokeWidth="1.5" />
				</motion.svg>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						className="InputSelect__options"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2, ease: 'easeInOut' }}>
						{options.map(option => (
							<div
								key={option.value}
								className={cn('InputSelect__option', {
									['selected']: option.value === value,
								})}
								onClick={() => handleChange(option.value)}>
								{option.label}
							</div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export { InputSelect }
