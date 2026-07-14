import { useRef, useEffect, useCallback } from 'react';

export const useAudioPlayer = (audioUrl: string | null) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	useEffect(() => {
		return () => {
			if (audioRef.current) {
				audioRef.current.pause();
				audioRef.current = null;
			}
		};
	}, [audioUrl]);

	const togglePlay = useCallback(() => {
		if (!audioUrl) return;
		if (!audioRef.current) {
			audioRef.current = new Audio(audioUrl);
		}

		const audio = audioRef.current;

		if (!audio.paused) {
			audio.pause();
			audio.currentTime = 0;
		} else {
			audio.play().catch((error) => {
				console.error('Ошибка воспроизведения аудио:', error);
			});
		}
	}, [audioUrl]);

	return audioUrl ? togglePlay : undefined;
};
