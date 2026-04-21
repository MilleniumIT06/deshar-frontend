import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface TimerState {
	timeLeft: number
	initialTime: number
	isActive: boolean
	isFinished: boolean
}

const initialState: TimerState = {
	timeLeft: 15 * 60 + 25,
	initialTime: 15 * 60 + 25,
	isActive: false,
	isFinished: false,
}

export const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		initTimer: (state, action: PayloadAction<number>) => {
			state.timeLeft = action.payload
			state.initialTime = action.payload
			state.isActive = true
			state.isFinished = false
		},
		tick: state => {
			if (state.timeLeft > 0) {
				state.timeLeft -= 1
			} else {
				state.isActive = false
				state.isFinished = true
			}
		},
		stopTimer: state => {
			state.isActive = false
		},
		resumeTimer: state => {
			if (!state.isFinished) {
				state.isActive = true
			}
		},
	},
})

export const { initTimer, tick, stopTimer, resumeTimer } = timerSlice.actions
export default timerSlice.reducer
