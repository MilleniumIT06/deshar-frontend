import { useRef, useEffect, useCallback, useState } from 'react';

export const useAudioPlayer = (audioUrl: string | null) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	useEffect(() => {
		if (!audioUrl) {
			audioRef.current = null;
			setIsLoading(false);
			setIsPlaying(false);
			return;
		}

		const audio = new Audio(audioUrl);
		audio.preload = 'auto';
		audioRef.current = audio;

		const handlePlay = () => setIsPlaying(true);
		const handlePause = () => setIsPlaying(false);
		const handleEnded = () => {
			setIsPlaying(false);
			audio.currentTime = 0;
		};
		const handleWaiting = () => setIsLoading(true);
		const handlePlaying = () => setIsLoading(false);

		audio.addEventListener('play', handlePlay);
		audio.addEventListener('pause', handlePause);
		audio.addEventListener('ended', handleEnded);
		audio.addEventListener('waiting', handleWaiting);
		audio.addEventListener('playing', handlePlaying);

		return () => {
			audio.pause();
			audio.removeEventListener('play', handlePlay);
			audio.removeEventListener('pause', handlePause);
			audio.removeEventListener('ended', handleEnded);
			audio.removeEventListener('waiting', handleWaiting);
			audio.removeEventListener('playing', handlePlaying);
			audioRef.current = null;
		};
	}, [audioUrl]);

	const togglePlay = useCallback(() => {
		if (!audioRef.current) return;

		const audio = audioRef.current;

		if (!audio.paused) {
			audio.pause();
			audio.currentTime = 0;
		} else {
			if (audio.readyState < 3) {
				setIsLoading(true);
			}

			audio.play().catch(() => {
				setIsLoading(false);
			});
		}
	}, []);

	return {
		togglePlay: audioUrl ? togglePlay : undefined,
		isLoading,
		isPlaying
	};
};
