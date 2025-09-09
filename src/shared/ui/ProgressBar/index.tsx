import { useMemo } from 'react'

import cn from 'classnames'

import './styles.scss'

// Интерфейс пропсов компонента ProgressBar
interface ProgressBarProps {
	counter?: boolean // Показывать ли счетчик уроков
	maxLessons: number // Общее количество уроков
	doneLessons: number // Количество завершенных уроков
	processLessons: number // Количество уроков в процессе
	showPercentage?: boolean // Показывать ли процент выполнения
	ariaLabel?: string // ARIA-метка для доступности
	className?: string // Дополнительные CSS-классы
}

export const ProgressBar = ({
	maxLessons = 12,
	doneLessons = 4,
	processLessons = 2,
	counter = false,
	showPercentage = false,
	ariaLabel = 'Прогресс прохождения уроков',
	className,
}: ProgressBarProps) => {
	// Валидация и нормализация входных значений
	const validatedValues = useMemo(() => {
		// Гарантируем, что maxLessons будет не меньше 1
		const max = Math.max(1, maxLessons)
		// Ограничиваем doneLessons в диапазоне [0, max]
		const done = Math.max(0, Math.min(doneLessons, max))
		// Ограничиваем processLessons с учетом оставшихся уроков
		const process = Math.max(0, Math.min(processLessons, max - done))

		return {
			maxLessons: max,
			doneLessons: done,
			processLessons: process,
		}
	}, [maxLessons, doneLessons, processLessons])

	// Деструктуризация валидированных значений
	const { maxLessons: max, doneLessons: done, processLessons: process } = validatedValues

	// Расчет процентов выполнения
	const percentDone = Math.floor((done / max) * 100) // % завершенных уроков
	const percentProcess = Math.floor(((done + process) / max) * 100) // % (завершенные + в процессе)

	// Форматирование процентного значения
	const formatPercentage = (value: number) => `${value}%`

	return (
		<div
			className={cn('ProgressBar', className)} // Основной контейнер
			role="progressbar" // ARIA-роль для индикатора прогресса
			aria-valuenow={done} // Текущее значение
			aria-valuemin={0} // Минимальное значение
			aria-valuemax={max} // Максимальное значение
			aria-label={ariaLabel} // Описание для screen readers
		>
			{/* Блок с текстовой информацией (счетчик/проценты) */}
			{counter && (
				<div className="ProgressBar__info">
					<span className="ProgressBar__done_count">{done}</span>/
					<span className="ProgressBar__max_count">{max}</span>
					{/* Отображение процентов рядом со счетчиком */}
					{showPercentage && (
						<span className="ProgressBar__percentage">{formatPercentage(percentDone)}</span>
					)}
				</div>
			)}

			{/* Визуальное отображение прогресса */}
			<div className="ProgressBar__line">
				<div className="ProgressBar__done" style={{ width: `${percentDone}%` }} aria-hidden="true" />

				<div className="ProgressBar__process" style={{ width: `${percentProcess}%` }} aria-hidden="true" />
			</div>

			{/* Альтернативное отображение процентов под прогресс-баром */}
			{!counter && showPercentage && (
				<div className="ProgressBar__info_bottom">
					<span>{formatPercentage(percentDone)} завершено</span>
				</div>
			)}
		</div>
	)
}
