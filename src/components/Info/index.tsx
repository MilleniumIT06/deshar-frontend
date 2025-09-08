import cn from 'classnames'

import './styles.scss'

export const Info = () => {
	return (
		<section className="Info">
			<h2 className="is-hidden">info section</h2>
			<div className="container">
				<div className="Info__inner">
					<ul className={cn('list-reset', 'Info__list')}>
						<li className="Info__list_item">
							<span>1268</span>
							<p>обучающих уроков</p>
						</li>
						<li className="Info__list_item">
							<span>100+</span>
							<p>квалифицированных учителей</p>
						</li>
						<li className="Info__list_item">
							<span>86%</span>
							<p>учеников, прошедших аттестацию</p>
						</li>
					</ul>
				</div>
			</div>
		</section>
	)
}
