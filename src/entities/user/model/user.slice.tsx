import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type User } from './user.type'

const initialState: {
	user: User | null
	isAuth: boolean
} = {
	user: null,
	isAuth: true,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<User>) => {
			state.user = action.payload
			state.isAuth = true
		},
		logout: state => {
			state.isAuth = false
			state.user = null
		},
	},
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
