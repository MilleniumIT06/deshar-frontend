'use client'
import { useCallback, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { AttestationItem } from '@/components/AttestationItem'
import { type ILesson } from '@/components/LearningContent'
import { LessonItem } from '@/components/LessonItem'
import { changeId } from '@/entities/learning/model/slice'
import { Button } from '@/shared/ui/Button'

import './styles.scss'

export const LearningSidebar = () => {
	const [page, setPage] = useState(0)
	const itemsPerPage = 6

	const dispatch = useAppDispatch()
	const { activeLessonId, lessons } = useAppSelector(
		(state: { learningReducer: { activeLessonId: number; lessons: ILesson[] } }) => state.learningReducer,
	)
	const { status } = useAppSelector(state => state.learningStatusReducer)
	const { data } = useAppSelector(state => state.learningAttestationReducer)

	let numberOfCompletedTasks = 0
	data.forEach(item => {
		if (item.completed) {
			numberOfCompletedTasks += 1
		}
	})

	const handleLessonClick = useCallback(
		(id: number) => {
			dispatch(changeId(id))
		},
		[dispatch],
	)

	const handleNextPage = useCallback(() => {
		setPage(prev => prev + 1)
	}, [])

	const handlePrevPage = useCallback(() => {
		setPage(prev => prev - 1)
	}, [])

	const isActiveLessonItem = (lesson: ILesson) => {
		if (status === 'attestation') {
			return false
		}
		return lesson.id === activeLessonId
	}

	const isActiveAttestationItem = () => {
		return status === 'attestation'
	}

	// Находим индекс первого незавершенного урока
	const firstIncompleteIndex = lessons.findIndex(lesson => !lesson.completed)

	// Определяем доступность уроков
	const isLessonDisabled = (lessonIndex: number) => {
		// Все уроки после первого незавершенного должны быть disabled
		return lessonIndex > firstIncompleteIndex
	}

	const startIndex = page * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const paginatedLessons = lessons.slice(startIndex, endIndex)

	const hasPreviousPage = page > 0
	const hasNextPage = endIndex < lessons.length

	return (
		<div className="LearningSidebar">
			<div className="LearningSidebar__inner">
				<div className="LearningSidebar__wrapper">
					<h5 className="LearningSidebar__title">Уроки</h5>
					<div className="LearningSidebar__content">
						{hasPreviousPage && (
							<Button
								className="LearningSidebar__showBtn"
								variant="secondary"
								size="medium"
								fullWidth
								onClick={handlePrevPage}>
								Показать предыдущие
							</Button>
						)}

						<ul className="LearningSidebar__list">
							{paginatedLessons.map((lesson, index) => {
								const lessonIndex = startIndex + index
								return (
									<LessonItem
										key={lesson.id}
										id={lesson.id}
										active={isActiveLessonItem(lesson)}
										completed={lesson.completed}
										number={lesson.number}
										text={lesson.text}
										handleClick={() => handleLessonClick(lesson.id)}
										disabled={isLessonDisabled(lessonIndex)}
									/>
								)
							})}
						</ul>

						{hasNextPage && (
							<Button
								className="LearningSidebar__showBtn"
								variant="secondary"
								size="medium"
								fullWidth
								onClick={handleNextPage}>
								Показать следующие
							</Button>
						)}
					</div>
				</div>
				<div className="LearningSidebar__bottom">
					<h5 className="LearningSidebar__title">Аттестация</h5>
					<AttestationItem
						max={data.length}
						current={numberOfCompletedTasks}
						active={isActiveAttestationItem()}
					/>
				</div>
			</div>
		</div>
	)
}
