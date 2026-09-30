// features/auth/SignIn/ui/SignInForm.tsx

'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { useAuth } from '@/hooks/auth/useAuth'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import { signInUserFormSchema, type signInUserFormData } from '../../model/signIn.schema'

import type { AxiosError } from 'axios'

import './styles.scss'

export const SignInForm = () => {
	const { isLoading, login } = useAuth()
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isValid },
	} = useForm<signInUserFormData>({
		resolver: zodResolver(signInUserFormSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: signInUserFormData) => {
		login(data, {
			onError: (
				err: AxiosError<{
					message: string
					errors: Record<string, string[]>
				}>,
			) => {
				if (err.response?.status === 422) {
					const serverErrors = err.response.data?.errors

					if (serverErrors) {
						Object.keys(serverErrors).forEach(key => {
							const messages = serverErrors[key]
							const errorMessage = Array.isArray(messages) ? messages[0] : messages

							setError(key as keyof signInUserFormData, {
								type: 'server',
								message: errorMessage || 'Ошибка валидации',
							})
						})
					}
				}
			},
		})
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
					<Button className="SignInForm__btn" size="medium" disabled={!isValid || isLoading} type="submit">
						{isLoading ? 'Вход...' : 'Войти'}
					</Button>
				</form>

				<div className="SignInForm__bottom">
					<div>
						Еще не зарегистрированы?
						<Link href="/sign-up"> Зарегистрироваться</Link>
					</div>
					<Link href="/forgot-password" className="SignInForm__forgot">
						Забыли пароль?
					</Link>
					<p>Продолжая, вы соглашаетесь на обработку персональных данных и принимаете условия пользовательского соглашения</p>
				</div>
			</div>
		</div>
	)
}
