import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user.service'

export function useProfile() {
	const { data: profileData, isLoading,isError } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
	})
	console.log(profileData?.data.user.id,'dddeed')
	return {
		profileData,
		isLoading,
		isError
	}
}
