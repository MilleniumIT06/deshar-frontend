'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { apiClient } from '@/shared/lib/api'
import { auth } from '@/shared/lib/auth'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import { signInUserFormSchema, type signInUserFormData } from '../../model/signIn.schema'

import './styles.scss'

interface SignInFormProps {
	callbackUrl?: string
}

export const SignInForm = ({ callbackUrl = '/dashboard' }: SignInFormProps) => {
	const router = useRouter()
	const [serverError, setServerError] = useState<string>('')
	const [isLoading, setIsLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<signInUserFormData>({
		resolver: zodResolver(signInUserFormSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: signInUserFormData) => {
		try {
			setIsLoading(true)
			setServerError('')

			const response = await apiClient.login(data.email, data.password)

			if (response.success) {
				auth.setToken(response.token)
				auth.setUser(response.user)

				router.push(callbackUrl)
				router.refresh()
			}
		} catch (error) {
			setServerError(error instanceof Error ? error.message : 'Ошибка авторизации')
		} finally {
			setIsLoading(false)
		}
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
