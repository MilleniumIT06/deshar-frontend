import { useCallback, useMemo } from 'react'

import { type RootState, type AppDispatch } from '@/app/_store'
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'
import { clearRole, setError, setRoleAsync } from '@/entities/admin/auth.slice'
import { type Role, type UseRoleReturn } from '@/shared/types/admin/auth'

const useRole = (): UseRoleReturn => {
	const dispatch: AppDispatch = useAppDispatch()
	const { role, isLoading, error } = useAppSelector((state: RootState) => state.adminAuthReducer)

	// Функция для установки роли
	const setRole = useCallback(
		(newRole: Role) => {
			dispatch(setRoleAsync(newRole))
			return newRole
		},
		[dispatch],
	)

	// Функция для проверки роли
	const hasRole = useCallback(
		(allowedRole: Role | Role[]): boolean => {
			if (!role) return false

			if (Array.isArray(allowedRole)) {
				return allowedRole.includes(role)
			}
			return role === allowedRole
		},
		[role],
	)

	// Функция для очистки роли
	const clearRoleHandler = useCallback(() => {
		dispatch(clearRole())
	}, [dispatch])

	// Функция для очистки ошибок
	const clearError = useCallback(() => {
		dispatch(setError(null))
	}, [dispatch])

	// Мемоизируем возвращаемый объект
	const roleApi = useMemo(
		() => ({
			role,
			hasRole,
			setRole,
			clearRole: clearRoleHandler,
			isLoading,
			error,
			clearError,
		}),
		[role, hasRole, setRole, clearRoleHandler, isLoading, error, clearError],
	)

	return roleApi
}

export default useRole
