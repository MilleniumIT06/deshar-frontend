import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'

import '../styles.scss'

import type { Metadata } from 'next'

import '../../globals.scss'

export const metadata: Metadata = {
	title: 'Profile',
	description: 'Profile',
}

export default function AttestationResultLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="mainWrapper mRelative">
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

					<div className="attestationResult__inner">{children}</div>
				</div>
			</div>
		</div>
	)
}
