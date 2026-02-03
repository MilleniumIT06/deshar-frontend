import { StatisticsLayoutContent } from './StatisticsLayoutContent'

export default function AdminStatisticsLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <StatisticsLayoutContent>{children}</StatisticsLayoutContent>
}
