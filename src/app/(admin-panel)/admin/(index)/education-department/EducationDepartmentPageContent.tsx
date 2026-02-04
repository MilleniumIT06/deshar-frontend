'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { getEducationDepartmentColumns } from '@/columns/getEducationDepartmentColumns'
import { Table } from '@/components/Admin/Table'
import { educationDepMockData } from '@/mocks/adminMock'
// import useRole from '@/shared/hooks/admin/useRole'
import { type IEducationDepartment } from '@/shared/types/admin/types'
import { Card } from '@/widgets/AdminWidgets/Card'
/* eslint-disable @typescript-eslint/no-explicit-any */

const TABS = [{ id: 0, title: 'Все упр.образования' }]
export const EducationDepartmentPageContent = () => {
	// const navigate = useNavigate();
	const router = useRouter()
	// const { role } = useRole()
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
	const redirectOnClick = (item: IEducationDepartment) => {
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
				title="Упр. образования"
				tabs={TABS}
				key={'testCard123'}
				valueFirst="7 управлений образования"
				valueSecond="584 958 баллов"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				csv={true}>
				{/* <EducationDepartmentTable data={educationDepMockData} link="/education-department/" /> */}
				<Table<IEducationDepartment, any>
					data={educationDepMockData}
					getColumns={() => getEducationDepartmentColumns()}
					handleRowClick={redirectOnClick}
				/>
			</Card>
		</main>
	)
}
