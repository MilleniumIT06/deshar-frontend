'use client'
import { useRef, useEffect, useState } from 'react'

import cn from 'classnames'

import './styles.scss'
import { Button } from '../../Button'

interface TabsProps {
	tabs: { id: number; title: string }[]
	activeTab: number
	handleTab: (id: number) => void
	maxWidth?: boolean
}

export const Tabs = ({ tabs, activeTab, handleTab, maxWidth }: TabsProps) => {
	const tabsContainerRef = useRef<HTMLDivElement>(null)
	const [canScrollLeft, setCanScrollLeft] = useState(false)
	const [canScrollRight, setCanScrollRight] = useState(false)

	const checkScrollAvailability = () => {
		const container = tabsContainerRef.current
		if (container) {
			const { scrollLeft, scrollWidth, clientWidth } = container
			setCanScrollLeft(scrollLeft > 0)
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
		}
	}

	const scroll = (direction: 'left' | 'right') => {
		const container = tabsContainerRef.current
		if (container) {
			const scrollAmount = 200
			const newScrollLeft =
				direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount

			container.scrollTo({
				left: newScrollLeft,
				behavior: 'smooth',
			})
		}
	}

	useEffect(() => {
		checkScrollAvailability()
		const container = tabsContainerRef.current
		container?.addEventListener('scroll', checkScrollAvailability)

		const resizeObserver = new ResizeObserver(checkScrollAvailability)
		if (container) resizeObserver.observe(container)

		return () => {
			container?.removeEventListener('scroll', checkScrollAvailability)
			resizeObserver.disconnect()
		}
	}, [tabs])

	return (
		<div className={cn('Tabs', maxWidth && 'maxWidth')}>
			{canScrollLeft && (
				<Button
					variant="iconSecondary"
					size="iconSmall"
					onClick={() => scroll('left')}
					className="Tabs__scroll_left">
					<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.53125 0.53125L6.53125 6.53125L0.53125 12.5313"
							stroke="#303030"
							stroke-width="1.5"
						/>
					</svg>
				</Button>
			)}

			<div className="tabs-container" ref={tabsContainerRef} role="tablist" aria-label="Навигация по разделам">
				{tabs.map(tab => (
					<button
						key={tab.id}
						className={cn('tab', tab.id === activeTab && 'active')}
						onClick={() => handleTab(tab.id)}
						role="tab"
						aria-selected={tab.id === activeTab}
						aria-controls={`tabpanel-${tab.id}`}
						tabIndex={tab.id === activeTab ? -1 : 0}>
						<span>{tab.title}</span>
					</button>
				))}
			</div>

			{canScrollRight && (
				<Button
					variant="iconSecondary"
					size="iconSmall"
					onClick={() => scroll('right')}
					className="Tabs__scroll_right">
					<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M0.53125 0.53125L6.53125 6.53125L0.53125 12.5313"
							stroke="#303030"
							stroke-width="1.5"
						/>
					</svg>
				</Button>
			)}
		</div>
	)
}
