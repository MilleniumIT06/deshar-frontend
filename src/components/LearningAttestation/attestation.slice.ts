import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '../LearningContent'
import { attestationExampleData } from '@/mocks/data'

const initialState: {
	data: Task[]
	currentTaskNumber: number | null
} = {
	data: attestationExampleData as Task[],
	currentTaskNumber: null,
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
		setAttestationData: (state, action: PayloadAction<any[]>) => {
			state.data = [...action.payload]
		},
		changeCurrentTask: (state, action: PayloadAction<number>) => {
			state.currentTaskNumber = action.payload
		},
	},
})

export const {} = attestationSlice.actions
export default attestationSlice.reducer
