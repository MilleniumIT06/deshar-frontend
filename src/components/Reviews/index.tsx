"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules'
import { ReviewsSlide } from './ReviewsSlide';
import styles from './styles.module.scss';
import cn from 'classnames';

import 'swiper/css';
import 'swiper/css/pagination';
import { useState, useEffect } from 'react';
import { SliderControl } from '../SliderControl';
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
                            modules={[Navigation,A11y]}
                            // navigation={{}}
                            spaceBetween={50}
                            slidesPerView={3}  //Number of slides per view
                            style={{ maxWidth: "1155px", margin: "0 auto" }} //Optional, for styling
                        >
                            <SwiperSlide key={1}>
                                <ReviewsSlide />
                            </SwiperSlide>
                            <SwiperSlide key={2}>
                                <ReviewsSlide />
                            </SwiperSlide>
                            <SwiperSlide key={3}>
                                <ReviewsSlide />
                            </SwiperSlide>
                            <SwiperSlide key={4}>
                                <ReviewsSlide />
                            </SwiperSlide>
                            <SwiperSlide key={5}>
                                <ReviewsSlide />
                            </SwiperSlide>
                            <SwiperSlide key={6}>
                                <ReviewsSlide />
                            </SwiperSlide>
                            <SwiperSlide key={7}>
                                <ReviewsSlide />
                            </SwiperSlide>
                            <SwiperSlide key={8}>
                                <ReviewsSlide />
                            </SwiperSlide>
                        </Swiper>
                        {/* <div className={styles.sliderNavigation}>
                            <SliderControl type="prev">P</SliderControl>
                            <SliderControl type="next">N</SliderControl>

                        </div> */}
                        <button className='prevW'>p</button>
                        <button className='nextW'>n</button>
                    </div>
                </div>
            </div >
        </section >
    )
}