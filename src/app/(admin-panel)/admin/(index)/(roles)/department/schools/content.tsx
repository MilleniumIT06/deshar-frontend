/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useRouter } from 'next/navigation'

import { getSchoolsColumns } from '@/columns/ministry/getSchoolsColumns'
import { Table } from '@/components/Admin/Table'
import { useGetSchools } from '@/hooks/admin/department/useGetSchools'
import { type IMinistrySchool } from '@/services/types/ministy.types'
import { Loader } from '@/shared/ui/Loader'
import { Card } from '@/widgets/AdminWidgets/Card'

export const DepartmentSchoolsAdminPageContent = () => {
	const router = useRouter()
	const { departmentSchools, isDepartmentSchoolsError, isDepartmentSchoolsLoading } = useGetSchools()
	if (isDepartmentSchoolsLoading) {
		return (
			<div>
				<Loader />
			</div>
		)
	}
	if (isDepartmentSchoolsError) return 'Error'
	const handleItemClick = (item: IMinistrySchool) => {
		router.push(`schools/${item.id}`)
	}
	return (
		<div className="PageAdmin">
			<Card resetFilters={() => 'test'} title="Школы" valueFirst={`Всего школ ${departmentSchools?.meta.total_schools}`}>
				{departmentSchools && departmentSchools.data && departmentSchools.data.length > 0 ? (
					<Table<IMinistrySchool, any>
						data={departmentSchools.data}
						handleRowClick={handleItemClick}
						getColumns={() => getSchoolsColumns()}
					/>
				) : (
					'Данных нет'
				)}
			</Card>
		</div>
	)
}
