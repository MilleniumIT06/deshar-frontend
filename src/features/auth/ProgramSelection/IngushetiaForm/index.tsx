'use client'

import { useEffect } from 'react' // Добавляем useEffect

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { updateFormData, submitForm } from '@/features/auth/signUp.slice'
import { areas, schools, classLevels } from '@/mocks/data'
import { Button } from '@/shared/ui/Button'
import { InputSelect } from '@/shared/ui/InputSelect'

const validateSchema = z.object({
	locality: z
		.string({ message: 'Пожалуйста, выберите населенный пункт' })
		.min(1, { message: 'Пожалуйста, выберите населенный пункт' }),
	school: z.string({ message: 'Пожалуйста, выберите школу' }).min(1, { message: 'Пожалуйста, выберите школу' }),
	classLevel: z.string({ message: 'Пожалуйста, выберите класс' }).min(1, { message: 'Пожалуйста, выберите класс' }),
})

export const IngushetiaForm = ({ disableTab }: { disableTab: (value: boolean) => void }) => {
	const { formData } = useAppSelector(state => state.signUpFormReducer)
	const dispatch = useAppDispatch()

	const form = useForm({
		resolver: zodResolver(validateSchema),
		defaultValues: {
			locality: formData.locality || '',
			school: formData.school || '',
			classLevel: formData.classLevel || '',
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
				country: 'Россия',
				locality: String(data.locality),
				school: String(data.school),
				classLevel: String(data.classLevel),
			}

			// console.log('Russia form data:', completeData)

			dispatch(updateFormData(completeData))

			dispatch(submitForm())

			// form.reset()
		} catch (error) {
			return error
			// console.error('Form submission error:', error)
		}
	}

	// const handleReset = () => {
	// 	form.reset()
	// 	dispatch(resetForm())
	// 	disableTab(false)
	// }

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} className="ProgramSelectionForm__form">
			<div className="ProgramSelectionForm__field">
				<InputSelect
					value={form.watch('locality')}
					setValue={value => form.setValue('locality', value, { shouldValidate: true })}
					options={areas}
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

			<div style={{ display: 'flex', gap: '10px' }}>
				<Button
					className="ProgramSelectionForm__btn"
					size="medium"
					type="submit"
					disabled={!form.formState.isValid || form.formState.isSubmitting}>
					{form.formState.isSubmitting ? 'Отправка...' : 'Зарегистрировать'}
				</Button>
			</div>
		</form>
	)
}
