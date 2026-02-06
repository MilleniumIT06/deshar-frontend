import cn from 'classnames'
import { Navigation, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ReviewsCard } from '@/entities/reviews/index'
import { reviewsMockData } from '@/mocks/data'
import { Button } from '@/shared/ui/Button'

import './styles.scss'

import 'swiper/css'
import 'swiper/css/pagination'

export const Reviews = () => {
	return (
		<section className="Reviews">
			<div className="container">
				<div className="Reviews__inner">
					<h2 className="section__title">Что говорят наши ученики</h2>
					<div className="Reviews__slider_wrapper">
						{reviewsMockData && (
							<Swiper
								modules={[Navigation, A11y]}
								navigation={{
									enabled: true,
									prevEl: '.slider__btn_left',
									nextEl: '.slider__btn_right',
								}}
								breakpoints={{
									320: {
										slidesPerView: 1,
										spaceBetween: 20,
									},
									480: {
										slidesPerView: 1,
										spaceBetween: 30,
									},
									640: {
										slidesPerView: 2,
										spaceBetween: 40,
									},
									1000: {
										slidesPerView: 3,
										spaceBetween: 40,
									},
								}}
								spaceBetween={50}
								slidesPerView={1} //Number of slides per view
								style={{ margin: '0 auto' }} //Optional, for styling
							>
								{reviewsMockData.map(item => (
									<SwiperSlide key={item.id}>
										<ReviewsCard
											id={item.id}
											rating={item.rating}
											subject={item.subject}
											name={item.name}
											text={item.text}
										/>
									</SwiperSlide>
								))}
							</Swiper>
						)}
						<div className="Reviews__slider_navigation">
							<Button
								variant="iconSecondary"
								size="iconBig"
								className={cn('btn-reset', 'Reviews__btn', 'slider__btn_left')}>
								<svg
									width="12"
									height="18"
									viewBox="0 0 12 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M11 17L2 9L11 1" strokeWidth="2" />
								</svg>
							</Button>
							<Button
								variant="iconSecondary"
								size="iconBig"
								className={cn('btn-reset', 'Reviews__btn', 'slider__btn_right')}>
								<svg
									width="12"
									height="18"
									viewBox="0 0 12 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M1 17L10 9L1 1" strokeWidth="2" />
								</svg>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
