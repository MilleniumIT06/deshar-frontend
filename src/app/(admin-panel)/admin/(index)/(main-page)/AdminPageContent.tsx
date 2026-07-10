/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import dynamic from 'next/dynamic'

import { getBestStudentsColumns } from '@/columns/getBestStudentsColumns'
import { getColumnsSchool } from '@/columns/getColumnsSchool'
import { getDepartmentColumns } from '@/columns/getDepartmentColumns'
import { ClassCardMain } from '@/components/Admin/ClassCardMain'
import { Table } from '@/components/Admin/Table'
import { ResultsCard } from '@/components/ResultsCard'
import { useGetSchoolStatistic } from '@/hooks/admin/statistic/useGetSchoolStatistic'
import {
	barChartMockData,
	defaultPieData,
	defaultPieTimeData,
	departmentMockData,
	SchoolsMockData,
} from '@/mocks/adminMock';
import { TEST_CLASSMATES } from '@/mocks/data'
import useRole from '@/shared/hooks/admin/useRole'
import { type Student, type DepartamentItem, type SchoolDepItem } from '@/shared/types/admin/types'
import './AdminPageContent.scss'
import { Loader } from '@/shared/ui/Loader'

const StatisticsBlock = dynamic(() => import('@/components/Admin/StatisticsBlock').then(mod => mod.StatisticsBlock), {
	ssr: false,
	loading: () => <div className="StatisticsBlock-placeholder">Загрузка графиков...</div>,
})
const MainChart = dynamic(() => import('@/widgets/AdminWidgets/MainChart').then(mod => mod.MainChart), {
	ssr: false,
	loading: () => <div className="StatisticsBlock-placeholder">Загрузка графиков...</div>,
})
export const AdminPageContent = () => {
	const { hasRole, role } = useRole()
	const {schoolStatisticAdminData,isLoading:isSchoolStatisticsLoading} =useGetSchoolStatistic()
	console.log(schoolStatisticAdminData,'testDatatRYYYYY')
	const redirectOnBestSchoolsClick = (item: SchoolDepItem) => {
		// console.log(item.id);
		// navigate(`schools/${item.id}`, { relative: "route" })
		return item
	}
	const redirectOnBestDepartmentClick = (item: DepartamentItem) => {
		// console.log(item)
		return item
	}
	const redirectOnBestStudentsClick = (item: Student) => {
		// console.log(item)
		return item
	}
	return (
		<div>
			{hasRole(['Админ', 'Пр. Управления образования', 'Представитель министерства']) && (
				<div className="MainStatisticPageContent__cards">
					<StatisticsBlock data={defaultPieData} centerLabel="баллов" title="Лучшая успеваемость" />

					<StatisticsBlock data={defaultPieTimeData} centerLabel="часов" title="Время обучения" />
				</div>
			)}

			{hasRole(['Админ', 'Пр. Управления образования']) && (
				<ClassCardMain title="Лучшие школы" linkText="Полный список" linkHref="/">
					<Table<SchoolDepItem, any>
						data={SchoolsMockData}
						getColumns={() => getColumnsSchool({ role:"Учитель" })}
						handleRowClick={redirectOnBestSchoolsClick}
					/>
				</ClassCardMain>
			)}

			{hasRole(['Админ', 'Представитель министерства']) && (
				<ClassCardMain title="Лучшие управления образования" linkText="Полный список" linkHref="/">
					<Table<DepartamentItem, any>
						data={departmentMockData}
						getColumns={() => getDepartmentColumns()}
						handleRowClick={redirectOnBestDepartmentClick}
					/>
				</ClassCardMain>
			)}
			<MainChart data={barChartMockData} title="Суммарная успеваемость" />
			<div className="MainStatisticPageContent__result_cards">
				{isSchoolStatisticsLoading ? <Loader/>: schoolStatisticAdminData && <>

					<ResultsCard
								percent={25}
								period={7}
								value={schoolStatisticAdminData.statistics.school_progress.total_xp}
								title="Баллов набрано"
								mode='value'
								variant='admin'
								icon={<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.29596 1.77051C7.09669 0.744044 8.64952 0.744045 9.45026 1.77051L10.3155 2.87988C10.7778 3.47247 11.3981 3.92316 12.1046 4.17969L13.4278 4.66016C14.6513 5.10458 15.1312 6.58147 14.4024 7.66016L13.6143 8.82617C13.1936 9.44893 12.9564 10.1776 12.9307 10.9287L12.8829 12.3359C12.8382 13.6368 11.5822 14.5492 10.3311 14.1895L8.97858 13.8008C8.25627 13.5931 7.48994 13.5931 6.76764 13.8008L5.4151 14.1895C4.16406 14.5492 2.90802 13.6368 2.86334 12.3359L2.81549 10.9287C2.78982 10.1776 2.55263 9.44893 2.1319 8.82617L1.34381 7.66016C0.61506 6.58147 1.09488 5.10458 2.31842 4.66016L3.64166 4.17969C4.3481 3.92316 4.96845 3.47247 5.43073 2.87988L6.29596 1.77051Z" stroke="#060606" strokeWidth="2"/>
<path d="M4.87311 17.123H10.8731" stroke="#060606" strokeWidth="2" strokeLinecap="round"/>
</svg>}
							/>
							<ResultsCard
								percent={0}
								period={7}
								title="Модулей выполнено"
								value={schoolStatisticAdminData.statistics.school_progress.completed_modules_total}
								mode='value'
								variant='admin'
							/>
							</>
}
							{/* <ResultsCard
								percent={-12}
								period={7}
								title="Времени затрачено"
								value={192}
								mode='time'
								variant='admin'
								icon={
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="7" stroke="#060606" strokeWidth="2" />
  <path d="M12 8.12109L12 12.1211L15 12.1211" stroke="#060606" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  <path d="M18 4L20.065 6.06504" stroke="#060606" strokeWidth="2" strokeLinecap="round" />
  <path d="M6.06506 4L4.00002 6.06504" stroke="#060606" strokeWidth="2" strokeLinecap="round" />
</svg>
								}
							/> */}
			</div>
			<ClassCardMain
				title={role === 'Представитель министерства' ? 'Лучшие ученики среди школ' : 'Лучшие ученики класса'}
				linkText="Полный список"
				linkHref="/">
				{/* <ClassTable data={TEST_CLASSMATES} type='classmates' /> */}
				<Table<Student, any>
					data={TEST_CLASSMATES}
					getColumns={() => getBestStudentsColumns()}
					handleRowClick={redirectOnBestStudentsClick}
				/>
			</ClassCardMain>
		</div>
	)
}
