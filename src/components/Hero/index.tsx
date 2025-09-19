import Image from 'next/image'
import Link from 'next/link'

import cn from 'classnames'

import { Button } from '@/shared/ui/Button'

import './styles.scss'

export const Hero = () => {
	return (
		<section className="Hero">
			<div className={cn('container', 'Hero__container')}>
				<div className="Hero__inner">
					<div className="Hero__info">
						<h1 className="Hero__title">Учимся&nbsp;онлайн в пару кликов</h1>
						<p>Бесплатные вводые уроки на&nbsp;первые 14&nbsp;учебных дней</p>

						<Button asChild variant="secondary" className="Hero__btn">
							<Link href="/dashboard">Записаться</Link>
						</Button>
					</div>
					<div className="Hero__image">
						<Image src="/images/Hero/hero_image.png" alt="Hero image" width={481} height={485} />
					</div>
				</div>
			</div>
		</section>
	)
}
