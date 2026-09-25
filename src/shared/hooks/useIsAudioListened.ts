import { type RootState } from '@/app/_store'
import { useAppSelector } from '@/app/_store/hooks'

export const useIsAudioListened = (audioUrl: string | null) => {
	return useAppSelector((state: RootState) => {
		if (!audioUrl) return false
		return state.audioPlayer.currentAudioUrl === audioUrl && state.audioPlayer.hasListened
	})
}
