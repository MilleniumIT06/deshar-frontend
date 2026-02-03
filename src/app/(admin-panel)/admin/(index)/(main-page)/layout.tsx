export default function AdminStatisticsLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className="StatisticLayout">
			<div className="StatisticLayout__inner">
				<div className="StatisticLayout__head">
					<h1 className="StatisticLayout__title">Общая статистика</h1>
					{/* <Selector className="StatisticLayout__selector" options={options} onChange={handleSelectChange} /> */}
				</div>
				<div className="StatisticLayout__content">{children}</div>
			</div>
		</main>
	)
}
