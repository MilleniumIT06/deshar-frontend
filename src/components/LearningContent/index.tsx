'use client';
import { useState } from 'react';

import Image from 'next/image'

import { QuizModal } from '@/features/quiz/ui/QuizModal';
import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss'
import { useCountdownTimer } from './useCountdownTimer';

export const LearningContent = () => {
  const { isExpired, secondsLeft } = useCountdownTimer(10);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const lessonContent = [
    {
      id: 1,
      title: "Орфография как система правил правописания слов и форм слов",
      content: [
        {
          type: 'paragraph',
          text: "Орфография русского языка — это система правил, регулирующих написание слов и их форм. Она включает в себя множество аспектов, которые важно учитывать при изучении языка. Вот основные моменты, которые можно рассмотреть в теории к уроку по орфографии:"
        },
        {
          type: 'section',
          title: "1. Основные понятия орфографии",
          items: [
            "Орфография — это раздел языкознания, изучающий правила написания слов.",
            "Орфограмма — это элемент слова, написание которого подчиняется определённым правилам."
          ]
        },
        {
          type: 'section',
          title: "2. Правила написания слов",
          items: [
            "Правила написания гласных и согласных: В русском языке существуют определённые правила, касающиеся написания гласных и согласных звуков. Например, в некоторых случаях гласные могут изменяться в зависимости от ударения (например, 'молоко' и 'молока').",
            "Правила переноса слов: Перенос слов на другую строку также подчиняется определённым правилам, например, нельзя переносить слова по слогам, если это нарушает их целостность."
          ]
        },
        {
          type: 'section',
          title: "3. Ударение",
          items: [
            "Ударение в русском языке может быть подвижным и неподвижным. Оно влияет на написание некоторых слов и может изменять их значение. Например, 'замок' (крепость) и 'замок' (устройство для запирания)."
          ]
        },
        {
          type: 'section',
          title: "4. Сложные случаи орфографии",
          items: [
            "Слова с приставками: Правила написания слов с приставками могут быть сложными. Например, 'при-' и 'пере-' могут требовать разного написания в зависимости от корня слова.",
            "Слова с чередующимися гласными: В некоторых словах гласные могут чередоваться в зависимости от формы слова (например, 'берёг' и 'беречь')."
          ]
        },
        {
          type: 'section',
          title: "5. Орфографические словари",
          items: [
            "Для проверки правильности написания слов используются орфографические словари. Они содержат информацию о правильном написании, ударении и других аспектах."
          ]
        },
        {
          type: 'section',
          title: "6. Практические задания",
          items: [
            "Важно включать в урок практические задания, которые помогут учащимся закрепить полученные знания. Это могут быть упражнения на написание слов, определение ударения, а также работа с текстами."
          ]
        },
        {
          type: 'section',
          title: 'Заключение',
          items: [
            "Орфография — это важный аспект владения русским языком, который требует внимания и практики. Понимание правил написания слов поможет учащимся не только в учебе, но и в повседневной жизни."
          ]
        },
        {
          type: 'note',
          text: "Эта структура может служить основой для вашего урока по орфографии русского языка."
        }
      ]
    }
  ];

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