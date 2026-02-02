import { CompletedCourses } from '@/components/CompletedCourses'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'

import '../styles.scss'

export default function Completed() {
	return (
		<main className="mRelative">
			<div className="container">
				<div className="inner">
					<Breadcrumbs
						items={[
							{ label: 'Главная', href: '/' },
							{ label: 'Выполненные дисциплины', href: '/completed-courses' },
						]}
					/>
					<CompletedCourses />
				</div>
			</div>
		</main>
	)
}
