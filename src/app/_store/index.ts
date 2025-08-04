import { configureStore } from '@reduxjs/toolkit'
import learningReducer from '@/entities/learning/model/slice'
import learningStatusReducer from '@/entities/learning/model/status.slice'
export const store = configureStore({
	reducer: {
		learningReducer,
		learningStatusReducer,
		// другие редюсеры
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
