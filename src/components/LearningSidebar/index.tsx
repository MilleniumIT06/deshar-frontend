'use client'
import { useCallback, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/_store/hooks';
import { changeId } from '@/entities/learning/model/slice'
// import { initialLessons } from '@/mocks/data';
import { Button } from '@/shared/ui/Button'

import { AttestationItem } from '../AttestationItem'
import { ILesson } from '../LearningContent';
import { LessonItem } from '../LessonItem'

import styles from './styles.module.scss'

// type Lesson = {
//   id: number
//   completed: boolean
//   number: number
//   text: string
// }

export const LearningSidebar = () => {
  // const [lessons] = useState<Lesson[]>(initialLessons)

  const [page, setPage] = useState(0); // Текущая страница
  const itemsPerPage = 6; // Количество уроков на странице

  const dispatch = useAppDispatch();
  const { activeLessonId, lessons } = useAppSelector(state => state.learningReducer);
  const { status } = useAppSelector(state => state.learningStatusReducer);
  const handleLessonClick = useCallback((id: number) => {
    console.log('Clicked lesson:', id)
    // setActiveLessonId(id)
    dispatch(changeId(id))
  }, [])
  // Переход на следующую страницу
  const handleNextPage = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);
  // Переход на предыдущую страницу
  const handlePrevPage = useCallback(() => {
    setPage(prev => prev - 1);
  }, []);
  const isActiveLessonItem = (lesson: ILesson) => {
    if (status === "attestation") {
      return false
    } else {

      return lesson.id === activeLessonId
    }
  }
  const isActiveAttestationItem = () => {
    if (status === "attestation") {
      return true
    } else {

      return false
    }
  }
  // Вычисляем индексы для текущей страницы
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLessons = lessons.slice(startIndex, endIndex);

  // Проверяем доступность навигации
  const hasPreviousPage = page > 0;
  const hasNextPage = endIndex < lessons.length;

  return (
    <div className={styles.index}>
      <div className={styles.inner}>
        <h5 className={styles.title}>Уроки</h5>
        <div className={styles.content}>
          {hasPreviousPage && (
            <Button
              className={styles.showBtn}
              variant="secondary"
              size="medium"
              fullWidth
              onClick={handlePrevPage}
            >
              Показать предыдущие
            </Button>
          )}

          <ul className={styles.list}>
            {paginatedLessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                id={lesson.id}
                active={isActiveLessonItem(lesson)}
                completed={lesson.completed}
                number={lesson.number}
                text={lesson.text}
                handleClick={() => handleLessonClick(lesson.id)}

              />
            ))}
          </ul>

          {hasNextPage && (
            <Button
              className={styles.showBtn}
              variant="secondary"
              size="medium"
              fullWidth
              onClick={handleNextPage}
            >
              Показать следующие
            </Button>
          )}
        </div>

        <div className={styles.bottom}>
          <h5 className={styles.title}>Аттестация</h5>
          <AttestationItem max={lessons.length} current={0} active={isActiveAttestationItem()} />
        </div>
      </div>
    </div>
  )
}