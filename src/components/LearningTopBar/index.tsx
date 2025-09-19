import { Button } from '@/shared/ui/Button'
import './styles.scss'
import { ProgressBar } from '@/shared/ui/ProgressBar'

export const LearningTopBar = () => {
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
						<span>3</span>/<span>10</span>
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
				<ProgressBar maxLessons={10} doneLessons={0} processLessons={3} className={'LearningTopBar__bar'} />
				<h2 className="LearningTopBar__title">
					Орфография как система правил правописания слов и форм слов
				</h2>
			</div>
		</div>
	)
}
