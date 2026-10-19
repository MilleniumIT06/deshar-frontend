import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'
import '../../../../styles.scss'
import { ModulesContent } from '@/widgets/ModulesContent'

export default async function Modules() {
	return (
		<main className="mRelative">
			<div className="inner">
				<div className="container">
					<Breadcrumbs
						items={[
							{ label: 'Главная', href: '/' },
							{ label: 'Все дисциплины', href: '/courses' },
							{ label: 'Английский язык', href: '/' },
						]}
					/>
				</div>
				<ModulesContent />
			</div>
		</main>
	)
}
