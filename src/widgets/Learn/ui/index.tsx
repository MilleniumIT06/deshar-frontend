import cn from 'classnames'

import './styles.scss'
import { SubjectCard } from '@/entities/subject-card'

import { courses } from '../model/mock'

export const Learn = () => {
	return (
		<section className="Learn">
			<div className="container">
				<div className="Learn__inner">
					<h2 className="section__title">Учим шаг за&nbsp;шагом</h2>
					<div className="Learn__items">
						<ul className={cn('list-reset', 'Learn__list')}>
							{courses.map(course => (
								<SubjectCard
									id={course.id}
									key={course.id}
									className="Learn__item"
									type="short"
									title={course.title}
									description={course.description}
									modulesCount={course.moduleCount}
									imageUrl="subjectcardskeleton"
								/>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
