
import { SubjectCard } from "@/components/SubjectCard"

import styles from './styles.module.scss';

export const CoursesBlock = () => {
    return (
        <div className={styles.CoursesBlock}>
            <h3 className={styles.title}>
                1-4 класс
            </h3>
            <ul className={styles.Cards}>
                <SubjectCard
                    id={1}
                    imageUrl="subjectbg1"
                    title="Ингушский язык"
                    description="Базовые навыки языка, алфавит, общение"
                    modulesCount={85}
                    type="long"
                />
                <SubjectCard
                    id={2}
                    imageUrl="subjectbg2"
                    title="Математика"
                    description="Цифры, исчисления, арифметические вычисления"
                    modulesCount={58}
                    type="long"
                />
                <SubjectCard
                    id={3}
                    imageUrl="subjectbg3"
                    title="Чтение"
                    description="Алфавит русского языка, чтение по слагам, фонетический разбор"
                    modulesCount={12}
                    type="long"
                />
                <SubjectCard
                    id={4}
                    imageUrl="subjectbg4"
                    title="Иностранный язык"
                    description="База английского языка, алфавит и умение формировать предложения"
                    modulesCount={95}
                    type="long"
                />
                <SubjectCard
                    id={5}
                    imageUrl="subjectbg5"
                    title="Окружающий мир"
                    description="Основы билогии, экологии и строения эдементов"
                    modulesCount={62}
                    type="long"
                />
                <SubjectCard
                    id={6}
                    imageUrl="subjectbg6"
                    title="Русский язык"
                    description="Алфавит, письмо и правописание, формирование предложений"
                    modulesCount={53}
                    type="long"
                />
                <SubjectCard
                    id={7}
                    imageUrl="subjectbg7"
                    title="ИЗО"
                    description="Рисование простых фигур, основы форм, правила колористики"
                    modulesCount={49}
                    type="long"
                />
                <SubjectCard
                    id={8}
                    imageUrl="subjectbg8"
                    title="Информатика"
                    description="Основы информационной грамотности, базовое использование ПК"
                    modulesCount={12}
                    type="long"
                />
            </ul>
        </div>
    )
}