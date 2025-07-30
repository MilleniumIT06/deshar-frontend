import { configureStore } from '@reduxjs/toolkit'
import learningReducer from '@/entities/learning/model/slice'

export const store = configureStore({
	reducer: {
		 learningReducer,
		// другие редюсеры
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
