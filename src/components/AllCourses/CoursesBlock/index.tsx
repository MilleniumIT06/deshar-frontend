
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
                     imageUrl="subjectbg" 
                     title="Ингушский язык" 
                     description="Базовые навыки языка, алфавит, общение"
                     modulesCount={85}
                     type="long"
            />
            <SubjectCard 
                     imageUrl="subjectbg" 
                     title="Ингушский язык" 
                     description="Базовые навыки языка, алфавит, общение"
                     modulesCount={85}
                     type="long"
            />
                <SubjectCard 
                imageUrl="subjectbg" 
                title="Ингушский язык" 
                description="Базовые навыки языка, алфавит, общение"
                modulesCount={85}
                type="long"
                />
                <SubjectCard 
                imageUrl="subjectbg" 
                title="Ингушский язык" 
                description="Базовые навыки языка, алфавит, общение"
                modulesCount={85}
                type="long"
                />
                 <SubjectCard 
                     imageUrl="subjectbg" 
                     title="Ингушский язык" 
                     description="Базовые навыки языка, алфавит, общение"
                     modulesCount={85}
                     type="long"
            />
             <SubjectCard 
                     imageUrl="subjectbg" 
                     title="Ингушский язык" 
                     description="Базовые навыки языка, алфавит, общение"
                     modulesCount={85}
                     type="long"
            />
             <SubjectCard 
                     imageUrl="subjectbg" 
                     title="Ингушский язык" 
                     description="Базовые навыки языка, алфавит, общение"
                     modulesCount={85}
                     type="long"
            />
             <SubjectCard 
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