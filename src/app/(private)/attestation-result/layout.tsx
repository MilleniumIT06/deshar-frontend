import { Breadcrumbs } from '@/shared/ui/Breadcrumbs'

import styles from './../styles.module.scss'

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
		<div className={styles.mainWrapper}>
			<div className="container">
				<Breadcrumbs
					items={[
						{ label: 'Главная', href: '/' },
						{ label: 'Все дисциплины', href: '/courses' },
						{ label: 'Английский язык', href: '/' },
						{ label: 'Морфемика', href: '/' },
					]}
				/>
				<div className={styles.wrapper}>
					<h1 className={styles.title}>Морфемика</h1>

					<div className={styles.attestationResult__inner}>{children}</div>
				</div>
			</div>
		</div>
	)
}
