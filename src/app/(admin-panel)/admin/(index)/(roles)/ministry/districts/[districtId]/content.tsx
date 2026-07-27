'use client'
import { useParams } from 'next/navigation'

import { getTopSchoolsColumns } from '@/columns/ministry/getTopSchoolsColumns'
import { getTopStudentsColumns } from '@/columns/ministry/getTopStudentsColumns'
import { ClassCardMain } from '@/components/Admin/ClassCardMain'
import { Table } from '@/components/Admin/Table'
import { ResultsCard } from '@/components/ResultsCard'
import { useGetDistrictById } from '@/hooks/admin/ministry/useGetDistricts'
import { Loader } from '@/shared/ui/Loader'
import './styles.scss'

import type { UniqueDistrictTopSchool, UniqueDistrictTopStudent } from '@/services/types/ministy.types'

export const UniqueDistrictPageContent = () => {
	const { districtId } = useParams<{ districtId: string }>()
	const { isMinistryDistrictLoading, ministryDistrict, isMinistryDistrictError } = useGetDistrictById(
		Number(districtId),
	)
	if (isMinistryDistrictLoading){

        return (
            <div>
				<Loader />
			</div>
		)
    }
	if (isMinistryDistrictError) return <div>Error</div>
	return (
		<div className="AdminPage">
			<div className="MinistryUniqueDistrict__header">
				<h1>{ministryDistrict?.data.district.name}</h1>
			</div>

			<div className="MinistryUniqueDistrict__cards">
				<ResultsCard
					value={ministryDistrict?.data.statistics.total_points}
					title="Баллы"
					variant="admin"
					mode="value"
					icon={
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.4229 4.64746C11.2236 3.621 12.7764 3.621 13.5771 4.64746L14.4424 5.75684C14.9047 6.34942 15.525 6.80011 16.2314 7.05664L17.5547 7.53711C18.7782 7.98153 19.258 9.45842 18.5293 10.5371L17.7412 11.7031C17.3205 12.3259 17.0833 13.0545 17.0576 13.8057L17.0098 15.2129C16.9651 16.5138 15.709 17.4261 14.458 17.0664L13.1055 16.6777C12.3832 16.47 11.6168 16.47 10.8945 16.6777L9.54199 17.0664C8.29095 17.4261 7.03491 16.5138 6.99023 15.2129L6.94238 13.8057C6.91671 13.0545 6.67952 12.3259 6.25879 11.7031L5.4707 10.5371C4.74195 9.45842 5.22177 7.98153 6.44531 7.53711L7.76855 7.05664C8.47499 6.80011 9.09534 6.34942 9.55762 5.75684L10.4229 4.64746Z"
								stroke="#060606"
								strokeWidth="2"
							/>
							<path d="M9 20H15" stroke="#060606" strokeWidth="2" strokeLinecap="round" />
						</svg>
					}
				/>
				<ResultsCard
					value={ministryDistrict?.data.statistics.average_points}
					title="Средний балл"
					variant="admin"
					mode="value"
					icon={
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.4229 4.64746C11.2236 3.621 12.7764 3.621 13.5771 4.64746L14.4424 5.75684C14.9047 6.34942 15.525 6.80011 16.2314 7.05664L17.5547 7.53711C18.7782 7.98153 19.258 9.45842 18.5293 10.5371L17.7412 11.7031C17.3205 12.3259 17.0833 13.0545 17.0576 13.8057L17.0098 15.2129C16.9651 16.5138 15.709 17.4261 14.458 17.0664L13.1055 16.6777C12.3832 16.47 11.6168 16.47 10.8945 16.6777L9.54199 17.0664C8.29095 17.4261 7.03491 16.5138 6.99023 15.2129L6.94238 13.8057C6.91671 13.0545 6.67952 12.3259 6.25879 11.7031L5.4707 10.5371C4.74195 9.45842 5.22177 7.98153 6.44531 7.53711L7.76855 7.05664C8.47499 6.80011 9.09534 6.34942 9.55762 5.75684L10.4229 4.64746Z"
								stroke="#060606"
								strokeWidth="2"
							/>
							<path d="M9 20H15" stroke="#060606" strokeWidth="2" strokeLinecap="round" />
						</svg>
					}
				/>
				<ResultsCard
					value={ministryDistrict?.data.statistics.total_schools}
					title="Школы"
					variant="admin"
					mode="value"
					icon={
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.4229 4.64746C11.2236 3.621 12.7764 3.621 13.5771 4.64746L14.4424 5.75684C14.9047 6.34942 15.525 6.80011 16.2314 7.05664L17.5547 7.53711C18.7782 7.98153 19.258 9.45842 18.5293 10.5371L17.7412 11.7031C17.3205 12.3259 17.0833 13.0545 17.0576 13.8057L17.0098 15.2129C16.9651 16.5138 15.709 17.4261 14.458 17.0664L13.1055 16.6777C12.3832 16.47 11.6168 16.47 10.8945 16.6777L9.54199 17.0664C8.29095 17.4261 7.03491 16.5138 6.99023 15.2129L6.94238 13.8057C6.91671 13.0545 6.67952 12.3259 6.25879 11.7031L5.4707 10.5371C4.74195 9.45842 5.22177 7.98153 6.44531 7.53711L7.76855 7.05664C8.47499 6.80011 9.09534 6.34942 9.55762 5.75684L10.4229 4.64746Z"
								stroke="#060606"
								strokeWidth="2"
							/>
							<path d="M9 20H15" stroke="#060606" strokeWidth="2" strokeLinecap="round" />
						</svg>
					}
				/>
				<ResultsCard
					value={ministryDistrict?.data.statistics.total_students}
					title="Ученики"
					variant="admin"
					mode="value"
					icon={
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.4229 4.64746C11.2236 3.621 12.7764 3.621 13.5771 4.64746L14.4424 5.75684C14.9047 6.34942 15.525 6.80011 16.2314 7.05664L17.5547 7.53711C18.7782 7.98153 19.258 9.45842 18.5293 10.5371L17.7412 11.7031C17.3205 12.3259 17.0833 13.0545 17.0576 13.8057L17.0098 15.2129C16.9651 16.5138 15.709 17.4261 14.458 17.0664L13.1055 16.6777C12.3832 16.47 11.6168 16.47 10.8945 16.6777L9.54199 17.0664C8.29095 17.4261 7.03491 16.5138 6.99023 15.2129L6.94238 13.8057C6.91671 13.0545 6.67952 12.3259 6.25879 11.7031L5.4707 10.5371C4.74195 9.45842 5.22177 7.98153 6.44531 7.53711L7.76855 7.05664C8.47499 6.80011 9.09534 6.34942 9.55762 5.75684L10.4229 4.64746Z"
								stroke="#060606"
								strokeWidth="2"
							/>
							<path d="M9 20H15" stroke="#060606" strokeWidth="2" strokeLinecap="round" />
						</svg>
					}
				/>
				<ResultsCard
					value={ministryDistrict?.data.statistics.total_teachers}
					title="Учителя"
					variant="admin"
					mode="value"
					icon={
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.4229 4.64746C11.2236 3.621 12.7764 3.621 13.5771 4.64746L14.4424 5.75684C14.9047 6.34942 15.525 6.80011 16.2314 7.05664L17.5547 7.53711C18.7782 7.98153 19.258 9.45842 18.5293 10.5371L17.7412 11.7031C17.3205 12.3259 17.0833 13.0545 17.0576 13.8057L17.0098 15.2129C16.9651 16.5138 15.709 17.4261 14.458 17.0664L13.1055 16.6777C12.3832 16.47 11.6168 16.47 10.8945 16.6777L9.54199 17.0664C8.29095 17.4261 7.03491 16.5138 6.99023 15.2129L6.94238 13.8057C6.91671 13.0545 6.67952 12.3259 6.25879 11.7031L5.4707 10.5371C4.74195 9.45842 5.22177 7.98153 6.44531 7.53711L7.76855 7.05664C8.47499 6.80011 9.09534 6.34942 9.55762 5.75684L10.4229 4.64746Z"
								stroke="#060606"
								strokeWidth="2"
							/>
							<path d="M9 20H15" stroke="#060606" strokeWidth="2" strokeLinecap="round" />
						</svg>
					}
				/>
			</div>
            <div>
                <ClassCardMain title='Лучшие школы' linkHref='/' linkText='Полный список'>
                       {ministryDistrict&&ministryDistrict.data&&ministryDistrict.data.top_schools.length>0 ? <Table<UniqueDistrictTopSchool> data={ministryDistrict.data.top_schools}  getColumns={()=>getTopSchoolsColumns()}/> : "Данных нет"}
                </ClassCardMain>
				<ClassCardMain title='Лучшие ученики' linkHref='/' linkText='Полный список'>
                       {ministryDistrict&&ministryDistrict.data&&ministryDistrict.data.top_schools.length>0 ? <Table<UniqueDistrictTopStudent> data={ministryDistrict.data.top_students}  getColumns={()=>getTopStudentsColumns()}/> : "Данных нет"}
                </ClassCardMain>
            </div>
		</div>
	)
}
