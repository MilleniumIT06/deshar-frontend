'use client'

import { ResultsCard } from '@/components/ResultsCard'
import { Button } from '@/shared/ui/Button'
import { Selector } from '@/shared/ui/Selector'

import './styles.scss'
import { BarChart } from '../BarChart'

export const Successes = () => {
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
									<Button variant="iconThird" size="iconSmall">
										<svg
											width="9"
											height="14"
											viewBox="0 0 9 14"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path d="M8 1L2 7L8 13" stroke="#303030" strokeWidth="1.5" />
										</svg>
									</Button>
									<Button variant="iconThird" size="iconSmall">
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
								<BarChart />
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
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
