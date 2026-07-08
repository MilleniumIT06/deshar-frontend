import { useCallback, useMemo } from 'react'

import { useAppSelector } from '@/app/_store/hooks'
import { useProfile } from '@/hooks/user/useProfile'

// import { type Role } from '@/shared/types/admin/auth'
import type { UserType } from '@/shared/types/user.types'

const useRole = () => {
	const user = useAppSelector(state => state.adminUserReducer.user)
	const isAuth = useAppSelector(state => state.adminUserReducer.isAuth)
	const { profileData } = useProfile()
	const role = profileData?.data.user.user_type ?? null
	const hasRole = useCallback(
		(allowedRole: UserType | UserType[]): boolean => {
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
