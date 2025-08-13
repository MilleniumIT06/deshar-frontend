
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
                    imageUrl="subjectbg"
                    title="Ингушский язык"
                    description="Базовые навыки языка, алфавит, общение"
                    modulesCount={85}
                    type="long"
                />
                <SubjectCard
                    id={2}
                    imageUrl="subjectbg"
                    title="Ингушский языкИнгушский язык"
                    description="База английского языка, алфавит и умение формировать предложения"
                    modulesCount={85}
                    type="long"
                />
                <SubjectCard
                    id={3}
                    imageUrl="subjectbg"
                    title="Ингушский язык"
                    description="Базовые навыки языка, алфавит, общение"
                    modulesCount={85}
                    type="long"
                />
                <SubjectCard
                    id={4}
                    imageUrl="subjectbg"
                    title="Ингушский язык"
                    description="Базовые навыки языка, алфавит, общение"
                    modulesCount={85}
                    type="long"
                />
                <SubjectCard
                    id={5}
                    imageUrl="subjectbg"
                    title="Ингушский язык"
                    description="Базовые навыки языка, алфавит, общение"
                    modulesCount={85}
                    type="long"
                />
                <SubjectCard
                    id={6}
                    imageUrl="subjectbg"
                    title="Ингушский язык"
                    description="Базовые навыки языка, алфавит, общение"
                    modulesCount={85}
                    type="long"
                />
                <SubjectCard
                    id={7}
                    imageUrl="subjectbg"
                    title="Ингушский язык"
                    description="Базовые навыки языка, алфавит, общение"
                    modulesCount={85}
                    type="long"
                />
                <SubjectCard
                    id={8}
                    imageUrl="subjectbg"
                    title="Ингушский язык"
                    description="Базовые навыки языка, алфавит, общение"
                    modulesCount={85}
                    type="long"
                />
            </ul>
        </div>
    )
}