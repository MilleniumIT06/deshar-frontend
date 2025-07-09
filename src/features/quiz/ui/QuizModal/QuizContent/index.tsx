'use client';
import { useState, useMemo, Fragment } from 'react';

import MissingLetter from '@/components/MissingLetter';
import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss';


const exampleMissingData = {
	id: 1,
	sentence: "Купил как-то обувной мастер гвозди для того, чтобы починить обувь лорда Маркиза. К сожалению, он не знал насколько придирчив лорд.",
	missingWords: [
		{ id: 1, word: "гвозди", completed: false, missedLetter: "в" },
		{ id: 2, word: "починить", completed: false, missedLetter: "и" }
	]
};

export const QuizContent = () => {
	const [missingWords, setMissingWords] = useState(exampleMissingData.missingWords);


	const missingWordsMap = useMemo(() =>
		new Map(missingWords.map(word => [word.id, word])),
		[missingWords]
	);


	const handleComplete = (id: number) => {
		setMissingWords(prev =>
			prev.map(word =>
				word.id === id ? { ...word, completed: true } : word
			)
		);
	};


	const renderSentence = () => {
		return exampleMissingData.sentence.split(' ').map((token, index, arr) => {

			const missingWord = missingWords.find(mw =>
				token.includes(mw.word) && !mw.completed
			);


			const punctuation = token.replace(missingWord?.word || '', '');

			return (
				<Fragment key={index}>
					{missingWord ? (
						<>
							<MissingLetter
								id={missingWord.id}
								missingLetter={missingWord.missedLetter}
								word={missingWord.word}
								onComplete={() => handleComplete(missingWord.id)}
							/>
							{punctuation}
						</>
					) : token}

					{index < arr.length - 1 ? ' ' : ''}
				</Fragment>
			);
		});
	};

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
				<Button variant="secondary" size="medium">
					Отмена
				</Button>
				<Button variant="primary" size="medium">
					Принять
				</Button>
			</div>
		</div>
	);
};