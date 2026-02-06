'use client'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { StudentTable } from '@/components/Admin/StudentTable'
import { studentTableMockData } from '@/mocks/adminMock'
import { Card } from '@/widgets/AdminWidgets/Card'

const TABS = [
	{ id: 0, title: 'Ингушский язык' },
	{ id: 1, title: 'Математика' },
	{ id: 2, title: 'Литература' },
]
export const StudentPageContent = () => {
	const [activeTab, setActiveTab] = useState(0)
	const [timeFrom, setTimeFrom] = useState<string>('')
	const [timeTo, setTimeTo] = useState<string>('')

	const [modulesFrom, setModulesFrom] = useState<string>('')
	const [modulesTo, setModulesTo] = useState<string>('')
	const [pointsFrom, setPointsFrom] = useState<string>('')
	const [pointsTo, setPointsTo] = useState<string>('')
	const [inputSelect, setInputSelect] = useState<string>('')
	const router = useRouter()
	const resetFilters = () => {
		setTimeFrom('')
		setTimeTo('')
		setModulesFrom('')
		setModulesTo('')
		setPointsFrom('')
		setPointsTo('')
		setInputSelect('')
	}
	return (
		<main className="PageAdmin">
			{/* <StudentCard /> */}
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
					{
						type: 'status',
						options: [
							{
								id: 1,
								value: 'Test1',
							},
							{
								id: 2,
								value: 'Test2',
							},
							{
								id: 3,
								value: 'Test3',
							},
						],
						value: inputSelect,
						handleChange: setInputSelect,
					},
				]}
				resetFilters={resetFilters}
				title="Аспиев Лорс"
				tabs={TABS}
				key={'testCard123'}
				valueFirst="17 модулей"
				valueSecond="964 баллов"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				onClickBackButton={() => router.back()}>
				{inputSelect}
				<StudentTable data={studentTableMockData} />
				{/* <Table<StudentTableItemType, any> data={studentTableMockData} getColumns={() => getStudentTableColumns()} /> */}
			</Card>
		</main>
	)
}
