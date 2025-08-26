import Link from 'next/link'

import cn from 'classnames'

import { ProgressBar } from '@/shared/ui/ProgressBar'

import { AttestationBar } from '../AttestationBar'

import styles from './styles.module.scss'

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
		<div className={cn(styles.ModuleCard, doneLessons === maxLessons && styles.ModuleCard__done)}>
			<div className={styles.ModuleCard__inner}>
				<div className={styles.ModuleCard__top}>
					<div className={styles.ModuleCard__header}>
						<span className={styles.ModuleCard__suptitle}>Модуль {number}</span>
					</div>
					<div className={styles.ModuleCard__body}>
						<Link href={`/learning/${id}`}>
							<h6 className={styles.ModuleCard__title}>{title}</h6>
						</Link>
					</div>
				</div>
				<div className={styles.ModuleCard__footer}>
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
