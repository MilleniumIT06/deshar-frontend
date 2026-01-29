'use client'
import { useState } from 'react'

import Link from 'next/link'

import { tabs } from '@/mocks/data'
import { Tabs } from '@/shared/ui/Tabs'

import './styles.scss'
import { IngushetiaForm } from '../../IngushetiaForm'
import { OtherRegionsForm } from '../../OtherRegionsForm'

export const ProgramSelectionForm = () => {
	const [activeTab, setActiveTab] = useState(0)

	const handleTabChange = (tabIndex: number) => {
		setActiveTab(tabIndex)
	}

	return (
		<div className="ProgramSelectionForm">
			<div className="ProgramSelectionForm__inner">
				<h1 className="ProgramSelectionForm__title">Выбор программы</h1>
				<Tabs activeTab={activeTab} handleTab={handleTabChange} tabs={tabs} maxWidth />

				{activeTab === 0 ? <IngushetiaForm /> : <OtherRegionsForm />}

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
