'use client'

import { useEffect, useState, useCallback } from 'react'
import { apiClient } from '@/shared/lib/api'

interface User {
	id: number
	name: string
	email: string
	avatar?: string
}

interface UseAuthReturn {
	user: User | null
	isAuth: boolean
	loading: boolean
	error: string | null
	logout: () => Promise<void>
	refreshUser: () => Promise<void>
	login: (email: string, password: string) => Promise<User>
}

export const useAuth = (): UseAuthReturn => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const refreshUser = useCallback(async () => {
		try {
			setLoading(true)
			const token = localStorage.getItem('auth_token')

			if (!token) {
				setUser(null)
				setLoading(false)
				return
			}

			const userData = await apiClient.getUser()
			setUser(userData)
			setError(null)
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Ошибка получения пользователя'
			setUser(null)
			setError(errorMessage)

			if (errorMessage === 'Unauthorized' || errorMessage === 'No token found') {
				localStorage.removeItem('auth_token')
				localStorage.removeItem('user')
			}
		} finally {
			setLoading(false)
		}
	}, [])

	const login = useCallback(async (email: string, password: string): Promise<User> => {
		try {
			setLoading(true)
			setError(null)

			const response = await apiClient.login(email, password)

			if (response.user) {
				setUser(response.user)
				return response.user
			}

			throw new Error('Не удалось получить данные пользователя')
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Ошибка авторизации'
			setError(errorMessage)
			throw err
		} finally {
			setLoading(false)
		}
	}, [])

	const logout = useCallback(async () => {
		try {
			setLoading(true)
			await apiClient.logout()
			setUser(null)
			setError(null)
		} catch (err) {
			// eslint-disable-next-line no-console
			console.error('Logout error:', err)
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		refreshUser()
	}, [refreshUser])

	return {
		user,
		isAuth: Boolean(user),
		loading,
		error,
		logout,
		refreshUser,
		login,
	}
}
