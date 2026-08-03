// widgets/Header/index.tsx
'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import FullScreenMenu from '@/components/FullScreenMenu'
import { UserMenu } from '@/components/UserMenu'
import { useProfile } from '@/hooks/user/useProfile'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Logo } from '@/shared/ui/Logo'
import './styles.scss'
// import { useAppDispatch } from '@/app/_store/hooks'
// import { logout } from '@/entities/user/model/user.slice'
export const Header = () => {
	const [burgerOpen, setBurgerOpen] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const userMenuRef = useOutsideClick(() => {
		setIsMenuOpen(false)
	})
	const { isLoading, profileData } = useProfile()

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
		setIsMenuOpen(prev => !prev)
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
								<Link href="/ing-modules" tabIndex={3}>
									Ингушский язык
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
						{isLoading ? (
							'Loading...'
						) : profileData ? (
							<div className="Header__user" ref={userMenuRef}>
								<div className="Header__user-info-wrapper">
									<Avatar
										user={profileData.data.user}
										size="medium"
										showName={true}
										onClick={() => handleAvatarClick()}
									/>
								</div>

								{isMenuOpen && (
									<UserMenu profileData={profileData} handleMenuClose={()=>setIsMenuOpen(false)} listItems={[{itemHref:"/profile",itemTitle:"Профиль"},{itemHref:"/settings",itemTitle:"Настройки"}]}/>
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
