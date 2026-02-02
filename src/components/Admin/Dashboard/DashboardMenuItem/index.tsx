'use client'

import './styles.scss'
import type { ReactNode } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Badge } from '@/shared/ui/Admin/Badge'

const DefaultIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect x="2.75" y="2.75" width="5.5" height="5.5" rx="2.25" strokeWidth="1.5" />
		<rect x="2.75" y="11.75" width="5.5" height="5.5" rx="2.25" strokeWidth="1.5" />
		<rect x="11.75" y="2.75" width="5.5" height="5.5" rx="2.25" strokeWidth="1.5" />
		<rect x="11.75" y="11.75" width="5.5" height="5.5" rx="2.25" strokeWidth="1.5" />
	</svg>
)

export const DashboardMenuItem = ({
	title = 'test',
	href = '#',
	icon,
	count,
}: {
	title: string
	href: string
	icon?: ReactNode
	count?: number
}) => {
	const pathname = usePathname()
	const isActive = pathname === href

	return (
		<Link href={href} className={`DashboardMenuItem ${isActive ? 'active' : ''}`}>
			<div className="DashboardMenuItem__left">
				{icon || <DefaultIcon />}
				<span>{title}</span>
			</div>
			{count !== undefined && count > 0 && <Badge>{count}</Badge>}
		</Link>
	)
}
