import { ProgressBar } from '@/shared/ui/ProgressBar'

import { ProgressCounter } from './ProgressCounter'
import './styles.scss'

interface ILessonProgressCard {
	title: string
	countOfModules: number
	countOfFinishedModules: number
	countOfLeftModules: number
	countOfProcessModules: number
}
export const LessonProgressCard = ({
	countOfFinishedModules = 7,
	countOfLeftModules = 7,
	countOfModules = 21,
	countOfProcessModules = 7,
	title = 'Ингушский язык',
}: ILessonProgressCard) => {
	return (
		<div className="LessonProgressCard">
			<div className="LessonProgressCard__header">
				<h6 className="LessonProgressCard__title">{title}</h6>
				<div className="LessonProgressCard__module">
					<span>{countOfModules} модуль</span>
				</div>
			</div>
			<div className="LessonProgressCard__body">
				<ul className="list-reset LessonProgressCard__list">
					<ProgressCounter type="finished" count={countOfFinishedModules} />
					<ProgressCounter type="process" count={countOfProcessModules} />
					<ProgressCounter type="left" count={countOfLeftModules} />
				</ul>
				<ProgressBar
					counter={false}
					doneLessons={countOfFinishedModules}
					maxLessons={countOfModules}
					processLessons={countOfProcessModules}
				/>
			</div>
		</div>
	)
}
