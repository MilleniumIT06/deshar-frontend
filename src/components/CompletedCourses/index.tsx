import { LessonProgressCard } from '@/widgets/LessonProgressCard'

import './styles.scss'

export const CompletedCourses = () => {
	return (
		<section className="CompletedCourses">
			<div className="container">
				<div className="CompletedCourses__inner">
					<h1 className="section__title">Выполненные дисциплины</h1>
					<div className="CompletedCourses__lessons">
						<LessonProgressCard
							title="Химия"
							countOfFinishedModules={15}
							countOfLeftModules={0}
							countOfModules={15}
							countOfProcessModules={0}
						/>
						<LessonProgressCard
							title="Физика"
							countOfFinishedModules={38}
							countOfLeftModules={19}
							countOfModules={38}
							countOfProcessModules={0}
						/>
						<LessonProgressCard
							title="Алгебра"
							countOfFinishedModules={17}
							countOfLeftModules={0}
							countOfModules={17}
							countOfProcessModules={19}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
