'use client'
import { useParams } from 'next/navigation';

import { ModuleCard } from '@/components/ModulesContent/ModuleCard';
import './../styles.scss';
import { useGetModuleById } from '@/hooks/queries/education/modules/useGetModuleById';

export const ModuleContent = () => {
    const params = useParams<{moduleId:string}>()

    const {module:uniqueModule,isLoading} = useGetModuleById(Number(params.moduleId))
    if(isLoading) return <>Loading...</>
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
                            maxLessons={12}
                            doneLessons={12}
                            processLessons={0}
                            name='Часть'
                        />)}
                     </div>
                    </div>
                </div>
        </section>
    )
}
