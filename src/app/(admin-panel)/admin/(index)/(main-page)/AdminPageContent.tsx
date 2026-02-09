/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { getBestStudentsColumns } from '@/columns/getBestStudentsColumns'
import { getColumnsSchool } from '@/columns/getColumnsSchool'
import { getDepartmentColumns } from '@/columns/getDepartmentColumns'
import { ClassCardMain } from '@/components/Admin/ClassCardMain'
import { Loading } from '@/components/Admin/Loading'
import { StatisticsBlock } from '@/components/Admin/StatisticsBlock'
import { Table } from '@/components/Admin/Table'
import { ResultsCard } from '@/components/ResultsCard'
import {
	barChartMockData,
	defaultPieData,
	defaultPieTimeData,
	departmentMockData,
	SchoolsMockData,
} from '@/mocks/adminMock'
import { TEST_CLASSMATES } from '@/mocks/data'
import useRole from '@/shared/hooks/admin/useRole'
import { type Student, type DepartamentItem, type SchoolDepItem } from '@/shared/types/admin/types'
import './AdminPageContent.scss'
import { MainChart } from '@/widgets/AdminWidgets/MainChart'

export const AdminPageContent = () => {
	const { hasRole, role } = useRole()
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
			{hasRole(['admin', 'department', 'ministry']) && (
				<div className="MainStatisticPageContent__cards">
					<Loading type="component" content="loading...." isLoading={false}>
						<StatisticsBlock data={defaultPieData} centerLabel="баллов" />
					</Loading>
					<Loading type="component" content="loading...." isLoading={false}>
						<StatisticsBlock data={defaultPieTimeData} centerLabel="часов" />
					</Loading>
				</div>
			)}

			{hasRole(['admin', 'department']) && (
				<ClassCardMain title="Лучшие школы" linkText="Полный список" linkHref="/">
					<Table<SchoolDepItem, any>
						data={SchoolsMockData}
						getColumns={() => getColumnsSchool({ role })}
						handleRowClick={redirectOnBestSchoolsClick}
					/>
				</ClassCardMain>
			)}

			{hasRole(['admin', 'ministry']) && (
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
				<ResultsCard
					id={1}
					percent={25}
					period={7}
					points={182}
					title="Набранные баллы"
					type="increase"
					value={150}
					variant="admin"
				/>
				<ResultsCard
					id={2}
					percent={12}
					period={7}
					points={26}
					title="Выполненные модули"
					type="decrease"
					value={29}
					variant="admin"
				/>
				<ResultsCard
					id={3}
					percent={12}
					period={7}
					points={30}
					title="Время обучения"
					type="increase"
					value="2ч 12м"
					icon={
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<circle cx="12.6666" cy="12" r="7" stroke="#060606" strokeWidth="2" />
							<path
								d="M12.6666 8.12109L12.6666 12.1211L15.6666 12.1211"
								stroke="#060606"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M18.6666 4L20.7317 6.06504"
								stroke="#060606"
								strokeWidth="2"
								strokeLinecap="round"
							/>
							<path
								d="M6.73169 4L4.66664 6.06504"
								stroke="#060606"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					}
					variant="admin"
				/>
			</div>
			<ClassCardMain
				title={role === 'ministry' ? 'Лучшие ученики среди школ' : 'Лучшие ученики класса'}
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
