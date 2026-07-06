// entities/user/model/user.slice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type  { User } from '@/shared/types/user.types'


// Инициализируем строго значениями по умолчанию для SSR безопасности
const initialState: {
	user: User | null
	isAuth: boolean
} = {
	user: null,
	isAuth: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// Экшен для установки данных пользователя при инициализации на клиенте
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload
			state.isAuth = Boolean(action.payload)
		},
		login: (state, action: PayloadAction<User>) => {
			state.user = action.payload
			state.isAuth = true
		},
		logoutAction: state => {
			state.isAuth = false
			state.user = null
		},
	},
})

export const { login, logoutAction, setUser } = userSlice.actions
export default userSlice.reducer
