'use client';
import { Notification } from '@/components/Notification';
import { exampleMissingData } from '@/mocks/data';
import { Button } from '@/shared/ui/Button';

import { useMissedWord } from '../../../../../shared/hooks/useMissedWord';

import styles from './styles.module.scss';


export const QuizContent = ({ onClose }: { onClose: () => void; }) => {
	const { completed, renderSentence, isButtonDisabled, hasError, handleCheckAnswers } = useMissedWord({ data: exampleMissingData[0], onSuccess: () => console.log('success') });
	const handleClick = () => {
		handleCheckAnswers();
		onClose();
	}
	return (
		<div className={styles.index__inner}>
			<div className={styles.index__top}>
				<h6 className={styles.index__title}>
					Впишите пропущенные буквы в следующем предложении
				</h6>
				<div className={styles.index__content}>
					{renderSentence()}
				</div>

				{hasError && <Notification type='warning' fullWidth />}
			</div>
			<div className={styles.index__bottom}>
				<Button variant="secondary" size="medium" onClick={onClose}>
					Отмена
				</Button>
				<Button variant="primary" size="medium" disabled={isButtonDisabled} onClick={handleClick}>
					Принять
				</Button>
			</div>
		</div>
	);
};