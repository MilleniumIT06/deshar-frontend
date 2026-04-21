import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface TrainersState {
	isMenuOpen: boolean
	isHelpOpen: boolean
	isSupportModalOpen: boolean
	status: 'idle' | 'error' | 'success' | 'finish'
	currentTrainerIndex: number
}

const initialState: TrainersState = {
	isMenuOpen: false,
	isHelpOpen: false,
	isSupportModalOpen: false,
	status: 'idle',
	currentTrainerIndex: 0,
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
		nextTrainer: (state, { payload }: PayloadAction<{ totalTrainers: number }>) => {
			if (state.currentTrainerIndex !== payload.totalTrainers - 1) {
				state.currentTrainerIndex += 1
				state.status = 'idle'
			} else {
				state.status = 'finish'
			}
		},
		resetTrainers: state => {
			state.currentTrainerIndex = 0
			state.status = 'idle'
		},
	},
})

export const { setIsMenuOpen, setHelpModalOpen, setSupportModalOpen, setStatus, nextTrainer, resetTrainers } =
	trainersSlice.actions

export default trainersSlice.reducer
