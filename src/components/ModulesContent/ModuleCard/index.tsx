import cn from 'classnames'
import Link from 'next/link'

import { ProgressBar } from '@/shared/ui/ProgressBar'

import { AttestationBar } from '../AttestationBar'

import './styles.scss'

interface ModuleCardProps {
	id: number | string
	number: number
	title: string
	maxLessons: number
	doneLessons: number
	processLessons: number
	linkHref?: string
	name?: string
	isDisabled?: boolean
	progressPercentage: number
	status: string
	isFullCardClickable?: boolean
	fon: string | null
}

export const ModuleCard = ({
	doneLessons,
	maxLessons,
	number,
	processLessons,
	title,
	id,
	linkHref = '/learning',
	name = 'Модуль',
	isDisabled = false,
	progressPercentage,
	status,
	isFullCardClickable = false,
	fon,
}: ModuleCardProps) => {
	const getStatus = () => {
		if (progressPercentage === 100) return 'completed'
		if (progressPercentage === 0) return 'not_started'
		if (progressPercentage > 0) return 'in_progress'
		return 'error'
	}
	console.log(status)
	const targetUrl = `${linkHref}/${id}`

	const CardContent = (
		<div className="ModuleCard__inner">
			<div className="ModuleCard__top">
				<div className="ModuleCard__header">
					<span className="ModuleCard__suptitle">
						{name} {number}
					</span>
				</div>
				<div className="ModuleCard__body">
					{isDisabled || isFullCardClickable ? (
						<h6 className="ModuleCard__title">{title}</h6>
					) : (
						<Link href={targetUrl}>
							<h6 className="ModuleCard__title">{title}</h6>
						</Link>
					)}
				</div>
			</div>
			<div className="ModuleCard__footer">
				<ProgressBar maxLessons={maxLessons} doneLessons={doneLessons} processLessons={processLessons} counter />
				<AttestationBar percentage={progressPercentage} status={getStatus()} />
			</div>
		</div>
	)

	if (isFullCardClickable && !isDisabled) {
		return (
			<Link
				href={targetUrl}
				className={cn('ModuleCard', 'ModuleCard--clickable')}
				style={{ backgroundImage: `url(http://localhost:8000${fon})` }}>
				{CardContent}
			</Link>
		)
	}

	return (
		<div className={cn('ModuleCard')} style={{ backgroundImage: `url(http://localhost:8000${fon})` }}>
			{CardContent}
		</div>
	)
}
