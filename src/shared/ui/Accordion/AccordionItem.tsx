'use client'

import { AnimatePresence, motion } from 'motion/react'

import './AccordionItem.scss'

interface AccordionItemProps {
	id: string
	title: React.ReactNode
	content: React.ReactNode
	isOpen: boolean
	onToggle: (id: string) => void
}

export const AccordionItem = ({ id, title, content, isOpen, onToggle }: AccordionItemProps) => {
	return (
		<div className="AccordionItem">
			<button
				type="button"
				className="AccordionItem__trigger"
				onClick={() => onToggle(id)}
				aria-expanded={isOpen}
				aria-controls={`accordion-panel-${id}`}
				id={`accordion-header-${id}`}>
				<span className="AccordionItem__title">{title}</span>
				<motion.span
					className="AccordionItem__icon"
					animate={{ rotate: isOpen ? 45 : 0 }}
					transition={{ duration: 0.2, ease: 'easeInOut' }}>
					+
				</motion.span>
			</button>

			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						key="content"
						id={`accordion-panel-${id}`}
						role="region"
						aria-labelledby={`accordion-header-${id}`}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25, ease: 'easeInOut' }}
						className="AccordionItem__contentWrapper">
						<div className="AccordionItem__content">{content}</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
