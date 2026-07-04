/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import cn from 'classnames'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'

import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import './styles.scss'

interface Option<T extends string | number = string | number> {
	id: T
	name: string
}

interface MultiInputSelectProps<T extends string | number> {
	placeholderValue: string
	options: Option<T>[] | undefined
	value: Option<T>[]
	setValue: (value: Option<T>[]) => void
	// ... остальные пропсы
	variant?: 'admin' | 'common'
	isLoading?: boolean
	isError?: boolean
}

const MultiInputSelect = <T extends string | number>({
	isLoading,
	isError,
	placeholderValue = 'Выберите...',
	options,
	setValue,
	value = [],
	variant = 'common',
}: MultiInputSelectProps<T>) => {
	const [open, setOpen] = useState(false)
	const selectRef = useOutsideClick(() => {
		if (open) setOpen(false)
	})

	 const handleToggleOption = (option: Option<T>) => {
		const isSelected = value.some(item => item.id === option.id)
		if (isSelected) {
			setValue(value.filter(item => item.id !== option.id))
		} else {
			setValue([...value, option])
		}
	}

	// Текст в инпуте: перечисляем названия через запятую
	const displayValue = value.map(v => v.name).join(', ')

	return (
		<div
			className={cn('MultiInputSelect', variant === 'admin' && 'adminVariant', 'multi')}
			ref={selectRef}
			data-testid="input-select">
			<input
				placeholder={placeholderValue}
				className={cn('input-reset', 'MultiInputSelect__input')}
				value={displayValue}
				type="text"
				readOnly
				onClick={() => setOpen(!open)} // Позволяем открывать по клику на инпут
			/>

			<button
				type="button"
				className={cn('btn-reset', 'MultiInputSelect__openBtn')}
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
						className="MultiInputSelect__options"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2, ease: 'easeInOut' }}>
						{isLoading ? (
							<div className="status-info">Loading...</div>
						) : isError ? (
							<div className="status-info error">Something went wrong...</div>
						) : options?.length === 0 ? (
							<div className="status-info">No options available</div>
						) : (
							options?.map(option => {
								const isSelected = value.some(item => item.id === option.id)
								return (
									<div
										key={option.id}
										className={cn('MultiInputSelect__option', {
											['selected']: isSelected,
										})}
										onClick={() => handleToggleOption(option)}>
										<input
											type="checkbox"
											checked={isSelected}
											readOnly
											className="MultiInputSelect__checkbox"
										/>
										<span>{option.name}</span>
									</div>
								)
							})
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export { MultiInputSelect }
