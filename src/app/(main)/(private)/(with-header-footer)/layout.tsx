import dynamic from 'next/dynamic'

import { Header } from '@/widgets'

const Footer = dynamic(() => import('@/widgets').then(mod => mod.Footer), {
	loading: () => <div>Загрузка...</div>,
})
export default function WithHeaderFooterLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
