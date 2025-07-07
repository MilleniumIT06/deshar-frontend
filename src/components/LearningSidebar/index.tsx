'use client'
import { useCallback, useState } from 'react'

import { Button } from '@/shared/ui/Button'

import { AttestationItem } from '../AttestationItem'
import { LessonItem } from '../LessonItem'

import styles from './styles.module.scss'


type Lesson = {
  id: number
  completed: boolean
  number: number
  text: string
}

export const LearningSidebar = () => {

  const initialLessons: Lesson[] = [
    { id: 1, completed: true, number: 1, text: "Морфемика как раздел лингвистики" },
    { id: 2, completed: true, number: 2, text: "Состав слова. Морфемный анализ слов" },
    { id: 3, completed: false, number: 3, text: "Орфография как система правил правописания слов и форм слов" },
    { id: 4, completed: false, number: 4, text: "Правописание разделительных Ъ и Ь" },
    { id: 5, completed: false, number: 5, text: "Правописание корней с безударными проверяемыми, непроверяемыми гласными" },
    { id: 6, completed: false, number: 6, text: "Правописание корней с проверяемыми, непроверяемыми, непроизносимыми согласными" },
  ]

  const [lessons, setLessons] = useState(initialLessons)
  const [activeLessonId, setActiveLessonId] = useState(1);
  

  const handleLessonClick = useCallback((id: number) => {
    console.log('Clicked lesson:', id)
    setActiveLessonId(id)
  }, [])

  const handleShowMore = useCallback(() => {
    console.log('Load more lessons')
  }, [])

  return (
    <div className={styles.index}>
      <div className={styles.inner}>
        <h5 className={styles.title}>Уроки</h5>
        <div className={styles.content}>
          <ul className={styles.list}>
            {lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                id={lesson.id}
                active={lesson.id === activeLessonId}
                completed={lesson.completed}
                number={lesson.number}
                text={lesson.text}
                handleClick={()=>handleLessonClick(lesson.id)}
              />
            ))}
          </ul>
          
          <Button 
            className={styles.showBtn} 
            variant="secondary" 
            size="medium" 
            fullWidth
            onClick={handleShowMore}
          >
            Показать следующие
          </Button>
        </div>
        
        <div className={styles.bottom}>
          <h5 className={styles.title}>Аттестация</h5>
          <AttestationItem max={10} current={5} />
        </div>
      </div>
    </div>
  )
}