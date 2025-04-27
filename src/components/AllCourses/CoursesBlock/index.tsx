import { SubjectCard } from "@/components/SubjectCard"
import styles from './styles.module.scss';

export const CoursesBlock = () => {
    return (
        <div className={styles.CoursesBlock}>
        <h3 className={styles.title}>
        1-4 класс
        </h3>
       <div className={styles.Cards}>
            <SubjectCard 
                     imageUrl="subjectbg" 
                     title="Ингушский язык" 
                     description="Базовые навыки языка, алфавит, общение"
                     modulesCount={85}
            />
            <SubjectCard 
                     imageUrl="subjectbg" 
                     title="Ингушский язык" 
                     description="Базовые навыки языка, алфавит, общение"
                     modulesCount={85}
            />
                <SubjectCard 
                imageUrl="subjectbg" 
                title="Ингушский язык" 
                description="Базовые навыки языка, алфавит, общение"
                modulesCount={85}
                />
                <SubjectCard 
                imageUrl="subjectbg" 
                title="Ингушский язык" 
                description="Базовые навыки языка, алфавит, общение"
                modulesCount={85}
                />
                 <SubjectCard 
                     imageUrl="subjectbg" 
                     title="Ингушский язык" 
                     description="Базовые навыки языка, алфавит, общение"
                     modulesCount={85}
            />
             <SubjectCard 
                     imageUrl="subjectbg" 
                     title="Ингушский язык" 
                     description="Базовые навыки языка, алфавит, общение"
                     modulesCount={85}
            />
             <SubjectCard 
                     imageUrl="subjectbg" 
                     title="Ингушский язык" 
                     description="Базовые навыки языка, алфавит, общение"
                     modulesCount={85}
            />
             <SubjectCard 
                     imageUrl="subjectbg" 
                     title="Ингушский язык" 
                     description="Базовые навыки языка, алфавит, общение"
                     modulesCount={85}
            />
        </div>
       </div>
    )
}