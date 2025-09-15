import cn from 'classnames'

import { courses } from '@/mocks/data'

import { SubjectCard } from '../SubjectCard'

import './styles.scss'

export const OtherSubjects = () => {
	return (
		<section className="OtherSubjects">
			<div className="container">
				<div className="OtherSubjects__inner">
					<h2 className="section__title">Другие дисциплины</h2>
					<div className="OtherSubjects__top">
						<ul className={cn('list-reset', 'OtherSubjects__list', 'subjectsList')}>
							{courses.map(course => (
								<SubjectCard
									key={course.id}
									className="otherSubjectsItem"
									type="short"
									title={course.title}
									description={course.description}
									modulesCount={course.moduleCount}
									imageUrl="subjectcardskeleton"
								/>
							))}
							<SubjectCard
								className="otherSubjectsItem"
								type="short"
								title="Все дисциплины"
								modulesCount={26}
								imageUrl="subjectcardskeleton"
								fullCatalog={true}
							/>
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
