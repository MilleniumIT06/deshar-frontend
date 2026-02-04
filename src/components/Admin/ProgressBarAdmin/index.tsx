import './styles.scss'

interface ProgressBarAdminProps {
	maxLessons: number
	doneLessons: number
	processLessons: number
}
export const ProgressBarAdmin = ({ doneLessons = 4, maxLessons = 10, processLessons = 2 }: ProgressBarAdminProps) => {
	// Гарантируем, что maxLessons будет не меньше 1
	const max = Math.max(1, maxLessons)
	// Ограничиваем doneLessons в диапазоне [0, max]
	const done = Math.max(0, Math.min(doneLessons, max))
	// Ограничиваем processLessons с учетом оставшихся уроков
	const process = Math.max(0, Math.min(processLessons, max - done))
	const percentDone = Math.floor((done / max) * 100) // % завершенных уроков
	const percentProcess = Math.floor(((done + process) / max) * 100) // % (завершенные + в процессе)

	return (
		<div className="ProgressBarAdmin">
			<div className="ProgressBarAdmin__counter">
				<span>{doneLessons}</span>
				<span>/</span>
				<span>{maxLessons}</span>
			</div>
			<div className="ProgressBarAdmin__bar">
				<div className="ProgressBarAdmin__done" style={{ width: `${percentDone}%` }} aria-hidden="true" />

				<div
					className="ProgressBarAdmin__process"
					style={{ width: `${percentProcess}%` }}
					aria-hidden="true"
				/>
			</div>
		</div>
	)
}
