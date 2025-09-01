import Image from 'next/image'
import Link from 'next/link'

import cn from 'classnames'

import { Button } from '@/shared/ui/Button'

import styles from './styles.module.scss'

export const Hero = () => {
	return (
		<section className={styles.index}>
			<div className={cn('container', styles.heroContainer)}>
				<div className={styles.inner}>
					<div className={styles.info}>
						<h1 className={styles.title}>Учимся онлайн в&nbsp;пару кликов</h1>
						<p>Бесплатные вводые уроки на&nbsp;первые 14&nbsp;учебных дней</p>

						<Button asChild variant="secondary" className={styles.heroBtn}>
							<Link href="/dashboard">Записаться</Link>
						</Button>
					</div>
					<div className={styles.image}>
						<Image src="/images/Hero/hero_image.png" alt="Hero image" width={481} height={485} />
					</div>
				</div>
			</div>
		</section>
	)
}
