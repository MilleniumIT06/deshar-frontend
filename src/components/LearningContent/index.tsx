'use client';
import { useState } from 'react';

import Image from 'next/image'

import { useAppSelector } from '@/app/_store/hooks';
import { InfoModal } from '@/features/info/ui/InfoModal';
import { QuizModal } from '@/features/missingLetterQuiz/ui/QuizModal';
import { initialLessons } from '@/mocks/data';
import { isAllLessonsCompleted } from '@/shared/lib/allCompleted';
import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss'
import { useCountdownTimer } from './useCountdownTimer';

type LessonTaskType = "missing-word" | "choice-right" | "missing-dnd" | string;
interface IMissinWord {
  id: number;
  word: string;
  missedLetter: string;
  wordNumber: number;
}
interface IMissingWordTask {
  id: number;
  sentence: string;
  type: LessonTaskType;
  missingWords: { id: number; word: string; missedLetter: string; wordNumber: number }[]
}
interface IChoiceRightTask {
  id: number;
  type: LessonTaskType;
  title: string;
  variants: { id: number; content: string; correct: boolean; }[];
}
interface IMissingWordDndTask {
  id: number;
  sentence: string;
  type: LessonTaskType;
  missingWords: IMissinWord[];
  slots: { id: number; correct: string; current: string | null }[];
  letters: { id: number; char: string }[];
}
export interface ILesson {
  id: number;
  completed: boolean;
  number: number;
  text: string;
  title: string;
  task: IMissingWordTask | IChoiceRightTask | IMissingWordDndTask;
}
export const LearningContent = () => {
  const { isExpired, secondsLeft } = useCountdownTimer(3);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const { activeLessonId, lessons } = useAppSelector(state => state.learningReducer);
  const isLastLesson = () => {
    if (activeLessonId === lessons[lessons.length - 1].id) {
      console.log(activeLessonId, lessons.length);
      return true
    } else {
      console.log(activeLessonId, lessons.length);
      return false;
    }
  }

  const currentLesson: ILesson = lessons[activeLessonId - 1];

  return (

    <section className={styles.index}>
      <div className={styles.inner}>
        <h2 className={styles.index__title}>
          <b>{currentLesson.id}.</b> {currentLesson.title}
        </h2>

        <div className={styles.content}>
          <div className={styles.content__inner}>
            <div className={styles.index__image}>
              <Image
                fill
                src="/images/Learning/example.jpg"
                alt="Иллюстрация правил орфографии"
                priority
              />
            </div>

            <div className={styles.index__text}>
              <div className={styles.index__text_definition}>
                <p><b>Орфография русского языка</b> — это система правил,
                  регулирующих написание слов и их форм.
                  Она включает в себя множество аспектов,
                  которые важно учитывать при изучении языка.
                  Вот основные моменты, которые можно рассмотреть в теории к уроку по орфографии:</p>
              </div>
              <div className={styles.index__text_list}>
                <b>1. Основные понятия орфографии</b>
                <ul className='list-reset'>
                  <li>- Орфография — это раздел языкознания, изучающий правила написания слов.</li>
                  <li>- Орфограмма — это элемент слова, написание которого подчиняется определённым правилам.</li>
                </ul>
              </div>
              <div className={styles.index__text_list}>
                <b>2. Правила написания слов</b>
                <ul className='list-reset'>
                  <li>- Правила написания гласных и согласных: В русском языке существуют определённые правила, касающиеся написания гласных и согласных звуков. Например, в некоторых случаях гласные могут изменяться в зависимости от ударения (например, "молоко" и "молока").</li>
                  <li>- Правила переноса слов: Перенос слов на другую строку также подчиняется определённым правилам, например, нельзя переносить слова по слогам, если это нарушает их целостность.</li>
                </ul>
              </div>
              <div className={styles.index__text_list}>
                <b>3. Ударение</b>
                <ul className='list-reset'>
                  <li>- Ударение в русском языке может быть подвижным и неподвижным. Оно влияет на написание некоторых слов и может изменять их значение. Например, "замок" (крепость) и "замок" (устройство для запирания).</li>

                </ul>
              </div>
              <div className={styles.index__text_list}>
                <b>4. Сложные случаи орфографии</b>
                <ul className='list-reset'>
                  <li>- Слова с приставками: Правила написания слов с приставками могут быть сложными. Например, "при-" и "пере-" могут требовать разного написания в зависимости от корня слова.</li>
                  <li>- Слова с чередующимися гласными: В некоторых словах гласные могут чередоваться в зависимости от формы слова (например, "берёг" и "беречь").</li>
                </ul>
              </div>
              <div className={styles.index__text_list}>
                <b>5. Орфографические словари</b>
                <ul className='list-reset'>
                  <li>- Для проверки правильности написания слов используются орфографические словари. Они содержат информацию о правильном написании, ударении и других аспектах.</li>
                </ul>
              </div>
              <div className={styles.index__text_list}>
                <b>6. Практические задания</b>
                <ul className='list-reset'>
                  <li>- Важно включать в урок практические задания, которые помогут учащимся закрепить полученные знания. Это могут быть упражнения на написание слов, определение ударения, а также работа с текстами.</li>
                </ul>
              </div>
              <div className={styles.index__text_conclusion}>
                <b>Заключение</b>
                <p>
                  Орфография — это важный аспект владения русским языком, который требует внимания и практики. Понимание правил написания слов поможет учащимся не только в учебе, но и в повседневной жизни.
                </p>
                <span>
                  Эта структура может служить основой для вашего урока по орфографии русского языка.

                </span>
              </div>
            </div>

          </div>
          <div className={styles.index__footer}>
            <div className={styles.index__footer_left}>
              <Button variant="secondary" size="medium">Назад</Button>
            </div>
            <div className={styles.index__footer_right}>
              <Button variant="secondary" size="medium">Пропустить</Button>

              {isAllLessonsCompleted(lessons) ?
                <Button variant="secondary" size="medium">Перейти к аттестации</Button> :
                <Button
                  variant="primary"
                  size="medium"
                  disabled={isExpired ? false : true}
                  onClick={() => setIsQuizOpen(true)}>Далее {isExpired ? "" : `(${secondsLeft})`}</Button>
              }

            </div>
          </div>
        </div>
        <Button variant="secondary" size="medium" onClick={() => setIsInfoOpen(true)}>test</Button>
        <QuizModal
          isOpen={isQuizOpen}
          onClose={() => setIsQuizOpen(false)}
        />
        <InfoModal
          isOpen={isInfoOpen}
          onClose={() => setIsInfoOpen(false)}
          type="fail"
        />
      </div>
    </section>
  )
}