'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'

// import { getBestStudentsColumns } from '@/columns/getBestStudentsColumns'
// import { getBestStudentsFlowColumns } from '@/columns/getBestStudentsFlowColumn'
import { getUniqueClassStudentsColumns } from '@/columns/getUniqueClassStudents'
import { Table } from '@/components/Admin/Table'
import { useGetUniqueClassStatistic } from '@/hooks/admin/useGetUniqueClassStatistic'
// import { TEST_CLASSMATES } from '@/mocks/data'
// import { type Student } from '@/shared/types/admin/types'
import { Loader } from '@/shared/ui/Loader'
import { Card } from '@/widgets/AdminWidgets/Card'

import type { Id } from '@/shared/types/types'

const TABS = [
	{ id: 0, title: 'Успеваемость класса' },
	{ id: 1, title: 'Успеваемость потока' },
]
const myClassesIDs = [1, 2, 3, 4, 5]
export const ClassPageContent = () => {
	const params = useParams<{ classId: string }>()
	// const router = useRouter()
	const [timeFrom, setTimeFrom] = useState<string>('')
	const [timeTo, setTimeTo] = useState<string>('')
	const [modulesFrom, setModulesFrom] = useState<string>('')
	const [modulesTo, setModulesTo] = useState<string>('')
	const [pointsFrom, setPointsFrom] = useState<string>('')
	const [pointsTo, setPointsTo] = useState<string>('')
	const [activeTab, setActiveTab] = useState(0)
	const {isLoading,classStatistic} = useGetUniqueClassStatistic(Number(params.classId))
	const resetFilters = () => {
		setTimeFrom('')
		setTimeTo('')
		setModulesFrom('')
		setModulesTo('')
		setPointsFrom('')
		setPointsTo('')
	}

	// Функция преобразования времени из формата "часы:минуты" в секунды
	// const strTimeToSeconds = (value: string): number => {
	// 	if (!value || value.trim() === '') return 0

	// 	const parts = value.split(':')
	// 	if (parts.length !== 2) return 0

	// 	const hours = parseInt(parts[0], 10) || 0
	// 	const minutes = parseInt(parts[1], 10) || 0

	// 	return hours * 3600 + minutes * 60
	// }

	const isParallel = params.classId ? !myClassesIDs.includes(Number(params.classId)) : true

	// const redirectOnStudentItemClick = (item: Student) => {
	// 	router.push(`student/${item.id}`)
	// }

	// Функция фильтрации данных

	// const filterData = useCallback(
	// 	(data: Student[]) => {
	// 		return data.filter(item => {
	// 			const time = item.time // предполагаем, что это число в секундах
	// 			const modules = item.doneModules
	// 			const points = item.points

	// 			// Преобразуем значения фильтров
	// 			const convertedTimeFrom = timeFrom ? strTimeToSeconds(timeFrom) : null
	// 			const convertedTimeTo = timeTo ? strTimeToSeconds(timeTo) : null
	// 			const modulesFromNum = modulesFrom ? parseInt(modulesFrom, 10) : null
	// 			const modulesToNum = modulesTo ? parseInt(modulesTo, 10) : null
	// 			const pointsFromNum = pointsFrom ? parseInt(pointsFrom, 10) : null
	// 			const pointsToNum = pointsTo ? parseInt(pointsTo, 10) : null

	// 			// Проверка фильтра по времени
	// 			if (convertedTimeFrom !== null && time < convertedTimeFrom) return false
	// 			if (convertedTimeTo !== null && time > convertedTimeTo) return false

	// 			// Проверка фильтра по модулям
	// 			if (modulesFromNum !== null && modules < modulesFromNum) return false
	// 			if (modulesToNum !== null && modules > modulesToNum) return false

	// 			// Проверка фильтра по баллам
	// 			if (pointsFromNum !== null && points < pointsFromNum) return false
	// 			if (pointsToNum !== null && points > pointsToNum) return false

	// 			return true
	// 		})
	// 	},
	// 	[modulesFrom, modulesTo, pointsFrom, pointsTo, timeFrom, timeTo],
	// )

	// const filteredClassmates = useMemo(() => filterData(TEST_CLASSMATES), [filterData])

	// const filteredFlow = useMemo(() => filterData(TEST_FLOW), [filterData])
	return (
		<main className="PageAdmin">
			{isLoading?<Loader/> :<Card
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
				title={`Класс ${classStatistic?.class.name}`}
				tabs={TABS}
				key={'testCard123'}
				valueFirst={`${classStatistic?.statistics.total_students} учеников`}
				valueSecond={`${classStatistic?.statistics.total_xp} баллов`}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				isParallel={isParallel}
				type="class">
				{/* {activeTab === 0 ? (
					<Table<Student, never>
						key={`classmates-filtered-data-table`}
						data={filteredClassmates}
						getColumns={() => getBestStudentsColumns()}
						handleRowClick={redirectOnStudentItemClick}
					/>
				) : (
					<Table<Student, never>
						key={`flow-classmates-filtered-data-table`}
						data={filteredFlow}
						getColumns={() => getBestStudentsFlowColumns()}
						handleRowClick={redirectOnStudentItemClick}
					/>
				)} */}

			{classStatistic?.top_students && classStatistic?.top_students.length > 0 ? <Table<{id:Id;level:number;level_name:string;name:string;rank:number;xp:0},never>
					key={`class-students-data`}
					data={classStatistic?.top_students}
					getColumns={()=>getUniqueClassStudentsColumns()}
				/>: "error"}
			</Card>}
		</main>
	)
}
