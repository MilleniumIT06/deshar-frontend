'use client'

import { useEffect, useState } from 'react'

import { useDraggable, DndContext, type DragEndEvent, type UniqueIdentifier, type DragMoveEvent } from '@dnd-kit/core'
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers'

import './styles.scss'

interface BottomSheetProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	title?: string
}

// Компонент для перетаскивания
function DraggableHandle({ id }: { id: UniqueIdentifier }) {
	const { attributes, listeners, setNodeRef } = useDraggable({
		id,
	})

	return (
		<div ref={setNodeRef} className="bottomSheet__handleContainer" {...listeners} {...attributes}>
			<div className="bottomSheet__handle" />
		</div>
	)
}

export default function BottomSheet({ isOpen, onClose, children, title }: BottomSheetProps) {
	const [isBrowser, setIsBrowser] = useState(false)
	const [sheetPosition, setSheetPosition] = useState(0)
	const [isDragging, setIsDragging] = useState(false)

	const sheetId = 'bottom-sheet'

	// Определяем, работает ли код в браузере (для SSR)
	useEffect(() => {
		setIsBrowser(true)
	}, [])

	// Блокировка прокрутки тела при открытом bottom sheet
	useEffect(() => {
		if (isOpen && isBrowser) {
			document.body.style.overflow = 'hidden'
			setSheetPosition(0) // Сбрасываем позицию при открытии
		} else {
			document.body.style.overflow = 'unset'
		}

		return () => {
			if (isBrowser) {
				document.body.style.overflow = 'unset'
			}
		}
	}, [isOpen, isBrowser])

	// Обработка закрытия по клавише Escape
	useEffect(() => {
		function handleEscapeKey(event: KeyboardEvent) {
			if (event.key === 'Escape') onClose()
		}

		if (isOpen && isBrowser) {
			document.addEventListener('keydown', handleEscapeKey)
		}

		return () => {
			if (isBrowser) {
				document.removeEventListener('keydown', handleEscapeKey)
			}
		}
	}, [isOpen, onClose, isBrowser])

	// Обработчик окончания перетаскивания
	const handleDragEnd = (event: DragEndEvent) => {
		setIsDragging(false)
		const { delta } = event

		// Если перетащили достаточно далеко вниз, закрываем
		if (delta.y > 100) {
			onClose()
		} else {
			// Иначе возвращаем на исходную позицию
			setSheetPosition(0)
		}
	}

	// Обработчик перетаскивания
	const handleDragMove = (event: DragMoveEvent) => {
		if (!event) return

		const { delta } = event
		setSheetPosition(Math.max(0, delta.y))
		setIsDragging(true)
	}

	if (!isBrowser) return null

	return (
		<div className={`bottomSheet__container ${isOpen ? 'open' : ''}`}>
			{/* Overlay */}
			<div className="bottomSheet__overlay" onClick={() => !isDragging && onClose()} />

			<DndContext
				onDragEnd={handleDragEnd}
				onDragMove={handleDragMove}
				modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}>
				{/* Bottom Sheet */}
				<div className="bottomSheet" style={{ transform: `translateY(${sheetPosition}px)` }}>
					<DraggableHandle id={sheetId} />

					{/* Header */}
					{title && (
						<div className="bottomSheet__header">
							<h2 className="bottomSheet__title">{title}</h2>
						</div>
					)}

					{/* Content */}
					<div className="bottomSheet__content">{children}</div>
				</div>
			</DndContext>
		</div>
	)
}
