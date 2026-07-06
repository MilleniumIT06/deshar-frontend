'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { ResultsCard } from '@/components/ResultsCard'
import { barChartMockData } from '@/mocks/adminMock'
import { Button } from '@/shared/ui/Button'
import { Selector } from '@/shared/ui/Selector'
import './styles.scss'

const BarChart = dynamic(() => import('@/widgets/AdminWidgets/MainChart/BarChart').then(mod => mod.BarChart), {
	ssr: false,
	loading: () => <div className="StatisticsBlock-placeholder">Загрузка графиков...</div>,
})
const VISIBLE_COUNT = 19
const STEP = 6
export const Successes = () => {
	const [startIndex, setStartIndex] = useState(0)

	const handlePrev = () => setStartIndex(prev => Math.max(0, prev - STEP))
	const handleNext = () => setStartIndex(prev => Math.min(barChartMockData.length - VISIBLE_COUNT, prev + STEP))

	const visibleData = barChartMockData.slice(startIndex, startIndex + VISIBLE_COUNT)

	return (
		<section className="Successes">
			<div className="container Successes__container">
				<div className="Successes__inner">
					<div className="Successes__header">
						<h1 className="Successes__title">Ваши успехи</h1>
						<Selector
							className="Successes__selector"
							options={[
								{ id: 'week', label: 'Неделя' },
								{ id: 'month', label: 'Месяц' },
								{ id: 'year', label: 'Год' },
								{ id: 'test', label: 'test' },
								{ id: 'test2', label: 'test2' },
								{ id: 'test3', label: 'test3' },
							]}
							defaultValue="week"
							onChange={() => 'test'}
						/>
					</div>
					<div className="Successes__body">
						<div className="chart">
							<div className="chart__header">
								<h4 className="chart__title">Ежедневная активность</h4>
								<div className="chart__navigation">
									<Button variant="iconThird" size="iconSmall" onClick={() => handlePrev()}>
										<svg
											width="9"
											height="14"
											viewBox="0 0 9 14"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path d="M8 1L2 7L8 13" stroke="#303030" strokeWidth="1.5" />
										</svg>
									</Button>
									<Button variant="iconThird" size="iconSmall" onClick={() => handleNext()}>
										<svg
											width="9"
											height="14"
											viewBox="0 0 9 14"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path d="M1 13L7 7L1 1" stroke="#303030" strokeWidth="1.5" />
										</svg>
									</Button>
								</div>
								<Selector
									className="Successes__selector--chart"
									options={[
										{ id: 'week', label: 'Неделя' },
										{ id: 'month', label: 'Месяц' },
										{ id: 'year', label: 'Год' },
										{ id: 'test', label: 'test' },
										{ id: 'test2', label: 'test2' },
										{ id: 'test3', label: 'test3' },
									]}
									defaultValue="week"
									onChange={() => 'test'}
								/>
							</div>
							<div className="chart__body">
								{/* <BarChart data={barChartMockData} /> */}
								<BarChart data={visibleData} />
							</div>
						</div>
					</div>
					<div className="Successes__footer">
						<div className="Successes__results">
							<ResultsCard
								id={1}
								percent={25}
								period={7}
								points={182}
								title="Баллов набрано"
								type="increase"
								value={150}
								icon={<svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.29596 1.77051C7.09669 0.744044 8.64952 0.744045 9.45026 1.77051L10.3155 2.87988C10.7778 3.47247 11.3981 3.92316 12.1046 4.17969L13.4278 4.66016C14.6513 5.10458 15.1312 6.58147 14.4024 7.66016L13.6143 8.82617C13.1936 9.44893 12.9564 10.1776 12.9307 10.9287L12.8829 12.3359C12.8382 13.6368 11.5822 14.5492 10.3311 14.1895L8.97858 13.8008C8.25627 13.5931 7.48994 13.5931 6.76764 13.8008L5.4151 14.1895C4.16406 14.5492 2.90802 13.6368 2.86334 12.3359L2.81549 10.9287C2.78982 10.1776 2.55263 9.44893 2.1319 8.82617L1.34381 7.66016C0.61506 6.58147 1.09488 5.10458 2.31842 4.66016L3.64166 4.17969C4.3481 3.92316 4.96845 3.47247 5.43073 2.87988L6.29596 1.77051Z" stroke="#060606" stroke-width="2"/>
<path d="M4.87311 17.123H10.8731" stroke="#060606" stroke-width="2" stroke-linecap="round"/>
</svg>}
							/>
							<ResultsCard
								id={2}
								percent={12}
								period={7}
								points={26}
								title="Модулей выполнено"
								type="decrease"
								value={29}
							/>
							<ResultsCard
								id={3}
								percent={12}
								period={7}
								points={30}
								title="Времени затрачено"
								type="increase"
								value="2ч 12м"
								icon={
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="7" stroke="#060606" stroke-width="2" />
  <path d="M12 8.12109L12 12.1211L15 12.1211" stroke="#060606" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M18 4L20.065 6.06504" stroke="#060606" stroke-width="2" stroke-linecap="round" />
  <path d="M6.06506 4L4.00002 6.06504" stroke="#060606" stroke-width="2" stroke-linecap="round" />
</svg>
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
