import { Logo } from '@/shared/ui/Logo'

import styles from './styles.module.scss'

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Logo className={styles.Logo} size="large" />
			{children}
		</>
	)
}
