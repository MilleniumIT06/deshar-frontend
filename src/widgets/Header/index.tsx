'use client'
import { useEffect, useState } from 'react'

import Link from 'next/link'

import FullScreenMenu from '@/components/FullScreenMenu'
import { useAuth } from '@/shared/hooks/useAuth'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Logo } from '@/shared/ui/Logo'

import './styles.scss'

export const Header = () => {
	const authed = useAuth()
	const [burgerOpen, setBurgerOpen] = useState(false)
	useEffect(() => {
		if (burgerOpen) {
			// Сохраняем текущую позицию скролла
			const scrollY = window.scrollY

			// Блокируем скролл
			document.body.style.position = 'fixed'
			document.body.style.top = `-${scrollY}px`
			document.body.style.width = '100%'
			document.body.style.overflow = 'hidden'
		} else {
			// Восстанавливаем скролл
			const scrollY = document.body.style.top
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			document.body.style.overflow = ''

			// Восстанавливаем позицию скролла
			window.scrollTo(0, parseInt(scrollY || '0') * -1)
		}

		return () => {
			// Очистка при размонтировании компонента
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			document.body.style.overflow = ''
		}
	}, [burgerOpen])
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setBurgerOpen(false)
		}
		window.addEventListener('keydown', handleEsc)
		return () => window.removeEventListener('keydown', handleEsc)
	}, [])
	return (
		<header className="Header">
			{burgerOpen && <FullScreenMenu setMenuOpen={setBurgerOpen} />}
			<div className="container Header__container">
				<div className="Header__inner">
					<Logo size="large" className="Header__logo" />
					<nav className="Header__nav">
						<ul className={`list-reset Header__list`}>
							<li className="Header__list_item">
								<Link href="/courses" tabIndex={2}>
									Уроки
								</Link>
							</li>
							<li className="Header__list_item">
								<Link href="/attestation/1" tabIndex={3}>
									Аттестация
								</Link>
							</li>
							<li className="Header__list_item">
								<Link href="#" tabIndex={4}>
									Контакты
								</Link>
							</li>
						</ul>
					</nav>
					<div className="Header__right">
						{authed ? (
							<Avatar />
						) : (
							<Button asChild variant="primary" size="small" className="Header__btn" tabIndex={6}>
								<Link href="/sign-in">Войти</Link>
							</Button>
						)}
						<button
							className={`btn-reset Header__burger ${burgerOpen ? 'active' : ''}`}
							aria-label="Открыть меню"
							aria-expanded="false"
							data-burger
							onClick={() => setBurgerOpen(prev => !prev)}>
							<span className="Header__burger_line" />
							<span className="Header__burger_line" />
							<span className="Header__burger_line" />
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}
