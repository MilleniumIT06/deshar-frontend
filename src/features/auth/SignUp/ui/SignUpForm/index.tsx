'use client'
import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import { type signUpUserFormData, signUpUserSchema } from '../../model/signUp.schema'

import './styles.scss'

export const SignUpForm = ({ handleForm }: { handleForm: () => void }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<signUpUserFormData>({
		resolver: zodResolver(signUpUserSchema),
		mode: 'onChange',
	})
	const onSubmit = (data: signUpUserFormData) => {
		// eslint-disable-next-line no-console
		console.log(data)
	}
	return (
		<div className="SignUpForm">
			<div className="SignUpForm__inner">
				<h1 className="SignUpForm__title">Регистрация аккаунта</h1>
				<form className="SignUpForm__form" onSubmit={handleSubmit(onSubmit)}>
					<Input
						fullWidth
						type="text"
						placeholder="Введите имя"
						className="SignUpForm__input"
						error={true}
						validationMessage={errors.name && errors.name.message}
						{...register('name')}
					/>
					<Input
						fullWidth
						type="text"
						placeholder="Введите фамилию"
						className="SignUpForm__input"
						validationMessage={errors.surname && errors.surname.message}
						{...register('surname')}
					/>
					<Input
						fullWidth
						type="email"
						placeholder="Введите email"
						className="SignUpForm__input"
						validationMessage={errors.email && errors.email.message}
						{...register('email')}
					/>
					<Input
						fullWidth
						type="password"
						placeholder="Придумайте пароль"
						className="SignUpForm__input"
						validationMessage={errors.password && errors.password.message}
						{...register('password')}
					/>
					<Input
						fullWidth
						type="password"
						placeholder="Подтвердите пароль"
						className="SignUpForm__input"
						validationMessage={errors.confirmPassword && errors.confirmPassword.message}
						{...register('confirmPassword')}
					/>
					<Button
						disabled={!isValid}
						className="SignUpForm__btn"
						size="medium"
						type="submit"
						onClick={handleForm}>
						Далее
					</Button>
				</form>
				<div className="SignUpForm__bottom">
					<div>
						Уже зарегистрированы? <Link href="/sign-in">Войти</Link>
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
