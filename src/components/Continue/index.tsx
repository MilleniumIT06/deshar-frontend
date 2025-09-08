import Link from 'next/link'

import { LessonProgressCard } from '@/widgets/LessonProgressCard'

import './styles.scss'

export const Continue = () => {
	return (
		<section className="Continue">
			<div className="container">
				<div className="Continue__inner">
					<h2 className="section__title">Продолжим обучение</h2>
					<div className="Continue__subjects">
						<LessonProgressCard
							countOfFinishedModules={7}
							countOfLeftModules={11}
							countOfModules={21}
							countOfProcessModules={3}
							title="Ингушский язык"
						/>
						<LessonProgressCard
							countOfFinishedModules={10}
							countOfLeftModules={19}
							countOfModules={38}
							countOfProcessModules={0}
							title="История"
						/>
					</div>
					<div className="Continue__footer">
						<Link href="/completed-courses" className="Continue__link">
							Открыть выполненые дисциплины
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}
