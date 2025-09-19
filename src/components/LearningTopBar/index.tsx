'use client'
import { useAppSelector } from '@/app/_store/hooks'
import { Button } from '@/shared/ui/Button'
import { ProgressBar } from '@/shared/ui/ProgressBar'

import './styles.scss'

export const LearningTopBar = () => {
	const { data } = useAppSelector(state => state.learningAttestationReducer)
	let numberOfCompletedTasks = 0
	data.forEach(item => {
		if (item.completed) {
			numberOfCompletedTasks += 1
		}
	})
	const normalizedMax = Math.max(1, data.length)
	const normalizedCurrent = Math.min(Math.max(numberOfCompletedTasks, 0), normalizedMax)
	return (
		<div className="LearningTopBar">
			<div className="LearningTopBar__inner">
				<div className="LearningTopBar__navigation">
					<Button variant="iconSecondary" size="iconSmall">
						<svg
							width="10"
							height="16"
							viewBox="0 0 10 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M9.33398 14.666L1.83399 7.99935L9.33398 1.33268"
								stroke="#303030"
								strokeWidth="2"
							/>
						</svg>
					</Button>
					<div className="LearningTopBar__pagination">
						<span>{numberOfCompletedTasks}</span>/<span>{data.length}</span>
					</div>
					<Button variant="iconSecondary" size="iconSmall">
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
				<ProgressBar
					maxLessons={normalizedMax}
					doneLessons={normalizedCurrent}
					processLessons={normalizedCurrent}
					className={'LearningTopBar__bar'}
				/>
				<h2 className="LearningTopBar__title">
					Орфография как система правил правописания слов и форм слов
				</h2>
			</div>
		</div>
	)
}
