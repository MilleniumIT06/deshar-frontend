// features/auth/SignIn/ui/ForgotPasswordForm.tsx
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import './styles.scss'
import { useForgotPassword } from '../../hooks/useForgotPassword'
import { forgotPasswordValidateSchema } from '../../model/forgot-password.schema'
import { type ForgotPasswordRequest } from '../../model/ForgotPassword.request'

export const ForgotPasswordForm = () => {
	const form = useForm({
		resolver: zodResolver(forgotPasswordValidateSchema),
		defaultValues: { email: '' },
		mode: 'onChange',
	})
	const { mutate, isPending } = useForgotPassword()
	const onSubmit = async (data: ForgotPasswordRequest) => {
		mutate(data)
	}
	return (
		<div className="ForgotPasswordForm">
			<div className="ForgotPasswordForm__inner">
				<h1 className="ForgotPasswordForm__title">Сброс пароля</h1>

				<form className="ForgotPasswordForm__form" onSubmit={form.handleSubmit(onSubmit)}>
					<Input
						fullWidth
						type="email"
						placeholder="Введите email"
						className="ForgotPasswordForm__input"
						{...form.register('email')}
					/>
					<Button className="ForgotPasswordForm__btn" size="medium" disabled={!form.formState.isValid || isPending} type="submit">
						{isPending ? 'Отправка...' : 'Сбросить пароль'}
					</Button>
				</form>

				<div className="ForgotPasswordForm__bottom">
					<div>
						Еще не зарегистрированы?
						<Link href="/sign-up"> Зарегистрироваться</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
