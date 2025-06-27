"use client";
import { useState, useEffect } from 'react';

import cn from 'classnames';
import { Navigation, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/shared/ui/Button';

import { ReviewsCard } from './ReviewsCard';
import styles from './styles.module.scss';


import 'swiper/css';
import 'swiper/css/pagination';


export const Reviews = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;  // or a placeholder loading state
    }
    return (
        <section className={styles.index}>
            <div className="container">
                <div className={styles.inner}>
                    <h2 className="section__title">Что говорят наши ученики</h2>
                    <div className={styles.sliderWrapper}>

                        <Swiper
                            modules={[Navigation, A11y]}
                            navigation={{
                                enabled: true,
                                prevEl: '.slider__btn_left',
                                nextEl: '.slider__btn_right'
                            }}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 20
                                },
                                480: {
                                    slidesPerView: 1,
                                    spaceBetween: 30
                                },
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 40
                                },
                                1000: {
                                    slidesPerView: 3,
                                    spaceBetween: 40
                                },
                            }}
                            spaceBetween={50}
                            slidesPerView={1}  //Number of slides per view
                            style={{ maxWidth: "1155px", margin: "0 auto" }} //Optional, for styling
                        >
                            <SwiperSlide key={1}>
                                <ReviewsCard />
                            </SwiperSlide>
                            <SwiperSlide key={2}>
                                <ReviewsCard />
                            </SwiperSlide>
                            <SwiperSlide key={3}>
                                <ReviewsCard />
                            </SwiperSlide>
                            <SwiperSlide key={4}>
                                <ReviewsCard />
                            </SwiperSlide>
                            <SwiperSlide key={5}>
                                <ReviewsCard />
                            </SwiperSlide>
                            <SwiperSlide key={6}>
                                <ReviewsCard />
                            </SwiperSlide>
                            <SwiperSlide key={7}>
                                <ReviewsCard />
                            </SwiperSlide>
                            <SwiperSlide key={8}>
                                <ReviewsCard />
                            </SwiperSlide>
                        </Swiper>
                        <div className={styles.reviewsNavigation}>
                            <Button variant="iconSecondary" size="iconBig" className={cn("btn-reset", styles.reviewsBtn, "slider__btn_left")}>
                                <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 17L2 9L11 1" strokeWidth="2" />
                                </svg>
                            </Button>
                            <Button variant="iconSecondary" size="iconBig" className={cn("btn-reset", styles.reviewsBtn, "slider__btn_right")}>
                                <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 17L10 9L1 1" strokeWidth="2" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}