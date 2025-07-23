import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Review, ReviewsState } from './types'

const initialState: {
	activeLessonId: number
} = {
	activeLessonId: 1,
}

const learningActiveLessonSlice = createSlice({
	name: 'activeLesson',
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
		changeId: (state, action: PayloadAction<number>) => {
			state.activeLessonId = action.payload
		}
	},
})

export const { changeId } = learningActiveLessonSlice.actions
export default learningActiveLessonSlice.reducer
