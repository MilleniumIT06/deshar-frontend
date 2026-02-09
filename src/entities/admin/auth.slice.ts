// store/authSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type AuthState, type Role } from '@/shared/types/admin/auth'

const initialState: AuthState = {
	role: 'teacher',
	isLoading: false,
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setRoleStart: state => {
			state.isLoading = true
			state.error = null
		},
		setRoleSuccess: (state, action: PayloadAction<Role>) => {
			state.role = action.payload
			state.isLoading = false
			state.error = null
		},
		setRoleFailure: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		},
		clearRole: state => {
			state.role = null
			state.error = null
		},
		setError: (state, action: PayloadAction<string | null>) => {
			state.error = action.payload
		},
	},
})

export const { setRoleStart, setRoleSuccess, setRoleFailure, clearRole, setError } = authSlice.actions

export const setRoleAsync = () => async () => {
	return 't'
	// try {
	// 	dispatch(setRoleStart())

	// 	dispatch(setRoleSuccess(newRole))
	// } catch (e) {
	// 	console.log(e)
	// 	dispatch(setRoleFailure('Ошибка при установке роли'))
	// }
}

export default authSlice.reducer
