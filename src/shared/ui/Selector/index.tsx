'use client'
import { useState, useRef, useEffect, useId } from 'react'

import cn from 'classnames'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'

import './styles.scss'

interface Option {
	id: string
	label: string
}

interface SelectorProps {
	options?: Option[]
	defaultValue?: string
	onChange?: (value: string) => void
	className?: string
}

export const Selector = ({
	options = [
		{ id: 'week', label: 'Неделя' },
		{ id: 'month', label: 'Месяц' },
		{ id: 'year', label: 'Год' },
	],
	defaultValue = 'week',
	onChange,
	className,
}: SelectorProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedValue, setSelectedValue] = useState(defaultValue)
	const selectorRef = useRef<HTMLDivElement>(null)
	const listboxId = useId() // Для корректной работы ARIA атрибутов

	// Обработка кликов вне компонента
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const getCurrentLabel = () => {
		return options.find(option => option.id === selectedValue)?.label || options[0]?.label
	}

	const handleSelect = (id: string) => {
		setSelectedValue(id)
		setIsOpen(false)
		if (onChange) onChange(id) // Опциональный вызов колбэка
	}

	// Анимация иконки стрелки
	const arrowVariants = {
		open: { rotate: 180 },
		closed: { rotate: 0 },
	}

	// Варианты анимации для плавного раскрытия/закрытия
	const dropdownVariants = {
		open: {
			height: 'auto', // Автоматическая высота контента
			opacity: 1,
			transition: {
				duration: 0.2,
				ease: easeInOut,
			},
		},
		closed: {
			height: 0, // Схлопывание контейнера
			opacity: 0,
			transition: {
				duration: 0.2,
				ease: easeInOut,
			},
		},
	}

	return (
		<div
			ref={selectorRef}
			className={cn('Selector', isOpen && 'active', className)}
			role="combobox"
			aria-expanded={isOpen}
			aria-haspopup="listbox"
			aria-controls={listboxId} // Связь с выпадающим списком
		>
			<div className="Selector__header">
				<span>{getCurrentLabel()}</span>
				<button
					className={cn('btn-reset', 'Selector__btn')}
					onClick={() => setIsOpen(!isOpen)}
					aria-label={isOpen ? 'Закрыть список' : 'Открыть список'}
					aria-expanded={isOpen}>
					<motion.svg
						width="14"
						height="9"
						viewBox="0 0 14 9"
						fill="none"
						variants={arrowVariants}
						initial="closed"
						animate={isOpen ? 'open' : 'closed'}
						transition={{ duration: 0.2 }}>
						<path d="M13 1L7 7L1 0.999999" stroke="#303030" strokeWidth="1.5" />
					</motion.svg>
				</button>
			</div>

			{/* Анимация при unmount компонента */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="Selector__body"
						variants={dropdownVariants}
						initial="closed"
						animate="open"
						exit="closed" // Критично для анимации закрытия
					>
						<div className="Selector__body_inner">
							<ul id={listboxId} className={cn('list-reset', 'Selector__list')}>
								{options.map(option => (
									<li
										key={option.id}
										className={cn('Selector__list_item', {
											selected: option.id === selectedValue,
										})}
										onClick={() => handleSelect(option.id)}>
										<span>{option.label}</span>
									</li>
								))}
							</ul>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
