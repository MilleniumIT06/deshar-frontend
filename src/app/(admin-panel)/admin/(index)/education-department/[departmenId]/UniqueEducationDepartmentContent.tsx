'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { getColumnsSchool } from '@/columns/getColumnsSchool'
import { Table } from '@/components/Admin/Table'
import { SchoolsMockDataDEP } from '@/mocks/adminMock'
import useRole from '@/shared/hooks/admin/useRole'
import { type SchoolDepItem } from '@/shared/types/admin/types'
import { Card } from '@/widgets/AdminWidgets/Card'

const TABS = [
	{ id: 0, title: 'Все районы' },
	{ id: 1, title: 'Магас' },
	{ id: 2, title: 'Назрань' },
	{ id: 3, title: 'Малгобек' },
	{ id: 4, title: 'Насыр-Корт' },
]
export const UniqueEducationDepartmentContent = () => {
	const router = useRouter()
	const { role } = useRole()
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
	const redirectOnSchoolClick = (item: SchoolDepItem) => {
		// console.log(item.id);
		router.push(`/admin/schools/${item.id}`)
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
				title="УО по г. Магас и г. Назраньa"
				tabs={TABS}
				key={'testCard123'}
				valueFirst="489 школ"
				valueSecond="584 958 баллов"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				csv={true}
				onClickBackButton={() => router.back()}>
				<Table<SchoolDepItem, never>
					data={SchoolsMockDataDEP}
					getColumns={() => getColumnsSchool({ role })}
					handleRowClick={redirectOnSchoolClick}
				/>
			</Card>
		</main>
	)
}
