'use client';
import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss';
import { useMissedWord } from './useMissedWord';


const exampleMissingData = {
	id: 1,
	sentence: "Купил как-то обувной мастер гвозди для того, чтобы починить обувь лорда Маркиза. К сожалению, он не знал насколько придирчив лорд.",
	missingWords: [
		{ id: 1, word: "гвозди",missedLetter: "в" },
		{ id: 2, word: "починить",missedLetter: "и" }
	]
};

export const QuizContent = ({ onClose }: { onClose: () => void; }) => {
	const { completed,renderSentence} = useMissedWord(exampleMissingData);

	return (
		<div className={styles.index__inner}>
			<div className={styles.index__top}>
				<h6 className={styles.index__title}>
					Впишите пропущенные буквы в следующем предложении
				</h6>
				<div className={styles.index__content}>
					{renderSentence()}
				</div>
			</div>
			<div className={styles.index__bottom}>
				<Button variant="secondary" size="medium" onClick={onClose}>
					Отмена
				</Button>
				<Button variant="primary" size="medium" disabled={completed}>
					Принять
				</Button>
			</div>
		</div>
	);
};