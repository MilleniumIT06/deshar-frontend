import Link from 'next/link'

import { LessonProgressCard } from '@/entities/course/LessonProgressCard'

import './styles.scss'

export const ContinueLearning = () => {
	return (
		<section className="ContinueLearning">
			<div className="container">
				<div className="ContinueLearning__inner">
					<h2 className="section__title">Продолжим обучение</h2>
					<div className="ContinueLearning__subjects">
						<LessonProgressCard
							countOfFinishedModules={7}
							countOfLeftModules={11}
							countOfModules={21}
							countOfProcessModules={3}
							title="Ингушский язык"
						/>
					</div>
					<div className="ContinueLearning__footer">
						<Link href="/completed-courses" className="ContinueLearning__link">
							Открыть выполненые дисциплины
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
