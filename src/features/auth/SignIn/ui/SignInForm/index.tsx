import Link from 'next/link'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import './styles.scss'

export const SignInForm = () => {
	return (
		<div className="SignInForm">
			<div className="SignInForm__inner">
				<h1 className="SignInForm__title">Вход в систему</h1>
				<form className="SignInForm__form">
					<Input type="email" placeholder="Введите логин или email" className="SignInForm__input" />
					<Input type="password" placeholder="Введите пароль" className="SignInForm__input" />
					<Button className="SignInForm__btn" size="medium">
						Войти
					</Button>
				</form>
				<div className="SignInForm__bottom">
					<div>
						Еще не зарегистрированы?
						<Link href="/sign-up"> Зарегистрироваться</Link>
					</div>
					<p>
						Продолжая, вы соглашаетесь на обработку персональных данных и принимаете условия
						пользоват. соглашения
					</p>
				</div>
			</div>
		</div>
	)
}
