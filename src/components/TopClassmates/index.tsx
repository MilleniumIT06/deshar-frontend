'use client'
import { useState, useMemo } from 'react'

import { TEST_CLASSMATES, TEST_PARALLEL } from '@/mocks/data'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import { Tabs } from '@/shared/ui/Tabs'

import './styles.scss'
import { List } from './List'
import { Table } from './Table'

export interface StudentData {
	id: number
	type: 'classmates' | 'parallel'
	class: string
	name: string
	doneModules: number
	placeNumber: number
	points: number
	time: string
}

const TABS = [
	{ id: 0, name: 'Одноклассники' },
	{ id: 1, name: 'Вся параллель' },
]

export const TopClassmates = () => {
	const [activeTab, setActiveTab] = useState(0)
	const isMobile = useMediaQuery('(max-width: 576px)')
	const tableData = useMemo(() => {
		return activeTab === 0
			? { id: 1, type: 'classmates' as const, students: TEST_CLASSMATES }
			: { id: 2, type: 'parallel' as const, students: TEST_PARALLEL }
	}, [activeTab])

	return (
		<section className="topClassmates">
			<div className="container">
				<div className="topClassmates__inner">
					<h2 className="section__title">Самые активные одноклассники</h2>

					<Tabs activeTab={activeTab} handleTab={setActiveTab} tabs={TABS} />

					{!isMobile ? <Table data={tableData} /> : <List data={tableData} />}
				</div>
			</div>
		</section>
	)
}
