'use client'
import { useState, useEffect } from 'react'

import { Stage, Layer, Rect, Text, Group, Label, Tag } from 'react-konva'

import { useAppSelector } from '@/app/_store/hooks'
import { type barChartMockData } from '@/mocks/data'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'

export const BarChart = ({ data }: { data: typeof barChartMockData }) => {
	const currentPage = useAppSelector(state => state.barCharReducer.currentPage)
	const [size, setSize] = useState({ width: 1152, height: 225 })
	const [allData] = useState(data) // Все данные
	const [displayedData, setDisplayedData] = useState<typeof barChartMockData>([])
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
	const [touchTimeout, setTouchTimeout] = useState<NodeJS.Timeout | null>(null)

	const isSmallMobile = useMediaQuery('(max-width: 450px)')
	const isMobile = useMediaQuery('(max-width: 567px)')
	const isTablet = useMediaQuery('(max-width: 768px)')

	// Динамические значения для разных устройств
	const padding = 40
	const barGap = isMobile ? 15 : isTablet ? 13 : 22
	const barWidth = isMobile ? 50 : isTablet ? 57 : 66
	const barViewSize = barWidth - barGap
	const maxValue = 200

	// Количество элементов на странице в зависимости от устройства
	const getItemsPerPage = () => {
		if (isSmallMobile) return 6
		if (isMobile) return 6
		if (isTablet) return 11
		return 17
	}

	// Общее количество страниц
	const itemsPerPage = getItemsPerPage()

	// Обновление отображаемых данных при изменении страницы или размера экрана
	useEffect(() => {
		const startIndex = currentPage * itemsPerPage
		const endIndex = startIndex + itemsPerPage
		setDisplayedData(allData.slice(startIndex, endIndex))

		// Установка размера в зависимости от устройства
		if (isSmallMobile) {
			setSize({ width: 350, height: 225 })
		} else if (isMobile) {
			setSize({ width: 500, height: 225 })
		} else if (isTablet) {
			setSize({ width: 700, height: 225 })
		} else {
			setSize({ width: 1152, height: 225 })
		}
	}, [isTablet, isMobile, isSmallMobile, currentPage, itemsPerPage, allData])

	useEffect(() => {
		return () => {
			if (touchTimeout) {
				clearTimeout(touchTimeout)
			}
		}
	}, [touchTimeout])

	const handleTouchStart = (index: number) => {
		setHoveredIndex(index)

		if (touchTimeout) {
			clearTimeout(touchTimeout)
		}

		const timeout = setTimeout(() => {
			setHoveredIndex(null)
		}, 3000)

		setTouchTimeout(timeout)
	}

	const handleTouchEnd = () => {
		// Не скрываем сразу, ждем таймер или повторное касание
	}

	const renderYAxis = () => {
		const labels = []

		for (let i = 50; i <= maxValue; i += 50) {
			const y = padding + ((maxValue - i) / maxValue) * (size.height - padding * 2)

			labels.push(
				<Text
					key={`y-label-${i}`}
					x={padding - 40}
					fill="#7d7979"
					y={y}
					text={String(i)}
					fontSize={14}
					fontFamily="Arial"
					lineHeight={0.143}
					width={30}
					align="right"
					verticalAlign="bottom"
				/>,
			)
		}

		return labels
	}

	const renderBars = () =>
		displayedData.map((item, index) => {
			const x = isMobile ? padding + index * barWidth + 3 : padding + index * barWidth + 7
			const TooltipX = x + barWidth / barGap + padding / 2
			const barHeight =
				item.value > maxValue
					? size.height - padding * 2
					: (item.value / maxValue) * (size.height - padding * 2)
			const y = size.height - padding - barHeight
			const dateStr = `${item.date.getDate()} ${item.date.toLocaleString('default', { month: 'short' })}`
			const isHovered = hoveredIndex === index

			return (
				<Group key={`bar-${currentPage}-${index}`}>
					{isHovered && (
						<Label x={TooltipX} y={y} key="tooltip">
							<Tag
								fill="black"
								pointerDirection="down"
								pointerWidth={10}
								pointerHeight={10}
								lineJoin="round"
								cornerRadius={5}
							/>
							<Text
								text={`${item.value} баллов`}
								fontFamily="Arial"
								fontSize={14}
								padding={5}
								fill="white"
							/>
						</Label>
					)}
					<Rect
						x={x}
						y={y}
						width={barViewSize}
						height={barHeight}
						fill={isHovered ? '#0f8a5e' : '#1baa7d'}
						cornerRadius={[12, 12, 12, 12]}
						onMouseEnter={() => setHoveredIndex(index)}
						onMouseLeave={() => setHoveredIndex(null)}
						onTouchStart={() => handleTouchStart(index)}
						onTouchEnd={handleTouchEnd}
						onTap={() => handleTouchStart(index)}
					/>
					{/* Подпись даты */}
					<Text
						x={x}
						align="center"
						y={y + barHeight + 15}
						text={dateStr}
						fontSize={14}
						fontFamily="Arial"
						lineHeight={0.143}
						fill="#7d7979"
					/>
				</Group>
			)
		})

	return (
		<Stage width={size.width} height={size.height}>
			<Layer>
				{renderYAxis()}
				{renderBars()}
			</Layer>
		</Stage>
	)
}
