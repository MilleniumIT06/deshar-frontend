import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type TrainerTheme } from '@/shared/types/types'

interface TrainersState {
	isMenuOpen: boolean
	isHelpOpen: boolean
	isSupportModalOpen: boolean
	status: 'idle' | 'error' | 'success' | 'finish'
	currentTrainerIndex: number;
	currentLessonIndex: number;
	theme: TrainerTheme;
	mode:'practice' | 'theory'
}

const initialState: TrainersState = {
	isMenuOpen: false,
	isHelpOpen: false,
	isSupportModalOpen: false,
	status: 'idle',
	currentTrainerIndex: 0,
	theme: 'default',
	mode: 'theory',
	currentLessonIndex: 0
}

export const trainersSlice = createSlice({
	name: 'trainers',
	initialState,
	reducers: {
		setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
			state.isMenuOpen = action.payload
		},
		setHelpModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isHelpOpen = action.payload
		},
		setSupportModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isSupportModalOpen = action.payload
		},
		setStatus: (state, action: PayloadAction<TrainersState['status']>) => {
			state.status = action.payload
		},
		setTheme: (state, action: PayloadAction<TrainerTheme>) => {
			state.theme = action.payload
		},
		nextTrainer: (state, { payload }: PayloadAction<{ totalTrainers: number }>) => {
	if (state.currentTrainerIndex < payload.totalTrainers - 1) {
		state.currentTrainerIndex += 1
		state.status = 'idle'
	} else {
		state.status = 'finish'
	}
},
			nextLesson: (state, { payload }: PayloadAction<{ totalLessons: number }>) => {
			if (state.currentLessonIndex !== payload.totalLessons - 1) {
				state.status = 'idle'
				state.currentLessonIndex += 1
			} else {
				state.status = 'finish'
			}
		},
		resetTrainers: state => {
			state.currentTrainerIndex = 0
			state.status = 'idle'
		},
		changeMode: (state, action: PayloadAction<'practice' | 'theory'>) => {
			state.mode = action.payload
		},
		resetState: () => initialState
	},
})

export const { setIsMenuOpen, setHelpModalOpen, setSupportModalOpen, setStatus, nextTrainer, resetTrainers, setTheme,changeMode,nextLesson,resetState } =
	trainersSlice.actions

export default trainersSlice.reducer
