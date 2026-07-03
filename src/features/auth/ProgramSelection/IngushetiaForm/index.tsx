'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { resetForm } from '@/features/auth/signUp.slice'
import { Button } from '@/shared/ui/Button'
import { InputSelect } from '@/shared/ui/InputSelect'

import { useSignUp } from '../../SignUp/useSignUp'
import { useGetSchools } from '@/hooks/queries/schools/useGetSchools'
import { useGetLocalities } from '@/hooks/queries/useGetLocalities'
import { useGetSchoolClasses } from '@/hooks/queries/useGetSchoolClasses'
import { useGetCountries } from '@/hooks/queries/countries/useGetCountries'
import { useGetRegions } from '@/hooks/queries/useGetRegions'
import { useGetDistricts } from '@/hooks/queries/districts/useGetDistricts'
import type { UserType } from '@/shared/types/types'

const validateSchema = z.object({
	locality: z.object({
		id: z.number({ required_error: 'Выберите населенный пункт' }),
		name: z.string().min(1, { message: 'Пожалуйста, выберите населенный пункт' }),
	}),
	district: z.object({
		id: z.number({ required_error: 'Пожалуйста, выберите район' }),
		name: z.string().min(1, { message: 'Пожалуйста, выберите район' }),
	}),
	school: z.object({
		id: z.number({ required_error: 'Пожалуйста, выберите школу' }),
		name: z.string().min(1, { message: 'Пожалуйста, выберите школу' }),
	}),

	schoolClass: z.object({
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
	region_id: number | null
	district_id: number
	locality_id: number
	birth_date: string
	user_type: UserType
}
const defaultValues = {
	locality: { id: -1, name: '' },
	district: { id: -1, name: '' },
	school: { id: -1, name: '' },
	schoolClass: { id: -1, name: '' },
}
export const IngushetiaForm = ({ disableTab }: { disableTab: (value: boolean) => void }) => {
	const { formData } = useAppSelector(state => state.signUpFormReducer)
	const dispatch = useAppDispatch()
	const { isPending, mutate, isSuccess } = useSignUp()
	const form = useForm({
		resolver: zodResolver(validateSchema),
		defaultValues: defaultValues,
		mode: 'onChange',
	})
const selectedDistrict = form.watch('district')
const selectedLocality = form.watch('locality')

// для теста можно тут поставить  selectedSchool = {id:0}, чтобы подгружались все классы
const selectedSchool = {id:-1}
// const selectedSchool = form.watch('school')
	const { districts, isLoading: isDistrictsLoading, isError: isDistrictsError } = useGetDistricts()
	const { isError: isSchoolsError, schools, isLoading: isSchoolsLoading } = useGetSchools({
		localityId:selectedLocality?.id
	})
	const { countries, isLoading: isCountriesLoading } = useGetCountries()
	const { localities, isLoading: isLocalitiesLoading, isError: isLocalitiesError } = useGetLocalities({
    districtId: selectedDistrict?.id
})
	const { regions, isLoading: isRegionsLoading } = useGetRegions()
	const { schoolClasses, isLoading: isSchoolClassesLoading } = useGetSchoolClasses({
    schoolId: selectedSchool?.id
})
	// console.log('countries', countries)
	// console.log('districts', districts)
	// console.log('localities', localities)
	// console.log('schools', schools)
	// console.log('schoolClasses', schoolClasses)
	// console.log('regions', regions)

	useEffect(() => {
		if (form.formState.isSubmitting) {
			disableTab(true)
		} else {
			disableTab(false)
		}
	}, [form.formState.isSubmitting, disableTab])
useEffect(() => {
    form.setValue('locality', { id: -1, name: '' })
	form.setValue('school', { id: -1, name: '' })

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedDistrict, selectedDistrict.id])
useEffect(() => {
    form.setValue('school', { id: -1, name: '' })
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedLocality.id,selectedDistrict])
	const onSubmit = async (data: z.infer<typeof validateSchema>) => {
		if (form.formState.isValid && !isCountriesLoading && !isRegionsLoading) {
			let formattedBirthDate = formData.birthDate
			if (formData.birthDate.includes('.')) {
				const [day, month, year] = formData.birthDate.split('.')
				formattedBirthDate = `${year}-${month}-${day}`
			}
			const completeData: RegistrationCompleteData = {
				name: `${formData.name} ${formData.surname}`,
				email: formData.email,
				password: formData.password,
				password_confirmation: formData.confirmPassword,
				role_id: 9,
				country_id: countries?.find(country => country.name === 'Россия')?.id || 1,
				school_id: data.school.id,
				school_class_id: data.schoolClass.id,
				district_id: data.district.id,
				locality_id: data.locality.id,
				birth_date: formattedBirthDate,
				region_id: regions?.find(region => region.name === 'Ингушетия')?.id || 1,
				user_type: formData.user_type,
			}
			console.log(completeData)
			mutate(completeData)
		}
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
					value={form.watch('district')}
					setValue={value => {
						form.setValue('district', value, { shouldValidate: true })
						form.setValue('school', { id: 0, name: '' })
					}}
					options={districts}
					isLoading={isDistrictsLoading}
					isError={isDistrictsError}
					placeholderValue="Выберите район"
				/>
				{form.formState.errors.district && (
					<p className="ProgramSelectionForm__error">{form.formState.errors.district.message}</p>
				)}
			</div>
			<div className="ProgramSelectionForm__field">
				<InputSelect
					value={form.watch('locality')}
					setValue={value => {
						form.setValue('locality', value, { shouldValidate: true })
						form.setValue('school', { id: 0, name: '' })
					}}
					options={localities}
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
					options={schools}
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
					value={form.watch('schoolClass')}
					setValue={value => {
						return form.setValue('schoolClass', value, { shouldValidate: true })
					}}
					options={schoolClasses}
					placeholderValue="Выберите класс"
					isLoading={isSchoolClassesLoading}
				/>
				{form.formState.errors.schoolClass && (
					<p className="ProgramSelectionForm__error">{form.formState.errors.schoolClass.message}</p>
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
