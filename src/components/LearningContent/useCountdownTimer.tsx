import { useState, useEffect, useRef, useCallback } from 'react'

export function useCountdownTimer(initialSeconds: number) {
	const [seconds, setSeconds] = useState(initialSeconds)
	const [isExpired, setIsExpired] = useState(false)
	const timerRef = useRef<NodeJS.Timeout | null>(null)

	const clearTimer = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current)
			timerRef.current = null
		}
	}, [])

	const startTimer = useCallback(() => {
		clearTimer()

		timerRef.current = setInterval(() => {
			setSeconds(prev => {
				if (prev <= 1) {
					clearTimer()
					setIsExpired(true)
					return 0
				}
				return prev - 1
			})
		}, 1000)
	}, [clearTimer])

	useEffect(() => {
		setSeconds(initialSeconds)
		setIsExpired(initialSeconds <= 0)

		if (initialSeconds > 0) {
			startTimer()
		}

		return clearTimer
	}, [initialSeconds, startTimer, clearTimer])

	// Функция перезапуска
	const restart = useCallback(() => {
		clearTimer()
		setSeconds(initialSeconds)
		setIsExpired(false)

		if (initialSeconds > 0) {
			startTimer()
		}
	}, [initialSeconds, startTimer, clearTimer])

	// Форматирование времени
	const formatTime = useCallback(() => {
		const mins = Math.floor(seconds / 60)
			.toString()
			.padStart(2, '0')
		const secs = (seconds % 60).toString().padStart(2, '0')
		return `${mins}:${secs}`
	}, [seconds])

	return {
		time: isExpired ? '00:00' : formatTime(),
		isExpired,
		secondsLeft: seconds,
		reset: () => {
			clearTimer()
			setSeconds(initialSeconds)
			setIsExpired(false)
		},
		restart,
	}
}
