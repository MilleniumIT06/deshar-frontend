import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AudioPlayerState {
	currentAudioUrl: string | null
	isPlaying: boolean
	isLoading: boolean
	hasListened: boolean
}

const initialState: AudioPlayerState = {
	currentAudioUrl: null,
	isPlaying: false,
	isLoading: false,
	hasListened: false,
}

const audioPlayerSlice = createSlice({
	name: 'audioPlayer',
	initialState,
	reducers: {
		setCurrentAudio: (state, action: PayloadAction<string>) => {
			if (state.currentAudioUrl !== action.payload) {
				state.hasListened = false
			}
			state.currentAudioUrl = action.payload
		},
		setIsPlaying: (state, action: PayloadAction<boolean>) => {
			state.isPlaying = action.payload
		},
		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload
		},
		markAudioAsListened: state => {
			state.hasListened = true
		},
		stopAudio: state => {
			state.isPlaying = false
			state.isLoading = false
		},
	},
})

export const { setCurrentAudio, setIsPlaying, setIsLoading, markAudioAsListened, stopAudio } = audioPlayerSlice.actions
export default audioPlayerSlice.reducer
