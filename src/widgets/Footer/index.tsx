import Image from 'next/image'

import cn from 'classnames'

import styles from './styles.module.scss'

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className="container">
				<div className={styles.footer__inner}>
					<div className={styles.footer__main}>
						<div className={styles.footer__main_left}>
							<div className={styles.footer__logo}>
								<picture>
									<source srcSet="/logoLight.svg" type="image/svg+xml" />
									<img src="/logoLight.svg" alt="Desharing Logo" loading="lazy" />
								</picture>
							</div>
						</div>
						<div className={styles.footer__cols}>
							<div className={styles.footer__col}>
								<h6 className={styles.footer__col_title}>Дисциплины</h6>
								<ul className={cn('list-reset', styles.footer__col_list)}>
									<li className={styles.footer__col_item}>
										<a href="#">Ингушский язык</a>
									</li>
									<li className={styles.footer__col_item}>
										<a href="#">Английский язык</a>
									</li>
									<li className={styles.footer__col_item}>
										<a href="#">Математика</a>
									</li>
									<li className={styles.footer__col_item}>
										<a href="#">История</a>
									</li>
									<li className={styles.footer__col_item}>
										<a href="#">Химия</a>
									</li>
									<li className={styles.footer__col_item}>
										<a href="#">Физика</a>
									</li>
								</ul>
							</div>
							<div className={styles.footer__col}>
								<h6 className={styles.footer__col_title}>Лицензии</h6>
								<ul className={cn('list-reset', styles.footer__col_list)}>
									<li className={styles.footer__col_item}>
										<a href="#">Государственная лицензия</a>
									</li>
									<li className={styles.footer__col_item}>
										<a href="#">Диплом учителя</a>
									</li>
									<li className={styles.footer__col_item}>
										<a href="#">Сертификат соответствия</a>
									</li>
								</ul>
							</div>
							<div className={styles.footer__col}>
								<h6 className={styles.footer__col_title}>Свяжитесь с нами</h6>
								<address className={styles.footer__address}>
									<a href="tel:89284884848">8 928 488 48 48</a>
									<a href="mailto:deshar@mail.ru">deshar@mail.ru</a>
									<a href="#">
										386103, Республика Ингушетия, г. Назрань, ул. просп. Базоркина, 60
									</a>
								</address>
								<div className={styles.footer__socials}>
									<h6 className={styles.footer__col_title}>Социальные сети</h6>
									<ul className={cn('list-reset', styles.footer__socials_list)}>
										<li className={cn(styles.footer__social)}>
											<a href="#">
												<Image fill src="/svg/yt.svg" alt="YouTube" />
											</a>
										</li>
										<li className={cn(styles.footer__social)}>
											<a href="#">
												<Image fill src="/svg/vk.svg" alt="VK" />
											</a>
										</li>
										<li className={cn(styles.footer__social)}>
											<a href="#">
												<Image fill src="/svg/tg.svg" alt="Telegram" />
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.footer__bottom}>
						<div className={styles.footer__bottom_inner}>
							<span className={styles.footer__bottom_copyright}>
								© Образовательная онлайн-платформа “Дешаринг”, 2024
							</span>
							<ul className={cn('list-reset', styles.footer__agreement)}>
								<li className={styles.footer__agreement_item}>
									<a href="#">Пользовательское согласшение</a>
								</li>
								<li className={styles.footer__agreement_item}>
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
