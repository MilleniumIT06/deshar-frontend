/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { getDepartmentAllStudentsColumns } from '@/columns/department/getDepartmentAllStudentsColumns'
import { Table } from '@/components/Admin/Table'
import { useGetDepartmentTeachers } from '@/hooks/admin/department/useGetTeachers'
import { Loader } from '@/shared/ui/Loader'
import { Card } from '@/widgets/AdminWidgets/Card'

import type { IDepartmentStudent } from '@/services/types/department.types'

export const DepartmentTeachersPageContent = () => {
	const { departmentTeachers, isDepartmentTeachersError, isDepartmentTeachersLoading } = useGetDepartmentTeachers()
	if (isDepartmentTeachersLoading)
		return (
			<div className="PageAdmin">
				<Loader />
			</div>
		)
	if (isDepartmentTeachersError) return <div className="PageAdmin">Error</div>
	return (
		<div className="PageAdmin">
			<Card resetFilters={() => 'test'} title="Ученики" valueFirst={`Всего учителей ${departmentTeachers?.meta.total_students}`}>
				{departmentTeachers && departmentTeachers.data && departmentTeachers.data.length > 0 ? (
					<Table<IDepartmentStudent, any> data={departmentTeachers.data} getColumns={() => getDepartmentAllStudentsColumns()} />
				) : (
					'Данных нет'
				)}
			</Card>
		</div>
	)
}
