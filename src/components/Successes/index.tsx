import cn from 'classnames'

import { ResultsCard } from '@/components/ResultsCard'
import { candleDateMockData } from '@/mocks/data'
import { Button } from '@/shared/ui/Button'
import { Selector } from '@/shared/ui/Selector'

import { ChartCandle } from './ChartCandle'
import './styles.scss'

export const Successes = () => {
	return (
		<section className="Successes">
			<div className="container">
				<div className="Successes__inner">
					<div className="Successes__header">
						<h1 className="Successes__title">Ваши успехи</h1>
						<Selector />
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
							</div>
							<div className="chart__body">
								<div className="chart__points">
									<ul className={cn('list-reset', 'chart__points_list')}>
										<li className="chart__points_item">150 бал</li>
										<li className="chart__points_item">100 бал</li>
										<li className="chart__points_item">50 бал</li>
									</ul>
								</div>
								<div className="chart__lines">
									{candleDateMockData.map(item => (
										<ChartCandle
											key={item.id}
											id={item.id}
											maxPoints={200}
											currentPoints={item.currentPoints}
											date={item.date}
										/>
									))}
								</div>
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
