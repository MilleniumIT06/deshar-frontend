import { ModuleCard } from './ModuleCard'
import './styles.scss'

export const ModulesContent = () => {
	return (
		<section className="ModulesContent">
			<div className="container">
				<div className="ModulesContent__inner">
					<h1 className="section__title">Английский язык</h1>
					<div className="ModulesContent__cards">
						<ModuleCard
							id={1}
							number={1}
							title="Алфавит"
							maxLessons={12}
							doneLessons={12}
							processLessons={0}
							progressPercentage={1}
							status="checked"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
