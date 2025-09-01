import { Button } from '@/shared/ui/Button'

import styles from './styles.module.scss'

export const Question = () => {
	return (
		<section className={styles.index}>
			<div className="container">
				<div className={styles.index__inner}>
					<h3 className={styles.index__title}>Остались вопросы&nbsp;&mdash; ответим!</h3>
					<Button variant="primary" size="big" className={styles.index__btn}>
						Задать вопрос
					</Button>
				</div>
			</div>
		</section>
	)
}
