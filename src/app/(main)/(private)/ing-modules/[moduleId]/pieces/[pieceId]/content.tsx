'use client';
import { useParams } from "next/navigation"

import { useGetPieceById } from "@/hooks/queries/education/pieces/useGetPieceById";
import { Loader } from "@/shared/ui/Loader";
import './../../../styles.scss';
import { TrainersEngine } from "@/widgets/trainers-engine";

export const PiecesContent = () => {
    const {moduleId,pieceId} = useParams<{moduleId:string;pieceId:string}>()
    const {
        data,
        isError,
        isLoading
    } = useGetPieceById(Number(moduleId),Number(pieceId))
    if(isLoading) return <Loader/>
    if(isError) return "ERROR"
       return (
           <section className="IngModulesPageContent">
                                {data&&data.data&&data.data.length>0 ?(
                                    <TrainersEngine data={data.data} engineStatus="engineSuccess" config={{
                                        themeName:"default",
                                        time:180
                                    }}/>
                                )

    :"neznayu"}
           </section>
       )
}
