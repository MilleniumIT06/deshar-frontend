'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createPortal } from 'react-dom'

import { m } from 'motion/react'
import './styles.scss'

export default function FullScreenMenu({ setMenuOpen }: { setMenuOpen: (value: boolean) => void }) {
	const [container, setContainer] = useState<Element | null>(null)

	useEffect(() => {
		const mainRoot = document.querySelector('main')
		setContainer(mainRoot)
	}, [])

	const handleClickItem = () => {
		setMenuOpen(false)
	}

	if (!container) return null

	return createPortal(
		<m.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="FullScreenMenu">
			<div className="FullScreenMenu__container">
				<nav className="FullScreenMenu__nav">
					<ul className="list-reset FullScreenMenu__list">
						<li className="FullScreenMenu__list_item">
							<Link href="/courses" tabIndex={2} onClick={handleClickItem}>
								Уроки
							</Link>
						</li>
						<li className="FullScreenMenu__list_item">
							<Link href="/attestation/1" tabIndex={3} onClick={handleClickItem}>
								Аттестация
							</Link>
						</li>
						<li className="FullScreenMenu__list_item">
							<Link href="#" tabIndex={4} onClick={handleClickItem}>
								Контакты
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</m.div>,
		container,
	)
}
