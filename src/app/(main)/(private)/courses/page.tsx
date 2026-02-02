import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import { AllCourses } from '@/widgets/AllCourses'

import '../styles.scss'

export default function AllCoursesPage() {
	return (
		<main className="mRelative">
			<div className="inner">
				<div className="container">
					<Breadcrumbs
						items={[
							{ label: 'Главная', href: '/' },
							{ label: 'Все дисциплины', href: '/courses' },
						]}
					/>
				</div>
			</div>
			<AllCourses />
		</main>
	)
}
