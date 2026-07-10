'use client';
import { useParams } from "next/navigation"

import { useGetLessonTasks } from "@/hooks/queries/education/useGetTasks"
import { TrainersEngine } from "@/widgets/trainers-engine";

export const LessonsPageContent = () => {
    const {
        lessonId,
        moduleId,
        pieceId,
    } = useParams<{moduleId:string;pieceId:string;lessonId:string}>()
    const {
        data:tasks,
        isError,
        isLoading
    } = useGetLessonTasks(Number(moduleId),Number(pieceId),Number(lessonId))
    console.log(tasks)
    console.log('contelLLLLL',tasks)
    if(isLoading) return "Loading"
    if(isError) return "Error"
    return (<>
    {tasks&&tasks.data&&tasks.data.length>0 ? <TrainersEngine data={tasks.data} engineStatus="engineSuccess" config={{
        themeName:"default",
        time:180
    }}/>:"neznayu"}

        </>
    )
}
