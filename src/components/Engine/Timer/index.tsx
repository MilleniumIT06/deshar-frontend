'use client'
import { useEffect, useImperativeHandle, forwardRef } from 'react'
import './styles.scss'
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { type RootState } from '@/app/_store'
import { stopTimer, tick } from '@/entities/engine/model/timer.slice'

interface TimerProps {
	onEnd?: () => void
	criticalThreshold?: number
}

export interface TimerRef {
	stopAndGetTime: () => number
}

export const Timer = forwardRef<TimerRef, TimerProps>(({ onEnd, criticalThreshold = 180 }, ref) => {
	const dispatch = useAppDispatch()

	const { isActive, isFinished, timeLeft, initialTime } = useAppSelector((state: RootState) => state.timer)

	useEffect(() => {
		if (!isActive || isFinished) return

		const timerId = setInterval(() => {
			dispatch(tick())
		}, 1000)

		return () => clearInterval(timerId)
	}, [isActive, isFinished, dispatch])

	useEffect(() => {
		if (isFinished && onEnd) {
			onEnd()
		}
	}, [isFinished, onEnd])

	useImperativeHandle(ref, () => ({
		stopAndGetTime: () => {
			dispatch(stopTimer())
			const spent = initialTime - timeLeft
			return spent
		},
	}))

	const minutes = Math.floor(timeLeft / 60)
	const seconds = timeLeft % 60
	const formatTime = (time: number) => String(time).padStart(2, '0')
	const isUrgent = timeLeft < criticalThreshold

	return (
		<div className={`timer ${isUrgent ? 'timer--urgent' : ''}`}>
			<div className="timer__container">
				<div className="timer__icon-wrapper">
					<svg className="timer__icon" width="52" height="52" viewBox="0 0 52 52" fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M26 49.5C13.0212 49.5 2.5 38.9788 2.5 26C2.5 13.0212 13.0212 2.5 26 2.5C38.9788 2.5 49.5 13.0212 49.5 26C49.5 38.9788 38.9788 49.5 26 49.5ZM26 6.26102C36.9017 6.26102 45.74 15.0983 45.74 26.001C45.74 36.9026 36.9026 45.7409 26 45.7409C15.0983 45.7409 6.26004 36.9036 6.26004 26.001C6.25668 23.3378 6.79379 20.7017 7.83885 18.2522C8.88392 15.8027 10.4152 13.5907 12.34 11.7502C12.4816 11.6145 12.6644 11.4484 12.8885 11.2518L12.979 11.182C13.1682 11.0538 13.3987 11.0014 13.6248 11.0351C13.8509 11.0688 14.0562 11.1861 14.1999 11.3639L14.2185 11.3865C14.3707 11.575 14.4443 11.815 14.4237 12.0564C14.4032 12.2978 14.2903 12.522 14.1084 12.6821C13.9311 12.8369 13.7574 12.9959 13.5874 13.1589C11.8617 14.8223 10.4895 16.8171 9.55323 19.0236C8.61693 21.2302 8.13577 23.603 8.13859 26C8.13859 35.8636 16.1354 43.8604 25.999 43.8604C35.8626 43.8604 43.8604 35.8636 43.8604 26C43.8604 16.1364 35.8636 8.13957 26 8.13957V16.5994C26 16.7229 25.9757 16.8452 25.9284 16.9592C25.8812 17.0733 25.8119 17.177 25.7246 17.2643C25.6373 17.3516 25.5336 17.4208 25.4196 17.4681C25.3055 17.5153 25.1832 17.5397 25.0597 17.5397C24.9363 17.5397 24.814 17.5153 24.6999 17.4681C24.5858 17.4208 24.4822 17.3516 24.3949 17.2643C24.3076 17.177 24.2383 17.0733 24.1911 16.9592C24.1438 16.8452 24.1195 16.7229 24.1195 16.5994V7.1998C24.1194 7.06212 24.1496 6.92611 24.2079 6.80138C24.2662 6.67666 24.3513 6.56627 24.4569 6.47802C24.5626 6.38978 24.6864 6.32584 24.8195 6.29072C24.9527 6.2556 25.0919 6.25016 25.2274 6.27479C25.4829 6.26495 25.7415 6.26102 26 6.26102ZM15.2173 16.6004C14.4112 15.4483 15.6095 14.25 16.7606 15.0571L28.9491 23.5572C31.1382 25.0779 31.5059 27.6584 29.6863 29.5467C27.8196 31.3673 25.2401 30.975 23.7194 28.7869L15.2173 16.6004Z"
							fill="currentColor"
						/>
					</svg>
				</div>
				<div className="timer__info">
					<div className="timer__digits">
						<span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
					</div>
					<span className="timer__label">Остаток времени</span>
				</div>
			</div>
		</div>
	)
})
Timer.displayName = 'Timer'
