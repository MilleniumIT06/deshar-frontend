/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useParams } from 'next/navigation'

import { getSchoolTopStudents } from '@/columns/department/getSchoolTopStudents'
import { ClassCardMain } from '@/components/Admin/ClassCardMain'
import { Table } from '@/components/Admin/Table'
import { ResultsCard } from '@/components/ResultsCard'
import { useGetSchoolById } from '@/hooks/admin/department/useGetSchools'
import './../../../styles.scss'
import { Loader } from '@/shared/ui/Loader'

import type { DepartmentTopStudentType } from '@/services/types/department.types'

type SchoolTopStudent = Omit<DepartmentTopStudentType, 'school'>
export const UniqueSchoolPageContent = () => {
	const params = useParams<{ schoolId: string }>()
	const { departmentSchool, isDepartmentSchoolError, isDepartmentSchoolLoading } = useGetSchoolById(Number(params.schoolId))

	if (isDepartmentSchoolLoading) {
		return (
			<div>
				<Loader />
			</div>
		)
	}
	if (isDepartmentSchoolError) return <div>Error</div>

	return (
		<div className="UniqueSchoolPageContent AdminPage">
			<div className="UniqueSchoolPageContent__head">
				<h1 className="UniqueSchoolPageContent__title">Статистика школы</h1>
			</div>

			<div className="UniqueSchoolPageContent__main">
				<div className="UniqueSchoolPageContent__cards">
					<ResultsCard variant="admin" title="Учеников" value={departmentSchool?.data.statistics.total_students} />
					<ResultsCard variant="admin" title="Учителей" value={departmentSchool?.data.statistics.total_teachers} />
					<ResultsCard variant="admin" title="Классы" value={departmentSchool?.data.statistics.total_classes} />
					<ResultsCard variant="admin" title="Баллы" value={departmentSchool?.data.statistics.total_points} />
					<ResultsCard variant="admin" title="Ср. балл" value={departmentSchool?.data.statistics.average_points} />
				</div>
			</div>
			<ClassCardMain title="Лучшие ученики школы" linkHref="/" linkText="Полный список">
				{departmentSchool && departmentSchool.data && departmentSchool.data.top_students.length > 0 ? (
					<Table<SchoolTopStudent, any> data={departmentSchool.data.top_students} getColumns={() => getSchoolTopStudents()} />
				) : (
					'Данных нет'
				)}
			</ClassCardMain>
		</div>
	)
}
