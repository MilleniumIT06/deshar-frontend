import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export const scoringSlice = createSlice({
	name: 'scoring',
	initialState: { totalScore: 0 },
	reducers: {
		addPoints: (state, action: PayloadAction<number>) => {
			const newScore = state.totalScore + action.payload
			state.totalScore = Math.max(0, Math.min(100, newScore))
		},
		resetScore: state => {
			state.totalScore = 0
		},
	},
})

export const { addPoints, resetScore } = scoringSlice.actions
export default scoringSlice.reducer
