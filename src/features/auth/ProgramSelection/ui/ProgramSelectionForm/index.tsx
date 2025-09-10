'use client'
import { useState, useEffect } from 'react'

import Link from 'next/link'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { areas, schools, tabs, classLevels, countries } from '@/mocks/data'
import { Button } from '@/shared/ui/Button'
import { InputSelect } from '@/shared/ui/InputSelect'
import { Tabs } from '@/shared/ui/Tabs'

import './styles.scss'

// Определение Zod-схемы для валидации
const programSchema = z.object({
	area: z.union([z.number(), z.string()]).refine(value => value !== '', {
		message: 'Пожалуйста, выберите населенный пункт или страну',
	}),
	school: z.union([z.number(), z.string()]).refine(value => value !== '', {
		message: 'Пожалуйста, выберите школу',
	}),
	classLevel: z.union([z.number(), z.string()]).refine(value => value !== '', {
		message: 'Пожалуйста, выберите класс',
	}),
})

type ProgramFormData = z.infer<typeof programSchema>

export const ProgramSelectionForm = () => {
	const [activeTab, setActiveTab] = useState(0)

	const {
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		reset,
	} = useForm<ProgramFormData>({
		resolver: zodResolver(programSchema),
		defaultValues: {
			area: '',
			school: '',
			classLevel: '',
		},
		mode: 'onChange',
	})

	const onSubmit = (data: ProgramFormData) => {
		return data
	}

	// Функция для обработки изменений в InputSelect
	const handleSelectChange = (name: keyof ProgramFormData) => (value: number | string) => {
		setValue(name, value, { shouldValidate: true })
	}
	useEffect(() => {
		reset()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTab])
	return (
		<div className="ProgramSelectionForm">
			<div className="ProgramSelectionForm__inner">
				<h1 className="ProgramSelectionForm__title">Выбор программы</h1>
				<Tabs activeTab={activeTab} handleTab={setActiveTab} tabs={tabs} maxWidth />
				<form onSubmit={handleSubmit(onSubmit)} className="ProgramSelectionForm__form">
					{activeTab === 0 ? (
						<>
							<div className="ProgramSelectionForm__field">
								<InputSelect
									value={watch('area')}
									setValue={handleSelectChange('area')}
									options={areas}
									placeholderValue="Выберите населенный пункт"
								/>
								{errors.area && (
									<p className="ProgramSelectionForm__error">{errors.area.message}</p>
								)}
							</div>
							<div className="ProgramSelectionForm__field">
								<InputSelect
									value={watch('school')}
									setValue={handleSelectChange('school')}
									options={schools}
									placeholderValue="Выберите школу"
								/>
								{errors.school && (
									<p className="ProgramSelectionForm__error">{errors.school.message}</p>
								)}
							</div>
							<div className="ProgramSelectionForm__field">
								<InputSelect
									value={watch('classLevel')}
									setValue={handleSelectChange('classLevel')}
									options={classLevels}
									placeholderValue="Выберите класс"
								/>
								{errors.classLevel && (
									<p className="ProgramSelectionForm__error">{errors.classLevel.message}</p>
								)}
							</div>
						</>
					) : (
						<>
							<div className="ProgramSelectionForm__field">
								<InputSelect
									value={watch('area')}
									setValue={handleSelectChange('area')}
									options={countries}
									placeholderValue="Выберите страну"
								/>
								{errors.area && (
									<p className="ProgramSelectionForm__error">{errors.area.message}</p>
								)}
							</div>
							<div className="ProgramSelectionForm__field">
								<InputSelect
									value={watch('school')}
									setValue={handleSelectChange('school')}
									options={schools}
									placeholderValue="Выберите населенный пункт"
								/>
								{errors.school && (
									<p className="ProgramSelectionForm__error">{errors.school.message}</p>
								)}
							</div>
							<div className="ProgramSelectionForm__field">
								<InputSelect
									value={watch('classLevel')}
									setValue={handleSelectChange('classLevel')}
									options={classLevels}
									placeholderValue="Выберите класс"
								/>
								{errors.classLevel && (
									<p className="ProgramSelectionForm__error">{errors.classLevel.message}</p>
								)}
							</div>
						</>
					)}
					<Button className="ProgramSelectionForm__btn" size="medium" type="submit">
						Зарегистрировать
					</Button>
				</form>
				<div className="ProgramSelectionForm__bottom">
					<div>
						Уже зарегистрированы? <Link href="/sign-in">Войти</Link>
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
