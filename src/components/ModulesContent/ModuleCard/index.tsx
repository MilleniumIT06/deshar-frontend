import Link from 'next/link'

import cn from 'classnames'

import { ProgressBar } from '@/shared/ui/ProgressBar'

import { AttestationBar } from '../AttestationBar'

import './styles.scss'

export const ModuleCard = ({
	doneLessons,
	maxLessons,
	number,
	processLessons,
	title,
	id,
}: {
	id: number | string
	number: number
	title: string
	maxLessons: number
	doneLessons: number
	processLessons: number
}) => {
	return (
		<div className={cn('ModuleCard', doneLessons === maxLessons && 'ModuleCard__done')}>
			<div className="ModuleCard__inner">
				<div className="ModuleCard__top">
					<div className="ModuleCard__header">
						<span className="ModuleCard__suptitle">Модуль {number}</span>
					</div>
					<div className="ModuleCard__body">
						<Link href={`/learning/${id}`}>
							<h6 className="ModuleCard__title">{title}</h6>
						</Link>
					</div>
				</div>
				<div className="ModuleCard__footer">
					<ProgressBar
						maxLessons={maxLessons}
						doneLessons={doneLessons}
						processLessons={processLessons}
						counter
					/>
					<AttestationBar points={100} status="checked" />
				</div>
			</div>
		</div>
	)
}
