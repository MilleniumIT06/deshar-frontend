import type { ProfileResponse } from '@/entities/user/model/user.type'

import { userService } from '@/services/user.service'

import { useQuery } from '@tanstack/react-query'

export function useProfile() {
	const { data: profileData, isLoading } = useQuery<ProfileResponse>({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
	})
	return {
		profileData,
		isLoading,
	}
}
