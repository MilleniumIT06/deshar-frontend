import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'

import './../../styles.scss'

export default async function OneCourse() {
	return (
		<main>
			<div className="inner">
				<div className="container">
					<Breadcrumbs items={[{ label: 'test', href: 'test' }]} />
				</div>
			</div>
		</main>
	)
}
