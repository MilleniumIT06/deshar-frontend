import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type ILesson } from '@/components/LearningContent'
import { initialLessons } from '@/mocks/data'

const initialState: {
	activeLessonId: number
	lessons: ILesson[]
} = {
	activeLessonId: 1,
	lessons: initialLessons as ILesson[],
}

const learningSlice = createSlice({
	name: 'leariningSlice',
	initialState,
	reducers: {
		changeStatusOfLesson: (state, action: PayloadAction<{ id: number; value: boolean }>) => {
			const lesson = state.lessons.find(item => item.id === action.payload.id)
			if (lesson) {
				lesson.completed = action.payload.value
			}
		},
		changeId: (state, action: PayloadAction<number>) => {
			state.activeLessonId = action.payload
		},
		nextId: state => {
			state.activeLessonId = state.activeLessonId + 1
		},
		prevId: state => {
			state.activeLessonId = state.activeLessonId - 1
		},
	},
})

export const { changeId, changeStatusOfLesson, nextId, prevId } = learningSlice.actions
export default learningSlice.reducer
