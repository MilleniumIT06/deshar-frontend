import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { TrainerTheme, TrainerStatus } from '@/widgets/trainers-engine/types/types'

interface TrainersState {
	isMenuOpen: boolean
	isSupportModalOpen: boolean
	isAlertModalOpen: boolean
	status: TrainerStatus
	currentTrainerIndex: number
	currentLessonIndex: number
	themeUrl: string | null
	mode: 'practice' | 'theory'
}

const initialState: TrainersState = {
	isMenuOpen: false,
	isSupportModalOpen: false,
	isAlertModalOpen: false,
	status: 'idle',
	currentTrainerIndex: 0,
	themeUrl: null,
	mode: 'theory',
	currentLessonIndex: 0,
}

export const trainersSlice = createSlice({
	name: 'trainers',
	initialState,
	reducers: {
		setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
			state.isMenuOpen = action.payload
		},
		setLessonIndex: (state, action: PayloadAction<number>) => {
			state.currentLessonIndex = action.payload
		},
		setTrainerIndex: (state, action: PayloadAction<number>) => {
			state.currentTrainerIndex = action.payload
		},
		setSupportModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isSupportModalOpen = action.payload
		},
		setAlertModalOpen: (state, action: PayloadAction<boolean>) => {
			state.isAlertModalOpen = action.payload
		},
		setStatus: (state, action: PayloadAction<TrainersState['status']>) => {
			state.status = action.payload
		},
		setThemeUrl: (state, action: PayloadAction<string>) => {
			state.themeUrl = action.payload
		},
		nextTrainer: (state, { payload }: PayloadAction<{ totalTrainers: number }>) => {
			if (state.currentTrainerIndex < payload.totalTrainers - 1) {
				state.currentTrainerIndex += 1
				state.status = 'idle'
			} else {
				state.status = 'finish'
			}
		},
		restoreProgress: (state, action: PayloadAction<{ lessonIndex: number; trainerIndex: number; mode: 'practice' | 'theory' }>) => {
			state.currentLessonIndex = action.payload.lessonIndex
			state.currentTrainerIndex = action.payload.trainerIndex
			state.mode = action.payload.mode
			state.status = 'idle'
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
		resetState: () => initialState,
	},
})

export const {
	setIsMenuOpen,
	setLessonIndex,
	setAlertModalOpen,
	setSupportModalOpen,
	setStatus,
	nextTrainer,
	resetTrainers,
	setThemeUrl,
	changeMode,
	nextLesson,
	resetState,
	setTrainerIndex,
	restoreProgress,
} = trainersSlice.actions

export default trainersSlice.reducer
