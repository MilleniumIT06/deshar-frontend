import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'


import { EngineButton } from '../Button'
import { EngineInput } from '../Input'
import { Textarea } from '../Textarea'
import './styles.scss'
import { type supportFormData, supportFormSchema } from './support-form.schema'


export const SupportModalContent = ({ onCancel }: { onCancel?: () => void }) => {
	const [serverError, setServerError] = useState<string>('')
	const [isLoading, setIsLoading] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<supportFormData>({
		resolver: zodResolver(supportFormSchema),
		mode: 'onChange',
	})

	const onSubmit = async (data: supportFormData) => {
		try {
			setIsLoading(true)
			setServerError('')

			// eslint-disable-next-line no-console
			console.log(data)
		} catch (error) {
			setServerError(error instanceof Error ? error.message : 'Ошибка Отправки формы')
		} finally {
			setIsLoading(false)
			reset()
		}
	}
	return (
		<div className="support-form">
			<h5 className="support-form__title">Написать в поддержку</h5>

			<div className="support-form__divider" />
			{serverError && (
				<div className="SignInForm__error" role="alert">
					{serverError}
				</div>
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="support-form__fields">
					<EngineInput
						fullWidth
						label="E-mail"
						className="support-form__input"
						validationMessage={errors.email?.message}
						{...register('email')}
					/>
					<Textarea
						fullWidth
						label="Комментарий"
						validationMessage={errors.text?.message}
						className="support-form__textarea"
						{...register('text')}
					/>
				</div>

				<div className="support-form__actions">
					<EngineButton
						disabled={!isValid || isLoading}
						type="submit"
						variant="primary"
						className="support-form__btn">
						{isLoading ? 'Отправка...' : 'Отправить'}
					</EngineButton>
					<EngineButton
						type="button"
						variant="secondary"
						onClick={onCancel}
						className="support-form__btn">
						Отмена
					</EngineButton>
				</div>
			</form>
		</div>
	)
}
