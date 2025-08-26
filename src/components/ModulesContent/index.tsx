import { ModuleCard } from './ModuleCard'
import styles from './styles.module.scss'

export const ModulesContent = () => {
	return (
		<section className={styles.ModulesContent}>
			<div className="container">
				<div className={styles.inner}>
					<h1 className="section__title">Английский язык</h1>
					<div className={styles.cards}>
						<ModuleCard
							id={1}
							number={1}
							title="Алфавит"
							maxLessons={12}
							doneLessons={12}
							processLessons={0}
						/>
						<ModuleCard
							id={2}
							number={2}
							title="Фонетика"
							maxLessons={12}
							doneLessons={12}
							processLessons={0}
						/>
						<ModuleCard
							id={3}
							number={3}
							title="Лексикология"
							maxLessons={23}
							doneLessons={0}
							processLessons={0}
						/>
						<ModuleCard
							id={4}
							number={4}
							title="Дошкхоллар"
							maxLessons={48}
							doneLessons={0}
							processLessons={24}
						/>
						<ModuleCard
							id={5}
							number={5}
							title="Морфемика"
							maxLessons={17}
							doneLessons={0}
							processLessons={8}
						/>
						<ModuleCard
							id={6}
							number={6}
							title="Словообразова ние и логика выбора"
							maxLessons={14}
							doneLessons={14}
							processLessons={0}
						/>
						<ModuleCard
							id={7}
							number={7}
							title="Грамматика"
							maxLessons={12}
							doneLessons={12}
							processLessons={0}
						/>
						<ModuleCard
							id={8}
							number={8}
							title="Пунктуация"
							maxLessons={12}
							doneLessons={0}
							processLessons={0}
						/>
						<ModuleCard
							id={9}
							number={9}
							title="Части речи"
							maxLessons={12}
							doneLessons={0}
							processLessons={0}
						/>
						<ModuleCard
							id={10}
							number={10}
							title="Синтаксические правила"
							maxLessons={12}
							doneLessons={0}
							processLessons={0}
						/>
						<ModuleCard
							id={11}
							number={11}
							title="Правила переноса слов"
							maxLessons={12}
							doneLessons={12}
							processLessons={0}
						/>
						<ModuleCard
							id={12}
							number={12}
							title="Синтаксический разбор предложений"
							maxLessons={12}
							doneLessons={0}
							processLessons={0}
						/>
						<ModuleCard
							id={13}
							number={13}
							title="Рода и падежи"
							maxLessons={8}
							doneLessons={4}
							processLessons={4}
						/>
						<ModuleCard
							id={14}
							number={14}
							title="Построение предложений"
							maxLessons={12}
							doneLessons={0}
							processLessons={0}
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
