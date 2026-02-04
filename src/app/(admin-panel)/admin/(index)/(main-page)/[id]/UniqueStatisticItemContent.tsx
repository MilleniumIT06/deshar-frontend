'use client'

import { getBestStudentsColumns } from '@/columns/getBestStudentsColumns'
import { ClassCardMain } from '@/components/Admin/ClassCardMain'
import { Table } from '@/components/Admin/Table'
import { ResultsCard } from '@/components/ResultsCard'
import { barChartMockData } from '@/mocks/adminMock'
import { TEST_CLASSMATES } from '@/mocks/data'
import { type Student } from '@/shared/types/admin/types'
import { MainChart } from '@/widgets/AdminWidgets/MainChart'
import './styles.scss'

export const UniqueItemStatisticContent = () => {
	return (
		<main className="SchoolDashboard">
			<div className="SchoolDashboard__inner">
				<MainChart data={barChartMockData} title="Успеваемость школы" />
				<div className="SchoolDashboard__result_cards">
					<ResultsCard
						id={1}
						percent={25}
						period={7}
						points={182}
						title="Набранные баллы"
						type="increase"
						variant="admin"
						value={150}
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
									stroke-width="2"
								/>
								<path d="M9 20H15" stroke="#060606" stroke-width="2" stroke-linecap="round" />
							</svg>
						}
					/>
					<ResultsCard
						id={2}
						percent={12}
						period={7}
						points={26}
						title="Выполненные модули"
						type="decrease"
						variant="admin"
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
						variant="admin"
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
				<ClassCardMain title="Лучшие ученики школы" linkText="Полный список" linkHref="/">
					<Table<Student, never>
						data={TEST_CLASSMATES}
						getColumns={() => getBestStudentsColumns('classmates')}
					/>
				</ClassCardMain>
			</div>
		</main>
	)
}
