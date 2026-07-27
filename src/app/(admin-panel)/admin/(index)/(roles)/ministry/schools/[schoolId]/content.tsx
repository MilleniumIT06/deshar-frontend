'use client'
import { useParams } from 'next/navigation'

import { getSchoolTopStudents } from '@/columns/ministry/getSchoolTopStudents'
import { ClassCardMain } from '@/components/Admin/ClassCardMain'
import { Table } from '@/components/Admin/Table'
import { ResultsCard } from '@/components/ResultsCard'
import { useGetSchoolById } from '@/hooks/admin/ministry/useGetSchools'
import './../../../styles.scss'
import { Loader } from '@/shared/ui/Loader'

import type { UniqueDistrictTopStudent } from '@/services/types/ministy.types'

type SchoolTopStudent = Omit<UniqueDistrictTopStudent, 'school'>
export const UniqueSchoolPageContent = () => {
	const params = useParams<{ schoolId: string }>()
	const { isMinistrySchoolLoading, isMinistrySchoolError, ministrySchool } = useGetSchoolById(
		Number(params.schoolId),
	)

	if (isMinistrySchoolLoading){

        return (
            <div>
				<Loader />
			</div>
		)
    }
	if (isMinistrySchoolError) return <div>Error</div>

	return (
		<div className="UniqueSchoolPageContent AdminPage">
			<div className="UniqueSchoolPageContent__head">
				<h1 className="UniqueSchoolPageContent__title">Статистика школы</h1>
			</div>

			<div className="UniqueSchoolPageContent__main">
				<div className="UniqueSchoolPageContent__cards">
					<ResultsCard
						variant="admin"
						title="Учеников"
						value={ministrySchool?.data.statistics.total_students}
					/>
					<ResultsCard
						variant="admin"
						title="Учителей"
						value={ministrySchool?.data.statistics.total_teachers}
					/>
					<ResultsCard
						variant="admin"
						title="Классы"
						value={ministrySchool?.data.statistics.total_classes}
					/>
					<ResultsCard
						variant="admin"
						title="Баллы"
						value={ministrySchool?.data.statistics.total_points}
					/>
					<ResultsCard
						variant="admin"
						title="Ср. балл"
						value={ministrySchool?.data.statistics.average_points}
					/>
				</div>
			</div>
			<ClassCardMain title="Лучшие ученики школы" linkHref="/" linkText="Полный список">
				{ministrySchool && ministrySchool.data && ministrySchool.data.top_students.length > 0 ? (
					<Table<SchoolTopStudent>
						data={ministrySchool.data.top_students}
						getColumns={() => getSchoolTopStudents()}
					/>
				) : (
					'Данных нет'
				)}
			</ClassCardMain>
		</div>
	)
}
