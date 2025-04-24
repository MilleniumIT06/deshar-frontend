"use client";
import { FC, ReactNode } from 'react'
import { useSwiper } from 'swiper/react'
interface ISliderControl {
    children: ReactNode
    type: "next" | "prev"
    className?: string
}
export const SliderControl: FC<ISliderControl> = ({ children, type, className }) => {
    const swiper = useSwiper()
    if (type === 'next')
        return (
            <button
                onClick={() => swiper.slideNext()}
                className={`btn-reset ${className}`}>
                {children}
            </button>
        )
    else
        return (
            <button
                onClick={() => swiper.slidePrev()}
                className={`btn-reset ${className}`}>
                {children}
            </button>
        )
}
