'use client'
import { useState } from 'react'

import Link from 'next/link'

import { motion, AnimatePresence } from 'motion/react'

import { tabs } from '@/mocks/data'
import { Tabs } from '@/shared/ui/Tabs'

import './styles.scss'
import { IngushetiaForm } from '../../IngushetiaForm'
import { OtherRegionsForm } from '../../OtherRegionsForm'

export const ProgramSelectionForm = () => {
	const [activeTab, setActiveTab] = useState(0)
	const [direction, setDirection] = useState(0)
	const [isTabsDisabled, setIsTabsDisabled] = useState(false)

	const handleTabChange = (tabIndex: number) => {
		if (!isTabsDisabled) {
			setDirection(tabIndex > activeTab ? 1 : -1)
			setActiveTab(tabIndex)
		}
	}
	const variants = {
		initial: (direction: number) => ({
			opacity: 0,
			x: direction > 0 ? 50 : -50,
		}),
		animate: {
			opacity: 1,
			x: 0,
		},
		exit: (direction: number) => ({
			opacity: 0,
			x: direction > 0 ? -50 : 50,
		}),
	}
	return (
		<div className="ProgramSelectionForm">
			<div className="ProgramSelectionForm__inner">
				<h1 className="ProgramSelectionForm__title">Выбор программы</h1>
				<Tabs activeTab={activeTab} handleTab={handleTabChange} tabs={tabs} maxWidth />

				<div style={{ overflow: 'hidden', width: '100%' }}>
					<AnimatePresence mode="wait" custom={direction}>
						<motion.div
							key={activeTab}
							custom={direction}
							variants={variants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className={'ProgramSelectionForm__animation-wrapper'}>
							{activeTab === 0 ? (
								<IngushetiaForm disableTab={setIsTabsDisabled} />
							) : (
								<OtherRegionsForm disableTab={setIsTabsDisabled} />
							)}
						</motion.div>
					</AnimatePresence>
				</div>
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
