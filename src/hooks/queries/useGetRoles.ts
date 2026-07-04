import { useQuery } from '@tanstack/react-query'

import { rolesService } from '@/services/roles.service'

export const useGetRoles = () => {
	const {
		data: roles,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['roles user'],
		queryFn: () => rolesService.getAllRoles(),
	})
	return { roles, isLoading, isError, error }
}
