import Link from 'next/link'

import cn from 'classnames'

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
const SeparatorIcon = () => (
	<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M0.530273 0.530273L6.53027 6.53027L0.530273 12.5303" stroke="#7D7979" strokeWidth="1.5" />
	</svg>
)
export const Breadcrumbs = ({ items, separator = <SeparatorIcon />, className }: BreadcrumbsProps) => {
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
