import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: {
	status: 'learning' | 'attestation'
} = {
	status: 'learning',
}

const learningStatusSlice = createSlice({
	name: 'learningStatus',
	initialState,
	reducers: {
		changeStatus: (state, action: PayloadAction<'learning' | 'attestation'>) => {
			state.status = action.payload
		},
	},
})

export const { changeStatus } = learningStatusSlice.actions
export default learningStatusSlice.reducer
