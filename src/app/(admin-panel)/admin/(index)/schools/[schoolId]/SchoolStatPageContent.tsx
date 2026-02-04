'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { getSchoolStatisticColumns } from '@/columns/getSchoolStatisticColumns'
import { Table } from '@/components/Admin/Table'
import { SchoolStatMockData } from '@/mocks/adminMock'
import { type SchoolStatItem } from '@/shared/types/admin/types'
import { Card } from '@/widgets/AdminWidgets/Card'

const TABS = [
	{ id: 0, title: 'Все классы' },
	{ id: 1, title: '5-ые' },
	{ id: 2, title: '6-ые' },
	{ id: 3, title: '7-ые' },
	{ id: 4, title: '8-ые' },
	{ id: 5, title: '9-ые' },
]
export const SchoolsStatPageContent = () => {
	const [timeFrom, setTimeFrom] = useState<string>('')
	const [timeTo, setTimeTo] = useState<string>('')

	const [modulesFrom, setModulesFrom] = useState<string>('')
	const [modulesTo, setModulesTo] = useState<string>('')
	const [pointsFrom, setPointsFrom] = useState<string>('')
	const [pointsTo, setPointsTo] = useState<string>('')
	const [activeTab, setActiveTab] = useState(0)
	const router = useRouter()
	const resetFilters = () => {
		setTimeFrom('')
		setTimeTo('')
		setModulesFrom('')
		setModulesTo('')
		setPointsFrom('')
		setPointsTo('')
	}
	const redirectOnClick = (item: SchoolStatItem) => {
		// console.log(item.id);
		router.push(`/class/${item.id}`)
	}
	const onClickBackButton = () => {
		router.back()
	}
	return (
		<main className="PageAdmin">
			<Card
				filters={[
					{
						type: 'time',
						setValueFrom: setTimeFrom,
						setValueTo: setTimeTo,
						valueFrom: timeFrom,
						valueTo: timeTo,
					},
					{
						type: 'modules',
						setValueFrom: setModulesFrom,
						setValueTo: setModulesTo,
						valueFrom: modulesFrom,
						valueTo: modulesTo,
					},
					{
						type: 'points',
						setValueFrom: setPointsFrom,
						setValueTo: setPointsTo,
						valueFrom: pointsFrom,
						valueTo: pointsTo,
					},
				]}
				resetFilters={resetFilters}
				title="ГБОУ СОШ Детский сад № 1 г. Магас"
				tabs={TABS}
				key={'testCard123'}
				valueFirst="38 классов"
				valueSecond="64 585 баллов"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				onClickBackButton={onClickBackButton}>
				{/* <SchoolClassesList data={SchoolStatMockData} link="/class/" /> */}
				<Table<SchoolStatItem, never>
					data={SchoolStatMockData}
					getColumns={() => getSchoolStatisticColumns()}
					handleRowClick={redirectOnClick}
				/>
			</Card>
		</main>
	)
}
