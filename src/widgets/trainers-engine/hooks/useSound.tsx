'use client'

import { useCallback, useEffect, useRef } from 'react'

import { useAppSelector } from '@/app/_store/hooks'

const SUCCESS_SOUND_SRC = '/audio/successSound.mp3'
const ERROR_SOUND_SRC = '/audio/errorSound.mp3'

function createAudio(src: string): HTMLAudioElement | null {
	if (typeof window === 'undefined') return null

	const audio = new Audio(src)
	audio.preload = 'auto'
	audio.volume = 0.6
	return audio
}

export const useEngineSound = () => {
	const isSoundEnabled = useAppSelector(state => state.settings?.soundEnabled ?? true)

	const successAudioRef = useRef<HTMLAudioElement | null>(null)
	const errorAudioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		successAudioRef.current = createAudio(SUCCESS_SOUND_SRC)
		errorAudioRef.current = createAudio(ERROR_SOUND_SRC)

		return () => {
			successAudioRef.current?.pause()
			errorAudioRef.current?.pause()
			successAudioRef.current = null
			errorAudioRef.current = null
		}
	}, [])

	const playSound = useCallback(
		(audio: HTMLAudioElement | null) => {
			console.log('sound')
			if (!isSoundEnabled || !audio) return
			// сброс на случай, если предыдущее воспроизведение еще не закончилось
			// (например, юзер быстро отвечает на несколько заданий подряд)
			audio.currentTime = 0
			audio.play().catch(() => {
				// браузер может заблокировать автоплей до первого взаимодействия юзера со страницей —
				// это не критично, просто тихо игнорируем
			})
		},
		[isSoundEnabled],
	)

	const playSuccess = useCallback(() => playSound(successAudioRef.current), [playSound])
	const playError = useCallback(() => playSound(errorAudioRef.current), [playSound])

	return { playSuccess, playError, isSoundEnabled }
}
