'use client'
import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import { signUpUserSchema, type signUpUserFormData } from '../../model/signUp.schema'

import './styles.scss'
import { useAppDispatch } from '@/app/_store/hooks'
import { nextStep, updateFormData } from '@/features/auth/signUp.slice'
import { RadioButton } from '@/shared/ui/RadioButton'
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
					email: data.email,
					password: data.password,
					confirmPassword: data.confirmPassword,
					birthDate: data.birthDate,
					user_type: data.user_type,
					// role_id: data.role_id,
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
					<div className="SignUpForm__role-selection">
						<div className="SignUpForm__roles">
							<RadioButton label="Я Ученик" value="student" register={register('user_type')} />
							<RadioButton label="Я Учитель" value="teacher" register={register('user_type')} />
						</div>
						{errors.user_type && <p className="SignUpForm__error">{errors.user_type.message}</p>}
					</div>
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
