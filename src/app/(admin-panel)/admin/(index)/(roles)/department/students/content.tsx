/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { getDepartmentAllStudentsColumns } from '@/columns/department/getDepartmentAllStudentsColumns'
import { Table } from '@/components/Admin/Table'
import { useGetDepartmentStudents } from '@/hooks/admin/department/useGetStudents'
import { Loader } from '@/shared/ui/Loader'
import { Card } from '@/widgets/AdminWidgets/Card'

import type { IDepartmentStudent } from '@/services/types/department.types'

export const DepartmentStudentsPageContent = () => {
	const { departmentStudents, isDepartmentStudentsError, isDepartmentStudentsLoading } = useGetDepartmentStudents()
	if (isDepartmentStudentsLoading)
		return (
			<div className="PageAdmin">
				<Loader />
			</div>
		)
	if (isDepartmentStudentsError) return <div className="PageAdmin">Error</div>
	return (
		<div className="PageAdmin">
			<Card resetFilters={() => 'test'} title="Ученики" valueFirst={`Всего учеников ${departmentStudents?.meta.total_students}`}>
				{departmentStudents && departmentStudents.data && departmentStudents.data.length > 0 ? (
					<Table<IDepartmentStudent, any> data={departmentStudents.data} getColumns={() => getDepartmentAllStudentsColumns()} />
				) : (
					'Данных нет'
				)}
			</Card>
		</div>
	)
}
