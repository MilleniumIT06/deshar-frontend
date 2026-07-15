import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export function useProfile() {
	const { data: profileData, isLoading,isError,isFetching } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
	})
	return {
		profileData,
		isLoading,
		isError,
		isFetching
	}
}
