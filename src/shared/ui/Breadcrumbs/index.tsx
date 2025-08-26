import Link from 'next/link'

import cn from 'classnames'
import { ChevronRight } from 'lucide-react'

import styles from './styles.module.scss'

export interface BreadcrumbItem {
	label: string
	href?: string
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[]
	separator?: React.ReactNode
	className?: string
}

export const Breadcrumbs = ({ items, separator = <ChevronRight size={20} />, className }: BreadcrumbsProps) => {
	if (!items || items.length === 0) return null

	return (
		<nav className={cn(styles.BreadcrumbsContainer, className)} aria-label="Хлебные крошки">
			<ol className={cn('list-reset', styles.BreadcrumbsList)}>
				{items.map((item, index) => {
					const isLast = index === items.length - 1

					return (
						<li
							key={index}
							className={cn(styles.BreadcrumbsItem, {
								[styles.current]: isLast,
							})}
							aria-current={isLast ? 'page' : undefined}>
							{item.href && !isLast ? (
								<Link href={item.href} className={styles.BreadcrumbsLink}>
									{item.label}
								</Link>
							) : (
								<span className={styles.BreadcrumbsText}>{item.label}</span>
							)}

							{!isLast && <span className={styles.BreadcrumbsSeparator}>{separator}</span>}
						</li>
					)
				})}
			</ol>
		</nav>
	)
}
