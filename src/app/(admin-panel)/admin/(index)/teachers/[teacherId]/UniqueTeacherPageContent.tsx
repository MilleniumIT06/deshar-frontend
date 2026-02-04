'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { getUniqueTeacherColumns } from '@/columns/getUniqueTeacherColumns'
import { Table } from '@/components/Admin/Table'
import { mockTeacherStudentsList } from '@/mocks/adminMock'
import { type UniqueTeacherStudentItem } from '@/shared/types/admin/types'
import { Card } from '@/widgets/AdminWidgets/Card'

const TABS = [
	{ id: 0, title: 'Все классы' },
	{ id: 1, title: '5 “А”' },
	{ id: 2, title: '5 ”Б”' },
	{ id: 3, title: '6 “Б”' },
	{ id: 4, title: '6 “В”' },
]
export const UniqueTeacherPageContent = () => {
	const router = useRouter()
	const [timeFrom, setTimeFrom] = useState<string>('')
	const [timeTo, setTimeTo] = useState<string>('')

	const [modulesFrom, setModulesFrom] = useState<string>('')
	const [modulesTo, setModulesTo] = useState<string>('')
	const [pointsFrom, setPointsFrom] = useState<string>('')
	const [pointsTo, setPointsTo] = useState<string>('')
	const [activeTab, setActiveTab] = useState(0)
	const resetFilters = () => {
		setTimeFrom('')
		setTimeTo('')
		setModulesFrom('')
		setModulesTo('')
		setPointsFrom('')
		setPointsTo('')
	}
	const redirectOnClick = (item: UniqueTeacherStudentItem) => {
		router.push(`/admin/student/${item.id}`)
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
				title="Татриева Зина"
				tabs={TABS}
				key={'testCard123'}
				valueFirst="85 учителей"
				valueSecond="12 585 баллов"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				onClickBackButton={() => router.back()}
				csv={true}>
				<Table<UniqueTeacherStudentItem, never>
					data={mockTeacherStudentsList}
					getColumns={() => getUniqueTeacherColumns()}
					handleRowClick={redirectOnClick}
				/>
			</Card>
		</main>
	)
}
