import cn from 'classnames'

import { courses } from '@/mocks/data'

import { SubjectCard } from '../SubjectCard'

import styles from './styles.module.scss'

export const Learn = () => {
	return (
		<section className={styles.index}>
			<div className="container">
				<div className={styles.inner}>
					<h2 className="section__title">Учим шаг за&nbsp;шагом</h2>
					<div className={styles.items}>
						<ul className={cn('list-reset', styles.learnList)}>
							{courses.map(course => (
								<SubjectCard
									id={course.id}
									key={course.id}
									className={styles.learnItem}
									type="short"
									title={course.title}
									description={course.description}
									modulesCount={course.moduleCount}
									imageUrl="subjectcardskeleton"
								/>
							))}
							<SubjectCard
								className={styles.learnItem}
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
