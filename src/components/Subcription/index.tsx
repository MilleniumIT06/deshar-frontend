import cn from 'classnames'

import { RateCard } from '@/widgets/Home/RateCard'

import './styles.scss'

export const Subscription = () => {
	return (
		<section className="Subscription">
			<div className="container">
				<div className="Subscription__inner">
					<h2 className="section__title">Выбираем лучшую подписку</h2>
					<ul className={cn('list-reset', 'Subscription__list')}>
						<RateCard
							price={0}
							title="14 дней"
							variant="free"
							info={[
								{ id: 1, content: '3 предмета' },
								{ id: 2, content: '20 занятий/мес' },
								{ id: 3, content: '12 модулей' },
							]}
						/>
						<RateCard
							price={999}
							title="30 дней"
							discount={10}
							variant="standart"
							info={[
								{ id: 1, content: '24 предмета' },
								{ id: 2, content: 'Неограниченное количество занятий' },
								{ id: 3, content: 'Неограниченный доступ к модулям' },
								{ id: 4, content: 'Аттестация уроков' },
							]}
						/>
						<RateCard
							price={2499}
							title="120 дней"
							discount={20}
							variant="standart"
							info={[
								{ id: 1, content: '24 предмета' },
								{ id: 2, content: 'Неограниченное количество занятий' },
								{ id: 3, content: 'Неограниченный доступ к модулям' },
								{ id: 4, content: 'Аттестация уроков' },
							]}
						/>
						<RateCard
							price={7999}
							title="1 год"
							discount={40}
							variant="premium"
							info={[
								{ id: 1, content: '24 предмета' },
								{ id: 2, content: 'Неограниченное количество занятий' },
								{ id: 3, content: 'Неограниченный доступ к модулям' },
								{ id: 4, content: 'Аттестация уроков' },
							]}
						/>
					</ul>
				</div>
			</div>
		</section>
	)
}
