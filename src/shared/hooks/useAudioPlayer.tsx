// shared/hooks/useAudioPlayer.ts
import { useRef, useEffect, useCallback } from 'react'

import { type RootState } from '@/app/_store'
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { setCurrentAudio, setIsLoading, setIsPlaying, stopAudio } from '@/entities/audio/model/audioPlayer.slice'

export const useAudioPlayer = (audioUrl: string | null) => {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const dispatch = useAppDispatch()

	const currentAudioUrl = useAppSelector((state: RootState) => state.audioPlayer.currentAudioUrl)
	const globalIsPlaying = useAppSelector((state: RootState) => state.audioPlayer.isPlaying)
	const globalIsLoading = useAppSelector((state: RootState) => state.audioPlayer.isLoading)

	const isThisTrack = audioUrl !== null && currentAudioUrl === audioUrl
	const isPlaying = isThisTrack && globalIsPlaying
	const isLoading = isThisTrack && globalIsLoading

	useEffect(() => {
		if (!audioUrl) {
			audioRef.current = null
			return
		}

		const audio = new Audio(audioUrl)
		audio.preload = 'auto'
		audioRef.current = audio

		const handlePlay = () => dispatch(setIsPlaying(true))
		const handlePause = () => dispatch(setIsPlaying(false))
		const handleEnded = () => {
			audio.currentTime = 0
			dispatch(stopAudio())
		}
		const handleWaiting = () => dispatch(setIsLoading(true))
		const handlePlaying = () => dispatch(setIsLoading(false))

		audio.addEventListener('play', handlePlay)
		audio.addEventListener('pause', handlePause)
		audio.addEventListener('ended', handleEnded)
		audio.addEventListener('waiting', handleWaiting)
		audio.addEventListener('playing', handlePlaying)

		return () => {
			audio.pause()
			audio.removeEventListener('play', handlePlay)
			audio.removeEventListener('pause', handlePause)
			audio.removeEventListener('ended', handleEnded)
			audio.removeEventListener('waiting', handleWaiting)
			audio.removeEventListener('playing', handlePlaying)
			audioRef.current = null
		}
	}, [audioUrl, dispatch])

	useEffect(() => {
		if (!audioRef.current) return
		if (currentAudioUrl !== audioUrl && !audioRef.current.paused) {
			audioRef.current.pause()
			audioRef.current.currentTime = 0
		}
	}, [currentAudioUrl, audioUrl])

	const togglePlay = useCallback(() => {
		if (!audioRef.current || !audioUrl) return
		const audio = audioRef.current

		if (!audio.paused) {
			audio.pause()
			audio.currentTime = 0
			dispatch(stopAudio())
			return
		}

		dispatch(setCurrentAudio(audioUrl))
		if (audio.readyState < 3) {
			dispatch(setIsLoading(true))
		}
		audio.play().catch(() => {
			dispatch(setIsLoading(false))
		})
	}, [audioUrl, dispatch])

	return {
		togglePlay: audioUrl ? togglePlay : undefined,
		isLoading,
		isPlaying,
	}
}
