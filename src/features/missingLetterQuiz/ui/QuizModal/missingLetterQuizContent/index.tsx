'use client'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { nextId, changeStatusOfLesson } from '@/entities/learning/model/slice'
import { exampleMissingData } from '@/mocks/data'
import { useMissedWord } from '@/shared/hooks/useMissedWord'
import { Button } from '@/shared/ui/Button'
import { Notification } from '@/shared/ui/Notification'


import styles from './styles.module.scss'

export const QuizContent = ({
	onClose,
	onError,
	onSuccess,
}: {
	onClose: () => void
	onSuccess: () => void
	onError: () => void
}) => {
	const { activeLessonId, lessons } = useAppSelector(state => state.learningReducer)
	const isLastLesson = () => {
		if (lessons[lessons.length - 1].id === activeLessonId) {
			return true
		}
		return false
	}
	const handleClick = () => {
		if (isLastLesson()) {
			onSuccess()
			onClose()
			dispatch(changeStatusOfLesson({ id: activeLessonId, value: true }))
		} else {
			dispatch(changeStatusOfLesson({ id: activeLessonId, value: true }))
			dispatch(nextId())
			onSuccess()
			onClose()
		}
	}
	const handleError = () => {
		onClose()
		onError()
	}

	const { renderSentence, isButtonDisabled, hasError, handleCheckAnswers } = useMissedWord({
		data: exampleMissingData[0] as any,
		onSuccess: handleClick,
		onError: handleError,
	})
	const dispatch = useAppDispatch()
	return (
		<div className={styles.index__inner}>
			<div className={styles.index__top}>
				<h6 className={styles.index__title}>Впишите пропущенные буквы в следующем предложении</h6>
				<div className={styles.index__content}>{renderSentence()}</div>

				{hasError && <Notification type="warning" fullWidth />}
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
	)
}
