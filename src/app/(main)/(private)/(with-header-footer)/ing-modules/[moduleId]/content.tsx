'use client'
import { useParams } from 'next/navigation'

import { ModuleCard } from '@/components/ModulesContent/ModuleCard'
import { useGetModuleById } from '@/hooks/queries/education/modules/useGetModuleById'
import './../styles.scss'
import { Loader } from '@/shared/ui/Loader'

export const ModuleContent = () => {
	const params = useParams<{ moduleId: string; pieceId: string }>()
	const moduleId = Number(params.moduleId)

	const { module: uniqueModule, isLoading, isError } = useGetModuleById(moduleId)

	if (isLoading) {
		return (
			<div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
				<Loader />
			</div>
		)
	}

	if (isError || !uniqueModule) {
		return <div className="error-message">Данные модуля не найдены</div>
	}

	return (
		<section className="IngModulesPageContent">
			<div className="container">
				<div className="IngModulesPageContent__inner">
					<h1 className="section__title">{uniqueModule.module.name}</h1>
					<div className="IngModulesPageContent__cards">
						{uniqueModule.pieces?.map(piece => {
							console.log(piece)
							return (
								<ModuleCard
									id={piece.id}
									key={`ing-module-piece-${piece.id}`}
									isFullCardClickable={true}
									number={piece.id}
									title={piece.name}
									maxLessons={piece.total_lessons}
									doneLessons={piece.progress.is_completed ? piece.total_lessons : 0}
									processLessons={0}
									linkHref={`${moduleId}/pieces`}
									progressPercentage={piece.progress.progress_percentage}
									status={piece.progress.status}
									isDisabled={piece.progress.progress_percentage === 100}
									name="Часть"
								/>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}
