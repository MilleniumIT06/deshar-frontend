import { useQuery } from '@tanstack/react-query'

import { educationService } from '@/services/education/education.service'

export const useGetModules = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['ing-modules'],
		queryFn: () => educationService.getModules(),
		staleTime: 0,
		gcTime: 0,
	})

	return {
		modules: data || undefined,
		isLoading,
		isError,
		error,
	}
}
