// widgets/Header/index.tsx
'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import FullScreenMenu from '@/components/FullScreenMenu'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Logo } from '@/shared/ui/Logo'
import './styles.scss'
import { useAppDispatch } from '@/app/_store/hooks'
import { logoutAction } from '@/entities/user/model/user.slice'
import { useProfile } from '@/hooks/useProfile'
import { loginService } from '@/services/auth/login.service'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
// import { useAppDispatch } from '@/app/_store/hooks'
// import { logout } from '@/entities/user/model/user.slice'

export const Header = () => {
	const [burgerOpen, setBurgerOpen] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const userMenuRef = useOutsideClick(() => {
		setIsMenuOpen(false)
	})
	// const {user,isAuth} = useAppSelector(state=>state.user)
	const dispatch = useAppDispatch()
	const router = useRouter()
	const { isLoading, user } = useProfile()
	// Убираем console.log или оставляем с eslint-disable-next-line
	useEffect(() => {
		if (user) {
			// eslint-disable-next-line no-console
			console.log('User data in Header:', user.user)
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
		try {
			await loginService.logout()
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Ошибка при логауте:', error)
		} finally {
			dispatch(logoutAction())
			setIsMenuOpen(false)
			router.push('/sign-in')
		}
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
					{/* <button onClick={() => dispatch(logout())}>logout</button> */}
					<div className="Header__right">
						{isLoading ? (
							'Loading...'
						) : user ? (
							<div className="Header__user">
								<div className="Header__user-info-wrapper" onClick={handleAvatarClick}>
									{user?.user.name && (
										<span className="Header__user-name-display">{user.user.name}</span>
									)}
									<Avatar user={user.user} size="medium" showName={false} />
								</div>

								{isMenuOpen && (
									<div className="Header__user-menu" ref={userMenuRef}>
										<div className="Header__user-menu-header">
											<Avatar user={user.user} size="small" showName={false} />
											<div className="Header__user-info">
												<div className="Header__user-name">
													{user?.user.name || 'Пользователь'}
												</div>
												<div className="Header__user-email">
													{user?.user.email || ''}
												</div>
											</div>
										</div>
										<div className="Header__user-menu-divider" />
										<div className="Header__user-menu__list">
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
											<Button
												variant={'primary'}
												size="small"
												onClick={handleLogout}
												className="Header__user-menu-logout_btn">
												Выйти
											</Button>
										</div>
									</div>
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
		</header>
	)
}
