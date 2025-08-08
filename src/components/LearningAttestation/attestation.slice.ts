import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../LearningContent'
import { attestationExampleData } from '@/mocks/data'

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
		// changeStatusOfLesson: (state, action: PayloadAction<{ id: number; value: boolean }>) => {
		// 	const lesson = state.lessons.find(item => item.id === action.payload.id)
		// 	if (lesson) {
		// 		lesson.completed = action.payload.value
		// 	}
		// 	console.log(state.lessons)
		// },
		// changeId: (state, action: PayloadAction<number>) => {
		// 	state.activeLessonId = action.payload
		// },
		// nextId: state => {
		// 	state.activeLessonId = state.activeLessonId + 1
		// },
		// prevId: state => {
		// 	state.activeLessonId = state.activeLessonId - 1
		// },
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
