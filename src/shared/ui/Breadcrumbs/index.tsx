import cn from 'classnames'
import styles from './styles.module.scss'
import Link from 'next/link'

export const Breadcrumbs = () => {
	return (
		<ul className={cn('list-reset', styles.Breadcrumbs)}>
			<li className={styles.BreadcrumbsItem}>
				<Link href="/">TEst</Link>
			</li>
			<li className={styles.BreadcrumbsItem}>
				<Link href="/">TEst</Link>
			</li>
			<li className={styles.BreadcrumbsItem}>
				<Link href="/">TEst</Link>
			</li>
		</ul>
	)
}
