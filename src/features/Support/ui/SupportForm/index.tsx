'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Textarea } from '@/components/Engine/Textarea'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import { type supportFormData, supportFormSchema } from '../../model/support.schema'
import { useSupportForm } from '../../useSupportForm'

import './styles.scss'

export const SupportForm = () => {
	const { isLoading, send, serverError } = useSupportForm()
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
		send(data)
		reset()
	}
	return (
		<section className="SupportSection">
			<div className="SupportForm">
				<div className="SupportForm__inner">
					<h1 className="SupportForm__title">Написать в поддержку</h1>
					{serverError && (
						<div className="SupportForm__error" role="alert">
							{serverError}
						</div>
					)}
					<form className="SupportForm__form" onSubmit={handleSubmit(onSubmit)}>
						<Input
							fullWidth
							type="text"
							placeholder="Введите имя"
							className="SupportForm__input"
							validationMessage={errors.name?.message}
							disabled={isLoading}
							{...register('name')}
						/>
						<Input
							fullWidth
							type="email"
							placeholder="Введите email"
							className="SupportForm__input"
							validationMessage={errors.email?.message}
							disabled={isLoading}
							{...register('email')}
						/>
						<Input
							fullWidth
							type="text"
							placeholder="Тема"
							className="SupportForm__input"
							validationMessage={errors.theme?.message}
							disabled={isLoading}
							{...register('theme')}
						/>
						<Textarea
							fullWidth
							placeholder="Сообщение"
							className="SupportForm__textarea"
							validationMessage={errors.message?.message}
							disabled={isLoading}
							{...register('message')}
						/>
						<Button className="SupportForm__btn" size="medium" disabled={!isValid || isLoading} type="submit">
							{isLoading ? 'Отправка...' : 'Отправить'}
						</Button>
					</form>
				</div>
			</div>
		</section>
	)
}
