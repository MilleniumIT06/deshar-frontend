import { useQuery } from '@tanstack/react-query'

import { getTokenFromCookie } from '@/services/auth/auth-token.service'
import { userService } from '@/services/user.service'

export function useProfile() {
	const isTokenExist = Boolean(getTokenFromCookie())

	const {
		data: profileData,
		isLoading,
		isError,
		isFetching,
	} = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		enabled: isTokenExist,
	})

	return {
		profileData,
		isLoading: isTokenExist ? isLoading : false,
		isError,
		isFetching,
	}
}
