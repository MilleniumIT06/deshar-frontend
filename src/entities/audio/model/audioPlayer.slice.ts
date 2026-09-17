import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AudioPlayerState {
	currentAudioUrl: string | null
	isPlaying: boolean
	isLoading: boolean
}

const initialState: AudioPlayerState = {
	currentAudioUrl: null,
	isPlaying: false,
	isLoading: false,
}

const audioPlayerSlice = createSlice({
	name: 'audioPlayer',
	initialState,
	reducers: {
		setCurrentAudio(state, action: PayloadAction<string | null>) {
			state.currentAudioUrl = action.payload
		},
		setIsPlaying(state, action: PayloadAction<boolean>) {
			state.isPlaying = action.payload
		},
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		stopAudio(state) {
			state.currentAudioUrl = null
			state.isPlaying = false
			state.isLoading = false
		},
	},
})

export const { setCurrentAudio, setIsPlaying, setIsLoading, stopAudio } = audioPlayerSlice.actions
export default audioPlayerSlice.reducer
