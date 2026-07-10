'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { getTeacherColumns } from '@/columns/getTeacherColumns'
import { Table } from '@/components/Admin/Table'
import { useExportSchoolData } from '@/hooks/admin/useExportSchoolData'
import { useGetSchoolTeachers } from '@/hooks/admin/useGetSchoolTeachers'
import { Loader } from '@/shared/ui/Loader'
import { Card } from '@/widgets/AdminWidgets/Card'

import type { Id } from '@/shared/types/types'


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
const {isLoading:isSchoolTeachersLoading,teachersData,isError:isSchoolTeachersError} = useGetSchoolTeachers()
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
	const redirectOnClick = (item: {
							id:Id;
							name: string;
							email: string;
							avatar: string;
							is_online: boolean;
							last_activity: string;
							students_count: number;
							classes_count: number;
						}) => {
		router.push(`/admin/teachers/${item.id}`)
	}
	if(isSchoolTeachersLoading) return <div className='PageAdmin'> <Loader/></div>
	if(isSchoolTeachersError) return <div>Error</div>
	if(teachersData && !teachersData.data) return  <div>Error</div>
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
				valueFirst={`${teachersData?.meta.total} учителей`}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				type="teachers"
				csv={false}>
				<Table<{
							id:Id;
							name: string;
							email: string;
							avatar: string;
							is_online: boolean;
							last_activity: string;
							students_count: number;
							classes_count: number;
						}, never>
					data={teachersData&&teachersData.data||[]}
					getColumns={() => getTeacherColumns()}
					handleRowClick={redirectOnClick}
				/>
			</Card>
		</main>
	)
}
