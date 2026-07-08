import { useCallback, useMemo } from 'react'

import { useProfile } from '@/hooks/user/useProfile'

import type { RoleName } from '@/shared/types/user.types'
// import type { UserType } from '@/shared/types/user.types'

const useRole = () => {
	const { profileData } = useProfile()
	const role = profileData?.data.user.role.name ?? null
	const hasRole = useCallback(
		(allowedRole: RoleName | RoleName[]): boolean => {
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
			role,
			hasRole,
		}),
		[role, hasRole],
	)
}

export default useRole
