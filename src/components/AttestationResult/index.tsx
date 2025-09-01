import Link from 'next/link'

import { Button } from '@/shared/ui/Button'

import styles from './styles.module.scss'

export const AttestationResult = () => {
	return (
		<section className={styles.index}>
			<div className={styles.index__inner}>
				<div className={styles.index__content}>
					<div className={styles.points}>
						<div className={styles.points__content_wrapper}>
							<div className={styles.points__content}>
								<span className={styles.points__value}>98</span>
								<span className={styles.points__subtitle}>баллов</span>
							</div>
						</div>
						<h6 className={styles.index__title}>Вы успешно прошли модуль!</h6>
					</div>
					<div className={styles.index__btns}>
						<Button asChild size="small" variant="primary" className={styles.index__btn} fullWidth>
							<Link href="/dashboard">Следующий модуль</Link>
						</Button>

						<Button asChild variant="secondary" size="small" fullWidth className={styles.index__btn}>
							<Link href="/dashboard">Вернуться в профиль</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
