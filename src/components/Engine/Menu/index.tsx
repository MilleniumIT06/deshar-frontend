'use client'
import { AnimatePresence, motion } from 'motion/react'
import { type ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import './styles.scss'

interface MenuProps {
	isOpen: boolean
	onClose: () => void
	content:ReactNode
}

export const Menu = ({ isOpen, onClose, content}: MenuProps) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}

		if (isOpen) {
			document.body.style.overflow = 'hidden'
			document.addEventListener('keydown', handleEscape)
		}

		return () => {
			document.body.style.overflow = 'unset'
			document.removeEventListener('keydown', handleEscape)
		}
	}, [isOpen, onClose])

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<div className="SideMenu">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="SideMenu__overlay"
					/>
					<motion.div
						initial={{ x: '-100%' }}
						animate={{ x: 0 }}
						exit={{ x: '-100%' }}
						transition={{ type: 'spring', damping: 25, stiffness: 200 }}
						className="SideMenu__panel">
						<div className="SideMenu__content">
							{content}
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>,
		document.body,
	)
}
