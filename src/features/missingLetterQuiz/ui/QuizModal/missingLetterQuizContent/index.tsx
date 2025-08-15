'use client';

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks';
import { Notification } from '@/components/Notification';
import { nextId, changeStatusOfLesson } from '@/entities/learning/model/slice';
import { exampleMissingData } from '@/mocks/data';
import { Button } from '@/shared/ui/Button';

import { useMissedWord } from '../../../../../shared/hooks/useMissedWord';

import styles from './styles.module.scss';


export const QuizContent = ({ onClose }: { onClose: () => void; }) => {
	const { activeLessonId, lessons } = useAppSelector(state => state.learningReducer);
	const isLastLesson = () => {
		if (lessons[lessons.length - 1].id === activeLessonId) {
			return true
		} else {
			return false;
		}
	}
	const handleClick = () => {
		if (isLastLesson()) {
			onClose();
			dispatch(changeStatusOfLesson({ id: activeLessonId, value: true }));
		} else {


			dispatch(changeStatusOfLesson({ id: activeLessonId, value: true }));
			dispatch(nextId());
			onClose();

		}
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { renderSentence, isButtonDisabled, hasError, handleCheckAnswers } = useMissedWord({ data: exampleMissingData[0] as any, onSuccess: handleClick, onError: () => "error" });
	const dispatch = useAppDispatch();
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
				<Button variant="primary" size="medium" disabled={isButtonDisabled} onClick={handleCheckAnswers}>
					Принять
				</Button>
			</div>
		</div>
	);
};