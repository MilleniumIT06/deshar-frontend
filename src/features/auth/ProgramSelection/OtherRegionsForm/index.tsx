'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { updateFormData, submitForm } from '@/features/auth/signUp.slice'
import { schools, classLevels, countries } from '@/mocks/data'
import { Button } from '@/shared/ui/Button'
import { InputSelect } from '@/shared/ui/InputSelect'

const validateSchema = z.object({
	country: z.string({ message: 'Пожалуйста, выберите страну' }).min(4).max(20).nullable(),
	school: z.string({ message: 'Пожалуйста, выберите школу' }).nullable(),
	classLevel: z.string({ message: 'Пожалуйста, выберите класс' }).nullable(),
})

export const OtherRegionsForm = () => {
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
	const onSubmit = (data: z.infer<typeof validateSchema>) => {
		// console.log(data);
		const completeData = {
			...formData,
			country: String(data.country),
			school: String(data.school),
			classLevel: String(data.classLevel),
		}

		// console.log('Russia form data:', completeData)
		dispatch(updateFormData(completeData))
		dispatch(submitForm())
		form.reset()
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
				disabled={!form.formState.isValid}>
				Зарегистрировать
			</Button>
		</form>
	)
}
