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
	const { completed, renderSentence, isButtonDisabled, hasError, handleCheckAnswers } = useMissedWord({ data: exampleMissingData[0], onSuccess: () => console.log('success') });
	const dispatch = useAppDispatch();
	const isLastLesson = () => {
		if (lessons[lessons.length - 1].id === activeLessonId) {
			return true
		} else {
			return false;
		}
	}
	const handleClick = () => {
		handleCheckAnswers();
		if (isLastLesson()) {
			onClose();
			dispatch(changeStatusOfLesson({ id: activeLessonId, value: true }));
		} else {

			if (!hasError && completed) {
				dispatch(changeStatusOfLesson({ id: activeLessonId, value: true }));
				dispatch(nextId());
				onClose();
			}
		}
	}
	console.log('activeId', activeLessonId)
	// if (lessons[activeLessonId].task.type === "missing-word") {

	// }
	// else if (lessons[activeLessonId].task.type === "choice-right") {

	// } else if (lessons[activeLessonId].task.type === "missing-dnd") {

	// }

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