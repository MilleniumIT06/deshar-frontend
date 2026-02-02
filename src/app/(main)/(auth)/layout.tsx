import { Logo } from '@/shared/ui/Logo'

import './styles.scss'

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Logo className="Logo" size="large" />
			{children}
		</>
	)
}
