import MissingLetter from '@/components/MissingLetter'
import { Button } from '@/shared/ui/Button'

import styles from './styles.module.scss'

export const QuizContent = () => {
	return (
		<div className={styles.index__inner}>
			<div className={styles.index__top}>
				<h6 className={styles.index__title}>
					Впишите пропущенные буквы в следующем предложении
				</h6>
				<div className={styles.index__content}>
					Купил как-то обувной мастер{' '}
					<MissingLetter
						word="гвозди"
						missingIndex={2}
						onComplete={() => console.log('test')}
					/>{' '}
					для того, чтобы{' '}
					<MissingLetter
						word="починить"
						missingIndex={3}
						onComplete={() => console.log('test')}
					/>{' '}
					обувь лорда Маркиза. К сожалению, он не знал насколько придирчив
					лорд.
				</div>
			</div>
			<div className={styles.index__bottom}>
				<Button variant="secondary" size="medium">
					Отмена
				</Button>
				<Button variant="primary" size="medium">
					Принять
				</Button>
			</div>
		</div>
	)
}
