'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '@/app/_store/hooks'
import { nextStep, updateFormData } from '@/features/auth/signUp.slice'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import { signUpUserSchema, type signUpUserFormData } from '../../model/signUp.schema'

import './styles.scss'
// import { useGetRoles } from '@/hooks/queries/useGetRoles'

export const SignUpForm = () => {
	// const router = useRouter()
	const dispatch = useAppDispatch()

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<signUpUserFormData>({
		resolver: zodResolver(signUpUserSchema),
		mode: 'onChange',
	})
	// const { roles ,isLoading} = useGetRoles()
	// console.log('roles', roles)
	const onSubmit = async (data: signUpUserFormData) => {
		if (isValid) {
			dispatch(
				updateFormData({
					name: data.name,
					surname: data.surname,
					email: data.email,
					password: data.password,
					confirmPassword: data.confirmPassword,
					birthDate: data.birthDate,
				}),
			)
			dispatch(nextStep())
		}
	}

	return (
		<div className="SignUpForm">
			<div className="SignUpForm__inner">
				<h1 className="SignUpForm__title">Регистрация</h1>
				<form className="SignUpForm__form" onSubmit={handleSubmit(onSubmit)}>
					<Input
						fullWidth
						type="text"
						placeholder="Имя"
						className="SignUpForm__input"
						validationMessage={errors.name?.message}
						{...register('name')}
					/>

					<Input
						fullWidth
						type="text"
						placeholder="Фамилия"
						className="SignUpForm__input"
						validationMessage={errors.surname?.message}
						{...register('surname')}
					/>

					<Input
						fullWidth
						type="email"
						placeholder="Email"
						className="SignUpForm__input"
						validationMessage={errors.email?.message}
						{...register('email')}
					/>

					<Input
						fullWidth
						type="date"
						placeholder="Дата рождения"
						className="SignUpForm__input"
						validationMessage={errors.birthDate?.message}
						{...register('birthDate')}
					/>

					<Input
						fullWidth
						type="password"
						placeholder="Пароль"
						className="SignUpForm__input"
						validationMessage={errors.password?.message}
						{...register('password')}
					/>

					<Input
						fullWidth
						type="password"
						placeholder="Подтвердите пароль"
						className="SignUpForm__input"
						validationMessage={errors.confirmPassword?.message}
						{...register('confirmPassword')}
					/>
					<Button className="SignUpForm__btn" size="medium">
						Далее
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
