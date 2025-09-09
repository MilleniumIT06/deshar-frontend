import Image from 'next/image'

import cn from 'classnames'

import './styles.scss'

export const Footer = () => {
	return (
		<footer className="Footer">
			<div className="container">
				<div className="Footer__inner">
					<div className="Footer__main">
						<div className="Footer__main_left">
							<div className="Footer__logo">
								<picture>
									<source srcSet="/logoLight.svg" type="image/svg+xml" />
									<img src="/logoLight.svg" alt="Desharing Logo" loading="lazy" />
								</picture>
							</div>
						</div>
						<div className={'Footer__cols'}>
							<div className={'Footer__col'}>
								<h6 className={'Footer__col_title'}>Дисциплины</h6>
								<ul className={cn('list-reset', 'Footer__col_list')}>
									<li className={'Footer__col_item'}>
										<a href="#">Ингушский язык</a>
									</li>
									<li className={'Footer__col_item'}>
										<a href="#">Английский язык</a>
									</li>
									<li className={'Footer__col_item'}>
										<a href="#">Математика</a>
									</li>
									<li className={'Footer__col_item'}>
										<a href="#">История</a>
									</li>
									<li className={'Footer__col_item'}>
										<a href="#">Химия</a>
									</li>
									<li className={'Footer__col_item'}>
										<a href="#">Физика</a>
									</li>
								</ul>
							</div>
							<div className={'Footer__col'}>
								<h6 className={'Footer__col_title'}>Лицензии</h6>
								<ul className={cn('list-reset', 'Footer__col_list')}>
									<li className={'Footer__col_item'}>
										<a href="#">Государственная лицензия</a>
									</li>
									<li className={'Footer__col_item'}>
										<a href="#">Диплом учителя</a>
									</li>
									<li className={'Footer__col_item'}>
										<a href="#">Сертификат соответствия</a>
									</li>
								</ul>
							</div>
							<div className={'Footer__col'}>
								<h6 className={'Footer__col_title'}>Свяжитесь с нами</h6>
								<address className={'Footer__address'}>
									<a href="tel:89284884848">8 928 488 48 48</a>
									<a href="mailto:deshar@mail.ru">deshar@mail.ru</a>
									<a href="#">
										386103, Республика Ингушетия, г. Назрань, ул. просп. Базоркина, 60
									</a>
								</address>
								<div className={'Footer__socials'}>
									<h6 className={'Footer__col_title'}>Социальные сети</h6>
									<ul className={cn('list-reset', 'Footer__socials_list')}>
										<li className="Footer__social">
											<a href="#">
												<Image fill src="/svg/yt.svg" alt="YouTube" />
											</a>
										</li>
										<li className="Footer__social">
											<a href="#">
												<Image fill src="/svg/vk.svg" alt="VK" />
											</a>
										</li>
										<li className="Footer__social">
											<a href="#">
												<Image fill src="/svg/tg.svg" alt="Telegram" />
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="Footer__bottom">
						<div className="Footer__bottom_inner">
							<span className="Footer__bottom_copyright">
								© Образовательная онлайн-платформа “Дешаринг”, 2024
							</span>
							<ul className={cn('list-reset', 'Footer__agreement')}>
								<li className="Footer__agreement_item">
									<a href="#">Пользовательское согласшение</a>
								</li>
								<li className="Footer__agreement_item">
									<a href="#">Правовые акты</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
