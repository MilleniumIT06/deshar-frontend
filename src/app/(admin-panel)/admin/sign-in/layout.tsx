import { NO_INDEX_PAGE } from '@/shared/constants/seo.constants'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	...NO_INDEX_PAGE,
	title: 'Админ панель',
}
export default function AdminSignInLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return children
}
