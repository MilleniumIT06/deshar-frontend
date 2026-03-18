import { useState } from 'react'

import { Button } from '@/shared/ui/Button'

import './styles.scss'
import { BarChart } from './BarChart'

export interface BarChartDataItem {
	name: Date
	value: number
}

const VISIBLE_COUNT = 19
const STEP = 6

export const MainChart = ({ data, title = 'TITLE' }: { data: BarChartDataItem[]; title: string }) => {
	const [startIndex, setStartIndex] = useState(0)

	const handlePrev = () => setStartIndex(prev => Math.max(0, prev - STEP))
	const handleNext = () => setStartIndex(prev => Math.min(data.length - VISIBLE_COUNT, prev + STEP))

	const visibleData = data.slice(startIndex, startIndex + VISIBLE_COUNT)

	return (
		<div className="MainChart">
			<div className="MainChart__top">
				<span className="MainChart__title">{title}</span>
				<div className="MainChart__navigation">
					<Button variant="iconThird" size="iconSmall" onClick={handlePrev} disabled={startIndex === 0}>
						<svg width="9" height="14" viewBox="0 0 9 14" fill="none">
							<path d="M8 1L2 7L8 13" stroke="#303030" strokeWidth="1.5" />
						</svg>
					</Button>
					<Button
						variant="iconThird"
						size="iconSmall"
						onClick={handleNext}
						disabled={startIndex >= data.length - VISIBLE_COUNT}>
						<svg width="9" height="14" viewBox="0 0 9 14" fill="none">
							<path d="M1 13L7 7L1 1" stroke="#303030" strokeWidth="1.5" />
						</svg>
					</Button>
				</div>
			</div>
			<BarChart data={visibleData} />
		</div>
	)
}
