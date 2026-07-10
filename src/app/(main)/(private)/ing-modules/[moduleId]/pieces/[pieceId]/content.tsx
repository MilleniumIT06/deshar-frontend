'use client';
import { useParams } from "next/navigation"

import { ModuleCard } from "@/components/ModulesContent/ModuleCard";
import { useGetPieceById } from "@/hooks/queries/education/pieces/useGetPieceById";
import { Loader } from "@/shared/ui/Loader";

import './../../../styles.scss';

export const PiecesContent = () => {
    const {moduleId,pieceId} = useParams<{moduleId:string;pieceId:string}>()
    const {
        data,
        isError,
        isLoading
    } = useGetPieceById(Number(moduleId),Number(pieceId))
    console.log(data)
    if(isLoading) return <Loader/>
    if(isError) return "ERROR"
       return (
           <section className="IngModulesPageContent">
               <div className="container">
                   <div className="IngModulesPageContent__inner">
                       <h1 className="section__title">Pieces</h1>
                       <div className="IngModulesPageContent__cards">
                           {data?.lessons.map(lesson => <ModuleCard
                               id={lesson.id}
                               key={`ing-module-piece-lesson-${lesson.id}`}
                               number={lesson.id}
                               title={lesson.name}
                               maxLessons={lesson.total_tasks}
                               linkHref={`${pieceId}/lessons`}
                               doneLessons={12}
                               processLessons={0}
                               progressPercentage={0}
                               status="sttest"
                               name='Часть'
                           />)}
                        </div>
                       </div>
                   </div>
           </section>
       )
}
