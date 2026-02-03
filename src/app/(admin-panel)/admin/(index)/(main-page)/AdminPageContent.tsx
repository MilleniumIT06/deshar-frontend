'use client'

import { Loading } from '@/components/Admin/Loading'
import { StatisticsBlock } from '@/components/Admin/StatisticsBlock'
import { ResultsCard } from '@/components/ResultsCard'
import { defaultPieData, defaultPieTimeData } from '@/mocks/adminMock'
import useRole from '@/shared/hooks/admin/useRole'

export const AdminPageContent = () => {
	const { hasRole } = useRole()
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
			{/* {hasRole(["admin", "department"]) && <ClassCardMain title="Лучшие школы" linkText="Полный список" linkHref="/">
                <Table<SchoolDepItem, any> data={SchoolsMockData} getColumns={() => getColumnsSchool({ role })} handleRowClick={redirectOnBestSchoolsClick} />
            </ClassCardMain>}
            {hasRole(["admin", "ministry"]) && <ClassCardMain title="Лучшие управления образования" linkText="Полный список" linkHref="/">
                <Table<DepartamentItem, any> data={departmentMockData} getColumns={() => getDepartmentColumns()} handleRowClick={redirectOnBestDepartmentClick} />
            </ClassCardMain>}
            <MainChart data={barChartMockData} title="Суммарная успеваемость" /> */}
			<div className="MainStatisticPageContent__result_cards">
				<ResultsCard
					id={1}
					percent={25}
					period={7}
					points={182}
					title="Набранные баллы"
					type="increase"
					value={150}
				/>
				<ResultsCard
					id={2}
					percent={12}
					period={7}
					points={26}
					title="Выполненные модули"
					type="decrease"
					value={29}
					icon={
						<svg
							width="25"
							height="24"
							viewBox="0 0 25 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8.33337 12.6413L10.9361 15L16.3334 10"
								stroke="#303030"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<circle cx="12.3334" cy="12" r="8" stroke="#303030" stroke-width="2" />
						</svg>
					}
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
							<circle cx="12.6666" cy="12" r="7" stroke="#060606" stroke-width="2" />
							<path
								d="M12.6666 8.12109L12.6666 12.1211L15.6666 12.1211"
								stroke="#060606"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M18.6666 4L20.7317 6.06504"
								stroke="#060606"
								stroke-width="2"
								stroke-linecap="round"
							/>
							<path
								d="M6.73169 4L4.66664 6.06504"
								stroke="#060606"
								stroke-width="2"
								stroke-linecap="round"
							/>
						</svg>
					}
				/>
			</div>
			{/* <ClassCardMain title={role === "ministry" ? "Лучшие ученики среди школ" : "Лучшие ученики класса"} linkText="Полный список" linkHref="/"> */}
			{/* <ClassTable data={TEST_CLASSMATES} type='classmates' /> */}
			{/* <Table<Student, any> data={TEST_CLASSMATES} getColumns={() => getColumns("classmates")} handleRowClick={redirectOnBestStudentsClick} /> */}
			{/* </ClassCardMain> */}
		</div>
	)
}
