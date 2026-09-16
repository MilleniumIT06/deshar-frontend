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
							fon={null}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
// {
//     "message": "\u0417\u0430\u0434\u0430\u043d\u0438\u0435 \u0443\u0436\u0435 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043e",
//     "is_completed": true,
//     "progress": {
//         "status": "completed",
//         "is_completed": true,
//         "attempts": 1,
//         "attempts_left": 2,
//         "score": 0,
//         "max_score": null,
//         "time_spent": 2,
//         "last_answer": "[\"variant-5\"]",
//         "started_at": "2026-09-16T12:31:16.000000Z",
//         "completed_at": "2026-09-16T12:31:16.000000Z"
//     }
// }
