'use client'
import { useParams } from 'next/navigation';

import { ModuleCard } from '@/components/ModulesContent/ModuleCard';
import './../styles.scss';
import { useGetModuleById } from '@/hooks/queries/education/modules/useGetModuleById';
import {Loader} from '@/shared/ui/Loader';

export const ModuleContent = () => {
    const params = useParams<{moduleId:string;pieceId:string}>()

    const {module:uniqueModule,isLoading} = useGetModuleById(Number(params.moduleId))
    if(isLoading) return <div style={{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"}}><Loader/></div>
    console.log('onemodule',uniqueModule)
    return (
        <section className="IngModulesPageContent">
            <div className="container">
                <div className="IngModulesPageContent__inner">
                    <h1 className="section__title">{uniqueModule?.module.name}</h1>
                    <div className="IngModulesPageContent__cards">
                        {uniqueModule?.pieces.map(piece => <ModuleCard
                            id={piece.id}
                            key={`ing-module-piece-${piece.id}`}
                            number={piece.id}
                            title={piece.name}
                            maxLessons={piece.total_lessons}
                            doneLessons={12}
                            processLessons={0}
                            linkHref={`${params.moduleId}/pieces`}
                            progressPercentage={piece.progress.progress_percentage}
                            status={piece.progress.status}
                            name='Часть'
                        />)}
                     </div>
                    </div>
                </div>
        </section>
    )
}
