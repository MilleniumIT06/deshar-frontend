import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Админ панель',
}
export default function AdminSignInLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
