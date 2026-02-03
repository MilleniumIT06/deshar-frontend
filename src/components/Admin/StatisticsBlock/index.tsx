import { Pie, PieChart, Tooltip, Label, Legend, Cell, type TooltipContentProps } from 'recharts'

import './styles.scss'
import { Selector } from '@/shared/ui/Selector'

import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent'

export interface PieDataItem {
	value: number
	fill: string
	name: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

interface StatisticsBlockProps {
	data: PieDataItem[]
	centerLabel?: string
}

// Simple SVG mark component
export const LegendMarkItem = ({ color }: { color: string | undefined }) => {
	return (
		<svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="15" height="8" rx="4" fill={color} />
		</svg>
	)
}

// Selector options
const selectorOptions = [
	{ id: '1', label: 'Неделя' },
	{ id: '2', label: 'Месяц' },
	{ id: '3', label: 'Год' },
]

const CustomLeg = ({ data }: { data: PieDataItem[] }) => {
	return (
		<div className="custom-legend">
			{data.map((entry, index) => (
				<div key={index} className="legend-item">
					<LegendMarkItem color={entry.fill} />
					<span style={{ marginLeft: '8px', fontSize: '12px' }}>{entry.name}</span>
				</div>
			))}
		</div>
	)
}
const CustomTooltip = ({ data }: { data: TooltipContentProps<ValueType, NameType> }) => {
	if (data && data.payload && data.payload[0] && data.payload[0].name && data.payload[0].value) {
		return (
			<div className="custom-tooltip">
				{/* <p className="label">{`${data.payload[0].name} : ${data.payload[0].value} `}</p> */}
				<span className="custom-tooltip__label">{data.payload[0].name}</span>
				<span className="custom-tooltip__value">{`${data.payload[0].value} баллов`}</span>
			</div>
		)
	}

	return null
}

export const StatisticsBlock = ({ data, centerLabel = 'баллов' }: StatisticsBlockProps) => {
	const reducedValue = data.reduce((acc, curr) => acc + Number(curr.value), 0)
	return (
		<div className="StatisticsBlock">
			<div className="StatisticsBlock__inner">
				<div className="StatisticsBlock__header">
					<h3 className="StatisticsBlock__title">Лучшая успеваемость</h3>
					<Selector
						className="StatisticsBlock__selector"
						options={selectorOptions}
						defaultValue="Неделя"
						mini={true}
					/>
				</div>
				<div className="StatisticsBlock__body">
					<PieChart
						style={{
							width: '100%',
							height: '212px',
							aspectRatio: 1,
						}}
						responsive>
						<Pie
							width="252px"
							height="252px"
							data={data}
							innerRadius="60%"
							outerRadius="100%"
							cornerRadius="20%"
							fill="#8884d8"
							paddingAngle={5}
							dataKey="value"
							isAnimationActive={false}>
							{data.map((entry, index) => (
								<Cell
									key={`cell - ${index} `}
									fill={entry.fill}
									style={{
										cursor: 'pointer',
										transition: 'all 0.3s',
									}}
								/>
							))}
						</Pie>

						{/* Custom positioned tooltips for each segment */}
						<Legend
							content={<CustomLeg data={data} />}
							align="right"
							layout="vertical"
							verticalAlign="middle"
						/>
						{/* <Tooltip content={(data) => {
                            console.log(data.payload);
                            return <CustomTooltip data={data} />
                        }
                        }
                        /> */}
						<Tooltip
							isAnimationActive={false}
							content={data => {
								return <CustomTooltip data={data} />
							}}
						/>
						{/* if (data && data.payload) { 

                                return <CustomTooltip name={data.payload[0].name} value={data.payload[0].value} />
                             } */}
						<Label
							position="center"
							fill="#000"
							style={{ transform: 'translateY(-5px)', fontSize: 24, fontWeight: 700 }}>
							{reducedValue}
						</Label>
						<Label
							position="center"
							fill="#666"
							style={{ transform: 'translateY(15px)', fontSize: 12, fontWeight: 400 }}>
							{centerLabel}
						</Label>
					</PieChart>
				</div>
			</div>
		</div>
	)
}
