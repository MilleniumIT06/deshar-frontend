// widgets/Header/index.tsx
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
	const { isAuth, user, loading, logout } = useAuth() // Получаем logout из хука
	const [burgerOpen, setBurgerOpen] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	// Убираем console.log или оставляем с eslint-disable-next-line
	useEffect(() => {
		if (user) {
			// eslint-disable-next-line no-console
			console.log('User data in Header:', user)
		}
	}, [user])

	useEffect(() => {
		if (burgerOpen) {
			const scrollY = window.scrollY
			document.body.style.position = 'fixed'
			document.body.style.top = `-${scrollY}px`
			document.body.style.width = '100%'
			document.body.style.overflow = 'hidden'
		} else {
			const scrollY = document.body.style.top
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			document.body.style.overflow = ''
			window.scrollTo(0, parseInt(scrollY || '0') * -1)
		}

		return () => {
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			document.body.style.overflow = ''
		}
	}, [burgerOpen])

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setBurgerOpen(false)
				setIsMenuOpen(false)
			}
		}
		window.addEventListener('keydown', handleEsc)
		return () => window.removeEventListener('keydown', handleEsc)
	}, [])

	const handleAvatarClick = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const handleLogout = async () => {
		await logout() // Используем logout из хука
		setIsMenuOpen(false)
	}

	return (
		<header className="Header">
			{burgerOpen && <FullScreenMenu setMenuOpen={setBurgerOpen} />}
			<div className="container Header__container">
				<div className="Header__inner">
					<Logo size="large" className="Header__logo" />
					<nav className="Header__nav">
						<ul className="list-reset Header__list">
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
						{loading ? (
							<div className="Header__loader">Загрузка...</div>
						) : isAuth ? (
							<div className="Header__user">
								<div className="Header__user-info-wrapper" onClick={handleAvatarClick}>
									{user?.name && (
										<span className="Header__user-name-display">{user.name}</span>
									)}
									<Avatar user={user} size="medium" showName={false} />
								</div>

								{isMenuOpen && (
									<>
										<div
											className="Header__user-overlay"
											onClick={() => setIsMenuOpen(false)}
										/>
										<div className="Header__user-menu">
											<div className="Header__user-menu-header">
												<Avatar user={user} size="small" showName={false} />
												<div className="Header__user-info">
													<div className="Header__user-name">
														{user?.name || 'Пользователь'}
													</div>
													<div className="Header__user-email">
														{user?.email || ''}
													</div>
												</div>
											</div>
											<div className="Header__user-menu-divider" />
											<Link
												href="/profile"
												className="Header__user-menu-item"
												onClick={() => setIsMenuOpen(false)}>
												Профиль
											</Link>
											<Link
												href="/settings"
												className="Header__user-menu-item"
												onClick={() => setIsMenuOpen(false)}>
												Настройки
											</Link>
											<div className="Header__user-menu-divider" />
											<button
												onClick={handleLogout}
												className="Header__user-menu-item Header__user-menu-item--danger">
												Выйти
											</button>
										</div>
									</>
								)}
							</div>
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

			<style jsx>{`
				.Header__user {
					position: relative;
				}

				.Header__user-info-wrapper {
					display: flex;
					align-items: center;
					gap: 0.75rem;
					cursor: pointer;
				}

				.Header__user-name-display {
					font-size: 0.875rem;
					font-weight: 500;
					color: #374151;
				}

				.Header__user-overlay {
					position: fixed;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					z-index: 999;
				}

				.Header__user-menu {
					position: absolute;
					top: calc(100% + 0.5rem);
					right: 0;
					background: white;
					border-radius: 0.5rem;
					box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
					min-width: 250px;
					z-index: 1000;
					overflow: hidden;
				}

				.Header__user-menu-header {
					padding: 1rem;
					display: flex;
					gap: 0.75rem;
					align-items: center;
				}

				.Header__user-info {
					flex: 1;
				}

				.Header__user-name {
					font-weight: 600;
					color: #111827;
				}

				.Header__user-email {
					font-size: 0.75rem;
					color: #6b7280;
					margin-top: 0.25rem;
				}

				.Header__user-menu-divider {
					height: 1px;
					background: #e5e7eb;
					margin: 0.5rem 0;
				}

				.Header__user-menu-item {
					display: block;
					padding: 0.5rem 1rem;
					color: #374151;
					text-decoration: none;
					transition: background-color 0.2s;
					cursor: pointer;
					width: 100%;
					text-align: left;
					background: none;
					border: none;
					font-size: 0.875rem;
				}

				.Header__user-menu-item:hover {
					background-color: #f3f4f6;
				}

				.Header__user-menu-item--danger {
					color: #ef4444;
				}

				.Header__user-menu-item--danger:hover {
					background-color: #fef2f2;
				}

				.Header__loader {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					border: 2px solid #e5e7eb;
					border-top-color: #4f46e5;
					animation: spin 0.6s linear infinite;
				}

				@keyframes spin {
					to {
						transform: rotate(360deg);
					}
				}
			`}</style>
		</header>
	)
}
