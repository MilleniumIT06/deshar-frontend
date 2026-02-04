'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { getTeacherColumns } from '@/columns/getTeacherColumns'
import { Table } from '@/components/Admin/Table'
import { mockTeachers } from '@/mocks/adminMock'
// import useRole from '@/shared/hooks/admin/useRole'
import { type TeacherItem } from '@/shared/types/admin/types'
import { Card } from '@/widgets/AdminWidgets/Card'

const TABS = [
	{ id: 0, title: 'Все предметы' },
	{ id: 1, title: 'Математика' },
	{ id: 2, title: 'Русский язык' },
	{ id: 3, title: 'Ингушский язык' },
	{ id: 4, title: 'Литература' },
	{ id: 5, title: 'География' },
]
export const TeachersPageContent = () => {
	// const navigate = useNavigate();
	// const { role } = useRole()
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
	const redirectOnClick = (item: TeacherItem) => {
		router.push(`${item.id}`)
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
				title="Учителя"
				tabs={TABS}
				key={'testCard123'}
				valueFirst="247 учителей"
				valueSecond="67 585 баллов"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				type="teachers"
				csv={true}>
				<Table<TeacherItem, never>
					data={mockTeachers}
					getColumns={() => getTeacherColumns()}
					handleRowClick={redirectOnClick}
				/>
			</Card>
		</main>
	)
}
