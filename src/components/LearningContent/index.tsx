'use client';
import { useState } from 'react';

import Image from 'next/image'

import { QuizModal } from '@/features/quiz/ui/QuizModal';
import { lessonContent } from '@/mocks/data';
import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss'
import { useCountdownTimer } from './useCountdownTimer';

export const LearningContent = () => {
  const { isExpired, secondsLeft } = useCountdownTimer(10);
  const [isQuizOpen, setIsQuizOpen] = useState(false);



  const currentLesson = lessonContent[0];

  return (
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
            <Button variant="primary" size="medium" disabled={isExpired ? false : true}>Далее {isExpired ? "" : `(${secondsLeft})`}</Button>
          </div>
        </div>
      </div>
      <Button
        onClick={() => setIsQuizOpen(true)}
        variant="primary"
      >
        Начать квиз
      </Button>
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </section>
  )
}