import { useQuery } from '@tanstack/react-query'

import { educationService } from '@/services/education/education.service'
import { type Id } from '@/shared/types/types'

export const useGetModuleById = (id: Id) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['ing-module-by-id', Number(id)],
		queryFn: () => educationService.getModuleById(id),
		staleTime: 0,
		gcTime: 5 * 60 * 1000,
	})

	return {
		module: data || undefined,
		isLoading,
		isError,
		error,
	}
}
