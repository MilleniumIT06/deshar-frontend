import Link from 'next/link'

import cn from 'classnames'
import { ChevronRight } from 'lucide-react'

import './styles.scss'

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
		<nav className={cn('Breadcrumbs__container', className)} aria-label="Хлебные крошки">
			<ol className={cn('list-reset', 'Breadcrumbs__list')}>
				{items.map((item, index) => {
					const isLast = index === items.length - 1

					return (
						<li
							key={index}
							className={cn('Breadcrumbs__item', {
								current: isLast,
							})}
							aria-current={isLast ? 'page' : undefined}>
							{item.href && !isLast ? (
								<Link href={item.href} className="Breadcrumbs__link">
									{item.label}
								</Link>
							) : (
								<span className="Breadcrumbs__text">{item.label}</span>
							)}

							{!isLast && <span className="Breadcrumbs__separator">{separator}</span>}
						</li>
					)
				})}
			</ol>
		</nav>
	)
}
