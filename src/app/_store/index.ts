import { configureStore } from '@reduxjs/toolkit'

import learningAttestationReducer from '@/components/LearningAttestation/attestation.slice'
import adminUserReducer from '@/entities/admin/user.slice'
import learningReducer from '@/entities/learning/model/slice'
import learningStatusReducer from '@/entities/learning/model/status.slice'
import userReducer from '@/entities/user/model/user.slice'
import signUpFormReducer from '@/features/auth/signUp.slice'
import engineSlice from '@/entities/engine/model/engine.slice'
import timerSlice from '@/entities/engine/model/timer.slice'
import scoringSlice from '@/entities/engine/model/scoring.slice'

export const store = configureStore({
	reducer: {
		learningReducer,
		learningStatusReducer,
		learningAttestationReducer,
		signUpFormReducer,
		user: userReducer,
		adminUserReducer,
		engine: engineSlice,
		timer: timerSlice,
		scoreReducer: scoringSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
