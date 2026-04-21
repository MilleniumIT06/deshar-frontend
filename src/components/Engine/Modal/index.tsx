'use client'
import { type ReactNode, useEffect } from 'react'
import cn from 'classnames'
import ReactDOM from 'react-dom'
import './styles.scss'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	variant?: 'alert' | 'support'
	closeOnOverlayClick?: boolean
	className?: string
}

const EngineModal = ({ isOpen, onClose, children, closeOnOverlayClick, variant = 'alert', className }: ModalProps) => {
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
		<div className="EngineModal" onClick={closeOnOverlayClick ? onClose : undefined}>
			<div
				className={cn('EngineModal__container', `EngineModal__container--${variant}`, className)}
				onClick={e => e.stopPropagation()}>
				<button className="EngineModal__close" onClick={onClose} aria-label="Закрыть">
					<svg
						className="EngineModal__close-icon"
						width="18"
						height="15"
						viewBox="0 0 18 15"
						fill="none">
						<path
							d="M15.6372 12.4289C16.1209 12.9131 16.1209 13.6662 15.6372 14.1503C15.3954 14.3924 15.0998 14.5 14.7774 14.5C14.4549 14.5 14.1593 14.3924 13.9175 14.1503L9 9.22815L4.08253 14.1503C3.84069 14.3924 3.54511 14.5 3.22265 14.5C2.90019 14.5 2.60461 14.3924 2.36276 14.1503C1.87908 13.6662 1.87908 12.9131 2.36276 12.4289L7.28023 7.50672L2.36276 2.58453C1.87908 2.10038 1.87908 1.34726 2.36276 0.863112C2.84645 0.378963 3.59885 0.378963 4.08253 0.863112L9 5.7853L13.9175 0.863112C14.4012 0.378963 15.1536 0.378963 15.6372 0.863112C16.1209 1.34726 16.1209 2.10038 15.6372 2.58453L10.7198 7.50672L15.6372 12.4289Z"
							fill="currentColor"
						/>
					</svg>
				</button>

				<div className="EngineModal__content">{children}</div>
			</div>
		</div>,
		document.body,
	)
}

export { EngineModal }
