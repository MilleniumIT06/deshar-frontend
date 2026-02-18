'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { submitForm, resetForm } from '@/features/auth/signUp.slice'
import { useGetDistricts } from '@/hooks/queries/districts/useGetDistricts'
// import { useGetSchools } from '@/hooks/queries/schools/useGetSchools'
import { classLevels, schools } from '@/mocks/data'
import { Button } from '@/shared/ui/Button'
import { InputSelect } from '@/shared/ui/InputSelect'

import { useSignUp } from '../../SignUp/useSignUp'

const validateSchema = z.object({
	district: z.object({
		id: z.number({ required_error: 'Выберите населенный пункт' }),
		name: z.string().min(1, { message: 'Пожалуйста, выберите населенный пункт' }),
	}),
	school: z.object({
		id: z.number({ required_error: 'Пожалуйста, выберите школу' }),
		name: z.string().min(1, { message: 'Пожалуйста, выберите школу' }),
	}),

	classLevel: z.object({
		id: z.number({ required_error: 'Пожалуйста, выберите класс' }),
		name: z.string().min(1, { message: 'Пожалуйста, выберите класс' }),
	}),
})
export interface RegistrationCompleteData {
	name: string
	email: string
	password: string
	password_confirmation: string
	avatar: string
	country_id: number
	region_id: number
	district_id: number
	role_id: number
	birth_date: string
	user_type: 'student'
}
export const IngushetiaForm = ({ disableTab }: { disableTab: (value: boolean) => void }) => {
	const { formData } = useAppSelector(state => state.signUpFormReducer)
	const dispatch = useAppDispatch()
	const { isPending, mutate } = useSignUp()
	const form = useForm({
		resolver: zodResolver(validateSchema),
		defaultValues: {
			district: { id: 0, name: '' },
			school: { id: 0, name: '' },
			classLevel: { id: 0, name: '' },
		},
		mode: 'onChange',
	})

	useEffect(() => {
		if (form.formState.isSubmitting) {
			disableTab(true)
		} else {
			disableTab(false)
		}
	}, [form.formState.isSubmitting, disableTab])

	const onSubmit = async (data: z.infer<typeof validateSchema>) => {
		try {
			// console.log(data);
			// // dispatch(updateFormData(completeData))
			const fCompletData: RegistrationCompleteData = {
				name: `${formData.name} ${formData.surname}`,
				email: formData.email,
				avatar: 'defaultAvatar.png',
				password: formData.password,
				password_confirmation: formData.confirmPassword,
				country_id: 1,
				birth_date: '2000-01-02',
				district_id: data.district.id,
				region_id: 1,
				role_id: 1,
				user_type: 'student',
			}
			// console.log(fCompletData)
			mutate(fCompletData)
			dispatch(submitForm())
		} catch (error) {
			// console.error('Form submission error:', error)
			return error
		} finally {
			handleReset()
		}
	}

	const handleReset = () => {
		form.reset()
		dispatch(resetForm())
		disableTab(false)
	}
	const { isError: isDistrictsError, districts, isLoading: isDistrictsLoading } = useGetDistricts()
	// const { isError: isSchoolsError, schools, isLoading: isSchoolsLoading } = useGetSchools()
	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="ProgramSelectionForm__form">
			<div className="ProgramSelectionForm__field">
				<InputSelect
					value={form.watch('district')}
					setValue={value => form.setValue('district', value, { shouldValidate: true })}
					options={districts}
					isLoading={isDistrictsLoading}
					isError={isDistrictsError}
					placeholderValue="Выберите населенный пункт"
				/>
				{form.formState.errors.district && (
					<p className="ProgramSelectionForm__error">{form.formState.errors.district.message}</p>
				)}
			</div>

			<div className="ProgramSelectionForm__field">
				<InputSelect
					value={form.watch('school')}
					setValue={value => form.setValue('school', value, { shouldValidate: true })}
					options={schools}
					isLoading={false}
					isError={false}
					placeholderValue="Выберите школу"
				/>
				{form.formState.errors.school && (
					<p className="ProgramSelectionForm__error">{form.formState.errors.school.message}</p>
				)}
			</div>

			<div className="ProgramSelectionForm__field">
				<InputSelect
					value={form.watch('classLevel')}
					setValue={value => {
						return form.setValue('classLevel', value, { shouldValidate: true })
					}}
					options={classLevels}
					placeholderValue="Выберите класс"
				/>
				{form.formState.errors.classLevel && (
					<p className="ProgramSelectionForm__error">{form.formState.errors.classLevel.message}</p>
				)}
			</div>

			<div>
				<Button
					className="ProgramSelectionForm__btn"
					size="medium"
					type="submit"
					disabled={!form.formState.isValid || form.formState.isSubmitting || isPending}>
					{form.formState.isSubmitting || isPending ? 'Отправка...' : 'Зарегистрировать'}
				</Button>
			</div>
		</form>
	)
}
