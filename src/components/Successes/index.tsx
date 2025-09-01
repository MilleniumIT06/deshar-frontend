import cn from 'classnames'

import { ResultsCard } from '@/components/ResultsCard'
import { candleDateMockData } from '@/mocks/data'
import { Button } from '@/shared/ui/Button'
import { Selector } from '@/shared/ui/Selector'

import { ChartCandle } from './ChartCandle'
import styles from './styles.module.scss'

export const Successes = () => {
	return (
		<section className={styles.successes}>
			<div className="container">
				<div className={styles.successes__inner}>
					<div className={styles.successes__header}>
						<h1 className={styles.successes__title}>Ваши успехи</h1>
						<Selector />
					</div>
					<div className={styles.successes__body}>
						<div className={styles.chart}>
							<div className={styles.chart__header}>
								<h4 className={styles.chart__title}>Ежедневная активность</h4>
								<div className={styles.chart__navigation}>
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
							<div className={styles.chart__body}>
								<div className={styles.chart__points}>
									<ul className={cn('list-reset', styles.chart__points_list)}>
										<li className={styles.chart__points_item}>150 бал</li>
										<li className={styles.chart__points_item}>100 бал</li>
										<li className={styles.chart__points_item}>50 бал</li>
									</ul>
								</div>
								<div className={styles.chart__lines}>
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
					<div className={styles.successes__footer}>
						<div className={styles.successes__results}>
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
