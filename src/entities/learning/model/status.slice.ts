import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type learningStatusType = 'learning' | 'attestation' | 'finish'
const initialState: {
	status: learningStatusType
} = {
	status: 'learning',
}

const learningStatusSlice = createSlice({
	name: 'learningStatus',
	initialState,
	reducers: {
		changeStatus: (state, action: PayloadAction<learningStatusType>) => {
			state.status = action.payload
		},
	},
})

export const { changeStatus } = learningStatusSlice.actions
export default learningStatusSlice.reducer
