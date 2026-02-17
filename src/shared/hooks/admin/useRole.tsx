import { useCallback, useMemo } from 'react'

import { useAppSelector } from '@/app/_store/hooks'
import { type Role } from '@/shared/types/admin/auth'

const useRole = () => {
	const user = useAppSelector(state => state.adminUserReducer.user)
	const isAuth = useAppSelector(state => state.adminUserReducer.isAuth)
	const role = user?.role ?? null

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

	return useMemo(
		() => ({
			user,
			role,
			hasRole,
			isAuth,
		}),
		[role, user, hasRole, isAuth],
	)
}

export default useRole
