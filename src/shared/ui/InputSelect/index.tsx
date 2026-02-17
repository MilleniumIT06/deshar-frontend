/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState } from 'react'

import cn from 'classnames'
import { motion, AnimatePresence } from 'motion/react'

import './styles.scss'

interface InputSelectProps {
	placeholderValue: string
	options: { id: string | number; name: string }[]
	value: any
	setValue: (value: any) => void
	name?: string
	onBlur?: () => void
	variant?: 'admin' | 'common'
	isLoading?: boolean
	isError?: boolean
}

const InputSelect = ({
	isLoading,
	isError,
	placeholderValue = 'example',
	options,
	setValue,
	value,
	variant = 'common',
}: InputSelectProps) => {
	const [open, setOpen] = useState(false)

	const handleChange = (selectedValue: any) => {
		setValue(selectedValue)
		setOpen(false)
	}

	// const selectedLabel = options.find(option => option.name === value)?.name || ''

	return (
		<div className={cn('InputSelect', variant === 'admin' && 'adminVariant')} data-testid="input-select">
			<input
				placeholder={placeholderValue}
				className={cn('input-reset', 'InputSelect__input')}
				value={value}
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
						{isLoading ? (
							<div>Loading...</div>
						) : isError ? (
							<div>Something went wrong...</div>
						) : !isLoading && !isError && options.length === 0 ? (
							<div>No options available</div>
						) : (
							options.map(option => (
								<div
									key={option.id}
									className={cn('InputSelect__option', {
										['selected']: option.name === value,
									})}
									onClick={() => handleChange(option.name)}>
									{option.name}
								</div>
							))
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export { InputSelect }
