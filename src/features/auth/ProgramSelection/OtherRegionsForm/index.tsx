'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { updateFormData, submitForm, resetForm } from '@/features/auth/signUp.slice'
import { useGetCountries } from '@/hooks/queries/countries/useGetCountries'
// import { useGetSchools } from '@/hooks/queries/schools/useGetSchools'
// import {classLevels } from '@/mocks/data'
import { classLevels, cities, regions } from '@/mocks/data'
import { Button } from '@/shared/ui/Button'
import { InputSelect } from '@/shared/ui/InputSelect'

import { useSignUp } from '../../SignUp/useSignUp'
import { type RegistrationCompleteData } from '../IngushetiaForm'

const validateSchema = z.object({
	country: z.object({
		id: z.number({ required_error: 'Выберите страну' }),
		name: z.string().min(1, { message: 'Пожалуйста, выберите страну' }),
	}),
	region: z
		.object({
			id: z.number(),
			name: z.string(),
		})
		.nullable()
		.optional(),
	city: z.object({
		id: z.number({ required_error: 'Пожалуйста, выберите город' }),
		name: z.string().min(1, { message: 'Пожалуйста, выберите город' }),
	}),

	classLevel: z.object({
		id: z.number({ required_error: 'Пожалуйста, выберите класс' }),
		name: z.string().min(1, { message: 'Пожалуйста, выберите класс' }),
	}),
})

export const OtherRegionsForm = ({ disableTab }: { disableTab: (value: boolean) => void }) => {
	const { formData } = useAppSelector(state => state.signUpFormReducer)
	const dispatch = useAppDispatch()
	const { isPending, mutate } = useSignUp()
	const form = useForm({
		resolver: zodResolver(validateSchema),
		defaultValues: {
			country: { id: 0, name: '' },
			city: { id: 0, name: '' },
			classLevel: { id: 0, name: '' },
			region: { id: 0, name: '' },
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
			let formattedBirthDate = formData.birthDate
			if (formData.birthDate.includes('.')) {
				const [day, month, year] = formData.birthDate.split('.')
				formattedBirthDate = `${year}-${month}-${day}`
			}
			const completeData: RegistrationCompleteData = {
				name: `${formData.name} ${formData.surname}`,
				email: formData.email,
				avatar: 'defaultAvatar.png',
				password: formData.password,
				password_confirmation: formData.confirmPassword,
				country_id: data.country.id,
				birth_date: formattedBirthDate,
				district_id: 1,
				region_id: data.region?.id || null,
				role_id: 1,
				user_type: 'student',
			}

			// console.log('Other form data:', completeData)

			dispatch(updateFormData(completeData))
			mutate(completeData)
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

	const { countries, isLoading: isCountriesLoading, isError: isCountriesError } = useGetCountries()
	// const { schools, isLoading: isSchoolsLoading, isError: isSchoolsError } = useGetSchools()
	// console.log(countries)
	// console.log(schools)
	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="ProgramSelectionForm__form">
			<div className="ProgramSelectionForm__field">
				<InputSelect
					value={form.watch('country')}
					setValue={value => form.setValue('country', value, { shouldValidate: true })}
					options={countries}
					placeholderValue="Выберите страну"
					isLoading={isCountriesLoading}
					isError={isCountriesError}
				/>
				{form.formState.errors.country && (
					<p className="ProgramSelectionForm__error">{form.formState.errors.country.message}</p>
				)}
			</div>

			<div className="ProgramSelectionForm__field">
				<InputSelect
					value={form.watch('region')}
					setValue={value => form.setValue('region', value, { shouldValidate: true })}
					options={regions}
					placeholderValue="Выберите регион (опционально)"
					isLoading={false}
					isError={false}
				/>
				{form.formState.errors.region && (
					<p className="ProgramSelectionForm__error">{form.formState.errors.region.message}</p>
				)}
			</div>
			<div className="ProgramSelectionForm__field">
				<InputSelect
					value={form.watch('city')}
					setValue={value => form.setValue('city', value, { shouldValidate: true })}
					options={cities}
					placeholderValue="Выберите город"
					isLoading={false}
					isError={false}
				/>
				{form.formState.errors.city && (
					<p className="ProgramSelectionForm__error">{form.formState.errors.city.message}</p>
				)}
			</div>
			<div className="ProgramSelectionForm__field">
				<InputSelect
					value={form.watch('classLevel')}
					setValue={value => form.setValue('classLevel', value, { shouldValidate: true })}
					options={classLevels}
					placeholderValue="Выберите класс"
				/>
				{form.formState.errors.classLevel && (
					<p className="ProgramSelectionForm__error">{form.formState.errors.classLevel.message}</p>
				)}
			</div>

			<Button
				className="ProgramSelectionForm__btn"
				size="medium"
				type="submit"
				disabled={!form.formState.isValid || form.formState.isSubmitting || isPending}>
				{isPending ? 'Загрузка...' : 'Зарегистрировать'}
			</Button>
		</form>
	)
}
