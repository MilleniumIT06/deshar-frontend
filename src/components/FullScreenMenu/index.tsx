'use client'
import { useState, useEffect } from 'react'

import Link from 'next/link'

import { motion } from 'framer-motion'
import './styles.scss'
import { createPortal } from 'react-dom'

// const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//         opacity: 1,
//         transition: {
//             staggerChildren: 0.1,
//             delayChildren: 0.3,
//             when: "beforeChildren"
//         }
//     },
//     exit: {
//         opacity: 0,
//         transition: {
//             staggerChildren: 0.05,
//             staggerDirection: -1,
//             when: "afterChildren"
//         }
//     }
// };

// const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//         y: 0,
//         opacity: 1,
//         transition: {
//             duration: 0.5,
//             ease: "easeOut"
//         }
//     },
//     exit: {
//         y: 20,
//         opacity: 0,
//         transition: {
//             duration: 0.3,
//             ease: "easeIn"
//         }
//     }
// };

export default function FullScreenMenu({ setMenuOpen }: { setMenuOpen: (value: boolean) => void }) {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	const handleClickItem = () => {
		setMenuOpen(false)
		// { setMenuOpen }: { setMenuOpen: (value: boolean) => void; }
		// console.log('click')
	}
	if (!isClient) return null
	const mainRoot = document.querySelector('main')
	if (!mainRoot) return null
	return createPortal(
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="FullScreenMenu">
			<div className="FullScreenMenu__container">
				<nav className="FullScreenMenu__nav">
					<ul className={`list-reset FullScreenMenu__list`}>
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
		</motion.div>,
		mainRoot,
	)
}
