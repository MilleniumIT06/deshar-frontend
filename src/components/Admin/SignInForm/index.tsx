import Link from 'next/link'

import { Button } from '../../../shared/ui/Button'
import { Input } from '../../../shared/ui/Input'
import './styles.scss'
import { Logo } from '../../../shared/ui/Logo'

export const SignInForm = () => {
	return (
		<div className="SignInForm">
			<div className="SignInForm__inner">
				<Logo size="large" />
				<div className="SignInForm__content">
					<h1 className="SignInForm__title">Вход в личный кабинет</h1>
					<form className="SignInForm__form">
						<Input
							fullWidth
							type="text"
							placeholder="Введите логин или email"
							className="SignInForm__input"
						/>
						<Input
							fullWidth
							type="password"
							placeholder="Введите пароль"
							className="SignInForm__input"
						/>
						<Button className="SignInForm__btn" size="medium">
							Войти
						</Button>
					</form>
					<div className="SignInForm__bottom">
						<span>нет личного кабинета?</span>
						<Link href="/sign-up"> Запросить</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
