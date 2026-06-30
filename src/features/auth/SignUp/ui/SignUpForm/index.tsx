'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { auth } from '@/shared/lib/auth'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { useAppDispatch } from '@/app/_store/hooks'
import { login } from '@/entities/user/model/user.slice'

import { signUpUserSchema, type signUpUserFormData } from '../../model/signUp.schema'

import './styles.scss'

export const SignUpForm = () => {
	const router = useRouter()
	const dispatch = useAppDispatch()
	const [serverError, setServerError] = useState<string>('')
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<signUpUserFormData>({
		resolver: zodResolver(signUpUserSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: signUpUserFormData) => {
		try {
			setIsLoading(true)
			setServerError('')

			const response = await auth.register({
				name: data.name,
				email: data.email,
				password: data.password,
				password_confirmation: data.confirmPassword,
				user_type: 'student',
				birth_date: data.birthDate,
				// Добавьте другие поля если есть
			})

			if (response.success && response.user) {
				dispatch(login(response.user))
				router.push('/')
				router.refresh()
			}
		} catch (error) {
			setServerError(error instanceof Error ? error.message : 'Ошибка регистрации')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="SignUpForm">
			<div className="SignUpForm__inner">
				<h1 className="SignUpForm__title">Регистрация</h1>

				{serverError && (
					<div className="SignUpForm__error" role="alert">
						{serverError}
					</div>
				)}

				<form className="SignUpForm__form" onSubmit={handleSubmit(onSubmit)}>
					<Input
						fullWidth
						type="text"
						placeholder="Имя"
						className="SignUpForm__input"
						validationMessage={errors.name?.message}
						disabled={isLoading}
						{...register('name')}
					/>

					<Input
						fullWidth
						type="text"
						placeholder="Фамилия"
						className="SignUpForm__input"
						validationMessage={errors.surname?.message}
						disabled={isLoading}
						{...register('surname')}
					/>

					<Input
						fullWidth
						type="email"
						placeholder="Email"
						className="SignUpForm__input"
						validationMessage={errors.email?.message}
						disabled={isLoading}
						{...register('email')}
					/>

					<Input
						fullWidth
						type="date"
						placeholder="Дата рождения"
						className="SignUpForm__input"
						validationMessage={errors.birthDate?.message}
						disabled={isLoading}
						{...register('birthDate')}
					/>

					<Input
						fullWidth
						type="password"
						placeholder="Пароль"
						className="SignUpForm__input"
						validationMessage={errors.password?.message}
						disabled={isLoading}
						{...register('password')}
					/>

					<Input
						fullWidth
						type="password"
						placeholder="Подтвердите пароль"
						className="SignUpForm__input"
						validationMessage={errors.confirmPassword?.message}
						disabled={isLoading}
						{...register('confirmPassword')}
					/>

					<Button
						className="SignUpForm__btn"
						size="medium"
						disabled={!isValid || isLoading}
						type="submit">
						{isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
					</Button>
				</form>

				<div className="SignUpForm__bottom">
					<div>
						Уже есть аккаунт?
						<Link href="/sign-in"> Войти</Link>
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
