'use client'

import { useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { updateFormData, submitForm, resetForm } from '@/features/auth/signUp.slice'
import { schools, classLevels, countries } from '@/mocks/data'
import { Button } from '@/shared/ui/Button'
import { InputSelect } from '@/shared/ui/InputSelect'

const validateSchema = z.object({
	country: z
		.string({ message: 'Пожалуйста, выберите страну' })
		.min(1, { message: 'Пожалуйста, выберите страну' })
		.nullable()
		.refine(val => val !== null, {
			message: 'Пожалуйста, выберите страну',
		}),
	school: z
		.string({ message: 'Пожалуйста, выберите школу' })
		.min(1, { message: 'Пожалуйста, выберите школу' })
		.nullable()
		.refine(val => val !== null, {
			message: 'Пожалуйста, выберите школу',
		}),
	classLevel: z
		.string({ message: 'Пожалуйста, выберите класс' })
		.min(1, { message: 'Пожалуйста, выберите класс' })
		.nullable()
		.refine(val => val !== null, {
			message: 'Пожалуйста, выберите класс',
		}),
})

export const OtherRegionsForm = ({ disableTab }: { disableTab: (value: boolean) => void }) => {
	const { formData } = useAppSelector(state => state.signUpFormReducer)
	const dispatch = useAppDispatch()

	const form = useForm({
		resolver: zodResolver(validateSchema),
		defaultValues: {
			country: formData.country || null,
			school: formData.school || '',
			classLevel: formData.classLevel || null,
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
			const completeData = {
				...formData,
				country: String(data.country),
				school: String(data.school),
				classLevel: String(data.classLevel),
			}

			// console.log('Other form data:', completeData)

			dispatch(updateFormData(completeData))

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
	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="ProgramSelectionForm__form">
			<div className="ProgramSelectionForm__field">
				<InputSelect
					value={form.watch('country')}
					setValue={value => form.setValue('country', value, { shouldValidate: true })}
					options={countries}
					placeholderValue="Выберите страну"
				/>
				{form.formState.errors.country && (
					<p className="ProgramSelectionForm__error">{form.formState.errors.country.message}</p>
				)}
			</div>

			<div className="ProgramSelectionForm__field">
				<InputSelect
					value={form.watch('school')}
					setValue={value => form.setValue('school', value, { shouldValidate: true })}
					options={schools}
					placeholderValue="Выберите школу"
				/>
				{form.formState.errors.school && (
					<p className="ProgramSelectionForm__error">{form.formState.errors.school.message}</p>
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
				disabled={!form.formState.isValid || form.formState.isSubmitting}>
				Зарегистрировать
			</Button>
		</form>
	)
}
