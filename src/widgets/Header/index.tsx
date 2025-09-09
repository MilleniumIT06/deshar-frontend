'use client'
import { useState } from 'react'

import Link from 'next/link'

import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Logo } from '@/shared/ui/Logo'

import './styles.scss'

export const Header = () => {
	const [authed] = useState(true)
	return (
		<header className="Header">
			<div className="container Header__container">
				<div className="Header__inner">
					<Logo size="large" />
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
					{authed ? (
						<Avatar />
					) : (
						<Button variant="primary" size="small" className="Header__btn" tabIndex={6}>
							Войти
						</Button>
					)}
					<button
						className="btn-reset Header__burger"
						aria-label="Открыть меню"
						aria-expanded="false"
						data-burger>
						<span className="Header__line" />
					</button>
				</div>
			</div>
		</header>
	)
}
