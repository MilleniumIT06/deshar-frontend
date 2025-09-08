'use client'
import { useState } from 'react'

import Link from 'next/link'

import { areas, schools, tabs, classLevels } from '@/mocks/data'
import { Button } from '@/shared/ui/Button'
import { InputSelect } from '@/shared/ui/InputSelect'
import { Tabs } from '@/shared/ui/Tabs'

import './styles.scss'

export const ProgramSelectionForm = () => {
	const [activeTab, setActiveTab] = useState(0)
	const [area, setArea] = useState<number | string>('')
	const [school, setScholl] = useState<number | string>('')
	const [classLevel, setClassLevel] = useState<number | string>('')
	return (
		<div className="ProgramSelectionForm">
			<div className="ProgramSelectionForm__inner">
				<h1 className="ProgramSelectionForm__title">Выбор программы</h1>
				<Tabs activeTab={activeTab} handleTab={setActiveTab} tabs={tabs} maxWidth />
				{activeTab === 0 ? (
					<form className="ProgramSelectionForm__form">
						<InputSelect
							value={area}
							setValue={setArea}
							options={areas}
							placeholderValue="Выберите населенный пункт"
						/>
						<InputSelect
							value={school}
							setValue={setScholl}
							options={schools}
							placeholderValue="Выберите школу"
						/>
						<InputSelect
							value={classLevel}
							setValue={setClassLevel}
							options={classLevels}
							placeholderValue="Выберите класс"
						/>
						<Button className="ProgramSelectionForm__btn" size="medium">
							Зарегистрировать
						</Button>
					</form>
				) : (
					<form className="ProgramSelectionForm__form">
						<InputSelect
							value={area}
							setValue={setArea}
							options={areas}
							placeholderValue="Выберите страну"
						/>
						<InputSelect
							value={school}
							setValue={setScholl}
							options={schools}
							placeholderValue="Выберите населенный пункт"
						/>
						<InputSelect
							value={classLevel}
							setValue={setClassLevel}
							options={classLevels}
							placeholderValue="Выберите класс"
						/>
						<Button className="ProgramSelectionForm__btn" size="medium">
							Зарегистрировать
						</Button>
					</form>
				)}
				<div className="ProgramSelectionForm__bottom">
					<div>
						Уже зарегистрированы? <Link href="/sign-in">Войти</Link>
					</div>
					<p>
						Продолжая, вы соглашаетесь на обработку персональных данных и принимаете условия
						пользоват. соглашения
					</p>
				</div>
			</div>
		</div>
	)
}
