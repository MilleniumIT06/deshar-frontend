import { configureStore } from '@reduxjs/toolkit'

import barCharReducer from '@/components/BarChart/BarChart.slice'
import learningAttestationReducer from '@/components/LearningAttestation/attestation.slice'
import learningReducer from '@/entities/learning/model/slice'
import learningStatusReducer from '@/entities/learning/model/status.slice'
import userReducer from '@/entities/user/model/user.slice'
import signUpFormReducer from '@/features/auth/signUp.slice'

export const store = configureStore({
	reducer: {
		learningReducer,
		learningStatusReducer,
		learningAttestationReducer,
		signUpFormReducer,
		barCharReducer,
		user: userReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
