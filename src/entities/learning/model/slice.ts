import { ILesson } from '@/components/LearningContent'
import { initialLessons } from '@/mocks/data'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Review, ReviewsState } from './types'

const initialState: {
	activeLessonId: number
	lessons: ILesson[]
} = {
	activeLessonId: 1,
	lessons: initialLessons,
}

const learningSlice = createSlice({
	name: 'leariningSlice',
	initialState,
	reducers: {
		// addReview: (state, action: PayloadAction<Review>) => {
		// 	state.reviews.push(action.payload)
		// },
		// setReviews: (state, action: PayloadAction<Review[]>) => {
		// 	state.reviews = action.payload
		// 	state.status = 'succeeded'
		// },
		// setLoading: (state, action: PayloadAction<boolean>) => {
		// 	state.status = action.payload ? 'loading' : 'idle'
		// },
		// setError: (state, action: PayloadAction<string>) => {
		// 	state.error = action.payload
		// 	state.status = 'failed'
		// },
		changeStatusOfLesson: (state, action: PayloadAction<{ id: number; value: boolean }>) => {
			const lesson = state.lessons.find(item => item.id === action.payload.id)
			if (lesson) {
				lesson.completed = action.payload.value
			}
			console.log(state.lessons)
		},
		changeId: (state, action: PayloadAction<number>) => {
			state.activeLessonId = action.payload
			console.log(state.activeLessonId)
			console.log(state.lessons)
		},
	},
})

export const { changeId, changeStatusOfLesson } = learningSlice.actions
export default learningSlice.reducer
