import cn from 'classnames'

import { courses } from '@/mocks/data'

import { SubjectCard } from '../SubjectCard'

import styles from './styles.module.scss'

export const OtherSubjects = () => {
	return (
		<section className={styles.otherSubjects}>
			<div className="container">
				<div className={styles.otherSubjects__inner}>
					<h2 className="section__title">Другие дисциплины</h2>
					<div className={styles.otherSubjects__top}>
						<ul className={cn('list-reset', styles.otherSubjects__list, styles.subjectsList)}>
							{courses.map(course => (
								<SubjectCard
									key={course.id}
									className={styles.otherSubjectsItem}
									type="short"
									title={course.title}
									description={course.description}
									modulesCount={course.moduleCount}
									imageUrl="subjectcardskeleton"
								/>
							))}
							<SubjectCard
								className={styles.otherSubjectsItem}
								type="short"
								title="Полный каталог дисциплин"
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
