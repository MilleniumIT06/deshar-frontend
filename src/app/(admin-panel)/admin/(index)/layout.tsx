import { DashboardMenu } from '@/components/Admin/Dashboard/DashboardMenu'

import type { Metadata } from 'next'

import './layout.scss'

export const metadata: Metadata = {
	title: 'Админ панель',
}
export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<div className="AdminLayout">
					<div className="AdminLayout__container">
						<div className="AdminLayout__DashboardWrapper">
							<DashboardMenu />
						</div>
						{children}
					</div>
				</div>
			</body>
		</html>
	)
}
