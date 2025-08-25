import { SubjectCard } from '@/components/SubjectCard';

import { CoursesBlock } from './CoursesBlock';
import styles from './styles.module.scss';

export const courses = [
    {
        id: 1,
        imageUrl: "subjectbg1",
        title: "Ингушский язык",
        description: "Базовые навыки языка, алфавит, общение",
        modulesCount: 85,
        type: "long" as const,
    },
    {
        id: 2,
        imageUrl: "subjectbg2",
        title: "Математика",
        description: "Цифры, исчисления, арифметические вычисления",
        modulesCount: 58,
        type: "long" as const,
    },
    {
        id: 3,
        imageUrl: "subjectbg3",
        title: "Чтение",
        description: "Алфавит русского языка, чтение по слогам, фонетический разбор",
        modulesCount: 12,
        type: "long" as const,
    },
    {
        id: 4,
        imageUrl: "subjectbg4",
        title: "Иностранный язык",
        description: "База английского языка, алфавит и умение формировать предложения",
        modulesCount: 95,
        type: "long" as const,
    },
    {
        id: 5,
        imageUrl: "subjectbg5",
        title: "Окружающий мир",
        description: "Основы биологии, экологии и строения элементов",
        modulesCount: 62,
        type: "long" as const,
    },
    {
        id: 6,
        imageUrl: "subjectbg6",
        title: "Русский язык",
        description: "Алфавит, письмо и правописание, формирование предложений",
        modulesCount: 53,
        type: "long" as const,
    },
    {
        id: 7,
        imageUrl: "subjectbg7",
        title: "ИЗО",
        description: "Рисование простых фигур, основы форм, правила колористики",
        modulesCount: 49,
        type: "long" as const,
    },
    {
        id: 8,
        imageUrl: "subjectbg8",
        title: "Информатика",
        description: "Основы информационной грамотности, базовое использование ПК",
        modulesCount: 12,
        type: "long" as const,
    }
];
export const AllCourses = () => {
    return (
        <section className={styles.AllCourses}>
            <div className="container">
                <div className={styles.inner}>
                    <h1 className="section__title">Все дисциплины</h1>
                    <CoursesBlock title='1-4 класс'>
                        {courses.map(item => <SubjectCard
                            key={item.id + 'key'}
                            modulesCount={item.modulesCount}
                            title={item.title}
                            description={item.description}
                            id={item.id}
                            imageUrl={item.imageUrl}
                            type="long"
                        />)}
                    </CoursesBlock>
                    <CoursesBlock title='5-9 класс'>
                        {courses.map(item => <SubjectCard
                            key={item.id + 'key'}
                            modulesCount={item.modulesCount}
                            title={item.title}
                            description={item.description}
                            id={item.id}
                            type="long"
                        />)}
                    </CoursesBlock>
                </div>
            </div>
        </section>
    )
}