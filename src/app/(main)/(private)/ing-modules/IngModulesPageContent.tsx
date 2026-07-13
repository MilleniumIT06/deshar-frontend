'use client'

import { ModuleCard } from '@/components/ModulesContent/ModuleCard'
import { useGetModules } from '@/hooks/queries/education/modules/useGetModules'
import './styles.scss';
import {Loader} from '@/shared/ui/Loader';

export const IngModulesPageContent = () => {
	const { modules, isLoading, isError } = useGetModules()
    if(isLoading) return <div style={{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"}}><Loader/></div>
    if(isError)  return "Something went wrong"
	return (
		<section className="IngModulesPageContent">
			<div className="container">
				<div className="IngModulesPageContent__inner">
					<h1 className="section__title">Ингушский язык</h1>
					<div className="IngModulesPageContent__cards">
                        {modules?.data.map(module => <ModuleCard
							id={module.id}
                            key={`ing-module-${module.id}`}
							linkHref='ing-modules'
							number={module.id}
							title={module.name}
							maxLessons={module.total_pieces||0}
							doneLessons={0}
							processLessons={0}
							isDisabled={false}
							progressPercentage={module.progress.progress_percentage}
							status={module.progress.status}
						/>)}
					</div>
				</div>
			</div>
		</section>
	)
}
