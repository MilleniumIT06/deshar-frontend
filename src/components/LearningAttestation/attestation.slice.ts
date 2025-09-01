import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { attestationExampleData } from '@/mocks/data'

import { type Task } from '@/components/LearningContent'

const initialState: {
	data: Task[]
	currentTaskNumber: number
} = {
	data: attestationExampleData as Task[],
	currentTaskNumber: 1,
}

const attestationSlice = createSlice({
	name: 'attestation',
	initialState,
	reducers: {
		changeCurrentTask: (state, action: PayloadAction<number>) => {
			state.currentTaskNumber = action.payload
		},
		changeCompletedStatus: (state, action: PayloadAction<{ id: number; value: boolean }>) => {
			const item = state.data.find(item => item.id === action.payload.id)
			if (item) {
				item.completed = action.payload.value
			}
		},
	},
})

export const { changeCurrentTask, changeCompletedStatus } = attestationSlice.actions
export default attestationSlice.reducer
