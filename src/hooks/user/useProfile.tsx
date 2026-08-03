import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { userService } from '@/services/user.service'


export function useProfile() {
	const isTokenExist = Boolean(Cookies.get('jwt_token'))

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
