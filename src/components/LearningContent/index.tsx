'use client';
import { useState } from 'react';

import Image from 'next/image'

import { useAppSelector } from '@/app/_store/hooks';
import { InfoModal } from '@/features/info/ui/InfoModal';
import { QuizModal } from '@/features/missingLetterQuiz/ui/QuizModal';
import { lessonContent } from '@/mocks/data';
import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss'
import { useCountdownTimer } from './useCountdownTimer';

export const LearningContent = () => {
  const { isExpired, secondsLeft } = useCountdownTimer(10);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const { activeLesson } = useAppSelector(state => state);


  const currentLesson = lessonContent[activeLesson.activeLessonId - 1];

  return (
    // <div className={styles.index__text}>
    // <b>Орфография русского языка</b> — это система правил, регулирующих написание слов и их форм. Она включает в себя множество аспектов, которые важно учитывать при изучении языка. Вот основные моменты, которые можно рассмотреть в теории к уроку по орфографии:
    //  </div>
    // <div className={styles.index__list}>
    //   <b>1. Основные понятия орфографии</b>
    //   <ul className='list-reset'>
    //     <li>- Орфография — это раздел языкознания, изучающий правила написания слов.</li>
    //     <li>- Орфограмма — это элемент слова, написание которого подчиняется определённым правилам.</li>
    //   </ul>

    // </div>
    // <div className={styles.index__list}>
    //   <b>2. Правила написания слов</b>
    //   <ul className='list-reset'>
    //     <li>- Правила написания гласных и согласных: В русском языке существуют определённые правила, касающиеся написания гласных и согласных звуков. Например, в некоторых случаях гласные могут изменяться в зависимости от ударения (например, "молоко" и "молока").</li>
    //     <li>- Правила переноса слов: Перенос слов на другую строку также подчиняется определённым правилам, например, нельзя переносить слова по слогам, если это нарушает их целостность.</li>
    //   </ul>

    // </div>
    // <div className={styles.index__list}>
    //   <b> 3. Ударение</b>
    //   <ul className='list-reset'>
    //     <li>- Ударение в русском языке может быть подвижным и неподвижным. Оно влияет на написание некоторых слов и может изменять их значение. Например, "замок" (крепость) и "замок" (устройство для запирания).
    //     </li>

    //   </ul>

    // </div>
    // <div className={styles.index__list}>
    //   <b>  4. Сложные случаи орфографии</b>
    //   <ul className='list-reset'>
    //     <li>- Слова с приставками: Правила написания слов с приставками могут быть сложными. Например, "при-" и "пере-" могут требовать разного написания в зависимости от корня слова.</li>
    //     <li> - Слова с чередующимися гласными: В некоторых словах гласные могут чередоваться в зависимости от формы слова (например, "берёг" и "беречь").</li>
    //   </ul>

    // </div>
    // <div className={styles.index__list}>
    //   <b>5. Орфографические словари</b>
    //   <ul className='list-reset'>
    //     <li>- Для проверки правильности написания слов используются орфографические словари. Они содержат информацию о правильном написании, ударении и других аспектах.</li>
    //   </ul>

    // </div>
    // <div className={styles.index__list}>
    //   <b> 6. Практические задания</b>
    //   <ul className='list-reset'>
    //     <li>- Важно включать в урок практические задания, которые помогут учащимся закрепить полученные знания. Это могут быть упражнения на написание слов, определение ударения, а также работа с текстами.ЗаключениеОрфография — это важный аспект владения русским языком, который требует внимания и практики. Понимание правил написания слов поможет учащимся не только в учебе, но и в повседневной жизни.Эта структура может служить основой для вашего урока по орфографии русского языка.</li>
    //   </ul>

    // </div>
    <section className={styles.index}>
      <div className={styles.inner}>
        <h2 className={styles.index__title}>
          <span>3.</span> {currentLesson.title}
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
              {currentLesson.content.map((item, index) => {
                if (item.type === 'paragraph') {
                  return <p key={index}>{item.text}</p>;
                }

                if (item.type === 'section') {
                  return (
                    <div key={index} className={styles.section}>
                      <p><strong>{item.title}</strong></p>
                      <ul className={styles.list}>
                        {item.items ? item.items.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        )) : "error"}
                      </ul>
                    </div>
                  );
                }

                if (item.type === 'note') {
                  return <span key={index} className={styles.note}>{item.text}</span>;
                }

                return null;
              })}
            </div>
                        </div>
        </div>
                      <div className={styles.index__footer}>
          <div className={styles.index__footer_left}>
            <Button variant="secondary" size="medium">Назад</Button>
          </div>
          <div className={styles.index__footer_right}>
            <Button variant="secondary" size="medium">Пропустить</Button>
            <Button variant="primary" size="medium" disabled={isExpired ? false : true} onClick={() => setIsQuizOpen(true)}>Далее {isExpired ? "" : `(${secondsLeft})`}</Button>
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