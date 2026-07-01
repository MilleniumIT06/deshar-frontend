'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { resetForm } from '@/features/auth/signUp.slice'
// import { useGetDistricts } from '@/hooks/queries/districts/useGetDistricts'
// import { useGetSchools } from '@/hooks/queries/schools/useGetSchools'
import { classLevels } from '@/mocks/data'
import { Button } from '@/shared/ui/Button'
import { InputSelect } from '@/shared/ui/InputSelect'

import { useSignUp } from '../../SignUp/useSignUp'
import { useGetSchools } from '@/hooks/queries/schools/useGetSchools'
import { useGetLocalities } from '@/hooks/queries/useGetLocalities'

const validateSchema = z.object({
	locality: z.object({
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
	role_id: number
	country_id: number
	school_id: number
	school_class_id: number
	// avatar: string
	// region_id: number | null
	// district_id: number
	// birth_date: string
	// user_type: 'student'
}
export const IngushetiaForm = ({ disableTab }: { disableTab: (value: boolean) => void }) => {
	const { formData } = useAppSelector(state => state.signUpFormReducer)
	const dispatch = useAppDispatch()
	const { isPending, mutate, isSuccess } = useSignUp()

	// const { isError: isDistrictsError, districts, isLoading: isDistrictsLoading } = useGetDistricts()
	const { isError: isSchoolsError, schools, isLoading: isSchoolsLoading } = useGetSchools()
	const { isError: isLocalitiesError, localities, isLoading: isLocalitiesLoading } = useGetLocalities()
	// const { countries } = useGetCountries()

	// const countryId = 1;
	// const ingushetiaId = 1
	const form = useForm({
		resolver: zodResolver(validateSchema),
		defaultValues: {
			locality: { id: 0, name: '' },
			school: { id: 0, name: '' },
			classLevel: { id: 0, name: '' },
		},
		mode: 'onChange',
	})
	// console.log(localities,schools)
	useEffect(() => {
		if (form.formState.isSubmitting) {
			disableTab(true)
		} else {
			disableTab(false)
		}
	}, [form.formState.isSubmitting, disableTab])

	const onSubmit = async (data: z.infer<typeof validateSchema>) => {
		if (form.formState.isValid) {
			// let formattedBirthDate = formData.birthDate
			// if (formData.birthDate.includes('.')) {
			// 	const [day, month, year] = formData.birthDate.split('.')
			// 	formattedBirthDate = `${year}-${month}-${day}`
			// }
			const completeData: RegistrationCompleteData = {
				name: `${formData.name} ${formData.surname}`,
				email: formData.email,
				password: formData.password,
				password_confirmation: formData.confirmPassword,
				role_id: 1,
				country_id: 1,
				school_id: data.school.id,
				school_class_id: data.classLevel.id,
				// birth_date: formattedBirthDate,
				// district_id: data.district.id,
				// region_id: 1,
			}
			mutate(completeData)
			// dispatch(submitForm())
			// console.log(completeData)
		}
		// console.log("formData",formData)
		// console.log(data);
	}

	useEffect(() => {
		if (isSuccess) {
			form.reset()
			dispatch(resetForm())
			disableTab(false)
		}
	}, [isSuccess, form, dispatch, disableTab])

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="ProgramSelectionForm__form">
			<div className="ProgramSelectionForm__field">
				<InputSelect
					value={form.watch('locality')}
					setValue={value => {
						form.setValue('locality', value, { shouldValidate: true })
						form.setValue('school', { id: 0, name: '' })
					}}
					options={localities?.data}
					isLoading={isLocalitiesLoading}
					isError={isLocalitiesError}
					placeholderValue="Выберите населенный пункт"
				/>
				{form.formState.errors.locality && (
					<p className="ProgramSelectionForm__error">{form.formState.errors.locality.message}</p>
				)}
			</div>

			<div className="ProgramSelectionForm__field">
				<InputSelect
					value={form.watch('school')}
					setValue={value => form.setValue('school', value, { shouldValidate: true })}
					options={schools?.data}
					isLoading={isSchoolsLoading}
					isError={isSchoolsError}
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
