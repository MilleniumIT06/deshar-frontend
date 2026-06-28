// entities/user/model/user.slice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type User } from './user.type'
import { auth } from '@/shared/lib/auth'

const initialState: {
    user: User | null
    isAuth: boolean
} = {
    user: auth.getUser(),
    isAuth: auth.isAuthenticated(),
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isAuth = true
        },
        logout: (state) => {
            auth.removeToken()
            auth.removeUser()
            state.isAuth = false
            state.user = null
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload }
                auth.setUser(state.user)
            }
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
    },
})

export const { login, logout, updateUser, setAuth } = userSlice.actions
export default userSlice.reducer