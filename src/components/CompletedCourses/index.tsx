import { LessonProgressCard } from '@/widgets/LessonProgressCard'

import styles from './styles.module.scss'

export const CompletedCourses = () => {
	return (
		<section className={styles.completedCourses}>
			<div className="container">
				<div className={styles.inner}>
					<h1 className="section__title">Выполненные дисциплины</h1>
					<div className={styles.lessons}>
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
