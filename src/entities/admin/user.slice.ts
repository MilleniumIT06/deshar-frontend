import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type Role } from '@/shared/types/admin/auth'

interface AdminUser {
	name: string
	role: Role
}

const initialState: {
	user: AdminUser | null
	isAuth: boolean
} = {
	user: {
		name: 'Test user',
		role: 'admin',
	},
	isAuth: true,
}

export const adminUserSlice = createSlice({
	name: 'adminUser',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<AdminUser>) => {
			state.user = action.payload
			state.isAuth = true
		},
		logout: state => {
			state.isAuth = false
			state.user = null
		},
	},
})

export const { login, logout } = adminUserSlice.actions
export default adminUserSlice.reducer
