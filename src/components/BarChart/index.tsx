'use client'
import { useState, useEffect } from 'react'

import { Stage, Layer, Rect, Text, Group, Label, Tag } from 'react-konva'

import { barChartMockData } from '@/mocks/data'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'

export const BarChart = () => {
	const [size, setSize] = useState({ width: 1152, height: 225 })
	const [displayedData, setDisplayedData] = useState(barChartMockData)
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
	const isSmallMobile = useMediaQuery('(max-width: 450px)')
	const isMobile = useMediaQuery('(max-width: 567px)')
	const isTablet = useMediaQuery('(max-width: 768px)')

	// Динамические значения для разных устройств
	const padding = 40
	const barGap = isMobile ? 15 : isTablet ? 13 : 22
	const barWidth = isMobile ? 50 : isTablet ? 57 : 66
	const barViewSize = barWidth - barGap
	const maxValue = 200

	useEffect(() => {
		if (isSmallMobile) {
			setDisplayedData(barChartMockData.slice(0, 6))
			setSize({ width: 350, height: 225 })
		} else if (isMobile) {
			setDisplayedData(barChartMockData.slice(0, 6))
			setSize({ width: 500, height: 225 })
		} else if (isTablet) {
			setDisplayedData(barChartMockData.slice(0, 11))
			setSize({ width: 700, height: 225 })
		} else {
			setDisplayedData(barChartMockData.slice(0, 17))
		}
	}, [isTablet, isMobile, isSmallMobile])

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
			// const TooltipX = isMobile ? x + barGap + 5 : isTablet ? x + barGap + 10 : x + barGap + 2;
			const TooltipX = x + barWidth / barGap + padding / 2
			const barHeight =
				item.value > maxValue
					? size.height - padding * 2
					: (item.value / maxValue) * (size.height - padding * 2)
			const y = size.height - padding - barHeight
			const dateStr = `${item.date.getDate()} ${item.date.toLocaleString('default', { month: 'short' })}`
			const isHovered = hoveredIndex === index

			return (
				<Group key={`bar-${index}`}>
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

	// const renderTooltips = () => {
	// 	if (hoveredIndex === null) return null

	// 	const item = displayedData[hoveredIndex]
	// 	const x = padding + hoveredIndex * barWidth + barGap + (isMobile ? 4 : 8)
	// 	const barHeight =
	// 		item.value > maxValue ? size.height - padding * 2 : (item.value / maxValue) * (size.height - padding * 2)
	// 	const y = size.height - padding - barHeight

	// 	return (
	// 		<Label x={x} y={y} key="tooltip">
	// 			<Tag
	// 				fill="black"
	// 				pointerDirection="down"
	// 				pointerWidth={10}
	// 				pointerHeight={10}
	// 				lineJoin="round"
	// 				cornerRadius={5}
	// 			/>
	// 			<Text text={`${item.value} баллов`} fontFamily="Arial" fontSize={14} padding={5} fill="white" />
	// 		</Label>
	// 	)
	// }

	return (
		<Stage width={size.width} height={size.height}>
			<Layer>
				{renderYAxis()}
				{renderBars()}
				{/* {renderTooltips()} */}
			</Layer>
		</Stage>
	)
}
