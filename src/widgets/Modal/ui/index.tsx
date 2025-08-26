'use client'
import React, { type ReactNode, useEffect } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import cn from 'classnames'
import ReactDOM from 'react-dom'

import { Button } from '@/shared/ui/Button'

import styles from './styles.module.scss'

const modalVariants = cva(styles.index, {
	variants: {
		variant: {
			default: styles.info,
			info: styles.info,
			quiz: styles.quiz,
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})
interface ModalProps extends VariantProps<typeof modalVariants> {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	closeOnOverlayClick?: boolean
	className?: string
}
const Modal = ({ isOpen, onClose, children, closeOnOverlayClick, variant, className }: ModalProps) => {
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

	if (!isOpen) return null

	return ReactDOM.createPortal(
		<div className={styles.index__overlay} onClick={closeOnOverlayClick ? onClose : undefined}>
			<div className={cn(modalVariants({ variant }), className && className)}>
				<Button
					variant="iconSecondary"
					size="iconSmall"
					className={styles.index__closeBtn}
					onClick={onClose}>
					<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.6667 16.667L3.33342 3.33366" stroke="#303030" strokeWidth="2" />
						<path d="M3.33325 16.667L16.6666 3.33366" stroke="#303030" strokeWidth="2" />
					</svg>
				</Button>
				<div className={styles.index__inner}>
					<div className={styles.index__content} onClick={e => e.stopPropagation()}>
						{children}
					</div>
				</div>
			</div>
		</div>,
		document.body,
	)
}

export { Modal, modalVariants }
