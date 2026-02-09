'use client'
import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import './styles.scss'
import { signInUserFormSchema, type signInUserFormData } from '../../model/signIn.schema'

export const SignInForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
	} = useForm<signInUserFormData>({
		resolver: zodResolver(signInUserFormSchema),
		mode: 'onChange',
	})
	const onSubmit = (data: signInUserFormData) => {
		// eslint-disable-next-line no-console
		console.log(data)
	}
	return (
		<div className="SignInForm">
			<div className="SignInForm__inner">
				<h1 className="SignInForm__title">Вход в систему</h1>
				<form className="SignInForm__form" onSubmit={handleSubmit(onSubmit)}>
					<Input
						fullWidth
						type="email"
						placeholder="Введите email"
						className="SignInForm__input"
						validationMessage={errors.email && errors.email.message}
						{...register('email')}
					/>
					<Input
						fullWidth
						type="password"
						placeholder="Придумайте пароль"
						className="SignInForm__input"
						validationMessage={errors.password && errors.password.message}
						{...register('password')}
					/>
					<Button className="SignInForm__btn" size="medium" disabled={!isValid || isSubmitting}>
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
