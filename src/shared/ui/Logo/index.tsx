import Image from 'next/image'
import Link from 'next/link'

import cn from 'classnames'

import styles from './styles.module.scss'

type LogoSize = 'small' | 'large' | 'responsive'

interface LogoProps {
	size?: LogoSize
	className?: string
	href?: string
	priority?: boolean
}

const SIZE_MAP: Record<LogoSize, { width: number; height: number }> = {
	small: { width: 134, height: 20 },
	large: { width: 188, height: 38 },
	responsive: { width: 188, height: 38 },
}

export const Logo = ({ size = 'small', className, href = '/', priority = false }: LogoProps) => {
	const dimensions = SIZE_MAP[size]

	return (
		<div className={cn(styles.logoContainer, styles[size], className)}>
			<Link href={href} className={styles.logoLink} aria-label="Перейти на главную страницу" tabIndex={1}>
				<div
					className={cn(styles.imageWrapper, {
						[styles.responsive]: size === 'responsive',
					})}>
					<Image
						src="/logo.svg"
						alt="Логотип компании"
						{...dimensions}
						priority={priority}
						className={styles.logoImage}
						sizes={size === 'responsive' ? '(max-width: 768px) 50vw, 100vw' : `${dimensions.width}px`}
					/>
				</div>
			</Link>
		</div>
	)
}
