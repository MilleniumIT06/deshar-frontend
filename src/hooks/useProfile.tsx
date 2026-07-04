import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

import type { ProfileResponse } from '@/entities/user/model/user.type'



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
