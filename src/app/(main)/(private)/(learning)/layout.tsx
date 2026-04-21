import { LearningSidebar } from '@/components/LearningSidebar'
import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'

import '../styles.scss'

import type { Metadata } from 'next'

import '../../../globals.scss'
// import { TrainersEngine } from '@/features/trainers-engine'

export const metadata: Metadata = {
	title: 'Learning',
	description: 'Learning',
}

export default function LearningLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className="mainWrapper mRelative">
			<div className="container">
				<Breadcrumbs
					items={[
						{ label: 'Главная', href: '/' },
						{ label: 'Все дисциплины', href: '/courses' },
						{ label: 'Английский язык', href: '/' },
						{ label: 'Морфемика', href: '/' },
					]}
				/>
				<div className="wrapper">
					<h1 className="title">Морфемика</h1>

					<div className="mainInner LearningLayout__mainInner">
						<LearningSidebar className="LearningSidebarMain" />
						{children}
					</div>
				</div>
			</div>
			{/* <TrainersEngine /> */}
		</main>
	)
}
