import cn from 'classnames'
import { motion } from 'motion/react'

import './styles.scss'

interface TabsProps {
	tabs: { id: number; name: string }[]
	activeTab: number
	handleTab: (id: number) => void
	maxWidth?: boolean
}

export const Tabs = ({ tabs, activeTab, handleTab, maxWidth }: TabsProps) => {
	return (
		<div className={cn('Tabs', maxWidth && 'maxWidth')} role="tablist" aria-label="Навигация по разделам">
			{tabs.map(tab => (
				<button
					key={tab.id}
					className={cn('tab', tab.id === activeTab && 'active')}
					onClick={() => handleTab(tab.id)}
					role="tab"
					aria-selected={tab.id === activeTab}
					aria-controls={`tabpanel-${tab.id}`}
					tabIndex={tab.id === activeTab ? -1 : 0}
					style={{ position: 'relative' }} // Важно для позиционирования плашки
				>
					<span style={{ position: 'relative', zIndex: 2 }}>{tab.name}</span>

					{tab.id === activeTab && (
						<motion.div
							layoutId="active-pill"
							className="active-indicator"
							transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
							style={{
								position: 'absolute',
								inset: 0,
								zIndex: 1,
								backgroundColor: 'var(--neutral-darkest)', // Используем твою переменную
								borderRadius: '28px', // Совпадает с радиусом родителя
							}}
						/>
					)}
				</button>
			))}
		</div>
	)
}
