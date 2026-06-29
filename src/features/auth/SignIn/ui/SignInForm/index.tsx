'use client'
import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import { signInUserFormSchema, type signInUserFormData } from '../../model/signIn.schema'

import './styles.scss'
import { useAuth } from '@/hooks/auth/useAuth'

export const SignInForm = () => {
	const { isLoading, login, serverError } = useAuth()
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<signInUserFormData>({
		resolver: zodResolver(signInUserFormSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: signInUserFormData) => {
		login(data)
	}

	return (
		<div className="SignInForm">
			<div className="SignInForm__inner">
				<h1 className="SignInForm__title">Вход в систему</h1>

				{serverError && (
					<div className="SignInForm__error" role="alert">
						{serverError}
					</div>
				)}

				<form className="SignInForm__form" onSubmit={handleSubmit(onSubmit)}>
					<Input
						fullWidth
						type="email"
						placeholder="Введите email"
						className="SignInForm__input"
						validationMessage={errors.email?.message}
						disabled={isLoading}
						{...register('email')}
					/>
					<Input
						fullWidth
						type="password"
						placeholder="Введите пароль"
						className="SignInForm__input"
						validationMessage={errors.password?.message}
						disabled={isLoading}
						{...register('password')}
					/>
					<Button
						className="SignInForm__btn"
						size="medium"
						disabled={!isValid || isLoading}
						type="submit">
						{isLoading ? 'Вход...' : 'Войти'}
					</Button>
				</form>

				<div className="SignInForm__bottom">
					<div>
						Еще не зарегистрированы?
						<Link href="/sign-up"> Зарегистрироваться</Link>
					</div>
					<p>
						Продолжая, вы соглашаетесь на обработку персональных данных и принимаете условия
						пользовательского соглашения
					</p>
				</div>
			</div>
		</div>
	)
}
