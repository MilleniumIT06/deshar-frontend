import { configureStore } from '@reduxjs/toolkit'
import activeLessonReducer from '@/entities/learning/model/slice'

export const store = configureStore({
	reducer: {
		activeLesson: activeLessonReducer,
		// другие редюсеры
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
