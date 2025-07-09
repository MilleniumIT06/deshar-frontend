'use client';
import { useState } from 'react';

import MissingLetter from '@/components/MissingLetter'
import { Button } from '@/shared/ui/Button'

import styles from './styles.module.scss'

export const QuizContent = () => {
	const [missingWords, setMissingWords] = useState([{ id: 1, word: "гвозди", completed: false }]);
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
						missingLetter='в'
						onComplete={() => console.log('test')}
					/>{' '}
					для того, чтобы{' '}
					<MissingLetter
						word="починить"
						missingLetter='и'
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
