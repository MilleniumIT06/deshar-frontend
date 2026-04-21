import './styles.scss'

interface ProgressBarProps {
	current: number
	total: number
	label?: string
}
export const ProgressBar = ({ current, total, label = 'Прогресс' }: ProgressBarProps) => {
	const progressPercentage = Math.min(Math.max((current / total) * 100, 0), 100)

	return (
		<div className="engine-progress-bar">
			<div className="engine-progress-bar__info">
				<span>{label}</span>
				<div className="engine-progress-bar__values">
					<span>{current}</span>
					<span>/</span>
					<span>{total}</span>
				</div>
			</div>

			<div className="engine-progress-bar__track">
				<div className="engine-progress-bar__fill" style={{ width: `${progressPercentage}%` }}>
					<div className="engine-progress-bar__inner-glare" />
				</div>
			</div>
		</div>
	)
}
