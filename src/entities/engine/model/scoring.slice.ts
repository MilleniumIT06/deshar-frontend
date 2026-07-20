import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export const scoringSlice = createSlice({
	name: 'scoring',
	initialState: { totalScore: 0,currentScore: 0 },
	reducers: {
		addPoints: (state, action: PayloadAction<number>) => {
			const newScore = state.currentScore + action.payload
			state.currentScore = Math.max(0,newScore)
		},
		subtractPoints: (state, action: PayloadAction<number>) => {
			const newScore = state.currentScore - action.payload
			state.currentScore = Math.max(0,newScore)
		},
		resetScore: state => {
			state.totalScore = 0
			state.currentScore = 0
		},
		resetCurrentScore: state => {
			state.currentScore = 0
		},
		addCurrentToTotalScore: (state) => {
			state.totalScore += state.currentScore
			state.currentScore = 0
		},
		resetScoring: state => {
			state.totalScore = 0
			state.currentScore = 0
		}
	},
})

export const { addPoints, resetScore, subtractPoints,addCurrentToTotalScore,resetCurrentScore,resetScoring } = scoringSlice.actions
export default scoringSlice.reducer
